import React from 'react';
import { Bluetooth, BluetoothSearching, CheckCircle2, XCircle, Info, RefreshCw, Radio } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';
import StatusBadge from './StatusBadge';

export const BluetoothStatus: React.FC = () => {
  const {
    device,
    isBluetoothSupported,
    bluetoothStatusText,
    isScanning,
    scanMessage,
    scanDevice,
    connectDevice,
    disconnectDevice
  } = useDevice();

  const isConnected = device.bluetoothState === 'Connected';
  const isConnecting = device.bluetoothState === 'Connecting' || isScanning;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              isConnected
                ? 'bg-blue-50 text-blue-600'
                : isConnecting
                ? 'bg-amber-50 text-amber-600 animate-spin'
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Bluetooth className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Bluetooth BLE Connection</h3>
            <p className="text-xs text-slate-500">Wireless Telemetry & GATT Sync</p>
          </div>
        </div>

        <StatusBadge status={bluetoothStatusText} pulse={isConnecting} size="md" />
      </div>

      {/* Web Bluetooth API Support Notice */}
      {!isBluetoothSupported ? (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Web Bluetooth is not supported in this browser.</span>
            <p className="mt-0.5 text-amber-700">
              Demo Mode enabled. You can safely simulate connection, scans, and telemetry.
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Web Bluetooth API is supported by your browser environment.</span>
        </div>
      )}

      {/* Live Status Details */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div className="p-3 bg-slate-50 rounded-xl">
          <span className="text-2xs font-semibold text-slate-400 uppercase">Device Name</span>
          <p className="font-bold text-slate-800 mt-0.5 truncate">{device.deviceName}</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl">
          <span className="text-2xs font-semibold text-slate-400 uppercase">Signal (RSSI)</span>
          <p className="font-bold text-slate-800 mt-0.5 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-emerald-500" />
            {isConnected ? `${device.bluetoothRssi} dBm (Strong)` : 'No Signal'}
          </p>
        </div>
      </div>

      {/* Scan Message / Activity feedback */}
      {scanMessage && (
        <p className="text-xs text-slate-600 mb-4 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 font-medium">
          {scanMessage}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={scanDevice}
          disabled={isScanning}
          className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <BluetoothSearching className="w-3.5 h-3.5" />
              Scan for Device
            </>
          )}
        </button>

        {!isConnected ? (
          <button
            onClick={connectDevice}
            disabled={isConnecting}
            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Connect
          </button>
        ) : (
          <button
            onClick={disconnectDevice}
            className="py-2.5 px-4 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5" />
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default BluetoothStatus;
