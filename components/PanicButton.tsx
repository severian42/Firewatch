import React from 'react';
import { ShieldExclamationIcon } from './Icons';

interface PanicButtonProps {
  onActivate: () => void;
}

const PanicButton: React.FC<PanicButtonProps> = ({ onActivate }) => {
  return (
    <button
      onClick={onActivate}
      className="fixed bottom-24 right-4 z-40 bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl animate-pulse-slow hover:animate-none transition-transform transform hover:scale-110"
      aria-label="Activate Emergency Panic Button"
    >
      <ShieldExclamationIcon className="w-9 h-9" />
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(220, 38, 38, 0);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
      `}</style>
    </button>
  );
};

export default PanicButton;