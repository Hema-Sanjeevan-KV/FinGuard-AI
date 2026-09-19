import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  Laptop,
  ShieldCheck,
  AlertTriangle,
  Download
} from 'lucide-react';

export const SecurityAnalyticsPage: React.FC = () => {
  // 1. Risk Score Distribution
  const riskDistributionData = [
    { range: '0 - 20 (Normal)', users: 18, color: '#10b981' },
    { range: '21 - 40 (Low)', users: 12, color: '#06b6d4' },
    { range: '41 - 60 (Medium)', users: 5, color: '#f59e0b' },
    { range: '61 - 80 (Elevated)', users: 2, color: '#f97316' },
    { range: '81 - 100 (Critical)', users: 1, color: '#ef4444' },
  ];

  // 2. Fraud & Anomaly Trends (Past 7 Days)
  const fraudTrendsData = [
    { day: 'Mon', normalTxns: 120, flaggedAnomalies: 2, blockedAttacks: 0 },
    { day: 'Tue', normalTxns: 145, flaggedAnomalies: 4, blockedAttacks: 1 },
    { day: 'Wed', normalTxns: 132, flaggedAnomalies: 1, blockedAttacks: 0 },
    { day: 'Thu', normalTxns: 168, flaggedAnomalies: 5, blockedAttacks: 2 },
    { day: 'Fri', normalTxns: 195, flaggedAnomalies: 3, blockedAttacks: 1 },
    { day: 'Sat', normalTxns: 90, flaggedAnomalies: 6, blockedAttacks: 3 },
    { day: 'Sun', normalTxns: 85, flaggedAnomalies: 2, blockedAttacks: 1 },
  ];

  // 3. Auth Success vs Challenge vs Blocked
  const authRateData = [
    { name: 'Direct Success (Frictionless)', value: 84, color: '#10b981' },
    { name: 'Behavioral Step-Up Challenge', value: 12, color: '#f59e0b' },
    { name: 'Autonomous Blocked (High Risk)', value: 4, color: '#ef4444' },
  ];

  // 4. Device & OS Breakdown
  const deviceBreakdownData = [
    { os: 'Windows 11 / 10', share: 52 },
    { os: 'macOS Sonoma / Ventura', share: 28 },
    { os: 'Android 14 Chrome', share: 12 },
    { os: 'iOS Safari', share: 6 },
    { os: 'Linux Headless / Tor (Suspicious)', share: 2 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                FinGuard AI Security Analytics & Telemetry
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Statistical evaluation of behavioral risk distributions, detection false-positives, and hardware posture
            </p>
          </div>

          <div className="text-xs font-mono-code text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Aggregate Academic Dataset: Active</span>
          </div>
        </div>

        {/* 4 Summary High-Level Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-1">
            <span className="text-xs text-slate-400">Mean Behavioral Risk Score</span>
            <div className="text-2xl font-bold font-mono-code text-emerald-400">22.4 / 100</div>
            <span className="text-[10px] text-slate-500 font-mono-code">Healthy low risk average</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-1">
            <span className="text-xs text-slate-400">Frictionless Login Ratio</span>
            <div className="text-2xl font-bold font-mono-code text-cyan-400">84.0%</div>
            <span className="text-[10px] text-slate-500 font-mono-code">No user interruption</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-1">
            <span className="text-xs text-slate-400">Step-Up Challenge Rate</span>
            <div className="text-2xl font-bold font-mono-code text-amber-400">12.0%</div>
            <span className="text-[10px] text-slate-500 font-mono-code">Mild anomaly detected</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-1">
            <span className="text-xs text-slate-400">Auto-Blocked Attacks</span>
            <div className="text-2xl font-bold font-mono-code text-rose-400">4.0%</div>
            <span className="text-[10px] text-slate-500 font-mono-code">Zero account takeovers</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Risk Score Distribution */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Risk Score Distribution Across Monitored Accounts
              </h2>
              <span className="text-[10px] font-mono-code text-slate-400">N=38 Sessions</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="range" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                  <Bar dataKey="users" radius={[6, 6, 0, 0]}>
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-400 text-center font-mono-code">
              78.9% of user interactions fall into standard Low Risk (&lt;40).
            </p>
          </div>

          {/* Chart 2: Fraud & Anomaly Trends (7 Days) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                7-Day Transaction Fraud & Anomaly Volume Trends
              </h2>
              <span className="text-[10px] font-mono-code text-slate-400">Daily Samples</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fraudTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="flaggedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="flaggedAnomalies" stroke="#f59e0b" fillOpacity={1} fill="url(#flaggedGradient)" name="Flagged Anomalies" />
                  <Area type="monotone" dataKey="blockedAttacks" stroke="#ef4444" fillOpacity={1} fill="url(#blockedGradient)" name="Blocked Attacks" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-slate-400 text-center font-mono-code">
              Attack spike correlated with Tor exit node brute-force test on Saturday.
            </p>
          </div>

          {/* Chart 3: Authentication Success vs Challenge Rate */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-emerald-400" />
                Authentication Success vs. Step-Up Challenge Ratio
              </h2>
              <span className="text-[10px] font-mono-code text-slate-400">Continuous Biometric</span>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={authRateData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {authRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px] text-center">
              {authRateData.map((item) => (
                <div key={item.name} className="space-y-0.5">
                  <div className="font-bold font-mono-code" style={{ color: item.color }}>
                    {item.value}%
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">{item.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 4: Device & OS Breakdown */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Laptop className="w-4 h-4 text-blue-400" />
                Client Operating System & Hardware Entropy Share
              </h2>
              <span className="text-[10px] font-mono-code text-slate-400">Fingerprint Hash</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={deviceBreakdownData}
                  margin={{ top: 10, right: 20, left: 60, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} unit="%" />
                  <YAxis type="category" dataKey="os" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="share" fill="#3b82f6" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-[11px] text-slate-400 text-center font-mono-code">
              Windows and macOS constitute 80% of authorized trusted device signatures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
