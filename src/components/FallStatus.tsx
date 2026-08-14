import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, Activity, Check, X, RotateCcw } from 'lucide-react';
import { useAlert } from '../context/AlertContext';
import { useTheme } from '../context/ThemeContext';
import StatusBadge from './StatusBadge';

export const FallStatus: React.FC = () => {
  const {
    fallStatus,
    fallConfidence,
    lastFallTime,
    fallCountdown,
    simulateFall,
    cancelFallCountdown,
    confirmFallDetected,
    resetAllAlerts
  } = useAlert();
  const { theme } = useTheme();

  return (
    <div className={`rounded-2xl p-5 sm:p-6 border shadow-xs transition-colors ${
      theme === 'black-purple'
        ? 'bg-[#120d1e] border-purple-900/40 text-white'
        : theme === 'black-white'
        ? 'bg-[#0c0c0c] border-neutral-800 text-white'
        : 'bg-white border-slate-200/80 text-slate-900'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              fallStatus === 'SAFE'
                ? (theme === 'black-purple' ? 'bg-purple-950/80 text-purple-300' : 'bg-emerald-50 text-emerald-600')
                : fallStatus === 'POSSIBLE_FALL'
                ? 'bg-amber-50 text-amber-600 animate-bounce'
                : 'bg-red-50 text-red-600 animate-pulse'
            }`}
          >
            {fallStatus === 'SAFE' && <ShieldCheck className="w-6 h-6" />}
            {fallStatus === 'POSSIBLE_FALL' && <AlertTriangle className="w-6 h-6" />}
            {fallStatus === 'FALL_DETECTED' && <ShieldAlert className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-base font-bold">Fall Detection Status</h3>
            <p className="text-xs opacity-70">Continuous Wearable Accelerometer Monitoring</p>
          </div>
        </div>

        <StatusBadge
          status={fallStatus === 'POSSIBLE_FALL' ? 'POSSIBLE FALL' : fallStatus === 'FALL_DETECTED' ? 'FALL DETECTED' : 'SAFE'}
          pulse={fallStatus !== 'SAFE'}
          size="md"
        />
      </div>

      {/* Possible Fall Countdown Alert Box */}
      {fallStatus === 'POSSIBLE_FALL' && (
        <div className="my-4 p-4 sm:p-5 bg-amber-950/40 border-2 border-amber-500 rounded-2xl animate-pulse-warning text-amber-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-black font-extrabold text-xl flex items-center justify-center">
                {fallCountdown}s
              </div>
              <div>
                <h4 className="text-base font-extrabold text-amber-300">Possible Fall Detected!</h4>
                <p className="text-xs text-amber-200/90">
                  Are you okay? Automatic SOS alert will dispatch when timer reaches 0.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={cancelFallCountdown}
              className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              I'M OKAY (CANCEL ALERT)
            </button>
            <button
              onClick={confirmFallDetected}
              className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              SEND HELP NOW
            </button>
          </div>
        </div>
      )}

      {/* Fall Detected Alert Box */}
      {fallStatus === 'FALL_DETECTED' && (
        <div className="my-4 p-4 sm:p-5 bg-red-950/40 border-2 border-red-500 rounded-2xl text-red-200">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-base font-extrabold text-red-300">Fall Incident Dispatched</h4>
              <p className="text-xs opacity-90 mt-1">
                Emergency response triggered. Contacts notified with GPS location and telemetry.
              </p>
            </div>
            <button
              onClick={resetAllAlerts}
              className="px-3 py-1.5 bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset State
            </button>
          </div>
        </div>
      )}

      {/* Fall Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <div className={`p-3 rounded-xl ${
          theme === 'black-purple' ? 'bg-[#1a132b]' : theme === 'black-white' ? 'bg-neutral-900' : 'bg-slate-50'
        }`}>
          <span className="text-2xs font-semibold opacity-60 uppercase">Detection Confidence</span>
          <p className="text-sm font-bold mt-0.5">{fallConfidence}% AI Fusion</p>
        </div>
        <div className={`p-3 rounded-xl ${
          theme === 'black-purple' ? 'bg-[#1a132b]' : theme === 'black-white' ? 'bg-neutral-900' : 'bg-slate-50'
        }`}>
          <span className="text-2xs font-semibold opacity-60 uppercase">Last Incident</span>
          <p className="text-sm font-bold mt-0.5 truncate">{lastFallTime}</p>
        </div>
        <div className={`p-3 rounded-xl col-span-2 sm:col-span-1 ${
          theme === 'black-purple' ? 'bg-[#1a132b]' : theme === 'black-white' ? 'bg-neutral-900' : 'bg-slate-50'
        }`}>
          <span className="text-2xs font-semibold opacity-60 uppercase">Sensor Fusion</span>
          <p className={`text-sm font-bold mt-0.5 ${
            theme === 'black-purple' ? 'text-purple-300' : 'text-emerald-600'
          }`}>Dual-Axis Active</p>
        </div>
      </div>

      {/* Demo Simulation Action Button */}
      {fallStatus === 'SAFE' && (
        <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
          theme === 'black-purple' ? 'border-purple-900/30' : theme === 'black-white' ? 'border-neutral-800' : 'border-slate-100'
        }`}>
          <span className="text-xs opacity-75 font-medium">Test sensor response algorithm:</span>
          <button
            onClick={simulateFall}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              theme === 'black-purple'
                ? 'text-purple-200 bg-purple-900/50 hover:bg-purple-900/80 border border-purple-700/50'
                : theme === 'black-white'
                ? 'text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700'
                : 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Simulate Fall Event
          </button>
        </div>
      )}
    </div>
  );
};

export default FallStatus;
