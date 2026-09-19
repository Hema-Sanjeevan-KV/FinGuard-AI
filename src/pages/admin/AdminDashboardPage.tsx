import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/adminService';
import { AdminDashboardStats, SecurityAlert, Transaction } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import {
  ShieldAlert,
  Users,
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Lock,
  Unlock,
  Radio,
  ExternalLink,
  ShieldCheck,
  Clock
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { setCurrentRoute } = useAuth();
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [recentTxns, setRecentTxns] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, a, t] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getFraudAlerts(),
        adminService.getAllTransactions(),
      ]);
      setStats(s);
      setAlerts(a);
      setRecentTxns(t.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Live update simulation for SOC
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* SOC Top Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code uppercase px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/80 flex items-center gap-1.5">
                <Radio className="w-3 h-3 animate-pulse text-rose-400" />
                Live SOC Command
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                Engine: FinGuard Behavioral Daemon v2.4 (Java/Spring)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Cybersecurity & Fraud Monitoring SOC
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Real-time heuristic evaluation of continuous biometric telemetry, login flight times,
              and transaction anomaly vectors across active accounts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono-code text-slate-300 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
              <span>Poll SOC Feeds</span>
            </button>
            <button
              onClick={() => setCurrentRoute('admin-alerts')}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>View Open Alerts</span>
            </button>
          </div>
        </div>

        {/* 4 Core SOC Metrics as specified in prompt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1: Total Users */}
          <div
            onClick={() => setCurrentRoute('admin-users')}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-3 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Registered Users</span>
              <div className="p-2 rounded-lg bg-slate-800 text-cyan-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono-code text-white">
                {stats?.totalUsers ?? 4}
              </div>
              <div className="text-[11px] text-slate-400">
                Active Profiles: <span className="text-slate-200 font-semibold font-mono-code">3 Accounts</span>
              </div>
            </div>
            <div className="text-[10px] text-cyan-400 flex items-center gap-1 font-mono-code pt-1 border-t border-slate-800">
              <span>View User Management →</span>
            </div>
          </div>

          {/* 2: Monitored Sessions */}
          <div
            onClick={() => setCurrentRoute('admin-behavior')}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-3 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Monitored Active Sessions</span>
              <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono-code text-white">
                {stats?.monitoredSessions ?? 3}
              </div>
              <div className="text-[11px] text-slate-400">
                Sampling Rate: <span className="text-slate-200 font-semibold font-mono-code">100Hz Biometric</span>
              </div>
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono-code pt-1 border-t border-slate-800">
              <span>Live Biometric Stream →</span>
            </div>
          </div>

          {/* 3: High Risk Users */}
          <div
            onClick={() => setCurrentRoute('admin-users')}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-3 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">High Risk Accounts</span>
              <div className="p-2 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono-code text-rose-400">
                {stats?.highRiskUsers ?? 1}
              </div>
              <div className="text-[11px] text-slate-400">
                Trigger: <span className="text-rose-300 font-semibold font-mono-code">Anomaly User (Score 82)</span>
              </div>
            </div>
            <div className="text-[10px] text-rose-400 flex items-center gap-1 font-mono-code pt-1 border-t border-slate-800">
              <span>1 Account Requires Step-Up</span>
            </div>
          </div>

          {/* 4: Fraud Alerts */}
          <div
            onClick={() => setCurrentRoute('admin-alerts')}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-3 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Active Fraud Alerts</span>
              <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono-code text-amber-400">
                {stats?.activeAlerts ?? 2}
              </div>
              <div className="text-[11px] text-slate-400">
                Severity: <span className="text-slate-200 font-semibold font-mono-code">1 CRITICAL, 1 HIGH</span>
              </div>
            </div>
            <div className="text-[10px] text-amber-400 flex items-center gap-1 font-mono-code pt-1 border-t border-slate-800">
              <span>Manage Alerts →</span>
            </div>
          </div>
        </div>

        {/* Live Behavioral Risk Feed & Recent High Risk Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Live Behavioral Risk Feed */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white font-mono-code uppercase">
                  Live Behavioral Risk Feed
                </h2>
              </div>
              <span className="text-[10px] font-mono-code text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Real-time
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Harish Kumar (USR-101)</span>
                  <RiskScoreBadge level="LOW" score={18} size="sm" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Keystroke dwell: 94ms (variance 4.2ms). Natural mouse curve. Device fingerprint trusted.
                </p>
                <div className="flex justify-between text-[10px] font-mono-code text-slate-500 pt-1 border-t border-slate-800">
                  <span>Dell XPS 15 • Chrome / Win11</span>
                  <span>Active right now</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Hema Sundar (USR-102)</span>
                  <RiskScoreBadge level="LOW" score={24} size="sm" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Keystroke dwell: 88ms. Regular campus WiFi subnet. Standard student schedule.
                </p>
                <div className="flex justify-between text-[10px] font-mono-code text-slate-500 pt-1 border-t border-slate-800">
                  <span>MacBook Air M2 • Safari / macOS</span>
                  <span>Active 14m ago</span>
                </div>
              </div>

              <div className="p-3.5 bg-rose-950/20 rounded-xl border border-rose-900/60 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-rose-300">Anomaly User (USR-103)</span>
                  <RiskScoreBadge level="HIGH" score={82} size="sm" />
                </div>
                <p className="text-[11px] text-rose-200/80">
                  CRITICAL: Dwell time +142ms variance. Teleportation mouse vector. Access at 03:14 AM via Tor exit IP.
                </p>
                <div className="flex justify-between text-[10px] font-mono-code text-rose-400/80 pt-1 border-t border-rose-900/40">
                  <span>Unknown Linux VM • Headless Tor</span>
                  <span>Active 2m ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Recent High Risk Events & Alerts */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <h2 className="text-sm font-bold text-white font-mono-code uppercase">
                  Recent High Risk Security Events
                </h2>
              </div>
              <button
                onClick={() => setCurrentRoute('admin-alerts')}
                className="text-xs text-cyan-400 hover:underline font-mono-code"
              >
                All Alerts →
              </button>
            </div>

            <div className="space-y-3">
              {alerts.slice(0, 3).map((al) => (
                <div
                  key={al.id}
                  className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{al.userName}</span>
                      <span className="text-[10px] text-slate-500 font-mono-code">({al.userId})</span>
                    </div>
                    <RiskScoreBadge level={al.riskLevel} score={al.riskScore} size="sm" />
                  </div>

                  <p className="text-slate-300 text-xs">{al.eventDescription}</p>

                  <div className="flex items-center justify-between text-[10px] font-mono-code text-slate-500 pt-1 border-t border-slate-800">
                    <span>{al.timestamp}</span>
                    <span className="text-amber-400 font-semibold">{al.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Transaction Anomaly Inspection Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                Recent High-Velocity Transactions
              </h2>
              <p className="text-xs text-slate-400">
                Real-time transaction risk scoring evaluated by FinGuard AI rules engine
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('admin-transactions')}
              className="text-xs text-cyan-400 hover:underline font-mono-code"
            >
              Monitor All Transactions →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono-code text-[11px]">
                  <th className="py-2.5 px-3">Transaction ID</th>
                  <th className="py-2.5 px-3">User & Account</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-right">Risk Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {recentTxns.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-mono-code text-cyan-400 font-bold whitespace-nowrap">
                      {t.id}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="text-white">{t.userName || t.userId}</div>
                      <div className="text-[10px] text-slate-500 font-mono-code">{t.date}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      <div>{t.description}</div>
                      {t.recipient && <div className="text-[11px] text-slate-500">Payee: {t.recipient}</div>}
                    </td>
                    <td className="py-3 px-3 text-right font-mono-code font-bold whitespace-nowrap">
                      <span className={t.type === 'DEPOSIT' ? 'text-emerald-400' : 'text-slate-100'}>
                        {t.currency}{t.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        t.status === 'FLAGGED' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <RiskScoreBadge level={t.riskLevel} score={t.riskScore} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
