import React, { useState, useEffect, useMemo } from 'react';
import { adminService } from '../../services/adminService';
import { Transaction, RiskLevel } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import {
  ArrowRightLeft,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Radio,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  ArrowUpDown
} from 'lucide-react';

export const TransactionMonitoringPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [liveAutoPoll, setLiveAutoPoll] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await adminService.getAllTransactions();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    if (!liveAutoPoll) return;
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [liveAutoPoll]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.userName && t.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (t.recipient && t.recipient.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchRisk = riskFilter === 'ALL' || t.riskLevel === riskFilter;
      const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;

      return matchSearch && matchRisk && matchStatus;
    });
  }, [transactions, searchQuery, riskFilter, statusFilter]);

  const flaggedCount = transactions.filter((t) => t.status === 'FLAGGED' || t.riskLevel === 'HIGH').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                Real-Time Transaction Monitoring
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live heuristic anomaly detection feed evaluating monetary transactions across the banking network
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiveAutoPoll(!liveAutoPoll)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono-code flex items-center gap-1.5 transition-colors ${
                liveAutoPoll
                  ? 'bg-cyan-950 border-cyan-800 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${liveAutoPoll ? 'text-cyan-400 animate-pulse' : ''}`} />
              <span>{liveAutoPoll ? 'Live Feed Active' : 'Feed Paused'}</span>
            </button>

            <button
              onClick={loadData}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300"
              title="Refresh Transactions"
            >
              <RefreshCw className={`w-4 h-4 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Flagged Alert Banner */}
        {flaggedCount > 0 && (
          <div className="p-4 bg-amber-950/40 border border-amber-800 rounded-xl flex items-center justify-between text-xs text-amber-300">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>{flaggedCount} Flagged / High-Risk Transactions</strong> currently held or requiring SOC analyst review.
              </span>
            </div>
            <button
              onClick={() => setRiskFilter('HIGH')}
              className="px-2.5 py-1 bg-amber-900/60 hover:bg-amber-800 text-amber-200 rounded text-xs font-mono-code font-bold"
            >
              Filter High Risk Only
            </button>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, payee, or ID..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono-code"
            />
          </div>

          <div>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">Filter by Risk: All Levels</option>
              <option value="LOW">LOW Risk (0 - 29)</option>
              <option value="MEDIUM">MEDIUM Risk (30 - 59)</option>
              <option value="HIGH">HIGH Risk (60 - 100)</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">Filter by Status: All</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="FLAGGED">FLAGGED</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>
          </div>
        </div>

        {/* Live Transaction Feed Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono-code text-[11px] uppercase">
                  <th className="py-3 px-4">Timestamp & ID</th>
                  <th className="py-3 px-4">Account / User</th>
                  <th className="py-3 px-4">Recipient / Description</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Risk Score</th>
                  <th className="py-3 px-4 text-right">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500 font-mono-code">
                      No live transactions match current filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((txn) => (
                    <tr
                      key={txn.id}
                      className={`hover:bg-slate-800/30 transition-colors ${
                        txn.riskLevel === 'HIGH' ? 'bg-rose-950/10' : ''
                      }`}
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-mono-code font-bold text-cyan-400">{txn.id}</div>
                        <div className="text-[10px] text-slate-500 font-mono-code">{txn.date}</div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-white font-bold">{txn.userName || txn.userId}</div>
                        <div className="text-[10px] text-slate-500 font-mono-code">{txn.userId}</div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="text-slate-200">{txn.description}</div>
                        {txn.recipient && (
                          <div className="text-[11px] text-slate-500">Payee: {txn.recipient}</div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right font-mono-code font-bold text-sm whitespace-nowrap">
                        <span className={txn.type === 'DEPOSIT' ? 'text-emerald-400' : 'text-slate-100'}>
                          {txn.type === 'DEPOSIT' ? '+' : '-'} {txn.currency}{txn.amount.toLocaleString()}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono-code ${
                            txn.status === 'COMPLETED'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : txn.status === 'FLAGGED'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-mono-code font-bold whitespace-nowrap text-white">
                        {txn.riskScore}/100
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <RiskScoreBadge level={txn.riskLevel} score={txn.riskScore} size="sm" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
