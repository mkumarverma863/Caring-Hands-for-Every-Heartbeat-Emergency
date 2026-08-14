// Mock Notifications for ElderGuard Prototype (Demo Data)

export const initialNotifications = [
  {
    id: 'n-1',
    title: 'Daily Health Summary Ready',
    message: 'Resting heart rate averaged 66 BPM, 4,320 steps recorded. Overall safety score: 98/100.',
    type: 'health', // 'health' | 'alert' | 'device' | 'system'
    timestamp: '10 minutes ago',
    read: false,
    priority: 'info'
  },
  {
    id: 'n-2',
    title: 'Wearable Connected via Bluetooth',
    message: 'ElderGuard Band v2 Pro synced successfully. Battery at 86%.',
    type: 'device',
    timestamp: '45 minutes ago',
    read: false,
    priority: 'info'
  },
  {
    id: 'n-3',
    title: 'Fall Detection System Active',
    message: 'Dual-axis sensors calibrated and armed for emergency response.',
    type: 'system',
    timestamp: '2 hours ago',
    read: true,
    priority: 'success'
  },
  {
    id: 'n-4',
    title: 'Medication Reminder',
    message: 'Scheduled reminder for Morning Blood Pressure tablet (10mg).',
    type: 'health',
    timestamp: '4 hours ago',
    read: true,
    priority: 'info'
  }
];
