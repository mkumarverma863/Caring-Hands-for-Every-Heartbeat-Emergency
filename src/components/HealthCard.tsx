import React from 'react';
import { Heart, Activity, Moon, Battery, Shield, Compass, Sparkles } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface HealthCardProps {
  type: 'heart' | 'steps' | 'sleep' | 'bp' | 'spo2' | 'temp';
  value: string | number;
  unit: string;
  status: string;
  details?: string;
  progress?: number;
}

export const HealthCard: React.FC<HealthCardProps> = ({
  type,
  value,
  unit,
  status,
  details,
  progress
}) => {
  const configs = {
    heart: {
      title: 'Heart Rate',
      icon: Heart,
      color: 'text-red-500',
      bg: 'bg-red-50',
      barColor: 'bg-red-500'
    },
    steps: {
      title: 'Daily Steps',
      icon: Activity,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      barColor: 'bg-blue-600'
    },
    sleep: {
      title: 'Sleep Duration',
      icon: Moon,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      barColor: 'bg-indigo-600'
    },
    bp: {
      title: 'Blood Pressure',
      icon: Shield,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      barColor: 'bg-purple-600'
    },
    spo2: {
      title: 'Blood Oxygen (SpO2)',
      icon: Sparkles,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      barColor: 'bg-teal-600'
    },
    temp: {
      title: 'Body Temperature',
      icon: Compass,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      barColor: 'bg-amber-600'
    }
  };

  const cfg = configs[type] || configs.heart;
  const Icon = cfg.icon;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bg} ${cfg.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{cfg.title}</h4>
            <span className="text-2xs text-slate-400">Continuous Wearable Metric</span>
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>

      <div className="flex items-baseline space-x-1.5 my-2">
        <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
        <span className="text-sm font-semibold text-slate-500">{unit}</span>
      </div>

      {progress !== undefined && (
        <div className="w-full bg-slate-100 rounded-full h-2 my-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${cfg.barColor}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}

      {details && <p className="text-xs text-slate-500 mt-2 font-medium">{details}</p>}
    </div>
  );
};

export default HealthCard;
