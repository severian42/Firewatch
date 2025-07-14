import React, { useState, useRef, useCallback } from 'react';

interface HoldToActivateButtonProps {
  onActivate: () => void;
  text: string;
  color?: 'primary' | 'secondary';
  holdTime?: number;
}

const HoldToActivateButton: React.FC<HoldToActivateButtonProps> = ({ 
  onActivate,
  text,
  color = 'primary',
  holdTime = 3000 
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const colorClasses = {
    primary: 'bg-red-600 text-white',
    secondary: 'bg-blue-600 text-white',
  };
  const progressColorClasses = {
    primary: 'bg-red-400',
    secondary: 'bg-blue-400',
  };

  const startHold = useCallback(() => {
    setIsHolding(true);
    const startTime = Date.now();

    intervalRef.current = window.setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsedTime / holdTime) * 100);
      setProgress(newProgress);
    }, 50);

    timerRef.current = window.setTimeout(() => {
      onActivate();
      cancelHold();
    }, holdTime);
  }, [holdTime, onActivate]);

  const cancelHold = useCallback(() => {
    setIsHolding(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(0);
  }, []);

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={(e) => { e.preventDefault(); startHold(); }}
      onTouchEnd={(e) => { e.preventDefault(); cancelHold(); }}
      className={`${colorClasses[color]} font-bold py-4 px-6 rounded-lg transition-transform w-full relative overflow-hidden text-lg tracking-wide transform active:scale-95`}
      aria-label={`Press and hold to activate ${text}`}
    >
      <div
        className={`${progressColorClasses[color]} absolute top-0 left-0 h-full transition-all duration-100 ease-linear`}
        style={{ width: `${progress}%` }}
      ></div>
      <span className="relative z-10">{isHolding ? 'Holding...' : text}</span>
    </button>
  );
};

export default HoldToActivateButton;