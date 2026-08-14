import React, { useState } from 'react';
import { Sparkles, Activity, BellRing, WifiOff, BatteryWarning, CheckCircle2, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useAlert } from '../context/AlertContext';
import { useDevice } from '../context/DeviceContext';
import ThemeSelector from './ThemeSelector';

export const DemoBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { simulateFall, triggerSOS, resetAllAlerts } = useAlert();
  const { simulateOffline, simulateLowBattery, simulateConnected, rechargeBattery } = useDevice();

  return (
    <div className="bg-slate-950 text-white text-xs border-b border-purple-900/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="font-bold tracking-wide text-purple-300 uppercase text-2xs">
            Student Research Prototype
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-300 font-medium hidden sm:inline">
            Simulated Health & Safety Telemetry
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Theme Switcher */}
          <ThemeSelector variant="compact" />

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-purple-900/40 hover:bg-purple-900/70 text-purple-200 border border-purple-700/50 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Simulations</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-slate-950/90 border-t border-slate-800 px-4 sm:px-6 lg:px-8 py-3 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-200">Interactive Simulation Toolbox</p>
              <p className="text-2xs text-slate-400">
                Trigger real-time wearable events to test algorithms, countdowns, and emergency dispatch alerts.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={simulateFall}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
                Simulate Fall
              </button>

              <button
                onClick={() => triggerSOS('Demo Bar Simulation Button')}
                className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BellRing className="w-3.5 h-3.5" />
                Simulate SOS
              </button>

              <button
                onClick={simulateOffline}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <WifiOff className="w-3.5 h-3.5" />
                Simulate Offline
              </button>

              <button
                onClick={simulateLowBattery}
                className="px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BatteryWarning className="w-3.5 h-3.5" />
                Low Battery (14%)
              </button>

              <button
                onClick={simulateConnected}
                className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Bluetooth Connected
              </button>

              <button
                onClick={() => {
                  resetAllAlerts();
                  rechargeBattery();
                  simulateConnected();
                }}
                className="px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/50 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset all states to safe standard"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset State
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoBanner;
