import React, { useState, useEffect, useRef } from 'react';
import type { Evidence } from '../types';
import { CameraIcon, MicrophoneIcon, VideoCameraIcon } from './Icons';

type MediaType = 'video' | 'audio' | 'photo';

interface CameraViewProps {
  mediaType: MediaType;
  onClose: () => void;
  onSave: (evidence: Evidence) => void;
  autoStart?: boolean;
}

const CameraView: React.FC<CameraViewProps> = ({ mediaType, onClose, onSave, autoStart = false }) => {
  const [isRecording, setIsRecording] = useState(autoStart && (mediaType === 'audio' || mediaType === 'video'));
  const [showPreview, setShowPreview] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  const handleCapture = () => {
    if (mediaType === 'video' || mediaType === 'audio') {
      if (isRecording) {
        setIsRecording(false);
        setShowPreview(true);
      } else {
        setElapsedTime(0);
        setIsRecording(true);
      }
    } else { // photo
      setShowPreview(true);
    }
  };

  const handleSave = () => {
    const incidentTypeMap = {
      'video': 'Video Evidence',
      'audio': 'Audio Evidence',
      'photo': 'Photo Evidence'
    };
    const newEvidence: Evidence = {
      id: new Date().toISOString(),
      mediaType,
      timestamp: new Date().toISOString(),
      incidentType: autoStart ? 'Emergency Audio Recording' : incidentTypeMap[mediaType],
      notes: '', // Add empty notes field
    };
    onSave(newEvidence);
  };

  const handleDiscard = () => {
    setShowPreview(false);
    setElapsedTime(0);
    if (autoStart) {
        onClose();
    } else {
        setIsRecording(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const CaptureControls = () => (
    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 flex justify-around items-center">
      <button onClick={onClose} className="text-white text-lg font-semibold px-4 py-2 rounded-lg hover:bg-white/10">Cancel</button>
      <button 
        onClick={handleCapture} 
        className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-colors"
        aria-label={isRecording ? 'Stop recording' : `Capture ${mediaType}`}
      >
        {(mediaType === 'video' || mediaType === 'audio') && isRecording ? 
          <div className="w-8 h-8 bg-red-500 rounded-md"></div> :
          <div className="w-16 h-16 bg-white rounded-full transition-transform active:scale-90"></div>
        }
      </button>
      <div className="w-24"> {/* Spacer */} </div>
    </div>
  );
  
  const PreviewControls = () => (
     <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 flex justify-around items-center">
        <button onClick={handleDiscard} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">Discard</button>
        <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg transition-colors">Save</button>
    </div>
  );

  const MainContent = () => {
      if(showPreview) {
          return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-black">
                <p className="text-2xl text-white font-semibold">Preview</p>
                <div className="my-6 text-gray-300">
                 {mediaType === 'video' && <VideoCameraIcon className="w-24 h-24" />}
                 {mediaType === 'photo' && <CameraIcon className="w-24 h-24" />}
                 {mediaType === 'audio' && <MicrophoneIcon className="w-24 h-24" />}
                </div>
                { (mediaType === 'video' || mediaType === 'audio') &&
                  <p className="text-white text-lg">{`Duration: ${formatTime(elapsedTime)}`}</p>
                }
            </div>
          );
      }
      
      if (mediaType === 'audio') {
          return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
                <MicrophoneIcon className={`w-32 h-32 text-blue-400 ${isRecording ? 'animate-pulse' : ''}`} />
                {isRecording && <p className="text-white text-4xl font-mono mt-8">{formatTime(elapsedTime)}</p>}
                <p className="text-gray-300 mt-4 text-xl">
                    {isRecording ? 'Recording Audio...' : 'Ready to record audio'}
                </p>
            </div>
          )
      }

      return (
        <div className="w-full h-full flex items-center justify-center bg-black text-white text-2xl">
           <p className="opacity-50">Camera Feed Placeholder</p>
           {isRecording &&
            <div className="absolute top-4 left-4 bg-red-600/80 text-white px-3 py-1 rounded-lg flex items-center gap-2 backdrop-blur-sm">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="font-mono">{formatTime(elapsedTime)}</span>
            </div>
           }
        </div>
      )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col" role="dialog" aria-modal="true">
      <div className="flex-1 relative">
        <MainContent />
      </div>
      {showPreview ? <PreviewControls/> : <CaptureControls/>}
    </div>
  );
};

export default CameraView;