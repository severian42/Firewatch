import React, { useState } from 'react';
import type { Evidence, ChecklistItem } from '../types';
import RecordingButton from '../components/RecordingButton';
import EvidenceListItem from '../components/EvidenceListItem';
import CameraView from '../components/CameraView';
import EvidenceDetailModal from '../components/EvidenceDetailModal';
import {
  VideoCameraIcon,
  MicrophoneIcon,
  CameraIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
  UsersIcon,
  PhoneIcon,
  CheckBadgeIcon,
  LinkIcon,
  ExclamationTriangleIcon,
} from '../components/Icons';
import Spinner from '../components/Spinner';

/* ---------------------- Witness Assist static data ----------------------- */
const WITNESS_CHECKLIST: ChecklistItem[] = [
  { text: 'Move to a safe vantage point – do not interfere.', completed: false },
  { text: 'Start recording (video/audio) if safe to do so.', completed: false },
  { text: 'Note the date, time, and exact location.', completed: false },
  { text: 'Count ICE agents & note any visible ID numbers.', completed: false },
  { text: 'Record vehicle make, model, color, and license plates.', completed: false },
  { text: 'Document treatment of individuals (names if possible).', completed: false },
  { text: 'Afterwards, store evidence securely in Firewatch.', completed: false },
];
const HOTLINES = [
  { name: 'Immigration Emergency Hotline', number: '1-844-363-1423' },
  { name: 'ACLU National Hotline', number: '1-212-549-2500' },
  { name: 'National Lawyers Guild', number: '1-212-679-5100' },
];

/* ------------------------- Types for local state ------------------------- */
interface IncidentForm {
  location: string;
  agentCount: string;
  vehicles: string;
  description: string;
}

type MediaType = 'video' | 'audio' | 'photo';

interface ActScreenProps {
  evidence: Evidence[];
  onAddEvidence: (e: Evidence) => void;
  onDeleteEvidence: (id: string) => void;
  onUpdateEvidence: (id: string, updates: Partial<Omit<Evidence,'id'>>) => void;
}

