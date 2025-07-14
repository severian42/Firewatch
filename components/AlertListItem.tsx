import React from 'react';
import type { Alert } from '../types';
import { ExclamationTriangleIcon, CheckBadgeIcon } from './Icons';

interface AlertListItemProps {
  alert: Alert;
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const alertStyles: { [key: string]: { borderColor: string; iconColor: string; icon: React.ReactNode } } = {
  'Immediate Threat': {
    borderColor: 'border-red-500',
    iconColor: 'text-red-400',
    icon: <ExclamationTriangleIcon className="w-8 h-8" />,
  },
  'Area Watch': {
    borderColor: 'border-yellow-500',
    iconColor: 'text-yellow-400',
    icon: <ExclamationTriangleIcon className="w-8 h-8" />,
  },
  'Pattern Alert': {
    borderColor: 'border-blue-500',
    iconColor: 'text-blue-400',
    icon: <ExclamationTriangleIcon className="w-8 h-8" />,
  },
  'All Clear': {
    borderColor: 'border-green-500',
    iconColor: 'text-green-400',
    icon: <CheckBadgeIcon className="w-8 h-8" />,
  },
};

const AlertListItem: React.FC<AlertListItemProps> = ({ alert }) => {
  const styles = alertStyles[alert.type];

  return (
    <div className={`bg-gray-800 rounded-lg p-4 shadow-lg border-l-4 ${styles.borderColor} flex space-x-4 items-start`}>
      <div className={`flex-shrink-0 w-10 pt-1 ${styles.iconColor}`}>
        {styles.icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-100">{alert.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{alert.location}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="text-xs text-gray-500 font-medium">{formatRelativeTime(alert.timestamp)}</p>
            {alert.verified && (
              <div className="mt-1 inline-flex items-center bg-green-900/50 border border-green-700/50 text-green-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                <CheckBadgeIcon className="w-4 h-4 mr-1" />
                Verified
              </div>
            )}
          </div>
        </div>
        <p className="mt-2 text-gray-300 leading-relaxed text-sm">
          {alert.description}
        </p>
        {/* Disclaimer for Alert Status - Enhanced */}
        <div className="mt-3 p-3 bg-red-900/40 border border-red-700 rounded-lg text-red-200 text-sm shadow-inner">
          <p className="font-bold flex items-center">
            <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-red-400" />
            Status Note:
          </p>
          <p className="mt-1 text-xs leading-tight">
            The current status (<span className="font-bold text-red-400">Area Status: High Threat - Red</span>) is based on community-sourced reports and may not be exhaustive or immediately verifiable. Always prioritize your safety and cross-reference information if possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertListItem;