
import React, { useState, useCallback } from 'react';
import { KEY_PHRASES, INCIDENT_CHECKLIST_ITEMS } from '../constants';
import { getRecordingLaw, explainLegalTerm } from '../services/geminiService';
import type { RecordingLawResult, JargonBusterResult, ChecklistItem } from '../types';
import { ChatBubbleBottomCenterTextIcon, ClipboardDocumentListIcon, BookOpenIcon, MapIcon, CheckBadgeIcon, ShieldExclamationIcon } from './Icons';
import Spinner from './Spinner';

const ChecklistModal: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const [items, setItems] = useState<ChecklistItem[]>(INCIDENT_CHECKLIST_ITEMS);

    const toggleItem = (index: number) => {
        const newItems = [...items];
        newItems[index].completed = !newItems[index].completed;
        setItems(newItems);
    };

    return (
        <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-blue-400 mb-4">Incident Checklist</h2>
                <div className="flex-1 overflow-y-auto pr-2">
                    <ul className="space-y-3">
                        {items.map((item, index) => (
                            <li key={index} onClick={() => toggleItem(index)} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                                <div className={`w-6 h-6 rounded-full border-2 ${item.completed ? 'border-green-400 bg-green-400' : 'border-gray-500'} flex items-center justify-center flex-shrink-0`}>
                                    {item.completed && <svg className="w-4 h-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                                </div>
                                <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={onClose} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Close
                </button>
            </div>
        </div>
    );
};

const EmergencyResourcesModal: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const emergencyNumbers = [
        { name: "Emergency Services", number: "911" },
        { name: "ACLU National", number: "1-212-549-2500" },
        { name: "National Lawyers Guild", number: "1-212-679-5100" },
        { name: "Immigration Hotline", number: "1-844-363-1423" },
        { name: "Bail Fund Network", number: "1-800-898-0692" }
    ];

    return (
        <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-red-400 mb-4">Emergency Resources</h2>
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-blue-400 mb-2">Quick Actions</h3>
                            <button 
                                onClick={() => window.open('tel:911')}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg mb-2"
                            >
                                🚨 Call 911
                            </button>
                            <button 
                                onClick={() => window.open('sms:?&body=Emergency! I need help. My location: [GPS will be attached]')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
                            >
                                📱 Text Emergency Contacts
                            </button>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-blue-400 mb-2">Legal Hotlines</h3>
                            {emergencyNumbers.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg mb-2">
                                    <div>
                                        <p className="font-semibold text-white">{item.name}</p>
                                        <p className="text-sm text-gray-300">{item.number}</p>
                                    </div>
                                    <button 
                                        onClick={() => window.open(`tel:${item.number}`)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Call
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-blue-400 mb-2">Your Rights Card</h3>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <p className="text-sm text-gray-200 mb-2">📋 Keep this info ready:</p>
                                <ul className="text-xs text-gray-300 space-y-1">
                                    <li>• Right to remain silent</li>
                                    <li>• Right to refuse searches</li>
                                    <li>• Right to attorney</li>
                                    <li>• Right to record police</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="mt-6 w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg">
                    Close
                </button>
            </div>
        </div>
    );
};

const DashboardToolkit: React.FC = () => {
    const [activePhraseIndex, setActivePhraseIndex] = useState(0);
    const [copySuccess, setCopySuccess] = useState('');

    const [stateInput, setStateInput] = useState('');
    const [lawResult, setLawResult] = useState<RecordingLawResult | null>(null);
    const [isScanningLaw, setIsScanningLaw] = useState(false);
    const [lawError, setLawError] = useState<string | null>(null);

    const [isChecklistVisible, setIsChecklistVisible] = useState(false);
    
    const [termInput, setTermInput] = useState('');
    const [jargonResult, setJargonResult] = useState<JargonBusterResult | null>(null);
    const [isBusting, setIsBusting] = useState(false);
    const [jargonError, setJargonError] = useState<string | null>(null);
    
    const handleNextPhrase = useCallback(() => {
        setActivePhraseIndex(prev => (prev + 1) % KEY_PHRASES.length);
    }, []);

    const handleCopyPhrase = useCallback(() => {
        navigator.clipboard.writeText(KEY_PHRASES[activePhraseIndex]).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed to copy');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    }, [activePhraseIndex]);
    
    const handleScanLaw = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stateInput.trim()) {
            setLawError("Please enter a state name.");
            return;
        }
        setIsScanningLaw(true);
        setLawError(null);
        setLawResult(null);
        const result = await getRecordingLaw(stateInput.trim());
        if (result) {
            setLawResult(result);
        } else {
            setLawError("Could not retrieve data. Please try again.");
        }
        setIsScanningLaw(false);
    }, [stateInput]);

    const handleBustJargon = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!termInput.trim()) {
            setJargonError("Please enter a legal term.");
            return;
        }
        setIsBusting(true);
        setJargonError(null);
        setJargonResult(null);
        const result = await explainLegalTerm(termInput.trim());
        if (result) {
            setJargonResult(result);
        } else {
            setJargonError("Could not define this term. Please try another.");
        }
        setIsBusting(false);
    }, [termInput]);

    const [isEmergencyResourcesVisible, setIsEmergencyResourcesVisible] = useState(false);

    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            {isChecklistVisible && <ChecklistModal onClose={() => setIsChecklistVisible(false)} />}
            {isEmergencyResourcesVisible && <EmergencyResourcesModal onClose={() => setIsEmergencyResourcesVisible(false)} />}
            <h2 className="text-lg font-semibold text-purple-400 mb-4">Dashboard Toolkit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Know Your Script */}
                <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col h-56">
                    <div className="flex items-center gap-3 text-purple-300 mb-3">
                        <ChatBubbleBottomCenterTextIcon className="w-7 h-7" />
                        <h3 className="font-bold">Know Your Script</h3>
                    </div>
                    <p className="flex-1 text-gray-200 text-lg font-medium italic text-center flex items-center justify-center">"{KEY_PHRASES[activePhraseIndex]}"</p>
                    <div className="flex gap-2 mt-3">
                        <button onClick={handleNextPhrase} className="flex-1 bg-gray-600 hover:bg-gray-500 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors">Next Phrase</button>
                        <button onClick={handleCopyPhrase} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors relative">
                            {copySuccess ? <span className="text-green-300">{copySuccess}</span> : "Copy Script"}
                        </button>
                    </div>
                </div>

                {/* State Recording Law */}
                <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col h-56">
                    <div className="flex items-center gap-3 text-purple-300 mb-3">
                        <MapIcon className="w-7 h-7" />
                        <h3 className="font-bold">State Recording Law</h3>
                    </div>
                    {isScanningLaw ? <Spinner/> : (
                        lawResult ? (
                            <div className="text-center flex-1 flex flex-col justify-center items-center">
                                <p className="text-2xl font-bold text-green-400">{lawResult.consentType} Consent</p>
                                <p className="text-sm text-gray-300 mt-2">{lawResult.summary}</p>
                                <p className="text-xs text-gray-500 mt-3 italic">{lawResult.disclaimer}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleScanLaw} className="flex-1 flex flex-col justify-center gap-2">
                                <input type="text" value={stateInput} onChange={e => setStateInput(e.target.value)} placeholder="Enter State (e.g., California)" className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500" />
                                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Check Law</button>
                                {lawError && <p className="text-red-400 text-xs text-center mt-1">{lawError}</p>}
                            </form>
                        )
                    )}
                </div>

                {/* Incident Checklist */}
                <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col h-56 justify-between cursor-pointer hover:bg-gray-700/80 transition-colors" onClick={() => setIsChecklistVisible(true)}>
                    <div>
                        <div className="flex items-center gap-3 text-purple-300 mb-3">
                            <ClipboardDocumentListIcon className="w-7 h-7" />
                            <h3 className="font-bold">Incident Checklist</h3>
                        </div>
                        <p className="text-sm text-gray-300">Key details to document during an encounter. Tap to view and track.</p>
                    </div>
                    <div className="text-center mt-4">
                        <span className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                            View Checklist
                        </span>
                    </div>
                </div>

                {/* Legal Jargon Buster */}
                <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col h-56">
                    <div className="flex items-center gap-3 text-purple-300 mb-3">
                        <BookOpenIcon className="w-7 h-7" />
                        <h3 className="font-bold">Legal Jargon Buster</h3>
                    </div>
                     {isBusting ? <Spinner/> : (
                         jargonResult ? (
                            <div className="text-center flex-1 flex flex-col justify-center">
                               <p className="font-bold text-lg text-green-400">{jargonResult.term}</p>
                               <p className="text-sm text-gray-300 mt-2">{jargonResult.explanation}</p>
                               <button onClick={() => setJargonResult(null)} className="text-blue-400 text-xs mt-3 hover:underline">Define another term</button>
                            </div>
                         ) : (
                            <form onSubmit={handleBustJargon} className="flex-1 flex flex-col justify-center gap-2">
                                <input type="text" value={termInput} onChange={e => setTermInput(e.target.value)} placeholder="e.g., Probable Cause" className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500" />
                                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Define Term</button>
                                {jargonError && <p className="text-red-400 text-xs text-center mt-1">{jargonError}</p>}
                            </form>
                         )
                     )}
                </div>

                {/* Emergency Resources */}
                <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col h-56 justify-between cursor-pointer hover:bg-gray-700/80 transition-colors" onClick={() => setIsEmergencyResourcesVisible(true)}>
                    <div>
                        <div className="flex items-center gap-3 text-red-300 mb-3">
                            <ShieldExclamationIcon className="w-7 h-7" />
                            <h3 className="font-bold">Emergency Resources</h3>
                        </div>
                        <p className="text-sm text-gray-300">Quick access to legal hotlines, emergency contacts, and your rights.</p>
                    </div>
                    <div className="text-center mt-4">
                        <span className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                            Get Help Now
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardToolkit;
