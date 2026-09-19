import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import { SecurityDecisionModelCard } from '../../components/SecurityDecisionModelCard';
import {
  Shield,
  Keyboard,
  MousePointer,
  Laptop,
  Clock,
  ArrowRightLeft,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const SecurityFeaturesPage: React.FC = () => {
  const { setCurrentRoute } = useAuth();

  // Interactive risk calculator state for academic evaluation
  const [weights, setWeights] = useState({
    typing: 5,     // max 25
    time: 0,       // max 20
    device: 0,     // max 20
    mouse: 3,      // max 15
    transaction: 10 // max 20
  });

  const totalScore = Math.min(
    100,
    weights.typing + weights.time + weights.device + weights.mouse + weights.transaction
  );

  const riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' =
    totalScore < 30 ? 'LOW' : totalScore < 60 ? 'MEDIUM' : 'HIGH';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-cyan-950/70 border border-cyan-800 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono-code">
            <Sparkles className="w-3.5 h-3.5" /> Multi-Factor Behavioral Biometrics
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            FinGuard AI Security Engine Features
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Comprehensive breakdown of continuous behavioral signals, anomaly detection heuristics,
            and aggregate risk decisioning.
          </p>
        </div>

        {/* 5 Core Behavioral Factor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Factor 1: Typing */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                <Keyboard className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-code bg-slate-800 text-cyan-300 px-2 py-0.5 rounded">
                Weight: 25%
              </span>
            </div>
            <h3 className="text-base font-bold text-white">1. Typing Cadence Dynamics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes key dwell time (duration a key is pressed down) and flight time (latency between releasing one key and striking the next). Generates an individualized n-graph latency vector.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono-code text-slate-300 space-y-1">
              <div>✓ Normal: 75-110ms dwell, familiar digram rhythm</div>
              <div className="text-rose-400">✕ Anomaly: Robotic uniform pauses (&lt;5ms) or copy-paste</div>
            </div>
          </div>

          {/* Factor 2: Mouse Dynamics */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-indigo-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
                <MousePointer className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-code bg-slate-800 text-indigo-300 px-2 py-0.5 rounded">
                Weight: 15%
              </span>
            </div>
            <h3 className="text-base font-bold text-white">2. Mouse & Pointer Dynamics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Monitors pointer trajectory curvature, acceleration curves, velocity histograms, and micro-movements prior to button clicks. Detects automated headless browser bots.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono-code text-slate-300 space-y-1">
              <div>✓ Normal: Organic curved bezier trajectory with natural jitter</div>
              <div className="text-rose-400">✕ Anomaly: Unnatural linear vectors or teleportation</div>
            </div>
          </div>

          {/* Factor 3: Device Posture */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-blue-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-800">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-code bg-slate-800 text-blue-300 px-2 py-0.5 rounded">
                Weight: 20%
              </span>
            </div>
            <h3 className="text-base font-bold text-white">3. Device & Hardware Posture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluates hardware fingerprint hashes, canvas rendering characteristics, WebGL GPU profile, OS audio context, and IP subnet consistency.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono-code text-slate-300 space-y-1">
              <div>✓ Normal: Known trusted laptop/mobile with matching fingerprint</div>
              <div className="text-rose-400">✕ Anomaly: Tor exit proxy or headless Linux VM</div>
            </div>
          </div>

          {/* Factor 4: Temporal Window */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-code bg-slate-800 text-amber-300 px-2 py-0.5 rounded">
                Weight: 20%
              </span>
            </div>
            <h3 className="text-base font-bold text-white">4. Temporal Context Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Models diurnal habits and active operational time windows. Flags transactions or logins occurring during abnormal hours (e.g., 3:00 AM) unless verified.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono-code text-slate-300 space-y-1">
              <div>✓ Normal: Standard working or study hours (08:00 - 22:00)</div>
              <div className="text-amber-400">⚠ Unusual: Rapid session burst at 03:30 AM</div>
            </div>
          </div>

          {/* Factor 5: Transaction Profile */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-emerald-800 rounded-xl p-6 space-y-4 md:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-code bg-slate-800 text-emerald-300 px-2 py-0.5 rounded">
                Weight: 20%
              </span>
            </div>
            <h3 className="text-base font-bold text-white">5. Transaction Profile & Velocity Model</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cross-references recipient IBAN/account reputation, current balance drain percentage, transfer velocity,
              and NLP description classification for high-risk flags.
            </p>
            <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono-code text-slate-300">
              <div>✓ Standard bills or academic transfers</div>
              <div className="text-rose-400">✕ Emptying 90% liquid funds in single transfer</div>
            </div>
          </div>
        </div>

        {/* Interactive Formula Sandbox */}
        <div className="bg-slate-900/90 border border-cyan-900/60 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                Interactive Risk Scoring Simulation
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Adjust sub-factor scores to see real-time calculation and automated security decision response
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Calculated Risk:</span>
              <RiskScoreBadge level={riskLevel} score={totalScore} size="lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Slider 1 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Typing Pattern Risk</span>
                <span className="font-mono-code text-cyan-400 font-bold">{weights.typing} / 25</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                value={weights.typing}
                onChange={(e) => setWeights({ ...weights, typing: Number(e.target.value) })}
                className="w-full accent-cyan-500 bg-slate-800 h-2 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Cadence & flight variance score</span>
            </div>

            {/* Slider 2 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Login Time Risk</span>
                <span className="font-mono-code text-cyan-400 font-bold">{weights.time} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={weights.time}
                onChange={(e) => setWeights({ ...weights, time: Number(e.target.value) })}
                className="w-full accent-cyan-500 bg-slate-800 h-2 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Off-hour & atypical access penalty</span>
            </div>

            {/* Slider 3 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Device Risk</span>
                <span className="font-mono-code text-cyan-400 font-bold">{weights.device} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={weights.device}
                onChange={(e) => setWeights({ ...weights, device: Number(e.target.value) })}
                className="w-full accent-cyan-500 bg-slate-800 h-2 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Hardware hash or proxy signature</span>
            </div>

            {/* Slider 4 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Mouse Interaction Risk</span>
                <span className="font-mono-code text-cyan-400 font-bold">{weights.mouse} / 15</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={weights.mouse}
                onChange={(e) => setWeights({ ...weights, mouse: Number(e.target.value) })}
                className="w-full accent-cyan-500 bg-slate-800 h-2 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Curvature & acceleration irregularities</span>
            </div>

            {/* Slider 5 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Transaction Risk</span>
                <span className="font-mono-code text-cyan-400 font-bold">{weights.transaction} / 20</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={weights.transaction}
                onChange={(e) => setWeights({ ...weights, transaction: Number(e.target.value) })}
                className="w-full accent-cyan-500 bg-slate-800 h-2 rounded cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Outflow value & recipient anomaly</span>
            </div>

            {/* Reset */}
            <div className="flex flex-col justify-end">
              <button
                onClick={() => setWeights({ typing: 5, time: 0, device: 0, mouse: 3, transaction: 10 })}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-lg transition-colors"
              >
                Reset to Harish Baseline (18/100)
              </button>
            </div>
          </div>
        </div>

        {/* Security Decision Model Display */}
        <SecurityDecisionModelCard interactiveScore={totalScore} />
      </div>
    </div>
  );
};
