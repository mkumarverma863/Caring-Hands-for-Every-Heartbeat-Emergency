import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: string;
  badge?: React.ReactNode;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
  trend,
  badge,
  onClick
}) => {
  const { theme } = useTheme();

  const defaultIconBg = theme === 'black-purple' ? 'bg-purple-950/80' : theme === 'black-white' ? 'bg-neutral-800' : 'bg-blue-50';
  const defaultIconColor = theme === 'black-purple' ? 'text-purple-300' : theme === 'black-white' ? 'text-white' : 'text-blue-600';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 border shadow-xs hover:shadow-md transition-all duration-200 ${
        theme === 'black-purple'
          ? 'bg-[#120d1e] border-purple-900/40 hover:border-purple-600/60 text-white'
          : theme === 'black-white'
          ? 'bg-[#0c0c0c] border-neutral-800 hover:border-neutral-600 text-white'
          : 'bg-white border-slate-200/80 hover:border-blue-300 text-slate-900'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg || defaultIconBg} ${iconColor || defaultIconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${
              theme === 'black-purple' ? 'text-purple-300/70' : theme === 'black-white' ? 'text-neutral-400' : 'text-slate-500'
            }`}>{title}</h4>
            {badge && <div className="mt-0.5">{badge}</div>}
          </div>
        </div>
      </div>

      <div className="flex items-baseline space-x-1.5">
        <span className="text-2xl sm:text-3xl font-black tracking-tight">{value}</span>
        {unit && <span className="text-sm font-semibold opacity-70">{unit}</span>}
      </div>

      {(subtitle || trend) && (
        <div className="mt-2 text-xs flex items-center justify-between opacity-75">
          {subtitle && <span>{subtitle}</span>}
          {trend && <span className={theme === 'black-purple' ? 'text-purple-300 font-bold' : 'font-medium text-emerald-500'}>{trend}</span>}
        </div>
      )}
    </div>
  );
};

export default StatCard;
