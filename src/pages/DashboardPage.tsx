import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Activity,
  Moon,
  Battery,
  Watch,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  Radio,
  Sparkles
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useAlert } from '../context/AlertContext';
import { useDevice } from '../context/DeviceContext';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import StatusBadge from '../components/StatusBadge';
import SOSButton from '../components/SOSButton';
import FallStatus from '../components/FallStatus';
import DeviceStatus from '../components/DeviceStatus';
import BluetoothStatus from '../components/BluetoothStatus';
import { initialVitals, hourlyHeartRateData, weeklyActivityData, weeklySleepData } from '../data/healthData';
import { initialLocation } from '../data/locationData';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { fallStatus, lastFallTime, sosAlerts, openSOSModal } = useAlert();
  const { device } = useDevice();
  const [chartView, setChartView] = useState<'today' | 'weekly'>('today');

  const latestSOS = sosAlerts[0] || null;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Banner SOS Action */}
      <SOSButton variant="banner" />

      {/* Top 6 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Heart Rate */}
        <StatCard
          title="Heart Rate"
          value={initialVitals.heartRate.current}
          unit="BPM"
          subtitle="Resting: 66 BPM"
          icon={Heart}
          iconColor="text-red-500"
          iconBg="bg-red-50"
          badge={<StatusBadge status="Normal" size="sm" />}
        />

        {/* Steps */}
        <StatCard
          title="Daily Steps"
          value={initialVitals.steps.current.toLocaleString()}
          unit="/ 6,000"
          subtitle="2.8 km walked"
          icon={Activity}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          trend="+14% vs yesterday"
        />

        {/* Sleep */}
        <StatCard
          title="Sleep"
          value={initialVitals.sleep.duration}
          subtitle="Deep sleep: 1h 50m"
          icon={Moon}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          badge={<StatusBadge status="Good Quality" size="sm" />}
        />

        {/* Wearable Battery */}
        <StatCard
          title="Band Battery"
          value={`${device.batteryLevel}%`}
          subtitle={device.batteryStatus === 'Good' ? 'Optimal Charge' : 'Charge Soon'}
          icon={Battery}
          iconColor={device.batteryLevel > 20 ? 'text-emerald-600' : 'text-red-600'}
          iconBg={device.batteryLevel > 20 ? 'bg-emerald-50' : 'bg-red-50'}
          badge={
            <StatusBadge
              status={device.batteryLevel > 20 ? 'Good' : 'Low'}
              size="sm"
            />
          }
        />

        {/* Device Connection */}
        <StatCard
          title="Wearable Link"
          value={device.connectionStatus === 'Connected' ? 'Online' : 'Offline'}
          subtitle={device.deviceName}
          icon={Watch}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          badge={<StatusBadge status={device.connectionStatus} size="sm" />}
        />

        {/* Fall Status */}
        <StatCard
          title="Fall Detection"
          value={fallStatus === 'SAFE' ? 'Armed' : 'Incident'}
          subtitle="Dual-Axis Fusion"
          icon={ShieldCheck}
          iconColor={
            fallStatus === 'SAFE'
              ? 'text-emerald-600'
              : fallStatus === 'POSSIBLE_FALL'
              ? 'text-amber-600'
              : 'text-red-600'
          }
          iconBg={
            fallStatus === 'SAFE'
              ? 'bg-emerald-50'
              : fallStatus === 'POSSIBLE_FALL'
              ? 'bg-amber-50'
              : 'bg-red-50'
          }
          badge={
            <StatusBadge
              status={fallStatus === 'POSSIBLE_FALL' ? 'POSSIBLE FALL' : fallStatus === 'FALL_DETECTED' ? 'FALL DETECTED' : 'SAFE'}
              pulse={fallStatus !== 'SAFE'}
              size="sm"
            />
          }
        />
      </div>

      {/* Safety Section: Status + Fall State + Recent SOS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Fall Detection Interactive Card */}
        <div className="lg:col-span-7 space-y-6">
          <FallStatus />

          {/* Quick Safety Summary */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900">Live Safety & Geofence Overview</h4>
              <Link to="/location" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                <span>View Full Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-2xs font-semibold text-slate-400 uppercase">Geofence Zone</span>
                <p className="font-bold text-slate-800 mt-0.5">{initialLocation.zone}</p>
                <span className="text-2xs text-emerald-600 font-semibold">● Inside Safe Boundary</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-2xs font-semibold text-slate-400 uppercase">Last Fall Incident</span>
                <p className="font-bold text-slate-800 mt-0.5">{lastFallTime}</p>
                <span className="text-2xs text-slate-500">Auto-logged</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-2xs font-semibold text-slate-400 uppercase">Last SOS Alert</span>
                <p className="font-bold text-slate-800 mt-0.5">
                  {latestSOS ? latestSOS.relativeTime : 'None today'}
                </p>
                <span className="text-2xs text-emerald-600 font-semibold">
                  {latestSOS ? latestSOS.status : 'Ready'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Device & Bluetooth Status Column */}
        <div className="lg:col-span-5 space-y-6">
          <DeviceStatus />
          <BluetoothStatus />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heart Rate Area Chart */}
        <ChartCard
          title="Heart Rate Telemetry"
          subtitle="Continuous 24-hour optical sensor readings (BPM)"
          icon={Heart}
          badge={<StatusBadge status="Normal" size="sm" />}
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyHeartRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hrColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 110]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => [`${value} BPM`, 'Heart Rate']}
                />
                <Area
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#hrColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Steps & Activity Bar Chart */}
        <ChartCard
          title="Weekly Activity & Steps"
          subtitle="Daily mobility and step targets"
          icon={Activity}
          badge={<span className="text-2xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">Goal: 6,000</span>}
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 7000]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                  formatter={(val: any) => [`${val.toLocaleString()} steps`, 'Steps']}
                />
                <Bar
                  dataKey="steps"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Sleep Weekly Chart */}
      <ChartCard
        title="Weekly Sleep Duration & Quality Score"
        subtitle="Nightly rest patterns and restorative deep sleep"
        icon={Moon}
        badge={<StatusBadge status="Good Quality" size="sm" />}
      >
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySleepData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="sleepColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[4, 10]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px'
                }}
                formatter={(val: any) => [`${val} hrs (Score: ${val > 7.5 ? '88/100' : '79/100'})`, 'Sleep Duration']}
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#6366f1"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#sleepColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default DashboardPage;
