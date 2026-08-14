import React from 'react';
import { Heart, Activity, ShieldCheck, Plus, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const CardiogramHeartVector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme } = useTheme();

  const isPurple = theme === 'black-purple';
  const isBw = theme === 'black-white';

  const strokeColor = isPurple ? '#c084fc' : isBw ? '#ffffff' : '#4f46e5';
  const heartFill = isPurple ? 'url(#purpleHeartGlow)' : isBw ? '#262626' : 'url(#lightHeartGlow)';
  const pulseColor = isPurple ? '#e879f9' : isBw ? '#ffffff' : '#ef4444';

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background radial glow */}
      <div
        className={`absolute inset-0 rounded-full filter blur-3xl opacity-30 transition-all ${
          isPurple
            ? 'bg-purple-600'
            : isBw
            ? 'bg-neutral-600'
            : 'bg-indigo-400'
        }`}
      />

      <svg
        viewBox="0 0 500 400"
        className="w-full h-auto max-w-lg z-10 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Purple Theme Gradients */}
          <linearGradient id="purpleHeartGlow" x1="150" y1="80" x2="350" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#9333ea" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="lightHeartGlow" x1="150" y1="80" x2="350" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e11d48" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="handGradientLeft" x1="60" y1="200" x2="250" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isPurple ? '#3b0764' : isBw ? '#171717' : '#e0e7ff'} stopOpacity="0.8" />
            <stop offset="100%" stopColor={isPurple ? '#6b21a8' : isBw ? '#262626' : '#c7d2fe'} stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="handGradientRight" x1="440" y1="200" x2="250" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={isPurple ? '#3b0764' : isBw ? '#171717' : '#e0e7ff'} stopOpacity="0.8" />
            <stop offset="100%" stopColor={isPurple ? '#6b21a8' : isBw ? '#262626' : '#c7d2fe'} stopOpacity="0.9" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="ecgGlow" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Orbiting Medical Circles */}
        <circle
          cx="250"
          cy="180"
          r="160"
          stroke={isPurple ? '#581c87' : isBw ? '#333333' : '#e2e8f0'}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          className="animate-spin"
          style={{ animationDuration: '60s' }}
        />
        <circle
          cx="250"
          cy="180"
          r="125"
          stroke={isPurple ? '#7e22ce' : isBw ? '#404040' : '#cbd5e1'}
          strokeWidth="1"
          strokeDasharray="6 8"
          opacity="0.6"
        />

        {/* --- CARING HANDS HOLDING THE HEART (Vector Silhouette) --- */}
        {/* Left Caring Hand */}
        <path
          d="M 90 280 C 110 320, 160 360, 230 365 C 245 365, 255 355, 250 340 C 235 305, 200 270, 160 250 C 135 238, 115 245, 90 280 Z"
          fill="url(#handGradientLeft)"
          stroke={isPurple ? '#a855f7' : isBw ? '#525252' : '#818cf8'}
          strokeWidth="2"
        />
        {/* Left Hand Fingers gentle curve supporting heart base */}
        <path
          d="M 120 250 C 150 230, 200 240, 235 285"
          stroke={isPurple ? '#c084fc' : isBw ? '#737373' : '#a5b4fc'}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Right Caring Hand */}
        <path
          d="M 410 280 C 390 320, 340 360, 270 365 C 255 365, 245 355, 250 340 C 265 305, 300 270, 340 250 C 365 238, 385 245, 410 280 Z"
          fill="url(#handGradientRight)"
          stroke={isPurple ? '#a855f7' : isBw ? '#525252' : '#818cf8'}
          strokeWidth="2"
        />
        {/* Right Hand Fingers curve */}
        <path
          d="M 380 250 C 350 230, 300 240, 265 285"
          stroke={isPurple ? '#c084fc' : isBw ? '#737373' : '#a5b4fc'}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Wrist Base Support Arc */}
        <path
          d="M 190 370 Q 250 385 310 370"
          stroke={isPurple ? '#9333ea' : isBw ? '#525252' : '#6366f1'}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* --- GLOWING MEDICAL HEART --- */}
        <g filter="url(#glowEffect)" className="animate-pulse" style={{ animationDuration: '2.5s' }}>
          <path
            d="M 250 290 
               C 220 255, 140 180, 140 125 
               C 140 75, 185 55, 225 80 
               C 240 90, 246 102, 250 110 
               C 254 102, 260 90, 275 80 
               C 315 55, 360 75, 360 125 
               C 360 180, 280 255, 250 290 Z"
            fill={heartFill}
            stroke={isPurple ? '#f0abfc' : isBw ? '#ffffff' : '#ffffff'}
            strokeWidth="3"
          />
        </g>

        {/* Inner Heart Medical Cross Badge */}
        <g transform="translate(250, 145)">
          <circle cx="0" cy="0" r="22" fill={isPurple ? '#2e1065' : isBw ? '#000000' : '#ffffff'} opacity="0.9" />
          <path
            d="M -3 -12 H 3 V -3 H 12 V 3 H 3 V 12 H -3 V 3 H -12 V -3 H -3 Z"
            fill={isPurple ? '#c084fc' : isBw ? '#ffffff' : '#e11d48'}
          />
        </g>

        {/* --- CONTINUOUS CARDIOGRAM / ECG HEARTBEAT LINE --- */}
        {/* Shadow ECG line for depth */}
        <path
          d="M 20 180 H 130 L 145 150 L 160 210 L 175 180 H 205 L 218 110 L 232 245 L 246 130 L 258 195 L 268 180 H 295 L 310 140 L 325 215 L 340 180 H 480"
          stroke={isPurple ? '#581c87' : isBw ? '#404040' : '#cbd5e1'}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active Luminous ECG Pulse */}
        <path
          d="M 20 180 H 130 L 145 150 L 160 210 L 175 180 H 205 L 218 110 L 232 245 L 246 130 L 258 195 L 268 180 H 295 L 310 140 L 325 215 L 340 180 H 480"
          stroke={pulseColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ecgGlow)"
        />

        {/* Animated Running Pulse Lead Dot */}
        <circle cx="218" cy="110" r="5" fill="#ffffff" filter="url(#glowEffect)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="310" cy="140" r="4" fill="#ffffff" filter="url(#glowEffect)">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
        </circle>

        {/* Heartbeat pulse rings */}
        <circle cx="250" cy="145" r="38" stroke={pulseColor} strokeWidth="1.5" opacity="0.7">
          <animate attributeName="r" values="24;70" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Small floating medical telemetry badges */}
        <g transform="translate(60, 95)" className="animate-bounce" style={{ animationDuration: '3s' }}>
          <rect width="90" height="32" rx="10" fill={isPurple ? '#1c142e' : isBw ? '#171717' : '#ffffff'} stroke={strokeColor} strokeWidth="1.2" />
          <text x="12" y="20" fill={isPurple ? '#e9d5ff' : isBw ? '#ffffff' : '#0f172a'} fontSize="11" fontWeight="bold">
            ♥ 74 BPM
          </text>
        </g>

        <g transform="translate(345, 95)" className="animate-bounce" style={{ animationDuration: '3.6s' }}>
          <rect width="100" height="32" rx="10" fill={isPurple ? '#1c142e' : isBw ? '#171717' : '#ffffff'} stroke={strokeColor} strokeWidth="1.2" />
          <text x="10" y="20" fill={isPurple ? '#e9d5ff' : isBw ? '#ffffff' : '#0f172a'} fontSize="11" fontWeight="bold">
            🛡 99% PROTECT
          </text>
        </g>
      </svg>
    </div>
  );
};

export default CardiogramHeartVector;
