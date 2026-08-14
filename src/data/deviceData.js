// Mock Device & Bluetooth Data for ElderGuard Prototype (Demo Data)

export const initialDeviceState = {
  deviceName: 'ElderGuard Band v2 Pro',
  deviceId: 'EG-BAND-77402',
  serialNumber: 'SN-2026-X89B-0042',
  connectionStatus: 'Connected', // 'Connected' | 'Connecting' | 'Disconnected' | 'Demo Mode'
  bluetoothState: 'Connected', // 'Connected' | 'Connecting' | 'Disconnected'
  bluetoothRssi: -58, // dBm (signal strength)
  batteryLevel: 86, // percentage
  batteryStatus: 'Good', // 'Good' | 'Low' | 'Critical' | 'Charging'
  lastSyncTime: 'Just now (11:15 AM)',
  firmwareVersion: 'v2.4.1-rc3 (Research Build)',
  hardwareRevision: 'HW-RevB (ESP32-S3 + MPU6050 + MAX30102)',
  sensors: {
    accelerometer: { name: '3-Axis Accelerometer (MPU-6050)', status: 'Active', sampleRate: '50 Hz', reading: 'X: 0.02g | Y: 0.98g | Z: 0.11g' },
    gyroscope: { name: '3-Axis Gyroscope', status: 'Active', sampleRate: '50 Hz', reading: 'Pitch: 1.2° | Roll: 0.4° | Yaw: -0.1°' },
    heartRateSensor: { name: 'Optical PPG (MAX30102)', status: 'Active', sampleRate: '25 Hz', reading: '74 BPM (High SNR)' },
    gpsModule: { name: 'GNSS / GPS Receiver (NEO-M8N)', status: 'Locked (8 Sats)', sampleRate: '1 Hz', reading: 'HDOP 0.9' },
    sosButton: { name: 'Capacitive SOS Button', status: 'Armed & Ready', sampleRate: 'Interrupt', reading: 'State: Normal (Released)' }
  },
  diagnostics: {
    bleLatency: '24 ms',
    packetLoss: '0.1%',
    memoryUsage: '42%',
    temperature: '31.2 °C'
  }
};