const ActScreen: React.FC<ActScreenProps> = ({ evidence, onAddEvidence, onDeleteEvidence, onUpdateEvidence }) => {
  /* -------------- Recording / documentation state (from Document) -------- */
  const [cameraState, setCameraState] = useState<{ isOpen: boolean; mediaType: MediaType | null }>({ isOpen: false, mediaType: null });
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const handleRecord = (type: MediaType) => setCameraState({ isOpen: true, mediaType: type });
  const handleCloseCamera = () => setCameraState({ isOpen: false, mediaType: null });
  const handleSaveEvidence = (e: Evidence) => { onAddEvidence(e); handleCloseCamera(); };
  const handleDeleteEvidence = (id: string) => { onDeleteEvidence(id); setSelectedEvidence(null); };

  /* ---------------- Witness checklist state ----------------------------- */
  const [checklist, setChecklist] = useState<ChecklistItem[]>(WITNESS_CHECKLIST);
  const toggleChecklist = (i:number)=>{ const upd=[...checklist]; upd[i].completed=!upd[i].completed; setChecklist(upd); };

  /* ------------- Incident report generator ------------------------------ */
  const [form,setForm]=useState<IncidentForm>({location:'',agentCount:'',vehicles:'',description:''});
  const handleFormChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{const {name,value}=e.target; setForm(p=>({...p,[name]:value}));};
  const [reportText,setReportText]=useState(''); const [generating,setGenerating]=useState(false);
  const generateReport=(e:React.FormEvent)=>{e.preventDefault(); setGenerating(true); const ts=new Date().toLocaleString(); const t=`ICE INCIDENT REPORT\n\nDate/Time: ${ts}\nLocation: ${form.location}\nNumber of Agents: ${form.agentCount}\nVehicles: ${form.vehicles}\n\nDescription:\n${form.description}\n\nRecorded with Firewatch – Stay safe & know your rights.`; setReportText(t); navigator.clipboard.writeText(t).catch(()=>{}); setGenerating(false); };

  /* ------------- Recording guidance component --------------------------- */
  const RecordingGuidance: React.FC<{type: MediaType}> = ({ type }) => {
    const info = {
      video: { title:'Video Recording Rights', tips:['You can record police in public spaces','Keep a safe distance','Don\'t interfere with police duties','Announce you\'re recording for safety','Save to cloud immediately if possible'], legal:'Recording police is protected by First Amendment in public spaces'},
      audio: { title:'Audio Recording Laws', tips:['Check your state\'s consent laws','One-party consent: You can record if you\'re part of conversation','Two-party consent: All parties must agree','Be aware of federal vs state laws'], legal:'Laws vary by state - use the toolkit to check your state\'s rules'},
      photo: { title:'Photography Rights', tips:['You can photograph anything visible from public space','Police can\'t demand to see your photos without warrant','Private property owners can set rules','Be respectful but know your rights'], legal:'Photography in public is protected First Amendment activity'}
    } as const;
    const d=info[type];
    return (<div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4 mb-4"><h4 className="text-blue-400 font-bold mb-2">{d.title}</h4><ul className="text-sm text-gray-300 space-y-1">{d.tips.map((t,i)=><li key={i} className="flex items-start"><span className="text-blue-400 mr-2">💡</span>{t}</li>)}</ul><p className="text-xs text-blue-300 mt-2 italic">{d.legal}</p></div>);
  };

  return (
    <div className="space-y-10">
      {/* ===================== Recording / Evidence ===================== */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold text-blue-300 mb-4">Record & Document Evidence</h2>
        <RecordingGuidance type="video" />
        <RecordingGuidance type="audio" />
        <RecordingGuidance type="photo" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <RecordingButton icon={<VideoCameraIcon className="w-10 h-10 mx-auto" />} label="Record Video" onClick={()=>handleRecord('video')} />
          <RecordingButton icon={<MicrophoneIcon className="w-10 h-10 mx-auto" />} label="Record Audio" onClick={()=>handleRecord('audio')} />
          <RecordingButton icon={<CameraIcon className="w-10 h-10 mx-auto" />} label="Take Photo" onClick={()=>handleRecord('photo')} />
        </div>
        {/* Evidence list */}
        <h3 className="text-lg font-semibold text-blue-300 mt-8 mb-3">Recent Evidence</h3>
        {evidence.length>0 ? <ul className="space-y-3">{evidence.map(ev=> <EvidenceListItem key={ev.id} evidence={ev} onSelect={()=>setSelectedEvidence(ev)} />)}</ul> : <p className="text-gray-500 text-center">No evidence yet.</p>}
      </div>

      {/* ===================== Witness Checklist ======================== */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4"><ClipboardDocumentListIcon className="w-6 h-6 text-purple-300" /><h2 className="text-xl font-semibold text-purple-300">Real-Time Witness Checklist</h2></div>
        <ul className="space-y-3">{checklist.map((it,i)=>(<li key={i} onClick={()=>toggleChecklist(i)} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${it.completed?'bg-gray-700 line-through text-gray-500':'bg-gray-700/50 hover:bg-gray-600'}`}><span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${it.completed?'border-green-400 bg-green-400':'border-gray-500'}`}>{it.completed && <CheckBadgeIcon />}</span><span className="flex-1 text-sm">{it.text}</span></li>))}</ul>
      </div>

      {/* ===================== Incident Report Generator ================ */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4"><span className="w-6 h-6 text-blue-300"><MapPinIcon /></span><h2 className="text-xl font-semibold text-blue-300">Generate Incident Report</h2></div>
        <form onSubmit={generateReport} className="space-y-4">
          <input name="location" value={form.location} onChange={handleFormChange} placeholder="Location (Street, City, State)" className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 text-sm" required/>
          <input name="agentCount" value={form.agentCount} onChange={handleFormChange} placeholder="Number of Agents" className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 text-sm"/>
          <input name="vehicles" value={form.vehicles} onChange={handleFormChange} placeholder="Vehicles (type / plates)" className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 text-sm"/>
          <textarea name="description" value={form.description} onChange={handleFormChange} rows={4} placeholder="Brief description..." className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 text-sm" required/>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">{generating?<Spinner/>:'Copy Report to Clipboard'}</button>
        </form>
        {reportText && (<div className="mt-4 bg-gray-900/50 p-4 rounded-lg border border-gray-700"><pre className="whitespace-pre-wrap text-xs text-gray-300 font-mono">{reportText}</pre></div>)}
      </div>

      {/* ===================== Hotlines & 911 Guidance ================= */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2"><span className="w-6 h-6 text-green-300"><UsersIcon /></span><h2 className="text-xl font-semibold text-green-300">Rapid-Call Hotlines</h2></div>
          <ul className="space-y-3">{HOTLINES.map(h=>(<li key={h.number} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg"><div><p className="font-semibold text-white">{h.name}</p><p className="text-sm text-gray-300">{h.number}</p></div><a href={`tel:${h.number}`} className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"><PhoneIcon className="w-4 h-4"/>Call</a></li>))}</ul>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><span className="w-6 h-6 text-red-300"><PhoneIcon /></span><h2 className="text-xl font-semibold text-red-300">Emergency 911 Call Guidance</h2></div>
          <textarea readOnly rows={5} value={`Hello, my name is [YOUR NAME]. I am calling from ${form.location||'[LOCATION]'}.\nI am witnessing what appears to be a kidnapping. Several armed individuals with no visible identification are detaining someone against their will.\nThey claim to be ICE but have not shown valid badges. Please send local police to investigate and ensure everyone's safety.`} className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 text-sm mb-3"/>
          <div className="flex gap-3"><button onClick={()=>navigator.clipboard.writeText(`Hello, my name is [YOUR NAME]. I am calling from ${form.location||'[LOCATION]'}.\nI am witnessing what appears to be a kidnapping. Several armed individuals with no visible identification are detaining someone against their will.\nThey claim to be ICE but have not shown valid badges. Please send local police to investigate and ensure everyone's safety.`)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm">Copy Script</button><a href="tel:911" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-center text-sm">Call 911 Now</a></div>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><LinkIcon /> Firewatch never records or stores your phone calls.</p>
        </div>
      </div>

      {/* Camera / Evidence modals */}
      {cameraState.isOpen && cameraState.mediaType && (
        <CameraView mediaType={cameraState.mediaType} onClose={handleCloseCamera} onSave={handleSaveEvidence} />
      )}
      {selectedEvidence && (<EvidenceDetailModal evidence={selectedEvidence} onClose={()=>setSelectedEvidence(null)} onDelete={handleDeleteEvidence} onUpdate={onUpdateEvidence} />)}
    </div>
  );
};

export default ActScreen; 