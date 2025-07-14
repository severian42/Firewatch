
import { useState, useEffect, useCallback } from 'react';
import type { UserSettings, FallbackLocation, EmergencyContact } from '../types';
import { DEFAULT_EMERGENCY_CONTACTS } from '../data/userData';

const USER_SETTINGS_KEY = 'firewatch_user_settings';

const defaultSettings: UserSettings = {
    fallbackLocation: { city: '', state: '', zip: '' },
    emergencyContacts: DEFAULT_EMERGENCY_CONTACTS,
};

const getStoredSettings = (): UserSettings => {
    try {
        const stored = window.localStorage.getItem(USER_SETTINGS_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Basic validation to merge defaults for missing keys from older versions
            return { 
              ...defaultSettings, 
              ...parsed,
              fallbackLocation: { ...defaultSettings.fallbackLocation, ...parsed.fallbackLocation },
              emergencyContacts: parsed.emergencyContacts || defaultSettings.emergencyContacts,
            };
        }
    } catch (error) {
        console.error("Error reading user settings from localStorage", error);
    }
    return defaultSettings;
};

export const useUserSettings = () => {
    const [settings, setSettings] = useState<UserSettings>(getStoredSettings);

    useEffect(() => {
        try {
            window.localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settings));
        } catch (error) {
            console.error("Error saving user settings to localStorage", error);
        }
    }, [settings]);

    const saveSettings = useCallback((newSettings: Partial<UserSettings>) => {
        setSettings(prev => ({...prev, ...newSettings}));
    }, []);

    return { settings, saveSettings };
};