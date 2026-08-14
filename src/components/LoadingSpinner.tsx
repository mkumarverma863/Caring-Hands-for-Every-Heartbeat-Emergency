import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  label = 'Loading ElderGuard data...',
  size = 'md'
}) => {
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10'
  }[size];

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3 text-slate-500">
      <Loader2 className={`${iconSizes} text-blue-600 animate-spin`} />
      {label && <p className="text-sm font-medium text-slate-600">{label}</p>}
    </div>
  );
};

export default LoadingSpinner;
