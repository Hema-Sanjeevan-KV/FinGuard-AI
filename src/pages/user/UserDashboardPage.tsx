import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bankingService } from '../../services/bankingService';
import { securityService } from '../../services/securityService';
import { Transaction, SecurityAlert } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import { RiskMeterGauge } from '../../components/RiskMeterGauge';
import {
  ShieldCheck,
  ArrowRightLeft,
  History,
  Lock,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  AlertTriangle,
  Laptop,
  Clock,
  ExternalLink,
  ChevronRight,
  Eye,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { currentUser, currentAccount, setCurrentRoute } = useAuth();
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [userAlerts, setUserAlerts] = useState<SecurityAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      setLoading(true);
      try {
        const [txns, alerts] = await Promise.all([
          bankingService.getTransactions(currentUser.id),
          securityService.getAlerts(currentUser.id),
        ]);
        setRecentTransactions(txns.slice(0, 5));
        setUserAlerts(alerts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  // Fallback values if account hasn't loaded
  const balance = currentAccount?.balance ?? 50000;
  const availableBalance = currentAccount?.availableBalance ?? 48500;
  const currency = currentAccount?.currency ?? '₹';
  const riskScore = currentUser?.riskScore ?? 18;
  const riskLevel = currentUser?.riskLevel ?? 'LOW';
  const securityStatus = currentUser?.accountStatus === 'LOCKED' ? 'Suspended' : 'Protected';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Welcome Banner & Security Status */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                Digital Banking Portal
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                Acc: {currentAccount?.accountNumber || '4099 2810 5582'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Welcome back, {currentUser?.name || 'Harish Kumar'}!
            </h1>
            <p className="text-xs text-slate-400 max-w-xl">
              Your banking session is actively protected by FinGuard AI continuous behavioral authentication
              and real-time transaction heuristics.
            </p>
          </div>

          {/* Security Status Badge & Quick Transfer Action */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono-code text-slate-400">Security Status</div>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {securityStatus}
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentRoute('transfer-money')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/30 flex items-center gap-2 cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>Transfer Funds</span>
            </button>
          </div>
        </div>

        {/* Security Alerts Notification (if any) */}
        {userAlerts.filter(a => a.status !== 'RESOLVED').length > 0 && (
          <div className="bg-amber-950/40 border border-amber-800/80 rounded-xl p-4 flex items-start gap-3 text-xs">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <div className="font-semibold text-amber-300">
                Active Security Advisory: {userAlerts[0]?.eventDescription}
              </div>
              <p className="text-slate-400 text-[11px]">
                Incident ID: <span className="font-mono-code text-slate-300">{userAlerts[0]?.id}</span> • Risk Score: {userAlerts[0]?.riskScore}/100.
                Review this activity in your Security Center.
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('security-center')}
              className="px-3 py-1 bg-amber-900/60 hover:bg-amber-800 text-amber-200 rounded-lg text-xs font-medium shrink-0"
            >
              Review
            </button>
          </div>
        )}

        {/* 4 Major Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Account Balance */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Total Account Balance</span>
              <div className="p-2 rounded-lg bg-slate-800 text-cyan-400">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono-code text-white">
                {currency}{balance.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400">
                Available: <span className="text-slate-200 font-semibold font-mono-code">{currency}{availableBalance.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono-code pt-1 border-t border-slate-800/80">
              <span>Tier-2 Behavioral Protected</span>
            </div>
          </div>

          {/* Card 2: Current Risk Score */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Current Risk Score</span>
              <RiskScoreBadge level={riskLevel} score={riskScore} size="sm" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-bold font-mono-code text-white">
                {riskScore}<span className="text-xs font-normal text-slate-400">/100</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                Risk Level: <strong className={riskLevel === 'LOW' ? 'text-emerald-400' : 'text-amber-400'}>{riskLevel}</strong>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
              Threshold: 0-29 Low • 30-59 Med • 60+ High
            </div>
          </div>

          {/* Card 3: Recent Login Activity */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Recent Login</span>
              <div className="p-2 rounded-lg bg-slate-800 text-indigo-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-base font-semibold text-white truncate">
                {currentUser?.lastLogin || 'Today, 10:42 AM'}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                IP: 49.37.12.88 (Bangalore)
              </div>
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono-code pt-1 border-t border-slate-800/80">
              <span>Session verified normal</span>
            </div>
          </div>

          {/* Card 4: Current Device */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Current Device</span>
              <div className="p-2 rounded-lg bg-slate-800 text-blue-400">
                <Laptop className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-white truncate">
                {currentUser?.currentDevice || 'Chrome 122 / Windows 11'}
              </div>
              <div className="text-[11px] text-slate-400">
                Status: <span className="text-emerald-400 font-medium">{currentUser?.deviceStatus || 'TRUSTED'}</span>
              </div>
            </div>
            <div className="text-[10px] text-cyan-400 flex items-center gap-1 font-mono-code pt-1 border-t border-slate-800/80">
              <span>Hardware entropy hash valid</span>
            </div>
          </div>
        </div>

        {/* Two Columns: Recent Transactions & Behavioral Telemetry Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Recent Transactions Table */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <History className="w-4 h-4 text-cyan-400" />
                  Recent Transactions
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time transaction risk scoring & status verification
                </p>
              </div>
              <button
                onClick={() => setCurrentRoute('transaction-history')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                <span>View All History</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono-code">
                    <th className="pb-2">Date & ID</th>
                    <th className="pb-2">Type / Description</th>
                    <th className="pb-2 text-right">Amount</th>
                    <th className="pb-2 text-center">Status</th>
                    <th className="pb-2 text-right">Risk Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {recentTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3">
                        <div className="font-mono-code text-slate-300">{t.date}</div>
                        <div className="text-[10px] text-slate-500 font-mono-code">{t.id}</div>
                      </td>
                      <td className="py-3">
                        <div className="font-medium text-white">{t.description}</div>
                        <div className="text-[11px] text-slate-400">{t.recipient || t.type}</div>
                      </td>
                      <td className="py-3 text-right font-mono-code font-bold">
                        <span className={t.type === 'DEPOSIT' ? 'text-emerald-400' : 'text-slate-200'}>
                          {t.type === 'DEPOSIT' ? '+' : '-'} {t.currency}{t.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          t.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          t.status === 'FLAGGED' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <RiskScoreBadge level={t.riskLevel} score={t.riskScore} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right 1 Col: Security Center Quick Summary */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  Security Center Status
                </h3>
                <span className="text-[10px] font-mono-code text-cyan-400">Live</span>
              </div>

              {/* Gauge */}
              <div className="py-2 flex justify-center">
                <RiskMeterGauge score={riskScore} level={riskLevel} size={150} />
              </div>

              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Behavioral Profile:</span>
                  <span className="text-emerald-400 font-semibold font-mono-code">Normal Match</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Keystroke Dwell:</span>
                  <span className="text-slate-200 font-mono-code">94ms avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recognized Devices:</span>
                  <span className="text-slate-200 font-mono-code">2 Trusted</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Daily Transfer Limit:</span>
                  <span className="text-slate-200 font-mono-code">₹1,00,000</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setCurrentRoute('transfer-money')}
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Simulate Transfer Money</span>
              </button>

              <button
                onClick={() => setCurrentRoute('security-center')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Open Security Center</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
