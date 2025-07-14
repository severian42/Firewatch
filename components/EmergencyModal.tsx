import React from 'react';
import HoldToActivateButton from './HoldToActivateButton';
import { ShieldExclamationIcon } from './Icons';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmBroadcast: () => void;
  onConfirmCovertRecord: () => void;
}

const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, onConfirmBroadcast, onConfirmCovertRecord }) => {
  if (!isOpen) return null;

  const handleAction = (action: string) => {
    if (action === 'FULL_BROADCAST') {
      onConfirmBroadcast();
    } else if (action === 'COVERT_RECORD') {
      onConfirmCovertRecord();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center p-4 transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full max-w-md text-center">
        <ShieldExclamationIcon className="w-20 h-20 text-red-500 mx-auto animate-ping" />
        <ShieldExclamationIcon className="w-20 h-20 text-red-500 mx-auto -mt-20" />
        
        <h1 className="text-3xl font-bold text-red-400 mt-4">Emergency Mode</h1>
        <p className="text-gray-300 mt-2 mb-8">
          Confirm your action by pressing and holding the desired button.
        </p>

        <div className="space-y-4">
          <HoldToActivateButton onActivate={() => handleAction('FULL_BROADCAST')} text="Broadcast Alert & Record" />
          <HoldToActivateButton onActivate={() => handleAction('COVERT_RECORD')} text="Start Covert Recording" color="secondary" />
        </div>

        <button
          onClick={onClose}
          className="mt-10 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full max-w-xs"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmergencyModal;