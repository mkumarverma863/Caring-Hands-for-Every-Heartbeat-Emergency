import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  pulse = false
}) => {
  const { theme } = useTheme();
  const normalized = status.toUpperCase();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-500';

  if (
    normalized === 'SAFE' ||
    normalized === 'CONNECTED' ||
    normalized === 'OPTIMAL' ||
    normalized === 'NORMAL' ||
    normalized === 'RESOLVED' ||
    normalized === 'GOOD QUALITY' ||
    normalized === 'ACTIVE' ||
    normalized === 'GOOD'
  ) {
    if (theme === 'black-purple') {
      colorClasses = 'bg-purple-950/80 text-purple-200 border-purple-700/60';
      dotColor = 'bg-purple-400';
    } else if (theme === 'black-white') {
      colorClasses = 'bg-neutral-850 text-white border-neutral-600';
      dotColor = 'bg-white';
    } else {
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      dotColor = 'bg-emerald-500';
    }
  } else if (
    normalized === 'POSSIBLE FALL' ||
    normalized === 'POSSIBLE_FALL' ||
    normalized === 'WARNING' ||
    normalized === 'LOW' ||
    normalized === 'CONNECTING...' ||
    normalized === 'CONNECTING' ||
    normalized === 'SEARCHING' ||
    normalized === 'PENDING' ||
    normalized === 'MEDIUM'
  ) {
    colorClasses = theme === 'black-purple' 
      ? 'bg-amber-950/80 text-amber-200 border-amber-700/60' 
      : theme === 'black-white'
      ? 'bg-neutral-800 text-amber-200 border-amber-600/60'
      : 'bg-amber-50 text-amber-800 border-amber-200';
    dotColor = 'bg-amber-400';
  } else if (
    normalized === 'FALL DETECTED' ||
    normalized === 'FALL_DETECTED' ||
    normalized === 'EMERGENCY' ||
    normalized === 'CRITICAL' ||
    normalized === 'HIGH' ||
    normalized === 'DISCONNECTED' ||
    normalized === 'BLUETOOTH DISCONNECTED' ||
    normalized === 'OFFLINE'
  ) {
    colorClasses = theme === 'black-purple'
      ? 'bg-red-950/80 text-red-200 border-red-700/70'
      : theme === 'black-white'
      ? 'bg-neutral-900 text-red-300 border-red-600'
      : 'bg-red-50 text-red-700 border-red-200';
    dotColor = 'bg-red-500';
  } else if (normalized === 'RESPONDER ASSIGNED') {
    colorClasses = theme === 'black-purple'
      ? 'bg-purple-900/60 text-purple-200 border-purple-600/50'
      : 'bg-blue-50 text-blue-700 border-blue-200';
    dotColor = theme === 'black-purple' ? 'bg-purple-400' : 'bg-blue-500';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-bold px-3 py-1.5 gap-2'
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border ${colorClasses} ${sizeClasses} transition-all`}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
      </span>
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
