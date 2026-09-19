import React from 'react';
import { ArrowDown, CheckCircle2, AlertTriangle, XCircle, BrainCircuit, Activity, Cpu } from 'lucide-react';

export const SecurityDecisionModelCard: React.FC<{ interactiveScore?: number }> = ({ interactiveScore }) => {
  return (
    <div
      id="security-decision-model-card"
      className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
            FinGuard AI Security Decision Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Academic behavioral feature extraction & multi-factor ML scoring architecture
          </p>
        </div>
        <span className="text-[10px] font-mono-code bg-slate-800 text-cyan-300 px-2 py-0.5 rounded border border-slate-700">
          Java Spring Engine Model
        </span>
      </div>

      {/* 4-Step Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center relative">
        {/* Step 1 */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center text-xs font-bold mb-2">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-200">1. Behavior Data</span>
          <span className="text-[11px] text-slate-400 mt-1 leading-tight">
            Keystroke dwell/flight time, mouse trajectory, device fingerprint, temporal window
          </span>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center text-xs font-bold mb-2">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-200">2. Feature Analysis</span>
          <span className="text-[11px] text-slate-400 mt-1 leading-tight">
            Variance from baseline biometric profile, contextual outlier & velocity checks
          </span>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-violet-950 border border-violet-800 text-violet-400 flex items-center justify-center text-xs font-bold mb-2">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-200">3. Risk Score (0-100)</span>
          <span className="text-[11px] text-slate-400 mt-1 leading-tight">
            Weighted risk aggregation: Typing (25%) + Time (20%) + Device (20%) + Pointer (15%) + Txn (20%)
          </span>
        </div>

        {/* Step 4 */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center text-xs font-bold mb-2">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-200">4. Security Decision</span>
          <span className="text-[11px] text-slate-400 mt-1 leading-tight">
            Automated threshold evaluation: Normal Allow, Step-Up OTP, or Immediate Block
          </span>
        </div>
      </div>

      {/* Threshold Documentation Grid */}
      <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className={`p-3 rounded-lg border transition-all ${interactiveScore !== undefined && interactiveScore < 30 ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/40' : 'bg-emerald-950/20 border-emerald-900/40'}`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-emerald-400 font-mono-code">0 – 29 SCORE</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              LOW RISK
            </span>
          </div>
          <p className="text-xs font-medium text-slate-200">Allow Normal Access</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Biometrics match user baseline; familiar device and location. Full transaction clearance.
          </p>
        </div>

        <div className={`p-3 rounded-lg border transition-all ${interactiveScore !== undefined && interactiveScore >= 30 && interactiveScore < 60 ? 'bg-amber-950/40 border-amber-500/60 ring-1 ring-amber-500/40' : 'bg-amber-950/20 border-amber-900/40'}`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-amber-400 font-mono-code">30 – 59 SCORE</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
              MEDIUM RISK
            </span>
          </div>
          <p className="text-xs font-medium text-slate-200">Request Additional Verification</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Mild typing divergence or new subnet. Trigger step-up biometric prompt or OTP before sensitive actions.
          </p>
        </div>

        <div className={`p-3 rounded-lg border transition-all ${interactiveScore !== undefined && interactiveScore >= 60 ? 'bg-rose-950/40 border-rose-500/60 ring-1 ring-rose-500/40' : 'bg-rose-950/20 border-rose-900/40'}`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-rose-400 font-mono-code">60 – 100 SCORE</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
              HIGH RISK
            </span>
          </div>
          <p className="text-xs font-medium text-slate-200">Block Operation & Alert SOC</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Severe anomaly (synthetic bot pacing, Tor proxy, sudden capital drain). Suspend action and trigger security incident.
          </p>
        </div>
      </div>
    </div>
  );
};
