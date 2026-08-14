import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ShieldCheck, Heart, Users, ChevronDown, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const ProfileMenu: React.FC = () => {
  const { user, logout, demoLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const isCaregiver = user.role.toLowerCase().includes('caregiver');

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-3 p-1.5 rounded-xl transition-colors cursor-pointer ${
          theme === 'black-purple'
            ? 'hover:bg-purple-900/40 text-white'
            : theme === 'black-white'
            ? 'hover:bg-neutral-800 text-white'
            : 'hover:bg-slate-100 text-slate-900'
        }`}
        aria-label="User Profile Menu"
      >
        <img
          src={user.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'}
          alt={user.name}
          className={`w-9 h-9 rounded-full object-cover ring-2 ${
            theme === 'black-purple' ? 'ring-purple-500' : theme === 'black-white' ? 'ring-white' : 'ring-blue-500/20'
          }`}
        />
        <div className="hidden md:block text-left">
          <p className="text-xs font-bold leading-tight">{user.name}</p>
          <span className={`text-2xs font-semibold px-1.5 py-0.5 rounded ${
            theme === 'black-purple'
              ? 'text-purple-300 bg-purple-900/60'
              : theme === 'black-white'
              ? 'text-white bg-neutral-800'
              : 'text-blue-600 bg-blue-50'
          }`}>
            {user.role}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 opacity-60 hidden sm:block" />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl py-2 z-50 border animate-in fade-in slide-in-from-top-2 duration-150 ${
          theme === 'black-purple'
            ? 'bg-[#150f24] border-purple-800/60 text-white'
            : theme === 'black-white'
            ? 'bg-[#121212] border-neutral-700 text-white'
            : 'bg-white border-slate-200/80 text-slate-900'
        }`}>
          <div className={`px-4 py-3 border-b ${
            theme === 'black-purple' ? 'border-purple-900/40' : theme === 'black-white' ? 'border-neutral-800' : 'border-slate-100'
          }`}>
            <p className="text-xs font-bold">{user.name}</p>
            <p className="text-xs opacity-75 truncate">{user.email}</p>
            <div className={`mt-2 inline-flex items-center gap-1.5 text-2xs font-semibold px-2 py-0.5 rounded-md ${
              theme === 'black-purple'
                ? 'text-purple-300 bg-purple-900/50'
                : theme === 'black-white'
                ? 'text-white bg-neutral-800'
                : 'text-emerald-700 bg-emerald-50'
            }`}>
              <ShieldCheck className="w-3 h-3" />
              <span>Research Demo Account</span>
            </div>
          </div>

          {/* Theme Quick Toggle item */}
          <div className={`px-2 py-2 border-b ${
            theme === 'black-purple' ? 'border-purple-900/40' : theme === 'black-white' ? 'border-neutral-800' : 'border-slate-100'
          }`}>
            <button
              onClick={() => toggleTheme()}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                theme === 'black-purple'
                  ? 'text-purple-300 bg-purple-900/40 hover:bg-purple-900/70'
                  : theme === 'black-white'
                  ? 'text-white bg-neutral-800 hover:bg-neutral-700'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              <span className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-purple-400" />
                <span>Active Theme</span>
              </span>
              <span className="text-2xs font-mono font-bold uppercase opacity-80">{theme}</span>
            </button>
          </div>

          {/* Switch Role Quick Action */}
          <div className={`px-2 py-2 border-b ${
            theme === 'black-purple' ? 'border-purple-900/40' : theme === 'black-white' ? 'border-neutral-800' : 'border-slate-100'
          }`}>
            <button
              onClick={async () => {
                await demoLogin(isCaregiver ? 'Elderly' : 'Caregiver');
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                theme === 'black-purple'
                  ? 'text-purple-200 bg-purple-950/80 hover:bg-purple-900/50'
                  : theme === 'black-white'
                  ? 'text-white bg-neutral-800 hover:bg-neutral-700'
                  : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Switch to {isCaregiver ? 'Elderly User' : 'Caregiver'}
              </span>
              <span className="text-2xs opacity-75">Quick</span>
            </button>
          </div>

          <div className="py-1">
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2.5 px-4 py-2 text-xs font-medium transition-colors ${
                theme === 'black-purple'
                  ? 'text-purple-200 hover:bg-purple-950/60 hover:text-white'
                  : theme === 'black-white'
                  ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              <Settings className="w-4 h-4 opacity-70" />
              <span>Appearance & Settings</span>
            </Link>
            <Link
              to="/health"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2.5 px-4 py-2 text-xs font-medium transition-colors ${
                theme === 'black-purple'
                  ? 'text-purple-200 hover:bg-purple-950/60 hover:text-white'
                  : theme === 'black-white'
                  ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
              }`}
            >
              <Heart className="w-4 h-4 opacity-70" />
              <span>Health Metrics</span>
            </Link>
          </div>

          <div className={`pt-1 border-t ${
            theme === 'black-purple' ? 'border-purple-900/40' : theme === 'black-white' ? 'border-neutral-800' : 'border-slate-100'
          }`}>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
                navigate('/login');
              }}
              className="w-full flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
