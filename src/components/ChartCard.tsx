import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  badge,
  actions,
  children
}) => {
  const { theme } = useTheme();

  return (
    <div className={`rounded-2xl p-5 sm:p-6 border shadow-xs transition-colors ${
      theme === 'black-purple'
        ? 'bg-[#120d1e] border-purple-900/40 text-white'
        : theme === 'black-white'
        ? 'bg-[#0c0c0c] border-neutral-800 text-white'
        : 'bg-white border-slate-200/80 text-slate-900'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              theme === 'black-purple'
                ? 'bg-purple-950/80 text-purple-300 border border-purple-800/50'
                : theme === 'black-white'
                ? 'bg-neutral-800 text-white'
                : 'bg-blue-50 text-blue-600'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold">{title}</h3>
              {badge}
            </div>
            {subtitle && <p className="text-xs opacity-70 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
};

export default ChartCard;
