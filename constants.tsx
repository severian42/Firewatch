
import React from 'react';
import { HomeIcon, BellIcon, ShieldCheckIcon, DocumentTextIcon, LifebuoyIcon, VideoCameraIcon, PhoneIcon, MapPinIcon, UsersIcon, ChatBubbleBottomCenterTextIcon, QuestionMarkCircleIcon, Cog6ToothIcon, BookOpenIcon, MapIcon, ClipboardDocumentListIcon, InformationCircleIcon } from './components/Icons';
import type { ChecklistItem } from './types';

export const KEY_PHRASES = [
  "Officer, am I being detained, or am I free to go?",
  "I am going to remain silent.",
  "I want to speak with a lawyer.",
  "I do not consent to a search of my person, property, or vehicle.",
  "Please show me the warrant.",
];

export const INCIDENT_CHECKLIST_ITEMS: ChecklistItem[] = [
    { text: "Note the date, time, and location of the incident.", completed: false },
    { text: "Get officer names and badge numbers.", completed: false },
    { text: "Write down patrol car numbers.", completed: false },
    { text: "Record any injuries and take photos.", completed: false },
    { text: "Note potential witnesses and get their contact information.", completed: false },
    { text: "Write down everything you remember as soon as possible.", completed: false },
    { text: "Do not resist, even if you believe the arrest is unlawful.", completed: false },
];

export const TOOLKIT_CONFIG = [
    { id: 'script', title: 'Know Your Script', icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8" /> },
    { id: 'law', title: 'State Recording Law', icon: <MapIcon className="w-8 h-8" /> },
    { id: 'checklist', title: 'Incident Checklist', icon: <ClipboardDocumentListIcon className="w-8 h-8" /> },
    { id: 'jargon', title: 'Legal Jargon Buster', icon: <BookOpenIcon className="w-8 h-8" /> },
];


export const NAV_ITEMS_CONFIG = [
  { id: 'Home', label: 'Home', icon: <HomeIcon /> },
  { id: 'Act', label: 'Act', icon: <DocumentTextIcon /> },
  { id: 'Rights', label: 'Rights', icon: <ShieldCheckIcon /> },
  { id: 'Guide', label: 'Guide', icon: <LifebuoyIcon /> },
  { id: 'Settings', label: 'Settings', icon: <Cog6ToothIcon /> },
] as const;

export const RIGHTS_TOPICS_CONFIG = [
  { id: 'traffic_stop', title: 'Traffic Stop', icon: '🚗' },
  { id: 'home_visit', title: 'Home Visit', icon: '🏠' },
  { id: 'workplace_raid', title: 'Workplace Raid', icon: '🏢' },
  { id: 'public_protest', title: 'Public Protest', icon: '📣' },
  { id: 'questioning', title: 'Being Questioned', icon: '❓' },
  { id: 'filming_police', title: 'Filming Police', icon: '📹' },
];

export const SCENARIO_SIMULATOR_MODULES_CONFIG = [
    { id: 'traffic_stop_sim', title: 'Traffic Stop Simulation', icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8"/> },
    { id: 'workplace_raid_sim', title: 'Workplace Raid Response', icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8"/> },
    { id: 'home_visit_sim', title: 'Home Visit Encounter', icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8"/> },
    { id: 'rights_quiz', title: 'Know Your Rights Quiz', icon: <QuestionMarkCircleIcon className="w-8 h-8"/> },
];

export const HOME_SCREEN_ACTIONS = [
  { id: 'quick_record', label: 'Quick Record', icon: <VideoCameraIcon />, className: 'bg-blue-600 hover:bg-blue-700' },
  { id: 'legal_hotline', label: 'Legal Hotline', icon: <PhoneIcon />, className: 'bg-green-600 hover:bg-green-700' },
  { id: 'share_location', label: 'Share Location', icon: <MapPinIcon />, className: 'bg-purple-600 hover:bg-purple-700' },
];
