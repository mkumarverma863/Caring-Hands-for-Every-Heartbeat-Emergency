import React from 'react';
import { BellRing, MapPin, Phone, ShieldAlert, Clock, CheckCircle, XCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { SOSAlertItem } from '../context/AlertContext';

interface AlertCardProps {
  alert: SOSAlertItem;
  onResolve?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onResolve,
  onCancel
}) => {
  const isEmergency = alert.status === 'Pending' || alert.status === 'Searching';

  return (
    <div
      className={`rounded-2xl p-5 border transition-all duration-200 ${
        isEmergency
          ? 'bg-red-50/70 border-red-200 shadow-md ring-1 ring-red-300'
          : 'bg-white border-slate-200/80 shadow-xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isEmergency ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-100 text-slate-600'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm text-slate-900">{alert.id}</h4>
              <span className="text-2xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">
                {alert.priority}
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{alert.timestamp} ({alert.relativeTime})</span>
            </p>
          </div>
        </div>

        <StatusBadge status={alert.status} pulse={isEmergency} size="sm" />
      </div>

      <p className="text-xs font-semibold text-slate-800 mb-3 bg-white/70 p-2.5 rounded-lg border border-slate-100">
        Trigger: <span className="text-blue-700">{alert.triggerType}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-3">
        <div className="flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span className="truncate">{alert.location.address}</span>
        </div>
        <div className="flex items-start gap-1.5">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span className="truncate">{alert.responder.name}</span>
        </div>
      </div>

      {alert.notes && (
        <p className="text-2xs text-slate-500 italic bg-slate-50 p-2 rounded-md mb-3 border border-slate-100">
          Note: {alert.notes}
        </p>
      )}

      {/* Action buttons if Pending or Active */}
      {isEmergency && (
        <div className="flex items-center gap-2 pt-2 border-t border-red-200">
          {onCancel && (
            <button
              onClick={() => onCancel(alert.id)}
              className="flex-1 py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5 text-slate-400" />
              Cancel Alert
            </button>
          )}
          {onResolve && (
            <button
              onClick={() => onResolve(alert.id)}
              className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Resolve SOS
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertCard;
