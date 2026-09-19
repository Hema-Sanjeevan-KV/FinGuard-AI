import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { SecurityAlert } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Laptop,
  Search,
  Filter,
  Lock,
  Eye,
  RefreshCw,
  XCircle,
  FileCheck
} from 'lucide-react';

export const FraudAlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const data = await adminService.getFraudAlerts();
      setAlerts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleUpdateStatus = async (alertId: string, newStatus: 'OPEN' | 'INVESTIGATING' | 'RESOLVED') => {
    try {
      await adminService.resolveAlert(alertId, newStatus);
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, status: newStatus } : a))
      );
      setFeedback(`Alert ${alertId} status changed to ${newStatus}`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAlerts = alerts.filter((a) => {
    const matchStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchSeverity = severityFilter === 'ALL' || a.severity === severityFilter;
    return matchStatus && matchSeverity;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                Fraud & Behavioral Security Alerts
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Active forensic alerts triggered by keystroke latency drift, unauthorized IP subnets, or high-risk transfers
            </p>
          </div>

          <button
            onClick={loadAlerts}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono-code text-slate-300 flex items-center gap-2 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Poll Alerts</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="p-4 bg-cyan-950/60 border border-cyan-800 text-cyan-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span>Filters:</span>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">Status: All (Open/Investigating/Resolved)</option>
              <option value="OPEN">OPEN Only</option>
              <option value="INVESTIGATING">INVESTIGATING Only</option>
              <option value="RESOLVED">RESOLVED Only</option>
            </select>
          </div>

          <div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">Severity: All (Critical/High/Medium)</option>
              <option value="CRITICAL">CRITICAL Only</option>
              <option value="HIGH">HIGH Only</option>
              <option value="MEDIUM">MEDIUM Only</option>
            </select>
          </div>
        </div>

        {/* Alert Cards List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-500 font-mono-code text-xs">
              No fraud alerts matched the current criteria.
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-6 rounded-2xl border transition-all ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-rose-950/20 border-rose-800/80 shadow-rose-950/20 shadow-lg'
                    : alert.severity === 'HIGH'
                    ? 'bg-amber-950/20 border-amber-800/80 shadow-amber-950/20 shadow-lg'
                    : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono-code text-xs font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {alert.id}
                      </span>

                      {/* Severity Pill */}
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                          alert.severity === 'CRITICAL'
                            ? 'bg-rose-950 text-rose-300 border border-rose-700'
                            : alert.severity === 'HIGH'
                            ? 'bg-amber-950 text-amber-300 border border-amber-700'
                            : 'bg-blue-950 text-blue-300 border border-blue-700'
                        }`}
                      >
                        {alert.severity} SEVERITY
                      </span>

                      {/* Status Pill */}
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                          alert.status === 'OPEN'
                            ? 'bg-rose-900/80 text-rose-200'
                            : alert.status === 'INVESTIGATING'
                            ? 'bg-amber-900/80 text-amber-200'
                            : 'bg-emerald-900/80 text-emerald-200'
                        }`}
                      >
                        ● {alert.status}
                      </span>

                      <span className="text-xs text-slate-400">
                        Affected User: <strong className="text-white">{alert.userName}</strong> ({alert.userId})
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          alert.severity === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'
                        }`}
                      />
                      {alert.eventDescription}
                    </h3>

                    {/* Trigger Reason */}
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs space-y-1">
                      <div className="font-mono-code text-[11px] text-cyan-400 font-semibold">
                        Trigger Reason & Forensic Telemetry:
                      </div>
                      <p className="text-slate-300">{alert.triggerReason}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono-code text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {alert.timestamp}
                      </span>
                      <span className="flex items-center gap-1">
                        <Laptop className="w-3.5 h-3.5 text-slate-500" />
                        {alert.device} ({alert.location})
                      </span>
                    </div>
                  </div>

                  {/* Right Actions & Score */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-4 lg:pt-0 lg:pl-6">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-mono-code text-slate-500">Anomaly Score</div>
                      <RiskScoreBadge level={alert.riskLevel} score={alert.riskScore} size="lg" />
                    </div>

                    {/* Action buttons as specified in prompt */}
                    <div className="flex flex-wrap gap-2">
                      {alert.status !== 'INVESTIGATING' && alert.status !== 'RESOLVED' && (
                        <button
                          onClick={() => handleUpdateStatus(alert.id, 'INVESTIGATING')}
                          className="px-3 py-1.5 bg-amber-950 hover:bg-amber-900 border border-amber-800 text-amber-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Investigate
                        </button>
                      )}

                      {alert.status !== 'RESOLVED' && (
                        <button
                          onClick={() => handleUpdateStatus(alert.id, 'RESOLVED')}
                          className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Resolve</span>
                        </button>
                      )}

                      {alert.status === 'RESOLVED' && (
                        <button
                          onClick={() => handleUpdateStatus(alert.id, 'OPEN')}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Reopen Alert
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
