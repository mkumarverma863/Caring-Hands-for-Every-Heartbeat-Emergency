/**
 * Bluetooth Service for ElderGuard Wearable
 * Integrates real Web Bluetooth API where available with safe fallback for research demo.
 */

class BluetoothService {
  device: any = null;
  server: any = null;
  isConnected: boolean = false;
  onStateChangeCallback: ((state: string) => void) | null = null;
  onSensorDataCallback: ((data: any) => void) | null = null;

  /**
   * Check if Web Bluetooth API is supported in current browser context.
   */
  isBluetoothSupported(): boolean {
    return typeof navigator !== 'undefined' && 'bluetooth' in navigator;
  }

  /**
   * Register listeners for connection and sensor telemetry
   */
  setCallbacks(callbacks: { onStateChange?: (state: string) => void; onSensorData?: (data: any) => void }) {
    if (callbacks.onStateChange) this.onStateChangeCallback = callbacks.onStateChange;
    if (callbacks.onSensorData) this.onSensorDataCallback = callbacks.onSensorData;
  }

  /**
   * Request Bluetooth device via Web Bluetooth API.
   * If browser doesn't support or user cancels, provides graceful feedback.
   */
  async scanBluetoothDevice() {
    if (!this.isBluetoothSupported()) {
      return {
        success: false,
        supported: false,
        message: 'Web Bluetooth is not supported in this browser. Demo Mode enabled.',
        demoMode: true
      };
    }

    try {
      const nav: any = navigator;
      const device = await nav.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['heart_rate', 'battery_service', 'device_information']
      });

      this.device = device;
      
      device.addEventListener('gattserverdisconnected', () => {
        this.isConnected = false;
        if (this.onStateChangeCallback) {
          this.onStateChangeCallback('Disconnected');
        }
      });

      return {
        success: true,
        supported: true,
        device: {
          id: device.id,
          name: device.name || 'ElderGuard BLE Band'
        }
      };
    } catch (err: any) {
      if (err.name === 'NotFoundError' || err.message?.includes('User cancelled')) {
        return {
          success: false,
          supported: true,
          cancelled: true,
          message: 'Bluetooth scan cancelled by user.'
        };
      }
      return {
        success: false,
        supported: true,
        error: err.message || 'Unable to scan for Bluetooth devices'
      };
    }
  }

  /**
   * Connect to GATT server of selected Bluetooth device
   */
  async connectBluetoothDevice() {
    if (!this.device) {
      return { success: false, message: 'No device selected to connect.' };
    }

    try {
      if (this.onStateChangeCallback) this.onStateChangeCallback('Connecting...');
      
      const server = await this.device.gatt?.connect();
      this.server = server;
      this.isConnected = true;

      if (this.onStateChangeCallback) this.onStateChangeCallback('Connected');

      return {
        success: true,
        connected: true,
        deviceName: this.device.name || 'ElderGuard BLE Band'
      };
    } catch (err: any) {
      this.isConnected = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback('Disconnected');
      return {
        success: false,
        error: err.message || 'Failed to connect to Bluetooth GATT server'
      };
    }
  }

  /**
   * Disconnect from current GATT server
   */
  async disconnectBluetoothDevice() {
    if (this.device && this.device.gatt?.connected) {
      this.device.gatt.disconnect();
    }
    this.isConnected = false;
    this.server = null;
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback('Disconnected');
    }
    return { success: true, connected: false };
  }
}

export const bluetoothService = new BluetoothService();
export default bluetoothService;
