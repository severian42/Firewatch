import type { Alert } from '../types';

export const ALERT_DATA: Alert[] = [
  {
    id: '1',
    type: 'Immediate Threat',
    title: 'ICE Raid Reported in Downtown Area',
    location: 'Near 123 Main St, Los Angeles',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    description: 'Multiple unconfirmed reports of ICE presence and vehicle stops. Community members advised to avoid the area and check on neighbors.',
    verified: true,
  },
  {
    id: '2',
    type: 'Area Watch',
    title: 'Increased CBP Patrols',
    location: 'South San Diego County',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    description: 'Community members have reported a higher than usual presence of Customs and Border Protection vehicles along major highways.',
    verified: false,
  },
  {
    id: '3',
    type: 'Pattern Alert',
    title: 'Workplace Checkpoint Pattern',
    location: 'Warehouse District, Chicago',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    description: 'Analysis suggests a pattern of early morning checkpoints near industrial parks on weekdays. Exercise caution during morning commutes.',
    verified: true,
  },
  {
    id: '4',
    type: 'All Clear',
    title: 'Previous Downtown Alert Resolved',
    location: 'Downtown Los Angeles',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    description: 'Reports from the downtown area have subsided. Legal observers have confirmed that enforcement activity has concluded for now.',
    verified: true,
  },
];
