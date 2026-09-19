import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { securityService } from '../../services/securityService';
import { BehavioralMetrics, RecognizedDevice, SecurityAlert, LoginAttempt } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import { RiskMeterGauge } from '../../components/RiskMeterGauge';
import {
  Lock,
  ShieldCheck,
  Laptop,
  Fingerprint,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Eye,
  Key,
  Smartphone,
  ShieldAlert
} from 'lucide-react';

export const SecurityCenterPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [metrics, setMetrics] = useState<BehavioralMetrics | null>(null);
  const [devices, setDevices] = useState<RecognizedDevice[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [logins, setLogins] = useState<LoginAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [m, d, a, l] = await Promise.all([
        securityService.getBehavioralMetrics(currentUser.id),
        securityService.getRecognizedDevices(currentUser.id),
        securityService.getAlerts(currentUser.id),
        securityService.getLoginAttempts(currentUser.id),
      ]);
      setMetrics(m);
      setDevices(d);
      setAlerts(a);
      setLogins(l);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleRevokeDevice = async (deviceId: string) => {
    try {
      await securityService.revokeDevice(deviceId);
      setDevices((prev) =>
        prev.map((d) => (d.id === deviceId ? { ...d, status: 'REVOKED' } : d))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolveAlert = async (alertId: string) => {
    try {
      await securityService.resolveAlert(alertId, 'RESOLVED');
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, status: 'RESOLVED' } : a))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-emerald-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                Security & Biometric Center
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Zero-Trust continuous behavioral authentication profile & authorized hardware devices
            </p>
          </div>

          <button
            onClick={loadData}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono-code text-slate-300 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Refresh Telemetry</span>
          </button>
        </div>

        {/* Top 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Security Status */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Security Status</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Protected
            </div>
            <div className="text-[11px] text-slate-400 font-mono-code pt-1 border-t border-slate-800">
              Zero-Trust Armed
            </div>
          </div>

          {/* Card 2: Risk Score */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Risk Score</span>
              <RiskScoreBadge level={currentUser?.riskLevel || 'LOW'} score={currentUser?.riskScore || 18} size="sm" />
            </div>
            <div className="text-xl font-bold font-mono-code text-white">
              {currentUser?.riskScore || 18}<span className="text-xs text-slate-400">/100</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono-code pt-1 border-t border-slate-800">
              Risk Level: {currentUser?.riskLevel || 'LOW'}
            </div>
          </div>

          {/* Card 3: Behavioral Profile */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Behavior Profile</span>
              <Fingerprint className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-bold text-white">
              Normal
            </div>
            <div className="text-[11px] text-slate-400 font-mono-code pt-1 border-t border-slate-800">
              Keystroke dwell: 94ms
            </div>
          </div>

          {/* Card 4: Current Device */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Device Status</span>
              <Laptop className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-slate-100 truncate">
              Chrome / Windows
            </div>
            <div className="text-[11px] text-emerald-400 font-mono-code pt-1 border-t border-slate-800">
              Status: Trusted
            </div>
          </div>
        </div>

        {/* Behavioral Authentication Telemetry Grid */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-cyan-400" />
                Continuous Behavioral Authentication Profile
              </h2>
              <p className="text-xs text-slate-400">
                Mathematical comparison against calibrated user baseline vectors
              </p>
            </div>
            <span className="text-xs font-mono-code bg-slate-950 text-cyan-400 px-3 py-1 rounded-full border border-slate-800">
              Baseline Samples: 42 verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono-code">Typing Pattern</span>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Normal (5/25)
              </div>
              <p className="text-[10px] text-slate-500">Flight latency consistent</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono-code">Login Time</span>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Normal (0/20)
              </div>
              <p className="text-[10px] text-slate-500">Regular study hours</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono-code">Device Posture</span>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Normal (0/20)
              </div>
              <p className="text-[10px] text-slate-500">Matching GPU & OS hash</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono-code">Mouse Dynamics</span>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Normal (3/15)
              </div>
              <p className="text-[10px] text-slate-500">Organic bezier velocity</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono-code">Transaction Profile</span>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Normal (10/20)
              </div>
              <p className="text-[10px] text-slate-500">Low outflow velocity</p>
            </div>
          </div>
        </div>

        {/* Recognized Devices & Security Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recognized Devices Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Laptop className="w-4 h-4 text-cyan-400" />
                Recognized Devices ({devices.length})
              </h2>
              <span className="text-[10px] font-mono-code text-slate-400">Hardware Bindings</span>
            </div>

            <div className="space-y-3">
              {devices.map((dev) => (
                <div
                  key={dev.id}
                  className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <span>{dev.deviceName}</span>
                      {dev.isCurrent && (
                        <span className="text-[9px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-1.5 py-0.2 rounded font-mono-code">
                          Current Device
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono-code">
                      {dev.browser} • {dev.os}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono-code">
                      IP: {dev.ipAddress} • Last active: {dev.lastActive}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                        dev.status === 'TRUSTED'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : dev.status === 'SUSPICIOUS'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {dev.status}
                    </span>
                    {!dev.isCurrent && dev.status !== 'REVOKED' && (
                      <button
                        onClick={() => handleRevokeDevice(dev.id)}
                        className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded transition-colors"
                        title="Revoke device access"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Alerts List */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Security Incident Alerts ({alerts.length})
              </h2>
              <span className="text-[10px] font-mono-code text-slate-400">Risk Audit</span>
            </div>

            <div className="space-y-3">
              {alerts.length === 0 ? (
                <div className="py-6 text-center text-slate-500 text-xs font-mono-code">
                  No active security alerts recorded for this account.
                </div>
              ) : (
                alerts.map((al) => (
                  <div
                    key={al.id}
                    className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <RiskScoreBadge level={al.riskLevel} score={al.riskScore} size="sm" />
                        <span className="font-mono-code text-[11px] text-slate-400 font-bold">{al.id}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono-code">{al.timestamp}</span>
                    </div>

                    <p className="text-slate-200 text-xs font-medium">
                      {al.eventDescription}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px] font-mono-code text-slate-400 border-t border-slate-800/80">
                      <span>{al.device} ({al.location})</span>
                      {al.status !== 'RESOLVED' ? (
                        <button
                          onClick={() => handleResolveAlert(al.id)}
                          className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded hover:bg-emerald-900 transition-colors"
                        >
                          Mark Resolved
                        </button>
                      ) : (
                        <span className="text-slate-500">Resolved ✓</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Login Activity History */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Recent Login Activity History
            </h2>
            <span className="text-[10px] font-mono-code text-slate-400">Biometric Audit Stream</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono-code text-[11px]">
                  <th className="py-2">Timestamp</th>
                  <th className="py-2">Device & Environment</th>
                  <th className="py-2">Location & IP</th>
                  <th className="py-2 text-right">Behavior Score</th>
                  <th className="py-2 text-center">Result</th>
                  <th className="py-2">Telemetry Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {logins.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 font-mono-code text-slate-300 whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 text-slate-200">{log.device}</td>
                    <td className="py-3 font-mono-code text-slate-400">{log.location} ({log.ipAddress})</td>
                    <td className="py-3 text-right">
                      <RiskScoreBadge level={log.riskLevel} score={log.behaviorScore} size="sm" />
                    </td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.loginResult === 'SUCCESS' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        log.loginResult === 'STEP_UP_VERIFIED' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {log.loginResult}
                      </span>
                    </td>
                    <td className="py-3 text-[11px] text-slate-400">{log.factorTrigger || 'Normal baseline match'}</td>
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
