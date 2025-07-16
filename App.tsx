
import React, { useState } from 'react';
import type { Screen, Evidence } from './types';
import { NAV_ITEMS_CONFIG } from './constants';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './pages/HomeScreen';
import AlertsScreen from './pages/AlertsScreen';
import KnowYourRightsScreen from './pages/KnowYourRightsScreen';
import DocumentScreen from './pages/DocumentScreen';
import GuideScreen from './pages/GuideScreen';
import SettingsScreen from './pages/SettingsScreen';
import PanicButton from './components/PanicButton';
import EmergencyModal from './components/EmergencyModal';
import CameraView from './components/CameraView';
import { useUserSettings } from './hooks/useUserSettings';
import { useEvidence } from './hooks/useEvidence';
import PWAPrompt from './components/PWAPrompt';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('Home');
  const [isEmergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const { evidence: evidenceList, addEvidence: handleAddNewEvidence, deleteEvidence: handleDeleteEvidence, updateEvidence: handleUpdateEvidence } = useEvidence();
  const [isCovertRecording, setIsCovertRecording] = useState(false);
  const { settings } = useUserSettings();

  const handlePanicActivate = () => {
    setEmergencyModalOpen(true);
  };

  const sendSmsToEmergencyContacts = () => {
    const defaultMessage = 'Emergency! This is an automated alert from the Firewatch app. I am in a potential emergency situation. Please check on me.';
    
    const openSmsLink = (message: string) => {
      if (settings.emergencyContacts.length === 0) {
        alert('No emergency contacts found. Please add contacts in the Settings menu to use this feature.');
        return;
      }
      const phoneNumbers = settings.emergencyContacts.map(c => c.phone).join(',');
      const smsLink = `sms:${phoneNumbers}?&body=${encodeURIComponent(message)}`;
      window.location.href = smsLink;
    };

    alert('Your SMS app will now open to alert your emergency contacts. Please review the message and press send.');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const locationMessage = `Emergency! This is an automated alert from the Firewatch app. I am in a potential emergency situation. My location is approximately: https://www.google.com/maps?q=${latitude},${longitude}. Please check on me.`;
          openSmsLink(locationMessage);
        },
        () => {
          console.error("Could not get location for SMS alert.");
          openSmsLink(defaultMessage + ` (Could not fetch location).`);
        },
        { timeout: 10000 } // Give up after 10 seconds
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      openSmsLink(defaultMessage + ` (Geolocation not supported).`);
    }
  };

  const handleConfirmBroadcast = () => {
    setEmergencyModalOpen(false);
    sendSmsToEmergencyContacts();
    setIsCovertRecording(true); // Start recording audio
  };

  const handleConfirmCovertRecord = () => {
    setEmergencyModalOpen(false);
    setIsCovertRecording(true); // Start recording audio
  };

  const handleCloseCovertRecorder = () => {
    setIsCovertRecording(false);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Home':
        return <HomeScreen setActiveScreen={setActiveScreen} onPanicActivate={handlePanicActivate} />;
      case 'Alerts':
        return <AlertsScreen />;
      case 'Rights':
        return <KnowYourRightsScreen />;
      case 'Document':
        return <DocumentScreen 
                    evidence={evidenceList} 
                    onAddEvidence={handleAddNewEvidence} 
                    onDeleteEvidence={handleDeleteEvidence}
                    onUpdateEvidence={handleUpdateEvidence}
                />;
      case 'Guide':
        return <GuideScreen />;
      case 'Settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-dvh bg-gray-900 text-gray-100">
      <PWAPrompt />
      <Header />
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="container mx-auto px-4 py-6">
          {renderScreen()}
        </div>
      </main>

      {activeScreen !== 'Home' && <PanicButton onActivate={handlePanicActivate} />}

      <EmergencyModal 
        isOpen={isEmergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        onConfirmBroadcast={handleConfirmBroadcast}
        onConfirmCovertRecord={handleConfirmCovertRecord}
      />

      {isCovertRecording && (
        <CameraView
            mediaType="audio"
            onClose={handleCloseCovertRecorder}
            onSave={(newEvidence) => {
                handleAddNewEvidence(newEvidence);
                handleCloseCovertRecorder();
            }}
            autoStart={true}
        />
      )}

      <BottomNav 
        navItems={NAV_ITEMS_CONFIG}
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
      />
      <footer className="w-full py-2 text-center text-gray-500 text-xs">
        <div className="flex justify-center items-center gap-4">
        <a href="https://github.com/severian42/Firewatch" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          GitHub
        </a>
          <span className="text-gray-600">•</span>
          <a href="https://www.interwoven-arkitech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            Built with AI by Interwoven Arkitech
          </a>
        </div>
      </footer>
      <style>{`
        /* Modern mobile browsers have dynamic toolbars. 
           max-h-dvh helps prevent the layout from jumping. */
        html, body, #root {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default App;
