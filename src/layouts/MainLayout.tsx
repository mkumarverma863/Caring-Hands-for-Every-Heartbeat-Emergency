import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';
import Navbar from '../components/Navbar';
import DemoBanner from '../components/DemoBanner';
import EmergencyModal from '../components/EmergencyModal';
import SOSButton from '../components/SOSButton';
import { useTheme } from '../context/ThemeContext';

export const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col antialiased transition-colors duration-200 ${
      theme === 'black-purple' 
        ? 'bg-[#08060e] text-slate-100' 
        : theme === 'black-white'
        ? 'bg-black text-white'
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Demo Banner with interactive simulation toolbox & quick theme switcher */}
      <DemoBanner />

      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:shrink-0">
          <Sidebar />
        </div>

        {/* Mobile Slide-out Sidebar */}
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Navbar onMenuClick={() => setMobileMenuOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
            <Outlet />
          </main>

          {/* Research Prototype Footer Notice */}
          <footer className={`border-t py-4 px-6 text-center text-xs transition-colors ${
            theme === 'black-purple'
              ? 'border-purple-900/30 bg-[#0d0918]/80 text-purple-300/70'
              : theme === 'black-white'
              ? 'border-neutral-800 bg-[#0a0a0a] text-neutral-400'
              : 'border-slate-200/80 bg-white/70 text-slate-500'
          }`}>
            <p>
              <span className={`font-semibold ${
                theme === 'black-purple' ? 'text-purple-200' : theme === 'black-white' ? 'text-white' : 'text-slate-700'
              }`}>
                ElderGuard Research Prototype
              </span> • Designed for elderly safety and wearable health assistance.
            </p>
            <p className="text-2xs opacity-75 mt-0.5">
              Notice: All health telemetry, GPS coordinates, and alerts are simulated Demo Data. Not a certified medical device.
            </p>
          </footer>
        </div>
      </div>

      {/* Persistent Emergency Modal triggered by any SOS event */}
      <EmergencyModal />

      {/* Floating SOS button on mobile screens for quick 1-touch access */}
      <div className="lg:hidden">
        <SOSButton variant="floating" />
      </div>
    </div>
  );
};

export default MainLayout;
