import React, { useState, useEffect } from 'react';
import { ALERT_DATA } from '../data/alertData';
import AlertListItem from '../components/AlertListItem';
import { BellIcon } from '../components/Icons';
import { generateNewAlert } from '../services/geminiService';
import type { Alert } from '../types';
import Spinner from '../components/Spinner';
import LocationScanner from '../components/LocationScanner';

const AlertsScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>(ALERT_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This effect can be used to periodically refresh community alerts,
    // but the primary interaction is now the LocationScanner.
    // For now, we just simulate loading the initial data.
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-center text-blue-400">Alerts</h1>
        <p className="mt-4 text-lg text-center text-gray-300">
          Real-time enforcement activity and community alerts.
        </p>
      </div>

      {/* Disclaimer for Mock Data - Enhanced */}
      <div className="bg-red-900 border border-red-700 text-red-100 px-6 py-4 rounded-lg text-center my-6 shadow-xl animate-pulse">
        <p className="font-bold text-lg mb-2">🚨 Attention: Test Data Displayed! 🚨</p>
        <p className="text-sm leading-relaxed">
          Currently, you're viewing <span className="font-bold text-red-50">sample alerts</span> for demonstration purposes. These are not live, real-time incidents.
          To ensure your safety and receive accurate, localized threat intelligence,
          please <a href="/settings" className="underline font-bold text-red-50 hover:text-white transition-colors duration-200">securely configure your API key in Settings</a>.
          Once set up, activate the <span className="font-bold text-red-50">Location Scanner</span> below to actively monitor your immediate area.
          Your protection is our priority, and live data ensures you're truly informed.
        </p>
      </div>

      <div className="my-8">
        <LocationScanner />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Community Verified Alerts</h2>
        {isLoading && <Spinner />}
        {error && 
            <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded-lg my-4" role="alert">
                <p>{error}</p>
            </div>
        }
        {!isLoading && alerts.length > 0 ? (
          <ul className="space-y-4">
            {alerts.map((alert) => (
              <li key={alert.id}>
                <AlertListItem alert={alert} />
              </li>
            ))}
          </ul>
        ) : !isLoading && (
          <div className="text-center py-8 px-4 text-gray-500 bg-gray-800 rounded-lg flex flex-col items-center justify-center">
            <BellIcon />
            <p className="mt-2 font-semibold">No Active Alerts</p>
            <p className="text-sm">It's all quiet for now. New alerts will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsScreen;
