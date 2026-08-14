import React, { useState } from 'react';
import {
  Heart,
  Activity,
  Flame,
  Moon,
  Shield,
  Sparkles,
  TrendingUp,
  Clock,
  Calendar,
  Filter,
  CheckCircle2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import HealthCard from '../components/HealthCard';
import ChartCard from '../components/ChartCard';
import StatusBadge from '../components/StatusBadge';
import {
  initialVitals,
  hourlyHeartRateData,
  weeklyActivityData,
  weeklySleepData,
  healthHistoryLogs
} from '../data/healthData';

export const HealthPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Heart' | 'Activity' | 'Sleep'>('All');

  const filteredLogs = healthHistoryLogs.filter((log) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Heart') return log.type.includes('Heart') || log.type.includes('Blood');
    if (selectedFilter === 'Activity') return log.type.includes('Step') || log.type.includes('Activity');
    if (selectedFilter === 'Sleep') return log.type.includes('Sleep');
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Health Monitoring & Vitals</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous PPG biometric measurements, sleep cycles, and physical activity telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            ● Vitals Synchronized
          </span>
        </div>
      </div>

      {/* Top Health Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <HealthCard
          type="heart"
          value={initialVitals.heartRate.current}
          unit="BPM"
          status={initialVitals.heartRate.status}
          details="Min: 62 • Max: 98 BPM"
          progress={74}
        />
        <HealthCard
          type="steps"
          value={initialVitals.steps.current.toLocaleString()}
          unit="Steps"
          status={initialVitals.steps.status}
          details="Goal: 6,000 steps (72%)"
          progress={72}
        />
        <HealthCard
          type="sleep"
          value={initialVitals.sleep.duration}
          unit=""
          status={initialVitals.sleep.status}
          details="Deep Sleep: 1h 50m"
          progress={84}
        />
        <HealthCard
          type="bp"
          value={`${initialVitals.bloodPressure.systolic}/${initialVitals.bloodPressure.diastolic}`}
          unit="mmHg"
          status={initialVitals.bloodPressure.status}
          details="Resting Blood Pressure"
          progress={65}
        />
        <HealthCard
          type="spo2"
          value={initialVitals.bloodOxygen.current}
          unit="%"
          status={initialVitals.bloodOxygen.status}
          details="Optimal Oxygen Saturation"
          progress={98}
        />
        <HealthCard
          type="temp"
          value={initialVitals.bodyTemp.current}
          unit="°F"
          status={initialVitals.bodyTemp.status}
          details="Skin & Core Temperature"
          progress={98}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heart Rate Hourly Chart */}
        <ChartCard
          title="24-Hour Heart Rate & Resting Pulse"
          subtitle="Continuous optical sensor trace over 2-hour increments"
          icon={Heart}
          badge={<StatusBadge status="Normal" size="sm" />}
        >
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyHeartRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="hrColorFull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 105]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                  formatter={(val: any) => [`${val} BPM`, 'Heart Rate']}
                />
                <Area
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#hrColorFull)"
                />
                <Line
                  type="monotone"
                  dataKey="resting"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-3 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span>Active Heart Rate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-slate-400" />
              <span>Resting Baseline (64 BPM)</span>
            </div>
          </div>
        </ChartCard>

        {/* Weekly Activity & Distance Chart */}
        <ChartCard
          title="Weekly Steps, Calories & Distance"
          subtitle="Physical mobility and active daily exercise logs"
          icon={Activity}
          badge={<StatusBadge status="Optimal" size="sm" />}
        >
          <div className="h-72 w-full">
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
                  formatter={(val: any, name: string) => [
                    name === 'steps' ? `${val.toLocaleString()} steps` : `${val} kcal`,
                    name === 'steps' ? 'Steps' : 'Calories'
                  ]}
                />
                <Bar dataKey="steps" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
            <span>Average: 4,990 steps/day</span>
            <span className="font-semibold text-emerald-600">Weekly Target 83% met</span>
          </div>
        </ChartCard>
      </div>

      {/* Sleep Stages Analysis */}
      <ChartCard
        title="Weekly Sleep Stages Architecture"
        subtitle="Duration split across Deep Sleep, Light Sleep, and REM cycles"
        icon={Moon}
        badge={<span className="text-2xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">Avg: 7.6 hrs/night</span>}
      >
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySleepData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="deep" name="Deep Sleep (hrs)" stackId="a" fill="#3b82f6" />
              <Bar dataKey="light" name="Light Sleep (hrs)" stackId="a" fill="#93c5fd" />
              <Bar dataKey="rem" name="REM Sleep (hrs)" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Health History Logs */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Health Measurement History</h3>
              <p className="text-xs text-slate-500">Timeline of recorded vitals, blood pressure, and goals</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
            {(['All', 'Heart', 'Activity', 'Sleep'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredLogs.map((log) => (
            <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{log.type}</span>
                  <span className="text-2xs text-slate-400">• {log.date}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{log.note}</p>
              </div>
              <div className="flex items-center space-x-3 self-end sm:self-center">
                <span className="text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {log.reading}
                </span>
                <StatusBadge status={log.status} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
