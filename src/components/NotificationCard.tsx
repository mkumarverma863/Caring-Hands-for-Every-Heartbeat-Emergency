import React from 'react';
import { Bell, Heart, Watch, ShieldCheck, Check, Clock } from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  timestamp: string;
  read: boolean;
  priority?: string;
}

interface NotificationCardProps {
  notification: NotificationItem;
  onMarkRead?: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkRead
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'health':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'device':
        return <Watch className="w-4 h-4 text-blue-500" />;
      case 'alert':
        return <Bell className="w-4 h-4 text-amber-500" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        notification.read
          ? 'bg-slate-50/70 border-slate-200/60 opacity-80'
          : 'bg-white border-blue-200 shadow-xs'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-slate-100 rounded-lg shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900">{notification.title}</h5>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notification.message}</p>
            <div className="flex items-center gap-1.5 text-2xs text-slate-400 mt-2">
              <Clock className="w-3 h-3" />
              <span>{notification.timestamp}</span>
            </div>
          </div>
        </div>

        {!notification.read && onMarkRead && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 shrink-0"
            title="Mark as read"
          >
            <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
