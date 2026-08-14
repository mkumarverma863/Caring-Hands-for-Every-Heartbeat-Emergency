import React from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Activity,
  RotateCcw,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  Zap,
  Info,
  Sliders
} from 'lucide-react';
import { useAlert } from '../context/AlertContext';
import { useDevice } from '../context/DeviceContext';
import StatusBadge from '../components/StatusBadge';
import FallStatus from '../components/FallStatus';

export const FallDetectionPage: React.FC = () => {
  const {
    fallStatus,
    fallConfidence,
    lastFallTime,
    fallCountdown,
    fallHistory,
    simulateFall,
    cancelFallCountdown,
    confirmFallDetected,
    resetAllAlerts
  } = useAlert();

  const { device } = useDevice();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Fall Detection System</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time dual-axis accelerometer & gyroscope fusion algorithm with emergency dispatch.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge
            status={
              fallStatus === 'POSSIBLE_FALL'
                ? 'POSSIBLE FALL'
                : fallStatus === 'FALL_DETECTED'
                ? 'FALL DETECTED'
                : 'SAFE'
            }
            pulse={fallStatus !== 'SAFE'}
            size="md"
          />
        </div>
      </div>

      {/* Main Interactive Fall Status Card */}
      <FallStatus />

      {/* Algorithm & Telemetry Sensor Calibration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center space-x-3 text-slate-500 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase">Detection Algorithm</h4>
              <span className="text-2xs text-slate-400">Firmware v2.4 (Research)</span>
            </div>
          </div>
          <p className="text-base font-bold text-slate-900 mt-2">Impact + Tilt Fusion v2.1</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Threshold triggers at &gt; 3.2g impact followed by &gt; 60° tilt orientation deviation.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center space-x-3 text-slate-500 mb-2">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase">Sensitivity Profile</h4>
              <span className="text-2xs text-slate-400">Configurable</span>
            </div>
          </div>
          <p className="text-base font-bold text-slate-900 mt-2">Medium (Standard Home)</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Optimized for living room, kitchen, and bathroom stumble detection with minimal false alarms.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center space-x-3 text-slate-500 mb-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase">Cancel Safety Timer</h4>
              <span className="text-2xs text-slate-400">Escalation Window</span>
            </div>
          </div>
          <p className="text-base font-bold text-slate-900 mt-2">20 Seconds Countdown</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Allows elderly user to dismiss soft stumbles or minor bumps before SMS/SOS dispatches.
          </p>
        </div>
      </div>

      {/* Fall History Table & Event Log */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Fall Incident Log & Audit History</h3>
              <p className="text-xs text-slate-500">Historical records of simulated and detected fall events</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {fallHistory.length} events logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-2xs">
                <th className="pb-3 px-3">Event ID & Timestamp</th>
                <th className="pb-3 px-3">Trigger Type</th>
                <th className="pb-3 px-3">Confidence & Peak</th>
                <th className="pb-3 px-3">Location Coordinates</th>
                <th className="pb-3 px-3">Outcome / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {fallHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-3">
                    <span className="font-bold text-slate-900 block">{item.id}</span>
                    <span className="text-slate-400 text-2xs flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="font-semibold text-slate-800">{item.type}</span>
                    <span className="block text-2xs text-slate-500 mt-0.5">{item.actionTaken}</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="font-bold text-blue-600">{item.confidence}</span>
                    <span className="block text-2xs text-slate-400">Peak: {item.accelerometerPeak}</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.location}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <StatusBadge
                      status={item.status.includes('Dispatched') ? 'FALL DETECTED' : 'RESOLVED'}
                      size="sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FallDetectionPage;
