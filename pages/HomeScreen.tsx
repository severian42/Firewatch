

import React from 'react';
import DashboardToolkit from '../components/DashboardToolkit';
import EvidenceListItem from '../components/EvidenceListItem';
import { useEvidence } from '../hooks/useEvidence';
import type { Screen } from '../types';

interface HomeScreenProps {
  setActiveScreen: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ setActiveScreen }) => {
  const { evidence } = useEvidence();

  return (
    <div className="bg-gray-900">
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Firewatch</h1>
              <p className="text-gray-600 mb-4">
                Your civil rights protection companion. Document, report, and stay informed.
          </p>
              
        <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setActiveScreen('Rights')}
                  className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition-colors cursor-pointer text-left"
                >
                  <h3 className="font-semibold text-gray-800">Know Your Rights</h3>
                  <p className="text-sm text-gray-600">Quick access to your legal protections</p>
                </button>
                <button 
                  onClick={() => setActiveScreen('Document')}
                  className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer text-left"
                >
                  <h3 className="font-semibold text-gray-800">Document Safely</h3>
                  <p className="text-sm text-gray-600">Secure recording with legal guidance</p>
                </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-semibold text-blue-400 mb-3">Area Status</h2>
        <div className="space-y-3">
                <div className="p-3 rounded-lg bg-gray-900/50 border-l-4 border-gray-500">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-gray-400">READY</span>
                    <span className="px-2 py-1 text-xs font-bold text-gray-900 rounded-full bg-gray-500">STANDBY</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">System ready. Use tools below to scan your area.</p>
                </div>
                <p className="text-xs text-gray-500 text-center pt-2">Status updates when you scan your location</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">
                Active Alerts
              </h2>
              <div className="space-y-3">
                <div className="border-l-4 border-gray-300 pl-3">
                  <h3 className="font-medium text-sm text-gray-800">No active alerts</h3>
                  <p className="text-xs text-gray-600">Scan your area to check for updates</p>
                </div>
              </div>
            </div>
        </div>
      </div>

      <DashboardToolkit />

        {/* Community Safety Map Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-800">Community Safety Map</h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Real-time community reports and safety information from our partners
            </p>
          </div>
          <div className="relative">
            <iframe
              src="https://padlet.com/embed/lf0l47ljszbto2uj"
              className="w-full h-[600px] md:h-[700px] lg:h-[800px]"
              style={{ border: 'none', display: 'block' }}
              allow="camera;microphone;geolocation"
              title="Community Safety Map"
            />
          </div>
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              🔒 This map is embedded from an external service. Your location and data remain private to your device.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Recent Evidence
          </h2>
          {evidence.length > 0 ? (
            <div className="space-y-3">
              {evidence.slice(0, 3).map(item => (
                <EvidenceListItem key={item.id} evidence={item} onSelect={() => {}} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No evidence recorded yet. Use the camera to start documenting.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;