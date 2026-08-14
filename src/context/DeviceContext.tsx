import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialDeviceState } from '../data/deviceData';
import bluetoothService from '../services/bluetoothService';

interface DeviceContextType {
  device: typeof initialDeviceState;
  isBluetoothSupported: boolean;
  bluetoothStatusText: string;
  isScanning: boolean;
  scanMessage: string;
  scanDevice: () => Promise<void>;
  connectDevice: () => Promise<void>;
  disconnectDevice: () => Promise<void>;
  // Demo simulation helpers
  simulateOffline: () => void;
  simulateLowBattery: () => void;
  simulateConnected: () => void;
  rechargeBattery: () => void;
  updateSensitivity: (level: string) => void;
  updateCountdownSec: (sec: number) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [device, setDevice] = useState(initialDeviceState);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const supported = bluetoothService.isBluetoothSupported();
    setIsSupported(supported);

    bluetoothService.setCallbacks({
      onStateChange: (state: string) => {
        setDevice((prev) => ({
          ...prev,
          bluetoothState: state as any,
          connectionStatus: state === 'Connected' ? 'Connected' : 'Disconnected'
        }));
      }
    });
  }, []);

  const scanDevice = async () => {
    setIsScanning(true);
    setScanMessage('Scanning for nearby ElderGuard Bluetooth devices...');
    try {
      const res = await bluetoothService.scanBluetoothDevice();
      if (!res.supported) {
        setScanMessage(res.message || 'Web Bluetooth is not supported in this browser. Demo Mode enabled.');
        // Enable demo mode connection
        setTimeout(() => {
          setDevice((prev) => ({
            ...prev,
            deviceName: 'ElderGuard Band v2 (Demo Simulation)',
            connectionStatus: 'Connected',
            bluetoothState: 'Connected',
            lastSyncTime: 'Just now'
          }));
          setScanMessage('Connected in Demo Simulation mode.');
        }, 600);
      } else if (res.cancelled) {
        setScanMessage(res.message || 'Scan cancelled by user.');
      } else if (res.success && res.device) {
        setScanMessage(`Found device: ${res.device.name}. Connecting...`);
        await connectDevice();
      } else {
        setScanMessage(res.error || 'No Bluetooth device found.');
      }
    } catch (err: any) {
      setScanMessage(err.message || 'Scan error.');
    } finally {
      setIsScanning(false);
    }
  };

  const connectDevice = async () => {
    setDevice((prev) => ({
      ...prev,
      connectionStatus: 'Connecting',
      bluetoothState: 'Connecting'
    }));

    if (bluetoothService.device) {
      const res = await bluetoothService.connectBluetoothDevice();
      if (res.success) {
        setDevice((prev) => ({
          ...prev,
          connectionStatus: 'Connected',
          bluetoothState: 'Connected',
          lastSyncTime: 'Just now'
        }));
        setScanMessage('Device connected successfully via Web Bluetooth.');
      } else {
        setDevice((prev) => ({
          ...prev,
          connectionStatus: 'Disconnected',
          bluetoothState: 'Disconnected'
        }));
        setScanMessage(res.error || 'Connection failed.');
      }
    } else {
      // Simulate connection
      setTimeout(() => {
        setDevice((prev) => ({
          ...prev,
          connectionStatus: 'Connected',
          bluetoothState: 'Connected',
          lastSyncTime: 'Just now'
        }));
        setScanMessage('Bluetooth device connected.');
      }, 700);
    }
  };

  const disconnectDevice = async () => {
    await bluetoothService.disconnectBluetoothDevice();
    setDevice((prev) => ({
      ...prev,
      connectionStatus: 'Disconnected',
      bluetoothState: 'Disconnected',
      lastSyncTime: 'Disconnected'
    }));
    setScanMessage('Device disconnected.');
  };

  // Demo simulation functions
  const simulateOffline = () => {
    setDevice((prev) => ({
      ...prev,
      connectionStatus: 'Disconnected',
      bluetoothState: 'Disconnected',
      lastSyncTime: 'Offline for 12m'
    }));
    setScanMessage('Simulated: Device disconnected / offline.');
  };

  const simulateLowBattery = () => {
    setDevice((prev) => ({
      ...prev,
      batteryLevel: 14,
      batteryStatus: 'Low'
    }));
    setScanMessage('Simulated: Low battery alert (14%).');
  };

  const simulateConnected = () => {
    setDevice((prev) => ({
      ...prev,
      connectionStatus: 'Connected',
      bluetoothState: 'Connected',
      batteryLevel: 86,
      batteryStatus: 'Good',
      lastSyncTime: 'Just now'
    }));
    setScanMessage('Simulated: Device reconnected.');
  };

  const rechargeBattery = () => {
    setDevice((prev) => ({
      ...prev,
      batteryLevel: 100,
      batteryStatus: 'Good'
    }));
    setScanMessage('Simulated: Battery recharged to 100%.');
  };

  const updateSensitivity = (level: string) => {
    setDevice((prev) => ({
      ...prev,
      firmwareVersion: `${prev.firmwareVersion}`
    }));
  };

  const updateCountdownSec = (_sec: number) => {
    // Handled in settings
  };

  let bluetoothStatusText = 'Bluetooth Disconnected';
  if (device.bluetoothState === 'Connecting' || device.connectionStatus === 'Connecting') {
    bluetoothStatusText = 'Connecting...';
  } else if (device.bluetoothState === 'Connected' || device.connectionStatus === 'Connected') {
    bluetoothStatusText = 'Bluetooth Connected';
  }

  return (
    <DeviceContext.Provider
      value={{
        device,
        isBluetoothSupported: isSupported,
        bluetoothStatusText,
        isScanning,
        scanMessage,
        scanDevice,
        connectDevice,
        disconnectDevice,
        simulateOffline,
        simulateLowBattery,
        simulateConnected,
        rechargeBattery,
        updateSensitivity,
        updateCountdownSec
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};
