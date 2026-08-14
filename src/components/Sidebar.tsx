import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  HeartPulse,
  ShieldAlert,
  BellRing,
  MapPin,
  Watch,
  Settings,
  LogOut,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import { useDevice } from '../context/DeviceContext';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const { logout } = useAuth();
  const { fallStatus, activeSOS } = useAlert();
  const { device } = useDevice();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const isAlarmActive = !!activeSOS || fallStatus !== 'SAFE';

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: 'Health Monitoring',
      path: '/health',
      icon: HeartPulse,
      badge: '74 BPM'
    },
    {
      name: 'Fall Detection',
      path: '/falls',
      icon: ShieldAlert,
      badge: fallStatus !== 'SAFE' ? 'ALERT' : null,
      badgeColor: fallStatus === 'FALL_DETECTED' ? 'bg-red-500 text-white' : fallStatus === 'POSSIBLE_FALL' ? 'bg-amber-500 text-white' : undefined
    },
    {
      name: 'Emergency SOS',
      path: '/sos',
      icon: BellRing,
      badge: activeSOS ? 'ACTIVE' : null,
      badgeColor: 'bg-red-600 text-white'
    },
    {
      name: 'Live Location',
      path: '/location',
      icon: MapPin,
      badge: 'Home'
    },
    {
      name: 'Device & Bluetooth',
      path: '/device',
      icon: Watch,
      badge: device.connectionStatus === 'Connected' ? `${device.batteryLevel}%` : 'Offline',
      badgeColor: device.connectionStatus === 'Connected' 
        ? (theme === 'black-purple' ? 'bg-purple-900/60 text-purple-200' : 'bg-emerald-100 text-emerald-700') 
        : 'bg-slate-200 text-slate-600'
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      badge: null
    }
  ];

  const getActiveClasses = (isActive: boolean) => {
    if (theme === 'black-purple') {
      return isActive
        ? 'bg-purple-900/50 text-purple-200 border border-purple-700/50 shadow-sm shadow-purple-950'
        : 'text-slate-400 hover:bg-purple-950/40 hover:text-purple-200';
    }
    if (theme === 'black-white') {
      return isActive
        ? 'bg-white text-black font-bold shadow-sm'
        : 'text-neutral-400 hover:bg-neutral-900 hover:text-white';
    }
    return isActive
      ? 'bg-blue-50 text-blue-700 shadow-xs'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900';
  };

  return (
    <aside className={`w-64 flex flex-col h-full select-none transition-colors border-r ${
      theme === 'black-purple'
        ? 'bg-[#0f0a1c] border-purple-900/30'
        : theme === 'black-white'
        ? 'bg-[#0a0a0a] border-neutral-800'
        : 'bg-white border-slate-200/80'
    }`}>
      {/* Brand Header */}
      <div className={`p-5 border-b flex items-center space-x-3 ${
        theme === 'black-purple'
          ? 'border-purple-900/30'
          : theme === 'black-white'
          ? 'border-neutral-800'
          : 'border-slate-100'
      }`}>
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md ${
          theme === 'black-purple'
            ? 'bg-linear-to-tr from-purple-600 to-indigo-600 shadow-purple-900/50'
            : theme === 'black-white'
            ? 'bg-white text-black shadow-neutral-800'
            : 'bg-linear-to-tr from-blue-600 to-indigo-600 shadow-blue-500/30'
        }`}>
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className={`text-lg font-black tracking-tight ${
              theme === 'black-purple' ? 'text-white' : theme === 'black-white' ? 'text-white' : 'text-slate-900'
            }`}>
              ELDERGUARD
            </h1>
          </div>
          <p className={`text-2xs font-semibold uppercase tracking-wider ${
            theme === 'black-purple' ? 'text-purple-400' : theme === 'black-white' ? 'text-neutral-400' : 'text-blue-600'
          }`}>
            Elderly Safety IoT
          </p>
        </div>
      </div>

      {/* Navigation list */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        <div className={`px-3 pb-2 text-2xs font-bold uppercase tracking-wider ${
          theme === 'black-purple' ? 'text-purple-400/60' : theme === 'black-white' ? 'text-neutral-500' : 'text-slate-400'
        }`}>
          Main Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${getActiveClasses(
                  isActive
                )}`
              }
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 transition-colors ${
                  theme === 'black-purple' ? 'text-purple-400 group-hover:text-purple-300' : 'text-slate-400'
                }`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-2xs font-bold px-2 py-0.5 rounded-full ${
                    item.badgeColor || (
                      theme === 'black-purple' 
                        ? 'bg-purple-800/80 text-purple-200' 
                        : theme === 'black-white'
                        ? 'bg-neutral-800 text-white'
                        : 'bg-blue-100 text-blue-700'
                    )
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Wearable Connection Quick Card */}
      <div className={`p-3 mx-3 mb-3 rounded-2xl border text-xs ${
        theme === 'black-purple'
          ? 'bg-[#181126] border-purple-800/40 text-purple-200'
          : theme === 'black-white'
          ? 'bg-neutral-900 border-neutral-800 text-white'
          : 'bg-slate-50 border-slate-200/80 text-slate-700'
      }`}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                device.connectionStatus === 'Connected' ? (theme === 'black-purple' ? 'bg-purple-400' : 'bg-emerald-500') : 'bg-red-500'
              }`}
            />
            {device.deviceName}
          </span>
          <span className="font-semibold opacity-75">{device.batteryLevel}%</span>
        </div>
        <div className={`w-full rounded-full h-1.5 overflow-hidden ${
          theme === 'black-purple' ? 'bg-purple-950' : theme === 'black-white' ? 'bg-neutral-800' : 'bg-slate-200'
        }`}>
          <div
            className={`h-1.5 rounded-full ${
              device.batteryLevel > 20 
                ? (theme === 'black-purple' ? 'bg-purple-500' : 'bg-emerald-500') 
                : 'bg-red-500'
            }`}
            style={{ width: `${device.batteryLevel}%` }}
          />
        </div>
      </div>

      {/* User Footer / Logout */}
      <div className={`p-3 border-t ${
        theme === 'black-purple' ? 'border-purple-900/30' : theme === 'black-white' ? 'border-neutral-800' : 'border-slate-100'
      }`}>
        <button
          onClick={() => {
            logout();
            if (onItemClick) onItemClick();
            navigate('/login');
          }}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            theme === 'black-purple'
              ? 'text-purple-300 hover:text-red-400 hover:bg-purple-950/60'
              : theme === 'black-white'
              ? 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </div>
          <span className="text-2xs opacity-60">v2.4 Demo</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
