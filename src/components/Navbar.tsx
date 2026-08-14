import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, ShieldAlert, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import { useDevice } from '../context/DeviceContext';
import { useTheme } from '../context/ThemeContext';
import ProfileMenu from './ProfileMenu';
import { initialNotifications } from '../data/notificationData';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { fallStatus, activeSOS, openSOSModal } = useAlert();
  const { device } = useDevice();
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markItemRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const currentDateFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 transition-colors border-b ${
      theme === 'black-purple'
        ? 'bg-[#0f0a1c]/90 border-purple-900/30'
        : theme === 'black-white'
        ? 'bg-[#0a0a0a]/90 border-neutral-800'
        : 'bg-white/95 border-slate-200/80'
    }`}>
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Mobile Menu + Greeting */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              theme === 'black-purple'
                ? 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                : theme === 'black-white'
                ? 'text-white hover:bg-neutral-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h2 className={`text-base sm:text-lg font-bold leading-tight ${
              theme === 'black-purple' ? 'text-white' : theme === 'black-white' ? 'text-white' : 'text-slate-900'
            }`}>
              Welcome back, <span className={
                theme === 'black-purple' ? 'text-purple-400 font-extrabold' : theme === 'black-white' ? 'text-white underline underline-offset-4' : 'text-blue-600'
              }>{user?.name || 'Caregiver'}</span>
            </h2>
            <div className={`flex items-center gap-2 text-xs mt-0.5 ${
              theme === 'black-purple' ? 'text-purple-300/70' : theme === 'black-white' ? 'text-neutral-400' : 'text-slate-500'
            }`}>
              <Calendar className="w-3.5 h-3.5 opacity-70" />
              <span>{currentDateFormatted}</span>
              <span className="opacity-40">•</span>
              <span className={`font-semibold flex items-center gap-1 ${
                theme === 'black-purple' ? 'text-purple-300' : 'text-emerald-500'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  theme === 'black-purple' ? 'bg-purple-400 animate-pulse' : 'bg-emerald-500'
                }`} />
                Live Monitoring
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: SOS Button + Notifications + Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Quick SOS Trigger Button in Header */}
          <button
            onClick={openSOSModal}
            className={`hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-white shadow-sm transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
              activeSOS || fallStatus !== 'SAFE'
                ? 'bg-red-600 animate-pulse-ring'
                : 'bg-red-600 hover:bg-red-700 shadow-red-500/20'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>SOS</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2.5 rounded-xl transition-colors cursor-pointer ${
                theme === 'black-purple'
                  ? 'text-purple-200 hover:text-white hover:bg-purple-900/40'
                  : theme === 'black-white'
                  ? 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center ring-2 ring-purple-950">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl py-3 z-50 border animate-in fade-in slide-in-from-top-2 duration-150 ${
                theme === 'black-purple'
                  ? 'bg-[#150f24] border-purple-800/60 text-white'
                  : theme === 'black-white'
                  ? 'bg-[#121212] border-neutral-700 text-white'
                  : 'bg-white border-slate-200/80 text-slate-900'
              }`}>
                <div className={`px-4 pb-2 border-b flex items-center justify-between ${
                  theme === 'black-purple' ? 'border-purple-900/40' : theme === 'black-white' ? 'border-neutral-800' : 'border-slate-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${
                        theme === 'black-purple' ? 'bg-purple-900/70 text-purple-200' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className={`text-xs font-semibold cursor-pointer ${
                        theme === 'black-purple' ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-800'
                      }`}
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-purple-900/20 px-2 py-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-6">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markItemRead(n.id)}
                        className={`p-3 rounded-xl transition-colors cursor-pointer ${
                          theme === 'black-purple'
                            ? (!n.read ? 'bg-purple-950/70 font-medium' : 'hover:bg-purple-950/40')
                            : theme === 'black-white'
                            ? (!n.read ? 'bg-neutral-800 font-medium' : 'hover:bg-neutral-900')
                            : (!n.read ? 'bg-blue-50/50 font-medium' : 'hover:bg-slate-50')
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-bold">{n.title}</p>
                            <p className="text-xs opacity-80 mt-0.5">{n.message}</p>
                            <span className="text-2xs opacity-50 mt-1.5 block">{n.timestamp}</span>
                          </div>
                          {!n.read && (
                            <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-1" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
