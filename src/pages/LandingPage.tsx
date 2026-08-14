import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  BellRing,
  HeartPulse,
  MapPin,
  Watch,
  ArrowRight,
  Sparkles,
  Activity,
  CheckCircle2,
  Lock,
  Smartphone,
  Users,
  Heart,
  PlusCircle,
  Building2,
  FileCheck2,
  Stethoscope,
  PhoneCall,
  Flame,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector';
import CardiogramHeartVector from '../components/CardiogramHeartVector';

export const LandingPage: React.FC = () => {
  const { demoLogin, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleQuickDemo = async (role: 'Elderly' | 'Caregiver') => {
    await demoLogin(role);
    navigate('/dashboard');
  };

  const isPurple = theme === 'black-purple';
  const isBw = theme === 'black-white';

  return (
    <div className={`min-h-screen flex flex-col selection:bg-purple-900/50 selection:text-white transition-colors duration-200 ${
      isPurple 
        ? 'bg-[#08060e] text-slate-100' 
        : isBw 
        ? 'bg-black text-white' 
        : 'bg-white text-slate-900'
    }`}>
      {/* Top Banner Notice */}
      <div className={`text-xs py-2 px-4 text-center font-medium transition-colors border-b ${
        isPurple
          ? 'bg-[#120a24] border-purple-900/40 text-purple-200'
          : isBw
          ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
          : 'bg-blue-900 text-white border-blue-800'
      }`}>
        <span className={`font-bold px-2 py-0.5 rounded-full text-2xs mr-2 ${
          isPurple ? 'bg-purple-800 text-white' : isBw ? 'bg-white text-black' : 'bg-blue-700 text-blue-100'
        }`}>
          HEALTHCARE & INSURANCE SAFETY PROTOTYPE
        </span>
        ElderGuard Connected Care: Smart Wearables, Live ECG Cardiogram Telemetry & Hospital Emergency Dispatch
      </div>

      {/* Header / Navbar */}
      <nav className={`backdrop-blur-md sticky top-0 z-40 border-b transition-colors ${
        isPurple
          ? 'bg-[#0b0716]/90 border-purple-900/30'
          : isBw
          ? 'bg-black/90 border-neutral-800'
          : 'bg-white/90 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 ${
              isPurple
                ? 'bg-linear-to-tr from-purple-600 via-fuchsia-600 to-indigo-600 shadow-purple-950/80'
                : isBw
                ? 'bg-white text-black shadow-neutral-800'
                : 'bg-linear-to-tr from-blue-600 to-indigo-600 shadow-blue-500/20'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight">ELDERGUARD</span>
                <span className={`hidden sm:inline-block text-2xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  isPurple ? 'bg-purple-950 text-purple-300 border border-purple-800/40' : isBw ? 'bg-neutral-800 text-white' : 'bg-blue-50 text-blue-600'
                }`}>
                  Health & Care
                </span>
              </div>
              <p className="text-2xs opacity-70">Wearable IoT • Hospital Sync • Fall Protection</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Quick Theme Switcher on Home Page */}
            <ThemeSelector variant="compact" />

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer ${
                  isPurple
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/50'
                    : isBw
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                }`}
              >
                <span>Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`hidden sm:inline-block px-3 py-2 text-sm font-semibold transition-colors ${
                    isPurple ? 'text-purple-200 hover:text-white' : isBw ? 'text-neutral-300 hover:text-white' : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className={`inline-flex items-center space-x-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer ${
                    isPurple
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/50'
                      : isBw
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                  }`}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Hands Holding Heart & Cardiogram Pulse Design */}
      <section className={`relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 border-b ${
        isPurple
          ? 'bg-radial-[at_50%_0%] from-[#1f103d] via-[#0b0617] to-[#08060e] border-purple-900/30'
          : isBw
          ? 'bg-radial-[at_50%_0%] from-neutral-900 via-neutral-950 to-black border-neutral-800'
          : 'bg-linear-to-b from-blue-50/50 via-white to-white border-slate-100'
      }`}>
        {/* Animated ECG Pulse Banner Line passing through */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-15 pointer-events-none overflow-hidden">
          <svg className="w-[200%] h-24 text-purple-500" viewBox="0 0 1200 100" fill="none">
            <path
              d="M0,50 L300,50 L320,20 L340,80 L360,10 L380,90 L400,50 L600,50 L620,20 L640,80 L660,10 L680,90 L700,50 L900,50 L920,20 L940,80 L960,10 L980,90 L1000,50 L1200,50"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Healthcare & Medicine Headline */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                isPurple
                  ? 'bg-purple-950/80 text-purple-300 border border-purple-700/50 shadow-sm shadow-purple-950'
                  : isBw
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                <Heart className={`w-4 h-4 ${isPurple ? 'text-purple-400 fill-purple-400' : isBw ? 'text-white' : 'text-red-500 fill-red-500'}`} />
                <span>Medicine • Health Care • Insurance & Hospital Telemetry</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Caring Hands for Every <span className={`text-transparent bg-clip-text ${
                  isPurple
                    ? 'bg-linear-to-r from-purple-400 via-fuchsia-300 to-violet-400'
                    : isBw
                    ? 'bg-linear-to-r from-white via-neutral-300 to-neutral-500'
                    : 'bg-linear-to-r from-blue-600 to-indigo-600'
                }`}>Heartbeat</span> & Emergency
              </h1>

              <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A modern healthcare protection ecosystem combining real-time optical PPG cardiogram tracking, dual-axis AI fall detection, hospital triage synchronization, and one-touch SOS dispatch.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/register"
                  className={`w-full sm:w-auto px-8 py-4 font-extrabold rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 cursor-pointer text-base ${
                    isPurple
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/50'
                      : isBw
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                  }`}
                >
                  <span>Explore Live Prototype</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <button
                  onClick={() => handleQuickDemo('Elderly')}
                  className={`w-full sm:w-auto px-6 py-4 font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer text-base border ${
                    isPurple
                      ? 'bg-[#181128] hover:bg-purple-900/40 text-purple-200 border-purple-800/40'
                      : isBw
                      ? 'bg-neutral-900 hover:bg-neutral-800 text-white border-neutral-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                  }`}
                >
                  <Users className={`w-5 h-5 ${isPurple ? 'text-purple-400' : isBw ? 'text-white' : 'text-blue-600'}`} />
                  <span>1-Click Demo Login</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold opacity-75">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className={`w-4 h-4 ${isPurple ? 'text-purple-400' : 'text-emerald-500'}`} />
                  <span>Live PPG Cardiogram Vector</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className={`w-4 h-4 ${isPurple ? 'text-purple-400' : 'text-emerald-500'}`} />
                  <span>Hospital & Insurance Readiness</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className={`w-4 h-4 ${isPurple ? 'text-purple-400' : 'text-emerald-500'}`} />
                  <span>AI Fall Impact Fusion</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hand Holding Heart Vector Design & Telemetry Preview */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className={`w-full relative rounded-3xl p-6 sm:p-7 shadow-2xl border transition-all ${
                isPurple
                  ? 'bg-[#130d22]/90 border-purple-800/50 shadow-purple-950/80'
                  : isBw
                  ? 'bg-[#0c0c0c] border-neutral-700 shadow-neutral-900'
                  : 'bg-white border-slate-200/80'
              }`}>
                {/* Visual Header */}
                <div className={`flex items-center justify-between pb-3 mb-3 border-b ${
                  isPurple ? 'border-purple-900/40' : isBw ? 'border-neutral-800' : 'border-slate-100'
                }`}>
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full animate-ping ${
                      isPurple ? 'bg-purple-400' : isBw ? 'bg-white' : 'bg-emerald-500'
                    }`} />
                    <span className="text-xs font-bold">ElderGuard Bio-Care Shield</span>
                  </div>
                  <span className={`text-2xs font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    isPurple ? 'bg-purple-900/60 text-purple-200 border border-purple-700/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    ♥ Continuous Vitals
                  </span>
                </div>

                {/* Hand Holding Heart & Live Cardiogram SVG Art */}
                <div className="py-2">
                  <CardiogramHeartVector />
                </div>

                {/* Simulated Telemetry Stats in Black & Purple / B&W / Light */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className={`p-3.5 rounded-2xl border transition-colors ${
                    isPurple ? 'bg-[#1b132d] border-purple-800/40' : isBw ? 'bg-neutral-900 border-neutral-800' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <div className="flex items-center space-x-2 text-xs font-semibold opacity-70">
                      <HeartPulse className={`w-4 h-4 ${isPurple ? 'text-purple-400' : isBw ? 'text-white' : 'text-red-500'}`} />
                      <span>Heart Rate</span>
                    </div>
                    <div className="text-2xl font-black mt-1">74 <span className="text-xs opacity-60 font-medium">BPM</span></div>
                    <span className={`text-2xs font-semibold ${isPurple ? 'text-purple-300' : 'text-emerald-500'}`}>
                      ● Stable Resting Rhythm
                    </span>
                  </div>

                  <div className={`p-3.5 rounded-2xl border transition-colors ${
                    isPurple ? 'bg-[#1b132d] border-purple-800/40' : isBw ? 'bg-neutral-900 border-neutral-800' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <div className="flex items-center space-x-2 text-xs font-semibold opacity-70">
                      <Activity className={`w-4 h-4 ${isPurple ? 'text-fuchsia-400' : isBw ? 'text-white' : 'text-blue-600'}`} />
                      <span>Fall AI Status</span>
                    </div>
                    <div className="text-2xl font-black mt-1">SAFE</div>
                    <span className={`text-2xs font-semibold ${isPurple ? 'text-purple-300' : 'text-blue-500'}`}>
                      96% Confidence Level
                    </span>
                  </div>
                </div>

                {/* Emergency SOS Trigger Button */}
                <div className="mt-4 pt-1">
                  <Link
                    to="/dashboard"
                    className={`w-full py-3.5 font-extrabold rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-all text-sm uppercase tracking-wide cursor-pointer ${
                      isPurple
                        ? 'bg-linear-to-r from-purple-700 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-600 text-white shadow-purple-950/60'
                        : isBw
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600'
                        : 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/25'
                    }`}
                  >
                    <BellRing className="w-4 h-4 animate-bounce" />
                    <span>EMERGENCY SOS (DEMO)</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare & Health Insurance Concept Section */}
      <section className={`py-16 border-b transition-colors ${
        isPurple ? 'bg-[#0f0a1c] border-purple-900/30' : isBw ? 'bg-[#0a0a0a] border-neutral-800' : 'bg-blue-50/40 border-slate-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
              isPurple ? 'bg-purple-950 text-purple-300 border border-purple-800/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-blue-100 text-blue-800'
            }`}>
              Healthcare & Insurance Concept
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              Comprehensive Health Protection & Hospital Sync
            </h2>
            <p className="opacity-75 mt-2 text-sm sm:text-base">
              Designed for elderly health insurance carriers, hospital networks, care homes, and loving families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className={`p-6 rounded-3xl border transition-all ${
              isPurple
                ? 'bg-[#150f24] border-purple-800/40 hover:border-purple-600/60 shadow-lg shadow-purple-950/40'
                : isBw
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                : 'bg-white border-slate-200/80 hover:shadow-md'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                isPurple ? 'bg-purple-950 text-purple-300 border border-purple-700/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-blue-50 text-blue-600'
              }`}>
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-1">Hospital Emergency Triage</h3>
              <p className="text-xs opacity-75 leading-relaxed mb-4">
                Automated clinical dispatch packets including real-time ECG history, impact velocity, and allergies sent directly to arriving EMTs and hospital ER teams.
              </p>
              <div className={`text-2xs font-semibold px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 ${
                isPurple ? 'bg-purple-950/80 text-purple-300' : isBw ? 'bg-neutral-800 text-white' : 'bg-blue-50 text-blue-700'
              }`}>
                <Sparkles className="w-3 h-3" /> Live Hospital Telemetry
              </div>
            </div>

            {/* Card 2 */}
            <div className={`p-6 rounded-3xl border transition-all ${
              isPurple
                ? 'bg-[#150f24] border-purple-800/40 hover:border-purple-600/60 shadow-lg shadow-purple-950/40'
                : isBw
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                : 'bg-white border-slate-200/80 hover:shadow-md'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                isPurple ? 'bg-purple-950 text-purple-300 border border-purple-700/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-emerald-50 text-emerald-600'
              }`}>
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-1">Health Insurance Assurance</h3>
              <p className="text-xs opacity-75 leading-relaxed mb-4">
                Preventative biomarker logs and verified fall event timestamps empower insurers and families with transparent, tamper-evident health audit trails.
              </p>
              <div className={`text-2xs font-semibold px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 ${
                isPurple ? 'bg-purple-950/80 text-purple-300' : isBw ? 'bg-neutral-800 text-white' : 'bg-emerald-50 text-emerald-700'
              }`}>
                <ShieldCheck className="w-3 h-3" /> Policy Safety Compliance
              </div>
            </div>

            {/* Card 3 */}
            <div className={`p-6 rounded-3xl border transition-all ${
              isPurple
                ? 'bg-[#150f24] border-purple-800/40 hover:border-purple-600/60 shadow-lg shadow-purple-950/40'
                : isBw
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                : 'bg-white border-slate-200/80 hover:shadow-md'
            }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                isPurple ? 'bg-purple-950 text-purple-300 border border-purple-700/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-rose-50 text-rose-600'
              }`}>
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-1">Continuous Cardiogram Vitals</h3>
              <p className="text-xs opacity-75 leading-relaxed mb-4">
                Optical PPG pulse wave monitoring detects sudden spikes, arrhythmia risks, resting bradycardia, and sends instant push warnings to family members.
              </p>
              <div className={`text-2xs font-semibold px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 ${
                isPurple ? 'bg-purple-950/80 text-purple-300' : isBw ? 'bg-neutral-800 text-white' : 'bg-rose-50 text-rose-700'
              }`}>
                <HeartPulse className="w-3 h-3" /> 24/7 Optical Heart Sensor
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Main Pillars of Elderly Protection */}
      <section className={`py-20 border-b transition-colors ${
        isPurple ? 'bg-[#08060e] border-purple-900/30' : isBw ? 'bg-black border-neutral-800' : 'bg-slate-50 border-slate-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
              isPurple ? 'bg-purple-950 text-purple-300 border border-purple-800/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-blue-50 text-blue-600'
            }`}>
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              5 Pillars of Elderly Protection
            </h2>
            <p className="opacity-75 mt-3 text-base">
              Integrated hardware sensor algorithms and instant mobile dispatch designed specifically for older adults and care teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`rounded-3xl p-8 border transition-all group ${
              isPurple
                ? 'bg-[#120d1e] border-purple-900/40 hover:border-purple-600/60 shadow-lg'
                : isBw
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                isPurple ? 'bg-purple-950 text-purple-300 border border-purple-700/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-red-50 text-red-600'
              }`}>
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. AI Fall Detection</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-4">
                Dual-axis accelerometer and gyroscope fusion identifies sudden impact spikes and body tilts. If a fall occurs, an auto-countdown is initiated.
              </p>
              <ul className="space-y-2 text-xs font-semibold opacity-75">
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-purple-400' : 'bg-red-500'}`} />
                  20-second false-alarm cancel window
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-purple-400' : 'bg-red-500'}`} />
                  Auto-escalation to emergency SOS
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className={`rounded-3xl p-8 border transition-all group ${
              isPurple
                ? 'bg-[#120d1e] border-purple-900/40 hover:border-purple-600/60 shadow-lg'
                : isBw
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                isPurple ? 'bg-purple-950 text-purple-300 border border-purple-700/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-rose-50 text-rose-600'
              }`}>
                <BellRing className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Emergency SOS</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-4">
                One-press physical button or digital dispatch triggers high-priority alerts to family members, designated caregivers, and local responders.
              </p>
              <ul className="space-y-2 text-xs font-semibold opacity-75">
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-purple-400' : 'bg-rose-500'}`} />
                  Instant contact phone & ETA tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-purple-400' : 'bg-rose-500'}`} />
                  Live telemetry snapshot transmission
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className={`rounded-3xl p-8 border transition-all group ${
              isPurple
                ? 'bg-[#120d1e] border-purple-900/40 hover:border-purple-600/60 shadow-lg'
                : isBw
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                isPurple ? 'bg-purple-950 text-purple-300 border border-purple-700/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-blue-50 text-blue-600'
              }`}>
                <HeartPulse className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Health Monitoring</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-4">
                Continuous optical PPG heart rate tracking, steps, calorie burn, sleep stages, and SpO2 oxygen saturation with weekly trend analysis.
              </p>
              <ul className="space-y-2 text-xs font-semibold opacity-75">
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-purple-400' : 'bg-blue-500'}`} />
                  Daily step goals & resting heart rate
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-purple-400' : 'bg-blue-500'}`} />
                  Deep, REM, and Light sleep stages
                </li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className={`rounded-3xl p-8 border transition-all group ${
              isPurple
                ? 'bg-[#120d1e] border-purple-900/40 hover:border-purple-600/60 shadow-lg'
                : isBw
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                isPurple ? 'bg-purple-950 text-purple-300 border border-purple-700/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-indigo-50 text-indigo-600'
              }`}>
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">4. GPS Live Location</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-4">
                Interactive OpenStreetMap integration mapping user coordinates, home geofencing safe zones, breadcrumb history, and altitude tracking.
              </p>
              <ul className="space-y-2 text-xs font-semibold opacity-75">
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-purple-400' : 'bg-indigo-500'}`} />
                  Safe Zone geofence alerts
                </li>
                <li className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-purple-400' : 'bg-indigo-500'}`} />
                  Historical trail breadcrumbs
                </li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className={`rounded-3xl p-8 border transition-all group lg:col-span-2 ${
              isPurple
                ? 'bg-[#120d1e] border-purple-900/40 hover:border-purple-600/60 shadow-lg'
                : isBw
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-600'
                : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
            }`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                isPurple ? 'bg-purple-950 text-purple-300 border border-purple-700/50' : isBw ? 'bg-neutral-800 text-white' : 'bg-emerald-50 text-emerald-600'
              }`}>
                <Watch className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">5. Bluetooth Wearable Interface</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-4">
                Native Web Bluetooth API scanner connects directly to wearable BLE hardware for live GATT data packet streaming, battery monitoring, and sensor diagnostics.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold opacity-75">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-purple-400' : 'bg-emerald-500'}`} />
                  Web Bluetooth API GATT server connection
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-purple-400' : 'bg-emerald-500'}`} />
                  Safe fallback simulation for all browsers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Banner */}
      <section className={`py-16 ${
        isPurple ? 'bg-[#0b0716]' : isBw ? 'bg-[#080808]' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl p-8 sm:p-12 text-center shadow-2xl transition-colors ${
            isPurple
              ? 'bg-linear-to-r from-purple-900 via-indigo-950 to-purple-950 border border-purple-700/50 text-white'
              : isBw
              ? 'bg-neutral-900 border border-neutral-700 text-white'
              : 'bg-linear-to-r from-blue-600 to-indigo-700 text-white shadow-blue-500/20'
          }`}>
            <h3 className="text-2xl sm:text-3xl font-black">Ready to explore the healthcare research prototype?</h3>
            <p className="opacity-85 max-w-xl mx-auto mt-2 text-sm">
              Experience the full interactive dashboard, fall detection simulator, live map, and Web Bluetooth pairing.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className={`px-8 py-3.5 font-extrabold rounded-xl shadow-lg transition-all text-sm cursor-pointer ${
                  isPurple
                    ? 'bg-purple-500 hover:bg-purple-400 text-white'
                    : isBw
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-white text-blue-700 hover:bg-blue-50'
                }`}
              >
                Launch Dashboard Demo
              </Link>
              <Link
                to="/login"
                className={`px-6 py-3.5 font-bold rounded-xl transition-colors text-sm border ${
                  isPurple
                    ? 'bg-purple-950/80 hover:bg-purple-900 text-purple-200 border-purple-600/50'
                    : isBw
                    ? 'bg-black hover:bg-neutral-800 text-white border-neutral-700'
                    : 'bg-blue-800/80 hover:bg-blue-800 text-white border-blue-400/30'
                }`}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t text-xs transition-colors ${
        isPurple
          ? 'bg-[#06040a] border-purple-900/30 text-purple-300/70'
          : isBw
          ? 'bg-black border-neutral-800 text-neutral-400'
          : 'bg-slate-900 border-slate-800 text-slate-400'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold ${
                isPurple ? 'bg-purple-600' : isBw ? 'bg-white text-black' : 'bg-blue-600'
              }`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className={`text-sm font-black ${isPurple ? 'text-white' : isBw ? 'text-white' : 'text-white'}`}>
                  ELDERGUARD
                </span>
                <p className="text-2xs opacity-60">Healthcare & Elderly Protection IoT</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-xs">
              <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link to="/health" className="hover:text-white transition-colors">Health & ECG</Link>
              <Link to="/falls" className="hover:text-white transition-colors">Fall Detection</Link>
              <Link to="/sos" className="hover:text-white transition-colors">SOS</Link>
              <Link to="/location" className="hover:text-white transition-colors">Location</Link>
              <Link to="/device" className="hover:text-white transition-colors">Bluetooth</Link>
              <Link to="/settings" className="hover:text-white transition-colors">Theme & Settings</Link>
            </div>
          </div>

          <div className={`mt-8 pt-8 border-t text-center text-2xs space-y-1 ${
            isPurple ? 'border-purple-900/20' : isBw ? 'border-neutral-900' : 'border-slate-800'
          }`}>
            <p>© 2026 ElderGuard Prototype. Research & Education Purposes Only.</p>
            <p className="opacity-70">
              Disclaimer: This frontend application uses simulated demo data. Do not use for real medical emergencies or critical life support.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
