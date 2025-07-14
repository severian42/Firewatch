
import React, { useState, useEffect } from 'react';
import type { Evidence } from '../types';
import { VideoCameraIcon, MicrophoneIcon, CameraIcon, TrashIcon, PencilSquareIcon } from './Icons';

interface EvidenceDetailModalProps {
  evidence: Evidence;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: { incidentType: string; notes?: string }) => void;
}

const EvidenceDetailModal: React.FC<EvidenceDetailModalProps> = ({ evidence, onClose, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [incidentType, setIncidentType] = useState(evidence.incidentType);
  const [notes, setNotes] = useState(evidence.notes || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    // If the evidence prop changes (e.g., user selects a new item while modal is open)
    // reset the state of the modal.
    setIncidentType(evidence.incidentType);
    setNotes(evidence.notes || '');
    setIsEditing(false);
    setShowDeleteConfirm(false);
  }, [evidence]);

  const handleSave = () => {
    onUpdate(evidence.id, { incidentType, notes });
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setIncidentType(evidence.incidentType);
    setNotes(evidence.notes || '');
    setIsEditing(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(evidence.id);
    // onClose will be called by the parent component
  };

  const getIcon = (className: string) => {
    switch (evidence.mediaType) {
      case 'video': return <VideoCameraIcon className={className} />;
      case 'audio': return <MicrophoneIcon className={className} />;
      case 'photo': return <CameraIcon className={className} />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(undefined, {
      dateStyle: 'full',
      timeStyle: 'long'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-lg max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-blue-400">Evidence Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
            {getIcon("w-12 h-12 text-blue-300 flex-shrink-0")}
            <div>
              <p className="text-sm text-gray-400 capitalize">{evidence.mediaType} Recording</p>
              <p className="font-semibold text-gray-200">{formatDate(evidence.timestamp)}</p>
            </div>
          </div>
          
          <div className="bg-black/20 w-full aspect-video rounded-lg flex items-center justify-center text-gray-500">
             {getIcon("w-24 h-24")}
             <p className="absolute text-white/80 text-lg font-semibold">Media Preview Placeholder</p>
          </div>

          <div>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="incidentType" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    id="incidentType"
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Add any relevant details..."
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  ></textarea>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                    {incidentType}
                    <button onClick={() => setIsEditing(true)} className="text-blue-400 hover:text-blue-300" aria-label="Edit details">
                        <PencilSquareIcon className="w-5 h-5"/>
                    </button>
                  </h3>
                </div>
                {notes ? (
                  <p className="text-gray-300 whitespace-pre-wrap bg-gray-900/50 p-3 rounded-md">{notes}</p>
                ) : (
                  <p className="text-gray-500 italic">No notes added.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          {isEditing ? (
            <div className="flex justify-end gap-3">
              <button onClick={handleCancelEdit} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Changes</button>
            </div>
          ) : showDeleteConfirm ? (
            <div className="bg-red-900/50 border border-red-500 p-3 rounded-lg text-center">
                <p className="text-red-300 mb-3">Are you sure you want to permanently delete this item?</p>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg">Cancel</button>
                    <button onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg">Delete</button>
                </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold px-3 py-2 rounded-lg hover:bg-red-900/20 transition-colors">
                <TrashIcon />
                Delete Evidence
              </button>
              <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvidenceDetailModal;
