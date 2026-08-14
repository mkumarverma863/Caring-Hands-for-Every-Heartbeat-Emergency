// Mock Location Data for ElderGuard Prototype (Fictional Coordinates Only)

export const initialLocation = {
  latitude: 37.774929,
  longitude: -122.419416,
  address: '742 Evergreen Terrace (Simulated Residence)',
  city: 'Springfield, CA 94102',
  zone: 'Safe Home Geofence',
  isInsideSafeZone: true,
  accuracyMeters: 4.2,
  altitudeMeters: 52,
  speedKmh: 0.8,
  heading: 'North-East (42°)',
  lastUpdated: 'Just now (10 seconds ago)',
  provider: 'GPS + Wi-Fi Triangulation (Demo)',
  batteryOnGps: 'Active Power Saving Mode'
};

export const locationBreadcrumbs = [
  { time: '11:15 AM', lat: 37.774929, lng: -122.419416, label: 'Current Location: Living Room', status: 'Safe' },
  { time: '10:45 AM', lat: 37.775010, lng: -122.419200, label: 'Backyard Garden Patio', status: 'Safe' },
  { time: '09:30 AM', lat: 37.775350, lng: -122.418700, label: 'Neighbourhood Walkway (Morning Walk)', status: 'Safe' },
  { time: '08:00 AM', lat: 37.774929, lng: -122.419416, label: 'Bedroom (Waking Up)', status: 'Safe' }
];

export const geofenceBoundaries = [
  { name: 'Home Safe Zone', radiusMeters: 150, center: [37.774929, -122.419416], status: 'Active' },
  { name: 'Community Center / Park Zone', radiusMeters: 300, center: [37.776000, -122.417500], status: 'Active' }
];
