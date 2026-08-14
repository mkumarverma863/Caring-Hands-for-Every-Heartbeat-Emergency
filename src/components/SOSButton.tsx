import React from 'react';
import { BellRing, ShieldAlert } from 'lucide-react';
import { useAlert } from '../context/AlertContext';

interface SOSButtonProps {
  size?: 'md' | 'lg' | 'xl';
  variant?: 'banner' | 'floating' | 'card';
}

export const SOSButton: React.FC<SOSButtonProps> = ({
  size = 'lg',
  variant = 'card'
}) => {
  const { openSOSModal, activeSOS, fallStatus } = useAlert();

  const isAlarmActive = !!activeSOS || fallStatus === 'FALL_DETECTED';

  if (variant === 'floating') {
    return (
      <button
        onClick={openSOSModal}
        className={`fixed bottom-6 right-6 z-40 flex items-center space-x-3 px-6 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          isAlarmActive
            ? 'bg-red-600 text-white animate-pulse-ring'
            : 'bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-200 shadow-red-500/40'
        }`}
        aria-label="Emergency SOS"
      >
        <ShieldAlert className="w-6 h-6 animate-bounce" />
        <span className="font-extrabold text-sm tracking-wider uppercase">EMERGENCY SOS</span>
      </button>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="bg-linear-to-r from-red-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-red-500/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>Instant Emergency Assistance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Need Immediate Help?</h2>
          <p className="text-sm text-red-100 max-w-xl">
            Pressing the SOS button alerts your primary caregivers and transcribes live GPS coordinates and biometric vitals.
          </p>
        </div>

        <button
          onClick={openSOSModal}
          className="z-10 group shrink-0 relative flex items-center space-x-3 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <BellRing className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 group-hover:animate-wiggle" />
          <span>EMERGENCY SOS</span>
        </button>
      </div>
    );
  }

  // Default 'card' size
  return (
    <button
      onClick={openSOSModal}
      className={`w-full py-4 sm:py-5 px-6 rounded-2xl font-black text-white shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-3 cursor-pointer ${
        isAlarmActive
          ? 'bg-red-600 animate-pulse-ring'
          : 'bg-red-600 hover:bg-red-700 shadow-red-500/30 ring-4 ring-red-100'
      }`}
    >
      <ShieldAlert className="w-6 h-6" />
      <span className="tracking-wider uppercase text-base sm:text-lg">EMERGENCY SOS</span>
    </button>
  );
};

export default SOSButton;
