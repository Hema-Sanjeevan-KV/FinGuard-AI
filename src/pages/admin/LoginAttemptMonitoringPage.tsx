import React, { useState, useEffect, useMemo } from 'react';
import { adminService } from '../../services/adminService';
import { LoginAttempt } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import {
  Clock,
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Radio,
  Laptop,
  Globe,
  RefreshCw
} from 'lucide-react';

export const LoginAttemptMonitoringPage: React.FC = () => {
  const [logins, setLogins] = useState<LoginAttempt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllLoginAttempts();
      setLogins(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredLogins = useMemo(() => {
    return logins.filter((l) => {
      const matchSearch =
        l.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.ipAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.device.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || l.loginResult === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [logins, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                Login Attempt & Session Ingress Monitoring
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Audit log of authentication attempts evaluated against continuous keystroke and device fingerprints
            </p>
          </div>

          <button
            onClick={loadData}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono-code text-slate-300 flex items-center gap-2 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Poll Auth Stream</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, IP address, or device..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono-code"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono-code"
            >
              <option value="ALL">Status: All (Allowed / Challenged / Blocked)</option>
              <option value="SUCCESS">SUCCESS (Allowed)</option>
              <option value="STEP_UP_VERIFIED">STEP_UP_VERIFIED (Challenged)</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>
          </div>
        </div>

        {/* Login Log Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono-code text-[11px] uppercase">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Username & UID</th>
                  <th className="py-3 px-4">IP Address & Location</th>
                  <th className="py-3 px-4">Device / Hardware Hash</th>
                  <th className="py-3 px-4 text-right">Behavior Score</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4">Heuristic Diagnostic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredLogins.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      item.loginResult === 'BLOCKED' ? 'bg-rose-950/15' : ''
                    }`}
                  >
                    <td className="py-3 px-4 whitespace-nowrap font-mono-code text-slate-300">
                      {item.timestamp}
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-bold text-white">{item.userName}</div>
                      <div className="font-mono-code text-[10px] text-cyan-400">{item.userId}</div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap font-mono-code text-slate-300">
                      <div>{item.ipAddress}</div>
                      <div className="text-[10px] text-slate-500">{item.location}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-slate-200">{item.device}</div>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap font-mono-code font-bold text-white">
                      <div className="flex items-center justify-end gap-2">
                        <span>{item.behaviorScore}/100</span>
                        <RiskScoreBadge level={item.riskLevel} score={item.behaviorScore} size="sm" />
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono-code ${
                          item.loginResult === 'SUCCESS'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : item.loginResult === 'STEP_UP_VERIFIED'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        {item.loginResult === 'SUCCESS'
                          ? 'Allowed'
                          : item.loginResult === 'STEP_UP_VERIFIED'
                          ? 'Challenged'
                          : 'Blocked'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {item.factorTrigger || 'Normal baseline match'}
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
