
import React, { useState } from 'react';
import { useUserSettings } from '../hooks/useUserSettings';
import type { FallbackLocation, EmergencyContact } from '../types';
import { TrashIcon } from '../components/Icons';
import { GithubIcon } from '../components/Icons';
import { ShieldExclamationIcon } from '../components/Icons';

const SettingsScreen: React.FC = () => {
  const { settings, saveSettings } = useUserSettings();
  const [location, setLocation] = useState<FallbackLocation>(settings.fallbackLocation);
  const [contacts, setContacts] = useState<EmergencyContact[]>(settings.emergencyContacts);
  const [geminiApiKey, setGeminiApiKey] = useState<string>(settings.geminiApiKey || '');
  const [geminiModel, setGeminiModel] = useState<string>(settings.geminiModel || 'gemini-2.0-flash-exp');
  const [savedMessage, setSavedMessage] = useState<string>('');

  // Removed script-based Ko-fi widget to avoid page overwrite; will use static image link instead.

  const availableModels = [
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
    { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
  ];

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleContactChange = (index: number, field: keyof EmergencyContact, value: string) => {
    const newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setContacts(newContacts);
  };
  
  const addContact = () => {
    if(contacts.length < 5) { // Limit to 5 contacts
        setContacts([...contacts, { name: '', phone: '' }]);
    }
  };

  const removeContact = (index: number) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const validContacts = contacts.filter(c => c.name.trim() !== '' && c.phone.trim() !== '');
    saveSettings({ 
      fallbackLocation: location, 
      emergencyContacts: validContacts,
      geminiApiKey: geminiApiKey.trim(),
      geminiModel
    });
    setSavedMessage('Settings saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000); // Hide message after 3 seconds
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold text-center text-blue-400">Settings</h1>
        <p className="mt-4 text-lg text-center text-gray-300">
          Manage your preferences and emergency information.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">

        {/* Browser Translation */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">Translate the App</h2>
          <p className="text-gray-400 text-sm mb-4">
            This app can be translated into any language using your browser's built-in tools. Here’s how:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li><strong>On Desktop (Chrome, Edge, Firefox):</strong> Right-click anywhere on the page and select "Translate" or "Translate to [Your Language]".</li>
            <li><strong>On iPhone/iPad (Safari):</strong> Tap the "aA" icon in the address bar and choose "Translate to [Your Language]".</li>
            <li><strong>On Android (Chrome):</strong> A translation bar should appear at the bottom of the screen. If not, tap the three-dot menu and select "Translate...".</li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Note: Translations are provided by your browser and may not be perfectly accurate.
          </p>
        </div>
        
        {/* Fallback Location Settings */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">Fallback Location</h2>
          <p className="text-gray-400 text-sm mb-4">
            This location will be used for area scans if the app cannot access your device's GPS.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-300">City</label>
              <input type="text" id="city" name="city" value={location.city} onChange={handleLocationChange} className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div>
              <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-300">State</label>
              <input type="text" id="state" name="state" value={location.state} onChange={handleLocationChange} className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-300">Zip Code</label>
              <input type="text" id="zip" name="zip" value={location.zip} onChange={handleLocationChange} inputMode="numeric" className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
          </div>
        </div>

        {/* Gemini AI Settings */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">AI Configuration (Optional)</h2>
          <p className="text-gray-400 text-sm mb-4">
            AI-powered features like area scanning require a free Gemini API key from Google. This is optional, but enhances the app's capabilities. Your key is stored securely on your device and is never shared.
          </p>
          
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 mb-6">
            <h3 className="font-semibold text-blue-300 mb-2">How to get your free API Key:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
              <li>
                Go to the{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
                  Google AI Studio
                </a>.
              </li>
              <li>Sign in with your Google account.</li>
              <li>Click "Create API key in new project".</li>
              <li>Copy the long string of letters and numbers that appears.</li>
              <li>Paste it into the field below and click "Save Settings" at the bottom of this page.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="gemini-api-key" className="block text-sm font-medium text-gray-300 mb-1">
                Your Gemini API Key
              </label>
              <input
                type="password"
                id="gemini-api-key"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                placeholder="Paste your API key here"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-2 text-xs text-gray-500">
                🔒 Your API key is stored securely in your browser's local storage only. It never leaves your device and cannot be accessed by anyone else, including the app developers.
              </p>
            </div>
            <div>
              <label htmlFor="gemini-model" className="block text-sm font-medium text-gray-300 mb-1">
                AI Model
              </label>
              <select
                id="gemini-model"
                value={geminiModel}
                onChange={(e) => setGeminiModel(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableModels.map(model => (
                  <option key={model.value} value={model.value}>{model.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Settings */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">Emergency Contacts</h2>
          <p className="text-gray-400 text-sm mb-4">
            These contacts will be notified when you activate the emergency broadcast.
          </p>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
                <input type="text" placeholder="Name" value={contact.name} onChange={e => handleContactChange(index, 'name', e.target.value)} className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                <input type="tel" placeholder="Phone Number" value={contact.phone} onChange={e => handleContactChange(index, 'phone', e.target.value)} className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                <button type="button" onClick={() => removeContact(index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-gray-700 flex-shrink-0" aria-label="Remove contact">
                  <TrashIcon className="w-6 h-6"/>
                </button>
              </div>
            ))}
            {contacts.length < 5 && (
              <button type="button" onClick={addContact} className="w-full text-blue-400 hover:text-blue-300 border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg p-3 transition-colors">
                + Add Contact
              </button>
            )}
          </div>
        </div>
        
        {/* About/GitHub Link */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">About</h2>
          <p className="text-gray-400 text-sm mb-4">
            Firewatch is an open-source project. You can find the source code on GitHub.
          </p>
          <div className="space-y-3">
          <a 
            href="https://github.com/severian42/Firewatch"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
          >
            <GithubIcon className="w-5 h-5" />
            Firewatch GitHub Repository
          </a>
            <div className="text-gray-500 text-sm">
              <p>
                Developed with AI assistance by{' '}
                <a 
                  href="https://www.interwoven-arkitech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Interwoven Arkitech
                </a>
                {' '}— Custom AI solutions for modern development challenges.
              </p>
            </div>
          </div>
        </div>
        
        {/* Privacy & Security Disclaimers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Privacy & Security</h2>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="font-medium text-blue-900 mb-2">🔒 Your Data Stays Private</h3>
              <ul className="space-y-1 text-blue-800">
                <li>• All API keys are stored locally in your browser's storage only</li>
                <li>• No data is sent to external servers except your direct API calls to Google</li>
                <li>• App developers cannot access your API key or any personal information</li>
                <li>• All recordings and evidence remain on your device unless you choose to share them</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
           <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
            Save Settings
          </button>
          {savedMessage && <p className="text-green-400 transition-opacity duration-300">{savedMessage}</p>}
        </div>
      </form>

      {/* Ko-fi support button */}
      <div className="flex justify-center mt-10">
        <a href="https://ko-fi.com/N4N4XZ2TZ" target="_blank" rel="noopener noreferrer">
          <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Support me on Ko-fi" />
        </a>
      </div>
    </div>
  );
};

export default SettingsScreen;
