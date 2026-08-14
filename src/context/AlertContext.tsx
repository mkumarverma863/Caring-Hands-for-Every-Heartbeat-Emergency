import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialFallState, mockFallHistory } from '../data/fallData';
import { mockSOSAlerts } from '../data/sosData';
import { createSOSAlert } from '../services/api';

export type FallStatusType = 'SAFE' | 'POSSIBLE_FALL' | 'FALL_DETECTED';

export interface SOSAlertItem {
  id: string;
  timestamp: string;
  relativeTime: string;
  triggerType: string;
  priority: string;
  status: 'Pending' | 'Searching' | 'Responder Assigned' | 'Resolved' | 'Cancelled';
  location: {
    address: string;
    lat: number;
    lng: number;
    accuracy: string;
  };
  responder: {
    name: string;
    phone: string;
    eta: string;
  };
  vitalsAtTrigger: {
    heartRate: string;
    spo2: string;
  };
  notes: string;
}

interface AlertContextType {
  fallStatus: FallStatusType;
  fallConfidence: number;
  lastFallTime: string;
  fallCountdown: number | null;
  fallHistory: any[];
  sosAlerts: SOSAlertItem[];
  activeSOS: SOSAlertItem | null;
  isSOSModalOpen: boolean;
  openSOSModal: () => void;
  closeSOSModal: () => void;
  triggerSOS: (customTrigger?: string) => Promise<SOSAlertItem>;
  cancelActiveSOS: () => void;
  resolveActiveSOS: () => void;
  simulateFall: () => void;
  cancelFallCountdown: () => void;
  confirmFallDetected: () => void;
  resetAllAlerts: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fallStatus, setFallStatus] = useState<FallStatusType>('SAFE');
  const [fallConfidence, setFallConfidence] = useState<number>(96);
  const [lastFallTime, setLastFallTime] = useState<string>(initialFallState.lastFall);
  const [fallCountdown, setFallCountdown] = useState<number | null>(null);
  const [fallHistory, setFallHistory] = useState<any[]>(mockFallHistory);
  
  const [sosAlerts, setSosAlerts] = useState<SOSAlertItem[]>(mockSOSAlerts as SOSAlertItem[]);
  const [activeSOS, setActiveSOS] = useState<SOSAlertItem | null>(null);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);

  // Countdown timer for Possible Fall
  useEffect(() => {
    let timer: any = null;
    if (fallCountdown !== null && fallCountdown > 0) {
      timer = setInterval(() => {
        setFallCountdown((prev) => (prev !== null && prev > 1 ? prev - 1 : 0));
      }, 1000);
    } else if (fallCountdown === 0) {
      // Countdown expired -> automatically escalate to FALL_DETECTED & Trigger SOS
      confirmFallDetected();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [fallCountdown]);

  const openSOSModal = () => setIsSOSModalOpen(true);
  const closeSOSModal = () => setIsSOSModalOpen(false);

  const triggerSOS = async (customTrigger = 'Manual Emergency SOS Button (UI)') => {
    setIsSOSModalOpen(false);
    const newAlert = await createSOSAlert({
      triggerType: customTrigger,
      priority: 'Critical',
      notes: 'Emergency Assistance requested. Family members and primary caregiver alerted.'
    });

    setSosAlerts((prev) => [newAlert, ...prev]);
    setActiveSOS(newAlert);
    return newAlert;
  };

  const cancelActiveSOS = () => {
    if (activeSOS) {
      const updated = { ...activeSOS, status: 'Cancelled' as const, notes: 'Alert cancelled by user (False Alarm).' };
      setSosAlerts((prev) => prev.map((a) => (a.id === activeSOS.id ? updated : a)));
      setActiveSOS(null);
    }
  };

  const resolveActiveSOS = () => {
    if (activeSOS) {
      const updated = { ...activeSOS, status: 'Resolved' as const, notes: 'Assistance completed. Caregiver confirmed user safety.' };
      setSosAlerts((prev) => prev.map((a) => (a.id === activeSOS.id ? updated : a)));
      setActiveSOS(null);
    }
  };

  // Simulate Fall event
  const simulateFall = () => {
    setFallStatus('POSSIBLE_FALL');
    setFallConfidence(94);
    setFallCountdown(20); // 20-second safety cancellation window
  };

  const cancelFallCountdown = () => {
    setFallCountdown(null);
    setFallStatus('SAFE');
    // Add to history as cancelled
    const cancelledRecord = {
      id: `FL-2026-0${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      relativeTime: 'Just now',
      type: 'Simulated Sudden Impact / Tilt',
      confidence: '94%',
      status: 'Resolved (User Cancelled in Countdown)',
      severity: 'Medium',
      location: 'Living Room (Demo)',
      accelerometerPeak: '3.6 g',
      actionTaken: 'User checked in OK. Safety state restored.'
    };
    setFallHistory((prev) => [cancelledRecord, ...prev]);
  };

  const confirmFallDetected = async () => {
    setFallCountdown(null);
    setFallStatus('FALL_DETECTED');
    setLastFallTime('Just now');
    
    // Add confirmed fall to history
    const fallRecord = {
      id: `FL-2026-0${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      relativeTime: 'Just now',
      type: 'Confirmed High-G Impact Fall',
      confidence: '98%',
      status: 'Emergency Dispatched',
      severity: 'Critical',
      location: 'Living Room (37.7749° N, 122.4194° W)',
      accelerometerPeak: '4.9 g',
      actionTaken: 'Automated SOS dispatched to Robert Jenkins (Son).'
    };
    setFallHistory((prev) => [fallRecord, ...prev]);

    // Escalate to automated SOS alert
    await triggerSOS('Automatic Wearable Fall Detection Algorithm');
  };

  const resetAllAlerts = () => {
    setFallStatus('SAFE');
    setFallCountdown(null);
    setFallConfidence(96);
    setActiveSOS(null);
  };

  return (
    <AlertContext.Provider
      value={{
        fallStatus,
        fallConfidence,
        lastFallTime,
        fallCountdown,
        fallHistory,
        sosAlerts,
        activeSOS,
        isSOSModalOpen,
        openSOSModal,
        closeSOSModal,
        triggerSOS,
        cancelActiveSOS,
        resolveActiveSOS,
        simulateFall,
        cancelFallCountdown,
        confirmFallDetected,
        resetAllAlerts
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
