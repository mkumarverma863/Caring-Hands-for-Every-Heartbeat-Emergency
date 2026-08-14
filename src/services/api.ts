// Mock Service / API for ElderGuard (Frontend Prototype)
import { initialVitals, hourlyHeartRateData, weeklyActivityData, weeklySleepData, healthHistoryLogs } from '../data/healthData';
import { initialFallState, mockFallHistory } from '../data/fallData';
import { mockSOSAlerts, emergencyContacts } from '../data/sosData';
import { initialDeviceState } from '../data/deviceData';
import { initialLocation, locationBreadcrumbs } from '../data/locationData';
import { initialNotifications } from '../data/notificationData';

// Simulated delay helper
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const loginUser = async (email: string, password?: string) => {
  await delay(200);
  if (!email) {
    throw new Error('Please enter both email and password.');
  }
  // Default mock user
  return {
    user: {
      id: 'usr-88210',
      name: email.includes('care') ? 'Sarah Jenkins' : 'Eleanor Vance',
      email: email,
      role: email.includes('care') ? 'Caregiver' : 'Elderly User',
      phone: '+1 (555) 234-5678',
      age: email.includes('care') ? 38 : 74,
      bloodType: 'O+',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      emergencyContactCount: 3,
      pairedDeviceId: 'EG-BAND-77402'
    },
    token: 'mock-jwt-token-elderguard-2026'
  };
};

export const registerUser = async (userData: any) => {
  await delay(250);
  if (!userData.fullName || !userData.email || !userData.password) {
    throw new Error('Please complete all required fields.');
  }
  return {
    user: {
      id: `usr-${Math.floor(10000 + Math.random() * 90000)}`,
      name: userData.fullName,
      email: userData.email,
      role: userData.role || 'Elderly User',
      phone: userData.phone || '+1 (555) 000-0000',
      age: 72,
      bloodType: 'A+',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      emergencyContactCount: 1,
      pairedDeviceId: 'EG-BAND-77402'
    },
    token: 'mock-jwt-token-elderguard-reg'
  };
};

export const getDashboardData = async () => {
  await delay(100);
  return {
    vitals: initialVitals,
    fallStatus: initialFallState,
    device: initialDeviceState,
    location: initialLocation,
    recentAlerts: mockSOSAlerts.slice(0, 2),
    notifications: initialNotifications.slice(0, 3)
  };
};

export const getHealthData = async () => {
  await delay(120);
  return {
    vitals: initialVitals,
    hourlyHeartRate: hourlyHeartRateData,
    weeklyActivity: weeklyActivityData,
    weeklySleep: weeklySleepData,
    historyLogs: healthHistoryLogs
  };
};

export const getFallEvents = async () => {
  await delay(100);
  return {
    currentStatus: initialFallState,
    history: mockFallHistory
  };
};

export const getSOSAlerts = async () => {
  await delay(100);
  return {
    alerts: mockSOSAlerts,
    contacts: emergencyContacts
  };
};

export const createSOSAlert = async (alertPayload: any) => {
  await delay(200);
  const newAlert = {
    id: `SOS-2026-${Math.floor(100 + Math.random() * 900)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    relativeTime: 'Just now',
    triggerType: alertPayload.triggerType || 'Manual SOS Button',
    priority: alertPayload.priority || 'Critical',
    status: 'Pending' as const,
    location: alertPayload.location || {
      address: '742 Evergreen Terrace (Simulated Residence)',
      lat: 37.774929,
      lng: -122.419416,
      accuracy: '± 4 meters'
    },
    responder: {
      name: 'Dispatching Primary Caregiver (Robert Jenkins)...',
      phone: '+1 (555) 349-2810',
      eta: 'Estimating (approx. 3-5 mins)'
    },
    vitalsAtTrigger: alertPayload.vitals || {
      heartRate: '88 BPM',
      spo2: '98%'
    },
    notes: alertPayload.notes || 'Emergency assistance requested via ElderGuard prototype.'
  };
  return newAlert;
};

export const getDevice = async () => {
  await delay(100);
  return initialDeviceState;
};

export const getLocation = async () => {
  await delay(100);
  return {
    currentLocation: initialLocation,
    breadcrumbs: locationBreadcrumbs
  };
};

export const getNotifications = async () => {
  await delay(80);
  return initialNotifications;
};

export const updateProfile = async (profileData: any) => {
  await delay(150);
  return {
    success: true,
    user: profileData
  };
};
