
import type { ReactNode } from 'react';

export type Screen = 'Home' | 'Alerts' | 'Rights' | 'Document' | 'Guide' | 'Settings';

export interface NavItem {
  id: Screen;
  label: string;
  icon: ReactNode;
}

export interface Evidence {
  id:string; // Unique ID for list keys
  timestamp: string; // ISO 8601 format
  mediaType: 'video' | 'audio' | 'photo';
  incidentType: string;
  notes?: string;
  // In a real implementation, location, fileHash, etc. would be here.
}

export type AlertType = 'Immediate Threat' | 'Area Watch' | 'Pattern Alert' | 'All Clear';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  location: string;
  timestamp: string; // ISO 8601 format
  description: string;
  verified: boolean;
}

export interface Resource {
  name: string;
  description: string;
  website?: string;
  phone?: string;
}

export interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji for simplicity
  resources: Resource[];
}

export interface Location {
  lat: number;
  lon: number;
}

export interface ScanSource {
    uri: string;
    title: string;
}

export interface ScanResult {
    text: string;
    sources: ScanSource[];
}

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface FallbackLocation {
  city: string;
  state: string;
  zip: string;
}

export interface UserSettings {
  fallbackLocation: FallbackLocation;
  emergencyContacts: EmergencyContact[];
}

export interface RecordingLawResult {
  consentType: 'One-Party' | 'Two-Party' | 'Varies' | 'Unclear';
  summary: string;
  disclaimer: string;
}

export interface JargonBusterResult {
  term: string;
  explanation: string;
}

export interface ChecklistItem {
    text: string;
    completed: boolean;
}
