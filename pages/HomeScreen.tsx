
import React, { useMemo } from 'react';
import { HOME_SCREEN_ACTIONS } from '../constants';
import { ALERT_DATA } from '../data/alertData';
import { resourceData } from '../data/resourceData';
import { ShieldExclamationIcon } from '../components/Icons';
import type { Alert, Screen, Evidence } from '../types';
import DashboardToolkit from '../components/DashboardToolkit';

const HomeScreen: React.FC<{ onPanic: () => void; evidence: Evidence[]; setActiveScreen: (screen: Screen) => void; }> = ({ onPanic, evidence, setActiveScreen }) => {
  const getThreatStatus = (alerts: Alert[]) => {
    const criticalAlerts = alerts.filter(a => a.type !== 'All Clear');
    if (criticalAlerts.length === 0) {
      return {
        level: 'Green',
        label: 'Low Threat',
        message: 'No active threats reported.',
        color: 'text-green-400',
        bgColor: 'bg-green-500',
      };
    }
  
    const highestPriorityAlert = criticalAlerts.sort((a, b) => {
        const priority: { [key: string]: number } = { 'Immediate Threat': 3, 'Area Watch': 2, 'Pattern Alert': 1 };
        return (priority[b.type] || 0) - (priority[a.type] || 0);
    })[0];
  
    if (highestPriorityAlert.type === 'Immediate Threat') {
      return {
        level: 'Red',
        label: 'High Threat',
        message: highestPriorityAlert.title,
        color: 'text-red-400',
        bgColor: 'bg-red-500',
      };
    }
    
    return {
      level: 'Yellow',
      label: 'Elevated Threat',
      message: highestPriorityAlert.title,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500',
    };
  };

  const threatStatus = useMemo(() => getThreatStatus(ALERT_DATA), []);

  const handleActionClick = (actionId: string) => {
    switch (actionId) {
      case 'quick_record':
        setActiveScreen('Document');
        break;

      case 'legal_hotline':
        const legalOrgs = resourceData.find(cat => cat.id === 'legal_orgs');
        const aclu = legalOrgs?.resources.find(res => res.name.includes('ACLU'));

        if (aclu) {
          const hotline = aclu.phone?.replace(/\D/g, '');

          if (hotline) {
            if (confirm(`You are about to call ${aclu.name} (${aclu.phone}). Do you want to proceed?`)) {
              window.location.href = `tel:${hotline}`;
            }
          } else {
            alert('Legal hotline number not found.');
          }
        } else {
          alert('ACLU resource not found.');
        }
        break;

      case 'share_location':
        if (!navigator.geolocation) {
          alert('Geolocation is not supported by your browser.');
          return;
        }
        
        alert('Getting your location to share...');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
                const shareText = `I'm sharing my current location with you via the Firewatch app. You can view it here: ${mapsLink}`;

                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: 'My Location',
                            text: shareText,
                        });
                    } catch (error) {
                        console.log('Share was cancelled.', error);
                    }
                } else {
                    alert('Your browser does not support native sharing. We will open your SMS app as a fallback.');
                    window.location.href = `sms:?&body=${encodeURIComponent(shareText)}`;
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                let message = "Could not get your location. Please check your browser's location permissions.";
                if (error.code === error.TIMEOUT) {
                    message = 'Could not get your location in time. Please try again.';
                }
                alert(message);
            },
            { timeout: 10000, enableHighAccuracy: true }
        );
        break;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
        <p className="mt-1 text-gray-400">Quick access to emergency tools and status updates.</p>
      </div>

      {/* Disclaimer for Mock Data - Homepage */}
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

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onPanic}
            className="col-span-2 bg-red-600 hover:bg-red-700 text-white rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col items-center justify-center h-28"
            aria-label="Activate Emergency Panic Button"
          >
            <ShieldExclamationIcon className="w-10 h-10" />
            <span className="text-xl font-bold mt-1 tracking-wider">PANIC</span>
          </button>
          {HOME_SCREEN_ACTIONS.map(action => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              className={`${action.className} text-white rounded-lg p-3 shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 flex flex-col items-center justify-center h-24`}
              aria-label={action.label}
            >
              <div className="w-8 h-8">{action.icon}</div>
              <span className="text-sm font-semibold mt-2 text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-semibold text-blue-400 mb-3">Area Status</h2>
        <div className="space-y-3">
            <div className={`p-3 rounded-lg bg-gray-900/50 border-l-4 ${threatStatus.bgColor.replace('bg-','border-')}`}>
                <div className="flex items-center justify-between">
                    <span className={`font-bold text-lg ${threatStatus.color}`}>{threatStatus.label}</span>
                    <span className={`px-2 py-1 text-xs font-bold text-gray-900 rounded-full ${threatStatus.bgColor}`}>{threatStatus.level}</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">{threatStatus.message}</p>
            </div>
            <p className="text-xs text-gray-500 text-center pt-2">Status is based on community reports and may not be comprehensive.</p>
        </div>
      </div>

      <DashboardToolkit />

    </div>
  );
};

export default HomeScreen;