// Mock Fall Detection Data for ElderGuard Prototype (Demo Data)

export const initialFallState = {
  status: 'SAFE', // 'SAFE' (Green) | 'POSSIBLE_FALL' (Orange) | 'FALL_DETECTED' (Red)
  confidence: 96, // percentage
  lastFall: 'No falls recorded today',
  lastEventTimestamp: '2026-08-12 14:32:10',
  sensorsActive: true,
  algorithmMode: 'Dual-Axis Impact + Tilt Fusion v2.1 (Prototype)',
  sensitivity: 'Medium (Standard)',
  autoAlertCountdownSec: 20
};

export const mockFallHistory = [
  {
    id: 'FL-2026-081',
    timestamp: '2026-08-12 14:32:10',
    relativeTime: '2 days ago',
    type: 'Hard Impact & Rapid Tilt',
    confidence: '94%',
    status: 'Resolved (False Alarm Cancelled by User)',
    severity: 'Medium',
    location: 'Living Room (37.7749° N, 122.4194° W)',
    accelerometerPeak: '3.4 g',
    actionTaken: 'Elderly cancelled countdown within 8s. No injury.'
  },
  {
    id: 'FL-2026-074',
    timestamp: '2026-08-04 09:15:22',
    relativeTime: '10 days ago',
    type: 'Trip / Sudden Deceleration',
    confidence: '98%',
    status: 'Resolved (Caregiver Notified & Assisted)',
    severity: 'High',
    location: 'Front Garden Porch (37.7751° N, 122.4189° W)',
    accelerometerPeak: '4.8 g',
    actionTaken: 'SOS Alert triggered, son Robert arrived in 4 mins.'
  },
  {
    id: 'FL-2026-068',
    timestamp: '2026-07-21 17:48:05',
    relativeTime: '3 weeks ago',
    type: 'Soft Stumble / Couch Drop',
    confidence: '82%',
    status: 'Resolved (Safe)',
    severity: 'Low',
    location: 'Living Room Sofa',
    accelerometerPeak: '2.1 g',
    actionTaken: 'User sat down quickly. System self-cleared.'
  }
];
