import React from 'react';
import type { Evidence } from '../types';
import { VideoCameraIcon, MicrophoneIcon, CameraIcon } from './Icons';

interface EvidenceListItemProps {
  evidence: Evidence;
  onSelect: () => void;
}

const EvidenceListItem: React.FC<EvidenceListItemProps> = ({ evidence, onSelect }) => {
  const getIcon = () => {
    switch (evidence.mediaType) {
      case 'video':
        return <VideoCameraIcon className="w-6 h-6 text-blue-400" />;
      case 'audio':
        return <MicrophoneIcon className="w-6 h-6 text-green-400" />;
      case 'photo':
        return <CameraIcon className="w-6 h-6 text-purple-400" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <li onClick={onSelect} className="bg-gray-700 rounded-lg p-3 flex items-center space-x-4 transition-colors hover:bg-gray-600 cursor-pointer">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
        {getIcon()}
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="font-semibold text-gray-100 truncate">{evidence.incidentType}</p>
        <p className="text-sm text-gray-400">{formatDate(evidence.timestamp)}</p>
      </div>
      <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </li>
  );
};

export default EvidenceListItem;