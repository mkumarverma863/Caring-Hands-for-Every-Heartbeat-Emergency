import React from 'react';
import { Palette, Moon, Sun, Sparkles, Check } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface ThemeSelectorProps {
  variant?: 'compact' | 'full' | 'dropdown';
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ variant = 'compact', className = '' }) => {
  const { theme, setTheme } = useTheme();

  const themes: { id: ThemeMode; name: string; icon: any; desc: string; badge: string; color: string; ringColor: string }[] = [
    {
      id: 'black-purple',
      name: 'Black & Purple',
      icon: Sparkles,
      desc: 'Deep Midnight Dark with Electric Purple & Violet accents',
      badge: '🟣 Black Purple',
      color: 'bg-purple-950 border-purple-500 text-purple-200',
      ringColor: 'ring-purple-500'
    },
    {
      id: 'black-white',
      name: 'Black & White',
      icon: Moon,
      desc: 'Monochrome High-Contrast Pure Black & Stark White',
      badge: '⚪⚫ B & W',
      color: 'bg-neutral-900 border-neutral-400 text-white',
      ringColor: 'ring-neutral-400'
    },
    {
      id: 'minimal-light',
      name: 'Clean Light',
      icon: Sun,
      desc: 'Minimalist Clean White & Slate aesthetic',
      badge: '☀️ Light',
      color: 'bg-slate-100 border-slate-300 text-slate-700',
      ringColor: 'ring-slate-400'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center p-1 bg-black/20 backdrop-blur-xs rounded-xl border border-white/10 ${className}`}>
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              title={`${t.name}: ${t.desc}`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-sm ring-1 ring-white/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Full Card selector (for Settings page or modals)
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setTheme(t.id)}
            className={`p-4 rounded-2xl border text-left transition-all relative cursor-pointer flex flex-col justify-between ${
              isActive
                ? `${t.color} ring-2 ${t.ringColor} shadow-md`
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wider">{t.name}</span>
                </div>
                {isActive && (
                  <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <p className="text-2xs opacity-80 leading-relaxed">{t.desc}</p>
            </div>

            <div className="mt-4 pt-2 border-t border-white/10 flex items-center gap-1.5">
              <span className="text-2xs font-mono font-semibold opacity-90">{t.badge}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSelector;
