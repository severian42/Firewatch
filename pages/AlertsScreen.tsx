import React, { useState } from 'react';
import {
  ClipboardDocumentListIcon,
  MapPinIcon,
  UsersIcon,
  PhoneIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  LinkIcon,
} from '../components/Icons';
import type { ChecklistItem } from '../types';
import Spinner from '../components/Spinner';

/* ---------------------------------- Types --------------------------------- */
interface IncidentForm {
  location: string;
  agentCount: string;
  vehicles: string;
  description: string;
}

/* --------------------------- Static Data / Hotlines ----------------------- */
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

/* ------------------------------- Component -------------------------------- */
const AlertsScreen: React.FC = () => {
  /* Checklist state */
  const [items, setItems] = useState<ChecklistItem[]>(WITNESS_CHECKLIST);
  const toggleItem = (idx: number) => {
    const updated = [...items];
    updated[idx].completed = !updated[idx].completed;
    setItems(updated);
  };

  /* Incident report generator state */
  const [form, setForm] = useState<IncidentForm>({
    location: '',
    agentCount: '',
    vehicles: '',
    description: '',
  });
  const [reportText, setReportText] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    const timestamp = new Date().toLocaleString();
    const template = `ICE INCIDENT REPORT\n\nDate/Time: ${timestamp}\nLocation: ${form.location}\nNumber of Agents: ${form.agentCount}\nVehicles: ${form.vehicles}\n\nDescription:\n${form.description}\n\nRecorded with Firewatch – Stay safe & know your rights.`;
    setReportText(template);
    navigator.clipboard.writeText(template).catch(() => {/* ignore */});
    setGenerating(false);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 text-red-400"><ExclamationTriangleIcon /></span>
        <h1 className="text-3xl font-bold text-red-300">Witness Assist</h1>
      </div>
      <p className="text-gray-300 max-w-2xl">
        Tools for bystanders to safely document and report ICE raids or kidnappings in real-time.
        Always keep a safe distance and never interfere with enforcement actions.
      </p>

      {/* Checklist Section */}
      <section className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardDocumentListIcon className="w-6 h-6 text-purple-300" />
          <h2 className="text-xl font-semibold text-purple-300">Real-Time Witness Checklist</h2>
        </div>
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                item.completed ? 'bg-gray-700 line-through text-gray-500' : 'bg-gray-700/50 hover:bg-gray-600'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  item.completed ? 'border-green-400 bg-green-400' : 'border-gray-500'
                }`}
              >
                {item.completed && <CheckBadgeIcon />}
              </span>
              <span className="flex-1 text-sm">{item.text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Incident Report Generator */}
      <section className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 text-blue-300"><MapPinIcon /></span>
          <h2 className="text-xl font-semibold text-blue-300">Generate Incident Report</h2>
        </div>
        <form onSubmit={handleGenerateReport} className="space-y-4">
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleFormChange}
            placeholder="Location (Street, City, State)"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="agentCount"
            value={form.agentCount}
            onChange={handleFormChange}
            placeholder="Number of Agents (approx.)"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            name="vehicles"
            value={form.vehicles}
            onChange={handleFormChange}
            placeholder="Vehicles (type / license plates)"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleFormChange}
            rows={4}
            placeholder="Brief description of what you witnessed..."
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {generating ? <Spinner /> : 'Copy Report to Clipboard'}
          </button>
        </form>

        {reportText && (
          <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700 space-y-2">
            <p className="text-sm text-gray-400">Report copied to clipboard! You can paste it into an email, text message, or legal intake form.</p>
            <pre className="whitespace-pre-wrap text-xs text-gray-300 font-mono">{reportText}</pre>
          </div>
        )}
      </section>

      {/* Hotlines */}
      <section className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 text-green-300"><UsersIcon /></span>
          <h2 className="text-xl font-semibold text-green-300">Rapid-Call Hotlines</h2>
        </div>
        <ul className="space-y-3">
          {HOTLINES.map(h => (
            <li key={h.number} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
              <div>
                <p className="font-semibold text-white">{h.name}</p>
                <p className="text-sm text-gray-300">{h.number}</p>
              </div>
              <a
                href={`tel:${h.number}`}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              >
                <PhoneIcon className="w-4 h-4" /> Call
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-4 flex items-center gap-1">
          <LinkIcon />
          These hotlines are operated by trusted legal organizations. Your call will not be recorded by Firewatch.
        </p>
      </section>

      {/* 911 Call Guidance */}
      <section className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 text-red-300"><PhoneIcon /></span>
          <h2 className="text-xl font-semibold text-red-300">Emergency 911 Call Guidance</h2>
        </div>
        <p className="text-sm text-gray-300 mb-4">
          If you believe someone is being abducted by unidentified individuals, you have the right to call <strong>911</strong> and request a local police response. Clearly state what you are seeing. The script below can help you stay calm and concise:
        </p>
        <textarea
          readOnly
          value={`Hello, my name is [YOUR NAME]. I am calling from ${form.location || '[LOCATION]'}.
I am witnessing what appears to be a kidnapping. Several armed individuals with no visible identification are detaining someone against their will.
They claim to be ICE but have not shown valid badges. Please send local police to investigate and ensure everyone's safety.`}
          rows={5}
          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 text-sm mb-3"
        />
        <div className="flex gap-3">
          <button
            onClick={() => navigator.clipboard.writeText(`Hello, my name is [YOUR NAME]. I am calling from ${form.location || '[LOCATION]'}.
I am witnessing what appears to be a kidnapping. Several armed individuals with no visible identification are detaining someone against their will.
They claim to be ICE but have not shown valid badges. Please send local police to investigate and ensure everyone's safety.`)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
          >
            Copy Script
          </button>
          <a
            href="tel:911"
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-center text-sm"
          >
            Call 911 Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default AlertsScreen; 