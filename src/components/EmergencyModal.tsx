import React, { useState } from 'react';
import { AlertCircle, BellRing, CheckCircle, MapPin, Phone, ShieldAlert, X, Heart, Clock } from 'lucide-react';
import { useAlert } from '../context/AlertContext';
import StatusBadge from './StatusBadge';

export const EmergencyModal: React.FC = () => {
  const { isSOSModalOpen, closeSOSModal, triggerSOS, activeSOS, cancelActiveSOS, resolveActiveSOS } = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isSOSModalOpen && !activeSOS) return null;

  // If modal is open for confirmation before triggering
  if (isSOSModalOpen && !activeSOS) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/70 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-red-200 animate-in zoom-in-95 duration-200 text-center">
          <button
            onClick={closeSOSModal}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full text-red-600 mb-5 animate-pulse-ring">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-black text-slate-900 mb-2">Emergency SOS Confirmation</h3>
          <p className="text-base text-slate-600 mb-6">
            Are you sure you want to send an emergency SOS?
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left mb-6 text-sm text-amber-900">
            <div className="flex items-center gap-2 font-semibold text-amber-950 mb-1">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Simulated Prototype Notice</span>
            </div>
            <p className="text-xs text-amber-800">
              This is a student research demo. It will trigger simulated alerts to your designated mock caregivers and display live telemetry.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={closeSOSModal}
              className="flex-1 py-3 px-5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={async () => {
                setIsSubmitting(true);
                try {
                  await triggerSOS('Manual SOS Button (User Confirmed)');
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="flex-1 py-3 px-5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Transmitting Alert...' : 'CONFIRM & SEND SOS'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If active SOS is currently active / triggered
  if (activeSOS) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-red-500 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-red-600 px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl animate-bounce">
                <BellRing className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-lg uppercase tracking-wide">EMERGENCY SOS ACTIVE</h4>
                <p className="text-xs text-red-100 font-medium">Alert ID: {activeSOS.id} • Demo Data</p>
              </div>
            </div>
            <StatusBadge status={activeSOS.status} pulse={activeSOS.status === 'Pending' || activeSOS.status === 'Searching'} />
          </div>

          <div className="p-6 space-y-5">
            {/* Notification summary */}
            <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-950">Simulated Emergency Triggered</p>
                <p className="text-xs text-red-800 mt-0.5">
                  Emergency notifications transmitted to registered emergency contacts. Simulated dispatch assigned.
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Time & Trigger</span>
                </div>
                <p className="font-semibold text-slate-800">{activeSOS.timestamp}</p>
                <p className="text-xs text-slate-500 mt-0.5">{activeSOS.triggerType}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Location Coordinates</span>
                </div>
                <p className="font-semibold text-slate-800">{activeSOS.location.address}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeSOS.location.lat.toFixed(5)}° N, {activeSOS.location.lng.toFixed(5)}° W ({activeSOS.location.accuracy})
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Primary Responder</span>
                </div>
                <p className="font-semibold text-slate-800">{activeSOS.responder.name}</p>
                <p className="text-xs text-blue-600 font-medium mt-0.5">{activeSOS.responder.phone}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">ETA: {activeSOS.responder.eta}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  <span>Vitals at Trigger</span>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <div>
                    <span className="text-xs text-slate-400">Heart Rate</span>
                    <p className="font-bold text-slate-800 text-sm">{activeSOS.vitalsAtTrigger.heartRate}</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">SpO2 Oxygen</span>
                    <p className="font-bold text-slate-800 text-sm">{activeSOS.vitalsAtTrigger.spo2}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={cancelActiveSOS}
                className="flex-1 py-3 px-4 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel SOS (False Alarm)
              </button>
              <button
                type="button"
                onClick={resolveActiveSOS}
                className="flex-1 py-3 px-4 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default EmergencyModal;
