
import type { EmergencyContact } from '../types';

// In a real app, this would be managed by the user in a settings screen.
// This serves as the default value if no settings are saved in localStorage.
export const DEFAULT_EMERGENCY_CONTACTS: EmergencyContact[] = [
  { name: 'Emergency Contact 1', phone: '15551234567' },
  { name: 'Emergency Contact 2', phone: '15557654321' },
];
