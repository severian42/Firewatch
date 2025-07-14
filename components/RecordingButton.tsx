import React from 'react';

interface RecordingButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const RecordingButton: React.FC<RecordingButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg p-4 shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      aria-label={`Start Recording: ${label}`}
    >
      <div className="w-full h-16 flex items-center justify-center">{icon}</div>
      <span className="block text-center text-sm font-semibold mt-2">{label}</span>
    </button>
  );
};

export default RecordingButton;