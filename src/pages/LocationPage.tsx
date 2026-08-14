import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Navigation,
  ShieldCheck,
  Clock,
  Radio,
  Layers,
  History,
  Info,
  Maximize2
} from 'lucide-react';
import MapComponent from '../components/MapComponent';
import StatusBadge from '../components/StatusBadge';
import { initialLocation, locationBreadcrumbs, geofenceBoundaries } from '../data/locationData';

export const LocationPage: React.FC = () => {
  const [showGeofence, setShowGeofence] = useState(true);
  const [selectedZone, setSelectedZone] = useState<string>('Home Safe Zone');

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">GPS Live Location Tracking</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time GNSS coordinates with safe home geofencing and trail breadcrumbs (Demo Coordinates).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status="SAFE" size="md" />
        </div>
      </div>

      {/* Primary Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase">
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            <span>Latitude</span>
          </div>
          <p className="text-lg font-black text-slate-900 mt-1">{initialLocation.latitude.toFixed(6)}° N</p>
          <span className="text-2xs text-slate-400">WGS84 Datum</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase">
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            <span>Longitude</span>
          </div>
          <p className="text-lg font-black text-slate-900 mt-1">{initialLocation.longitude.toFixed(6)}° W</p>
          <span className="text-2xs text-slate-400">Mock GPS Lock</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase">
            <Radio className="w-3.5 h-3.5 text-emerald-500" />
            <span>Accuracy</span>
          </div>
          <p className="text-lg font-black text-slate-900 mt-1">± {initialLocation.accuracyMeters} m</p>
          <span className="text-2xs text-emerald-600 font-semibold">High Precision (8 Sats)</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase">
            <Clock className="w-3.5 h-3.5 text-purple-500" />
            <span>Last Updated</span>
          </div>
          <p className="text-lg font-black text-slate-900 mt-1 truncate">{initialLocation.lastUpdated}</p>
          <span className="text-2xs text-slate-400">Interval: 10s</span>
        </div>
      </div>

      {/* Main Map Canvas Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{initialLocation.address}</h3>
              <p className="text-xs text-slate-500">{initialLocation.city} • Safe Geofence Zone</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGeofence(!showGeofence)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 border ${
                showGeofence
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safe Zone (150m Circle)</span>
            </button>
          </div>
        </div>

        {/* Leaflet + OpenStreetMap Map Component */}
        <MapComponent
          lat={initialLocation.latitude}
          lng={initialLocation.longitude}
          userName="Eleanor Vance (Current Location)"
          address={initialLocation.address}
          showSafeZone={showGeofence}
          safeZoneRadius={150}
          breadcrumbs={locationBreadcrumbs}
          height="460px"
        />

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs" />
              <span>Current Position</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500" />
              <span>Home Safe Geofence</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-blue-400" />
              <span>Breadcrumb Path</span>
            </span>
          </div>

          <span className="text-2xs text-slate-400 italic">
            Fictional Coordinates • OpenStreetMap Tiles
          </span>
        </div>
      </div>

      {/* Geofencing & Breadcrumbs Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geofence Status */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Geofence Safe Zones</h4>
              <p className="text-xs text-slate-500">Automated perimeter breach alerts</p>
            </div>
          </div>

          <div className="space-y-3">
            {geofenceBoundaries.map((zone) => (
              <div
                key={zone.name}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{zone.name}</h5>
                  <p className="text-2xs text-slate-500 mt-0.5">Radius: {zone.radiusMeters} meters</p>
                </div>
                <StatusBadge status="ACTIVE" size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Location Breadcrumb History */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Today's Movement History</h4>
              <p className="text-xs text-slate-500">Chronological location trail</p>
            </div>
          </div>

          <div className="space-y-3">
            {locationBreadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-blue-600' : 'bg-slate-300'}`} />
                  {idx !== locationBreadcrumbs.length - 1 && (
                    <div className="w-0.5 h-6 bg-slate-200 my-0.5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{crumb.label}</span>
                    <span className="text-2xs text-slate-400 font-semibold">{crumb.time}</span>
                  </div>
                  <p className="text-2xs text-slate-500">
                    {crumb.lat.toFixed(5)}° N, {crumb.lng.toFixed(5)}° W
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
