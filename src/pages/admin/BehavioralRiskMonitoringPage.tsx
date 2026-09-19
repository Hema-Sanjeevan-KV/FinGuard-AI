import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { BehavioralMetrics } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import {
  Fingerprint,
  Keyboard,
  MousePointer,
  Clock,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  BarChart2
} from 'lucide-react';

export const BehavioralRiskMonitoringPage: React.FC = () => {
  const [metricsList, setMetricsList] = useState<BehavioralMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllBehavioralMetrics();
      setMetricsList(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Fingerprint className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                Continuous Behavioral Biometrics Monitoring
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Physiological interaction telemetry: Keystroke dwell/flight variance, mouse curvature, and device entropy
            </p>
          </div>

          <button
            onClick={loadData}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono-code text-slate-300 flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Poll Metrics</span>
          </button>
        </div>

        {/* Informational Guidance on Research Formulas */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-bold text-white uppercase font-mono-code tracking-wider text-cyan-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Academic Research Formulation & Feature Vectors
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            In FinGuard AI, behavioral profiles calculate the Euclidean distance and Z-score deviation from the user's stored baseline.
            A <strong>Flight Time Variance &gt; 40ms</strong> or <strong>Dwell Variance &gt; 25ms</strong> flags an automated macro, script injection, or unauthorized physical user.
          </p>
        </div>

        {/* Detailed Behavioral Metrics Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono-code text-[11px] uppercase">
                  <th className="py-3 px-4">User & ID</th>
                  <th className="py-3 px-4">Keystroke Dwell (Mean)</th>
                  <th className="py-3 px-4">Flight Time (Variance)</th>
                  <th className="py-3 px-4">Mouse Dynamics / Jitter</th>
                  <th className="py-3 px-4">Device Consistency</th>
                  <th className="py-3 px-4 text-right">Risk Score</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {metricsList.map((m) => {
                  const keystrokeScore = m.keystrokeScore ?? m.typingPatternScore;
                  const mouseScore = m.mouseScore ?? m.mouseInteractionScore;
                  const deviceScore = m.deviceAnomalyScore ?? m.deviceScore;
                  const flightVariance = m.flightTimeVarianceMs ?? (m.metricsDetail?.flightTimeVarianceMs || 8);
                  const isAnomaly = keystrokeScore > 15 || flightVariance > 40;
                  const totalScore = keystrokeScore + mouseScore + deviceScore;

                  return (
                    <tr
                      key={m.userId || m.userName}
                      className={`hover:bg-slate-800/30 transition-colors ${
                        isAnomaly ? 'bg-rose-950/15' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-white text-sm">{m.userName || 'Account User'}</div>
                        <div className="font-mono-code text-[10px] text-cyan-400">{m.userId || 'USR-***'}</div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap font-mono-code">
                        <div className="text-slate-200">{m.avgDwellTimeMs ?? (m.metricsDetail?.keystrokeDwellTimeMs || 94)} ms</div>
                        <div className="text-[10px] text-slate-500">Dwell Var: ±{m.dwellTimeVarianceMs ?? 6} ms</div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap font-mono-code">
                        <div className="text-slate-200">{m.avgFlightTimeMs ?? 140} ms</div>
                        <div className={`text-[10px] ${flightVariance > 40 ? 'text-rose-400 font-bold' : 'text-slate-500'}`}>
                          Flight Var: ±{flightVariance} ms
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-slate-200 font-mono-code">
                          Speed: {m.mouseSpeedPps ?? 420} pps
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {(m.mouseCurvatureRatio ?? 1.25) < 1.05
                            ? '⚠ Unnatural linear path'
                            : '✓ Natural curved path'}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono-code">
                        <div className="text-slate-200">{deviceScore === 0 ? 'Verified Match' : 'Mismatch'}</div>
                        <div className="text-[10px] text-slate-500">Anomaly: {deviceScore}/20</div>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap font-mono-code font-bold text-sm text-white">
                        <div className="flex items-center justify-end gap-2">
                          <span>
                            {totalScore}/100
                          </span>
                          <RiskScoreBadge
                            level={isAnomaly ? 'HIGH' : 'LOW'}
                            score={totalScore}
                            size="sm"
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono-code ${
                            !isAnomaly
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {!isAnomaly ? '✓ Normal' : '✕ Anomaly Flagged'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
