
import React, { useState } from 'react';
import type { Evidence } from '../types';
import { VideoCameraIcon, MicrophoneIcon, CameraIcon } from '../components/Icons';
import RecordingButton from '../components/RecordingButton';
import EvidenceListItem from '../components/EvidenceListItem';
import CameraView from '../components/CameraView';
import EvidenceDetailModal from '../components/EvidenceDetailModal';

type MediaType = 'video' | 'audio' | 'photo';

interface DocumentScreenProps {
  evidence: Evidence[];
  onAddEvidence: (newEvidence: Evidence) => void;
  onDeleteEvidence: (id: string) => void;
  onUpdateEvidence: (id: string, updates: Partial<Omit<Evidence, 'id'>>) => void;
}

const DocumentScreen: React.FC<DocumentScreenProps> = ({ evidence, onAddEvidence, onDeleteEvidence, onUpdateEvidence }) => {
  const [cameraState, setCameraState] = useState<{ isOpen: boolean; mediaType: MediaType | null }>({
    isOpen: false,
    mediaType: null,
  });
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);


  const handleRecord = (type: MediaType) => {
    setCameraState({ isOpen: true, mediaType: type });
  };
  
  const handleCloseCamera = () => {
    setCameraState({ isOpen: false, mediaType: null });
  };

  const handleSaveEvidence = (newEvidence: Evidence) => {
    onAddEvidence(newEvidence);
    handleCloseCamera();
  };

  const handleDelete = (id: string) => {
    onDeleteEvidence(id);
    setSelectedEvidence(null);
  };

  return (
    <>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">Document</h1>
          <p className="mt-1 text-gray-400">Securely record evidence and manage your case files.</p>
        </div>

        {/* Recording Action Buttons */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-blue-400 mb-4">Start Recording</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <RecordingButton 
              icon={<VideoCameraIcon className="w-10 h-10 mx-auto" />} 
              label="Record Video"
              onClick={() => handleRecord('video')} 
            />
            <RecordingButton 
              icon={<MicrophoneIcon className="w-10 h-10 mx-auto" />} 
              label="Record Audio"
              onClick={() => handleRecord('audio')} 
            />
            <RecordingButton 
              icon={<CameraIcon className="w-10 h-10 mx-auto" />} 
              label="Take Photo"
              onClick={() => handleRecord('photo')} 
            />
          </div>
        </div>

        {/* Recent Evidence List */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-blue-400 mb-4">Recent Evidence</h2>
          {evidence.length > 0 ? (
            <ul className="space-y-3">
              {evidence.map((item) => (
                <EvidenceListItem 
                  key={item.id} 
                  evidence={item} 
                  onSelect={() => setSelectedEvidence(item)}
                />
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No evidence recorded yet.</p>
              <p className="text-sm">Your recordings will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {cameraState.isOpen && cameraState.mediaType && (
        <CameraView 
          mediaType={cameraState.mediaType}
          onClose={handleCloseCamera}
          onSave={handleSaveEvidence}
        />
      )}

      {selectedEvidence && (
        <EvidenceDetailModal 
          evidence={selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
          onDelete={handleDelete}
          onUpdate={onUpdateEvidence}
        />
      )}
    </>
  );
};

export default DocumentScreen;
