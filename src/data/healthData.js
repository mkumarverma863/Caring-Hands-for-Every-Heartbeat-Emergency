// Mock Health Data for ElderGuard Prototype (Demo Data)

export const initialVitals = {
  heartRate: {
    current: 74,
    unit: 'BPM',
    status: 'Normal',
    min: 62,
    max: 98,
    avg: 72,
    resting: 66,
    trend: 'stable'
  },
  steps: {
    current: 4320,
    goal: 6000,
    unit: 'steps',
    distanceKm: 2.8,
    caloriesBurned: 185,
    activeMinutes: 42,
    status: 'On Track'
  },
  sleep: {
    duration: '7h 45m',
    hours: 7.75,
    score: 84,
    deepSleep: '1h 50m',
    lightSleep: '4h 35m',
    remSleep: '1h 20m',
    awake: '25m',
    status: 'Good Quality'
  },
  bloodPressure: {
    systolic: 122,
    diastolic: 78,
    unit: 'mmHg',
    status: 'Optimal'
  },
  bloodOxygen: {
    current: 98,
    unit: '%',
    status: 'Normal'
  },
  bodyTemp: {
    current: 98.4,
    unit: '°F',
    status: 'Normal'
  }
};

export const hourlyHeartRateData = [
  { time: '06:00', heartRate: 64, resting: 62 },
  { time: '08:00', heartRate: 72, resting: 63 },
  { time: '10:00', heartRate: 85, resting: 64 },
  { time: '12:00', heartRate: 78, resting: 64 },
  { time: '14:00', heartRate: 82, resting: 65 },
  { time: '16:00', heartRate: 75, resting: 65 },
  { time: '18:00', heartRate: 79, resting: 66 },
  { time: '20:00', heartRate: 71, resting: 64 },
  { time: '22:00', heartRate: 67, resting: 63 }
];

export const weeklyActivityData = [
  { day: 'Mon', steps: 4850, goal: 6000, calories: 210, distance: 3.1 },
  { day: 'Tue', steps: 5420, goal: 6000, calories: 245, distance: 3.5 },
  { day: 'Wed', steps: 3900, goal: 6000, calories: 170, distance: 2.5 },
  { day: 'Thu', steps: 6100, goal: 6000, calories: 280, distance: 4.0 },
  { day: 'Fri', steps: 5200, goal: 6000, calories: 230, distance: 3.4 },
  { day: 'Sat', steps: 4320, goal: 6000, calories: 185, distance: 2.8 },
  { day: 'Sun', steps: 4950, goal: 6000, calories: 220, distance: 3.2 }
];

export const weeklySleepData = [
  { day: 'Mon', hours: 7.2, deep: 1.5, light: 4.5, rem: 1.2, score: 79 },
  { day: 'Tue', hours: 8.0, deep: 2.0, light: 4.8, rem: 1.2, score: 88 },
  { day: 'Wed', hours: 6.8, deep: 1.2, light: 4.3, rem: 1.3, score: 73 },
  { day: 'Thu', hours: 7.5, deep: 1.8, light: 4.4, rem: 1.3, score: 82 },
  { day: 'Fri', hours: 7.9, deep: 1.9, light: 4.7, rem: 1.3, score: 86 },
  { day: 'Sat', hours: 8.2, deep: 2.1, light: 4.8, rem: 1.3, score: 90 },
  { day: 'Sun', hours: 7.7, deep: 1.8, light: 4.6, rem: 1.3, score: 84 }
];

export const healthHistoryLogs = [
  {
    id: 'h-101',
    date: 'Today, 10:30 AM',
    type: 'Heart Rate',
    reading: '74 BPM',
    status: 'Normal',
    note: 'Resting pulse regular after morning stroll.'
  },
  {
    id: 'h-102',
    date: 'Today, 08:15 AM',
    type: 'Blood Pressure',
    reading: '122 / 78 mmHg',
    status: 'Optimal',
    note: 'Measured after morning medication.'
  },
  {
    id: 'h-103',
    date: 'Yesterday, 09:40 PM',
    type: 'Sleep Analysis',
    reading: '7 hrs 45 mins',
    status: 'Good Quality',
    note: 'Deep sleep phase: 1h 50m recorded.'
  },
  {
    id: 'h-104',
    date: 'Yesterday, 04:10 PM',
    type: 'Blood Oxygen (SpO2)',
    reading: '98%',
    status: 'Normal',
    note: 'Within healthy saturation range (95-100%).'
  },
  {
    id: 'h-105',
    date: '2 days ago',
    type: 'Daily Step Goal',
    reading: '6,100 / 6,000 steps',
    status: 'Goal Achieved',
    note: 'Target met with garden walk & living room mobility.'
  }
];
