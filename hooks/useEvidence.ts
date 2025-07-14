
import { useState, useEffect, useCallback } from 'react';
import type { Evidence } from '../types';

const EVIDENCE_STORAGE_KEY = 'firewatch_evidence_list';

const getStoredEvidence = (): Evidence[] => {
    try {
        const stored = window.localStorage.getItem(EVIDENCE_STORAGE_KEY);
        if (stored) {
            // Basic validation for stored data can be added here if needed
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error("Error reading evidence from localStorage", error);
    }
    return []; // Start with an empty list
};

export const useEvidence = () => {
    const [evidence, setEvidence] = useState<Evidence[]>(getStoredEvidence);

    useEffect(() => {
        try {
            window.localStorage.setItem(EVIDENCE_STORAGE_KEY, JSON.stringify(evidence));
        } catch (error) {
            console.error("Error saving evidence to localStorage", error);
        }
    }, [evidence]);

    const addEvidence = useCallback((newEvidence: Evidence) => {
        setEvidence(prev => [newEvidence, ...prev]);
    }, []);

    const deleteEvidence = useCallback((evidenceId: string) => {
        setEvidence(prev => prev.filter(item => item.id !== evidenceId));
    }, []);
    
    const updateEvidence = useCallback((evidenceId: string, updatedData: Partial<Omit<Evidence, 'id'>>) => {
        setEvidence(prev => prev.map(item => 
            item.id === evidenceId ? { ...item, ...updatedData } : item
        ));
    }, []);

    return { evidence, addEvidence, deleteEvidence, updateEvidence };
};