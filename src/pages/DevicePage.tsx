import React from 'react';
import {
  Watch,
  Bluetooth,
  BluetoothSearching,
  Battery,
  RefreshCw,
  Cpu,
  Radio,
  CheckCircle2,
  XCircle,
  Activity,
  Compass,
  MapPin,
  BellRing,
  Info,
  ShieldCheck,
  Zap,
  RotateCcw
} from 'lucide-react';
import { useDevice } from '../context/DeviceContext';
import StatusBadge from '../components/StatusBadge';
import BluetoothStatus from '../components/BluetoothStatus';

export const DevicePage: React.FC = () => {
  const {
    device,
    isBluetoothSupported,
    bluetoothStatusText,
    isScanning,
    scanMessage,
    scanDevice,
    connectDevice,
    disconnectDevice,
    simulateOffline,
    simulateLowBattery,
    simulateConnected,
    rechargeBattery
  } = useDevice();

  const isConnected = device.connectionStatus === 'Connected';

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Wearable Device & Bluetooth BLE</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hardware interface, GATT sensor telemetry, Web Bluetooth scanner & battery diagnostics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={device.connectionStatus} size="md" />
        </div>
      </div>

      {/* Main Bluetooth & Connection Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <BluetoothStatus />

          {/* Quick Simulation Testing Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Device Simulation Testbed
            </h4>
            <p className="text-xs text-slate-600 mb-4">
              Test hardware exception states such as disconnects, signal dropouts, and low battery thresholds.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={simulateConnected}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Simulate Connected
              </button>
              <button
                onClick={simulateOffline}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                Simulate Disconnect
              </button>
              <button
                onClick={simulateLowBattery}
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Battery className="w-3.5 h-3.5" />
                Simulate Low Battery (14%)
              </button>
              <button
                onClick={rechargeBattery}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Recharge (100%)
              </button>
            </div>
          </div>
        </div>

        {/* Device Information & Diagnostics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Watch className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{device.deviceName}</h3>
                <p className="text-xs text-slate-500">ID: {device.deviceId}</p>
              </div>
            </div>

            <div className="space-y-3 divide-y divide-slate-100 text-xs">
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Serial Number</span>
                <span className="font-semibold text-slate-800">{device.serialNumber}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Firmware Build</span>
                <span className="font-semibold text-slate-800">{device.firmwareVersion}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Hardware Platform</span>
                <span className="font-semibold text-slate-800">{device.hardwareRevision}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">BLE Latency</span>
                <span className="font-semibold text-emerald-600">{device.diagnostics.bleLatency}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Packet Loss Rate</span>
                <span className="font-semibold text-emerald-600">{device.diagnostics.packetLoss}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Internal Band Temp</span>
                <span className="font-semibold text-slate-800">{device.diagnostics.temperature}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Sensors Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Embedded Sensor Telemetry Stream</h3>
              <p className="text-xs text-slate-500">Real-time sampling rates and current hardware vector readings</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ● 5 Sensors Online
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Accelerometer */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Accelerometer</span>
              </div>
              <StatusBadge status={device.sensors.accelerometer.status} size="sm" />
            </div>
            <p className="text-xs font-semibold text-slate-700">{device.sensors.accelerometer.name}</p>
            <div className="mt-3 p-2.5 bg-white rounded-xl border border-slate-200/60 font-mono text-xs text-blue-600 font-bold">
              {device.sensors.accelerometer.reading}
            </div>
            <span className="text-2xs text-slate-400 mt-2 block">Sampling: {device.sensors.accelerometer.sampleRate}</span>
          </div>

          {/* Gyroscope */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <Compass className="w-4 h-4 text-purple-600" />
                <span>Gyroscope (Angular)</span>
              </div>
              <StatusBadge status={device.sensors.gyroscope.status} size="sm" />
            </div>
            <p className="text-xs font-semibold text-slate-700">{device.sensors.gyroscope.name}</p>
            <div className="mt-3 p-2.5 bg-white rounded-xl border border-slate-200/60 font-mono text-xs text-purple-600 font-bold">
              {device.sensors.gyroscope.reading}
            </div>
            <span className="text-2xs text-slate-400 mt-2 block">Sampling: {device.sensors.gyroscope.sampleRate}</span>
          </div>

          {/* Optical PPG */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <Activity className="w-4 h-4 text-red-500" />
                <span>Optical PPG Pulse</span>
              </div>
              <StatusBadge status={device.sensors.heartRateSensor.status} size="sm" />
            </div>
            <p className="text-xs font-semibold text-slate-700">{device.sensors.heartRateSensor.name}</p>
            <div className="mt-3 p-2.5 bg-white rounded-xl border border-slate-200/60 font-mono text-xs text-red-600 font-bold">
              {device.sensors.heartRateSensor.reading}
            </div>
            <span className="text-2xs text-slate-400 mt-2 block">Sampling: {device.sensors.heartRateSensor.sampleRate}</span>
          </div>

          {/* GPS Receiver */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>GNSS / GPS Receiver</span>
              </div>
              <StatusBadge status="ACTIVE" size="sm" />
            </div>
            <p className="text-xs font-semibold text-slate-700">{device.sensors.gpsModule.name}</p>
            <div className="mt-3 p-2.5 bg-white rounded-xl border border-slate-200/60 font-mono text-xs text-emerald-600 font-bold">
              {device.sensors.gpsModule.reading}
            </div>
            <span className="text-2xs text-slate-400 mt-2 block">Sampling: {device.sensors.gpsModule.sampleRate}</span>
          </div>

          {/* Capacitive SOS Button */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                <BellRing className="w-4 h-4 text-rose-600" />
                <span>Physical SOS Button</span>
              </div>
              <StatusBadge status="ACTIVE" size="sm" />
            </div>
            <p className="text-xs font-semibold text-slate-700">{device.sensors.sosButton.name}</p>
            <div className="mt-3 p-2.5 bg-white rounded-xl border border-slate-200/60 font-mono text-xs text-slate-800 font-bold">
              {device.sensors.sosButton.reading}
            </div>
            <span className="text-2xs text-slate-400 mt-2 block">Mode: Hardware Interrupt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
