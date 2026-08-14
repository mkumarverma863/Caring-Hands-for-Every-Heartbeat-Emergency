// Mock Emergency SOS Data for ElderGuard Prototype (Demo Data)

export const mockSOSAlerts = [
  {
    id: 'SOS-2026-904',
    timestamp: '2026-08-14 10:45:00',
    relativeTime: 'Today, 10:45 AM',
    triggerType: 'Manual Wearable Button Press (Demo)',
    priority: 'Urgent',
    status: 'Resolved', // 'Pending' | 'Searching' | 'Responder Assigned' | 'Resolved' | 'Cancelled'
    location: {
      address: '742 Evergreen Terrace, Springfield (Mock)',
      lat: 37.774929,
      lng: -122.419416,
      accuracy: '± 4 meters'
    },
    responder: {
      name: 'Robert Jenkins (Son)',
      phone: '+1 (555) 349-2810',
      eta: 'Arrived at 10:52 AM'
    },
    vitalsAtTrigger: {
      heartRate: '98 BPM',
      spo2: '97%'
    },
    notes: 'Elderly felt dizzy after standing up. Responding caregiver assisted with water and rest.'
  },
  {
    id: 'SOS-2026-889',
    timestamp: '2026-08-04 09:15:30',
    relativeTime: 'Aug 4, 2026',
    triggerType: 'Automatic Fall Trigger',
    priority: 'Critical',
    status: 'Resolved',
    location: {
      address: 'Front Garden Porch, Springfield',
      lat: 37.775102,
      lng: -122.418910,
      accuracy: '± 5 meters'
    },
    responder: {
      name: 'Robert Jenkins (Son) & Sarah (Caregiver)',
      phone: '+1 (555) 349-2810',
      eta: 'Assisted in 4 mins'
    },
    vitalsAtTrigger: {
      heartRate: '104 BPM',
      spo2: '96%'
    },
    notes: 'Assisted elderly up after garden step slip. Checked for bruises; vital signs stable.'
  },
  {
    id: 'SOS-2026-751',
    timestamp: '2026-07-15 16:20:10',
    relativeTime: 'July 15, 2026',
    triggerType: 'Manual SOS Long Press',
    priority: 'High',
    status: 'Cancelled',
    location: {
      address: 'Community Park Walkway',
      lat: 37.776000,
      lng: -122.417500,
      accuracy: '± 8 meters'
    },
    responder: {
      name: 'Cancelled by User',
      phone: '-',
      eta: 'N/A'
    },
    vitalsAtTrigger: {
      heartRate: '88 BPM',
      spo2: '98%'
    },
    notes: 'Accidental long-press during watch adjustment. Cancelled within 15 seconds.'
  }
];

export const emergencyContacts = [
  {
    id: 'c1',
    name: 'Robert Jenkins',
    relationship: 'Son (Primary Caregiver)',
    phone: '+1 (555) 349-2810',
    email: 'robert.jenkins@demo.elderguard.io',
    isPrimary: true,
    notifyOnSOS: true,
    notifyOnFall: true
  },
  {
    id: 'c2',
    name: 'Sarah Miller, RN',
    relationship: 'Visiting Home Nurse',
    phone: '+1 (555) 892-4112',
    email: 'sarah.nurse@demo.elderguard.io',
    isPrimary: false,
    notifyOnSOS: true,
    notifyOnFall: true
  },
  {
    id: 'c3',
    name: 'Dr. Arthur Evans',
    relationship: 'Family Physician (Mock Clinic)',
    phone: '+1 (555) 431-7700',
    email: 'dr.evans@demo-clinic.org',
    isPrimary: false,
    notifyOnSOS: false,
    notifyOnFall: false
  }
];
