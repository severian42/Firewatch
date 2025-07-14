
import React, { useState, useCallback, useEffect } from 'react';
import { scanForLocalAlerts } from '../services/geminiService';
import type { ScanResult, Location } from '../types';
import { useUserSettings } from '../hooks/useUserSettings';
import Spinner from './Spinner';
import { MagnifyingGlassIcon, LinkIcon } from './Icons';

const LocationScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  
  const { settings } = useUserSettings();
  const [manualLocation, setManualLocation] = useState(settings.fallbackLocation);
  
  useEffect(() => {
    setManualLocation(settings.fallbackLocation);
  }, [settings.fallbackLocation]);

  const performScan = useCallback(async (location: Location | string, isFallback: boolean = false) => {
    setIsScanning(true);
    setError(null);
    setScanResult(null);
    
    if (isFallback) {
        const { city, state, zip } = settings.fallbackLocation;
        const locationString = `${city} ${state} ${zip}`.trim();
        setError(`Could not determine your current location. Using your saved fallback location to scan: ${locationString}`);
    }

    try {
      const result = await scanForLocalAlerts(location);
      if (result) {
        setScanResult(result);
      } else {
        setError(prev => (prev ? prev + "\n" : "") + 'The scan returned no results. This may be an issue with the AI service.');
      }
    } catch (e: any) {
      setError(prev => (prev ? prev + "\n" : "") + (e.message || 'An unknown error occurred during the scan.'));
    } finally {
      setIsScanning(false);
    }
  }, [settings.fallbackLocation]);

  const handleGeoScan = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setShowManualInput(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        performScan(location);
      },
      () => {
        const { city, state, zip } = settings.fallbackLocation;
        const fallbackString = `${city} ${state} ${zip}`.trim();
        if (fallbackString) {
          performScan(fallbackString, true);
        } else {
          setError("Location permission denied. Please enable location access, or pre-configure a fallback location in Settings to use this feature.");
        }
        setShowManualInput(true);
      }
    );
  }, [performScan, settings.fallbackLocation]);
  
  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManualLocation(prev => ({ ...prev, [name]: value }));
  };

  const handleManualScan = (e: React.FormEvent) => {
    e.preventDefault();
    const { city, state, zip } = manualLocation;
    if (!city.trim() && !zip.trim()) {
      setError('Please provide at least a City or Zip Code to scan.');
      return;
    }
    
    const locationString = `${city} ${state} ${zip}`.trim();
    performScan(locationString);
  };

  const scanButtonText = showManualInput ? 'Scan With My Location Instead' : 'Scan My Area';

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-blue-400 mb-3">Live Area Scan</h2>
      <p className="text-gray-400 text-sm mb-4">
        {showManualInput 
         ? 'Enter a location to search for recent civil rights related events and alerts.'
         : 'Use our AI-powered scanner to search for recent civil rights related events in your vicinity.'
        }
      </p>
      
      {!isScanning && (
        <button
          onClick={handleGeoScan}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ease-in-out transform hover:scale-105"
          aria-label="Scan My Area"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
          {scanButtonText}
        </button>
      )}

      {!showManualInput && !isScanning && (
          <button onClick={() => setShowManualInput(true)} className="w-full text-center text-sm text-blue-400 hover:text-blue-300 mt-3">
              or scan a different location
          </button>
      )}


      {isScanning && <Spinner />}
      
      {error && (
        <div className="mt-4 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg whitespace-pre-wrap" role="alert">
          <p className="font-bold">Scan Notice</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {showManualInput && !isScanning && (
        <form onSubmit={handleManualScan} className="mt-4 space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <input
              type="text"
              name="city"
              value={manualLocation.city}
              onChange={handleManualInputChange}
              placeholder="City"
              aria-label="City"
              className="sm:col-span-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <input
              type="text"
              name="state"
              value={manualLocation.state}
              onChange={handleManualInputChange}
              placeholder="State"
              aria-label="State"
              maxLength={20}
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <input
              type="text"
              name="zip"
              value={manualLocation.zip}
              onChange={handleManualInputChange}
              placeholder="Zip Code"
              aria-label="Zip Code"
              inputMode="numeric"
              pattern="[\d\s-]*"
              className="sm:col-span-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
           <button
             type="submit"
             className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
             aria-label="Scan This Location"
           >
             <MagnifyingGlassIcon className="w-6 h-6" />
             Scan This Location
           </button>
           <style>{`
             @keyframes fade-in {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
             }
             .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
           `}</style>
        </form>
      )}

      {scanResult && (
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Scan Summary</h3>
            <div className="text-gray-300 bg-gray-900/50 p-4 rounded-lg whitespace-pre-wrap font-sans">{scanResult.text}</div>
          </div>
          {scanResult.sources && scanResult.sources.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Sources</h3>
              <ul className="space-y-2">
                {scanResult.sources.map((source, index) => (
                  <li key={index} className="bg-gray-700 hover:bg-gray-600/70 p-3 rounded-lg transition-colors">
                    <a
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-blue-300 hover:text-blue-200"
                    >
                      <LinkIcon className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate" title={source.title}>{source.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationScanner;
