import React from 'react';
import {
  BellRing,
  ShieldAlert,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Plus,
  AlertTriangle,
  Radio
} from 'lucide-react';
import { useAlert } from '../context/AlertContext';
import StatusBadge from '../components/StatusBadge';
import AlertCard from '../components/AlertCard';
import { emergencyContacts } from '../data/sosData';

export const SOSPage: React.FC = () => {
  const {
    sosAlerts,
    activeSOS,
    openSOSModal,
    triggerSOS,
    cancelActiveSOS,
    resolveActiveSOS
  } = useAlert();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Emergency SOS Dispatch</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Instant priority emergency trigger system transmitting GPS telemetry to assigned responders.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={openSOSModal}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-red-500/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>TRIGGER EMERGENCY SOS</span>
          </button>
        </div>
      </div>

      {/* Active SOS Banner if active */}
      {activeSOS && (
        <div className="p-6 bg-red-50 border-2 border-red-500 rounded-3xl animate-pulse-ring">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center animate-bounce">
                <BellRing className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-red-950">Active Emergency Incident: {activeSOS.id}</h3>
                  <StatusBadge status={activeSOS.status} pulse={true} size="sm" />
                </div>
                <p className="text-xs text-red-800 mt-0.5">
                  Location: {activeSOS.location.address} • Trigger: {activeSOS.triggerType}
                </p>
                <p className="text-xs font-semibold text-red-900 mt-1">
                  Primary Responder: {activeSOS.responder.name} ({activeSOS.responder.phone}) — {activeSOS.responder.eta}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <button
                onClick={cancelActiveSOS}
                className="px-4 py-2 bg-white hover:bg-red-100 text-slate-700 font-bold text-xs rounded-xl border border-red-200 transition-colors cursor-pointer"
              >
                Cancel (False Alarm)
              </button>
              <button
                onClick={resolveActiveSOS}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Status Workflow Legend */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Simulated SOS Dispatch States
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <StatusBadge status="Pending" size="sm" />
            <p className="text-2xs text-slate-500 mt-1.5">Broadcast transmitted to cloud proxy</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <StatusBadge status="Searching" size="sm" />
            <p className="text-2xs text-slate-500 mt-1.5">Locating nearest registered caregiver</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <StatusBadge status="Responder Assigned" size="sm" />
            <p className="text-2xs text-slate-500 mt-1.5">Caregiver acknowledged & in route</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <StatusBadge status="Resolved" size="sm" />
            <p className="text-2xs text-slate-500 mt-1.5">Assistance confirmed and completed</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <StatusBadge status="Cancelled" size="sm" />
            <p className="text-2xs text-slate-500 mt-1.5">Cancelled by user within timeout</p>
          </div>
        </div>
      </div>

      {/* Grid: Previous SOS Alerts & Emergency Contact Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Previous SOS Alerts Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">SOS Alert Log ({sosAlerts.length})</h3>
            <span className="text-2xs text-slate-400 font-semibold">Simulated Records</span>
          </div>

          <div className="space-y-3">
            {sosAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onResolve={() => resolveActiveSOS()}
                onCancel={() => cancelActiveSOS()}
              />
            ))}
          </div>
        </div>

        {/* Emergency Contacts Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Designated Emergency Contacts</h3>
            <span className="text-2xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
              3 Contacts
            </span>
          </div>

          <div className="space-y-3">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">{contact.name}</h4>
                        {contact.isPrimary && (
                          <span className="text-2xs font-extrabold bg-blue-600 text-white px-1.5 py-0.5 rounded">
                            PRIMARY
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">{contact.relationship}</p>
                      <p className="text-xs text-blue-600 font-semibold mt-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{contact.phone}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    SOS SMS Alert: Enabled
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    Fall Alert: Enabled
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSPage;
