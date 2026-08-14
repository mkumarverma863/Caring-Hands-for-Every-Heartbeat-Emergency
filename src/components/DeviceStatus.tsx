import React from 'react';
import { Watch, Battery, RefreshCw, Cpu, Wifi } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';
import StatusBadge from './StatusBadge';

export const DeviceStatus: React.FC = () => {
  const { device } = useDevice();

  const isConnected = device.connectionStatus === 'Connected';
  const isBatteryLow = device.batteryLevel < 20;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              isConnected ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'
            }`}
          >
            <Watch className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{device.deviceName}</h3>
            <p className="text-xs text-slate-500">ID: {device.deviceId}</p>
          </div>
        </div>

        <StatusBadge status={device.connectionStatus} size="md" />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Battery Card */}
        <div className="p-3.5 bg-slate-50 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="flex items-center gap-1 font-semibold">
              <Battery className={`w-3.5 h-3.5 ${isBatteryLow ? 'text-red-500' : 'text-emerald-500'}`} />
              Battery
            </span>
            <span className={`font-bold ${isBatteryLow ? 'text-red-600' : 'text-slate-800'}`}>
              {device.batteryLevel}%
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isBatteryLow ? 'bg-red-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${device.batteryLevel}%` }}
            />
          </div>
        </div>

        {/* Sync Card */}
        <div className="p-3.5 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mb-1">
            <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
            <span>Last Sync</span>
          </div>
          <p className="text-xs font-bold text-slate-800 truncate">{device.lastSyncTime}</p>
        </div>
      </div>

      {/* Hardware / Firmware */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
        <span className="flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 text-slate-400" />
          <span>Firmware: {device.firmwareVersion}</span>
        </span>
        <span className="flex items-center gap-1 font-medium text-slate-600">
          <Wifi className="w-3.5 h-3.5 text-emerald-500" />
          <span>{device.bluetoothRssi} dBm</span>
        </span>
      </div>
    </div>
  );
};

export default DeviceStatus;
