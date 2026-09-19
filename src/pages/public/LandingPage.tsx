import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SecurityDecisionModelCard } from '../../components/SecurityDecisionModelCard';
import { InteractiveBehaviorSimulator } from '../../components/InteractiveBehaviorSimulator';
import {
  Shield,
  Fingerprint,
  Cpu,
  Activity,
  ArrowRight,
  CheckCircle2,
  Lock,
  Eye,
  AlertTriangle,
  Zap,
  Server,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentRoute, loginAsUser, loginAsAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-slate-800">
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Header */}
            <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-cyan-800/60 px-3.5 py-1.5 rounded-full text-xs text-cyan-300 font-mono-code shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Academic Cybersecurity & FinTech Prototype
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display">
              FIN<span className="text-cyan-400">GUARD</span> AI
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-slate-300">
              Behavioral Authentication & Real-Time Fraud Detection
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              A Java Spring Boot & React architecture demonstrating continuous behavioral biometrics,
              keystroke dynamics anomaly detection, and automated multi-factor risk scoring for modern digital banking.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                id="btn-hero-demo-login"
                onClick={() => setCurrentRoute('login')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Demo Login</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="btn-hero-explore-security"
                onClick={() => setCurrentRoute('security-features')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Explore Security</span>
              </button>

              <button
                id="btn-hero-admin-soc"
                onClick={loginAsAdmin}
                className="px-5 py-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/80 text-rose-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Admin SOC Portal</span>
              </button>
            </div>

            {/* Quick Demo Credentials Reminder */}
            <div className="pt-3 text-xs text-slate-500 font-mono-code flex flex-wrap items-center justify-center gap-4">
              <span>Demo Personas:</span>
              <span className="text-slate-400">Harish (₹50,000 / Low Risk)</span>
              <span>•</span>
              <span className="text-slate-400">Hema (₹1,25,000 / Safe)</span>
              <span>•</span>
              <span className="text-slate-400">Demo User (Anomaly / Med Risk)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars Section */}
      <section className="py-14 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-2">
              Cybersecurity Defense Architecture
            </h2>
            <h3 className="text-2xl font-bold text-white">
              Next-Generation Digital Banking Protection
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="bg-slate-900/70 border border-slate-800 hover:border-cyan-800/80 rounded-xl p-5 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-800/80 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Fingerprint className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">
                Behavioral Authentication
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts subconscious biometric signals including key dwell time, flight intervals, and mouse acceleration without disrupting user experience.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-900/70 border border-slate-800 hover:border-blue-800/80 rounded-xl p-5 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-800/80 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">
                Real-Time Fraud Detection
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates transactions before execution by cross-referencing account velocity, payee patterns, and sudden outlier values.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-900/70 border border-slate-800 hover:border-amber-800/80 rounded-xl p-5 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-800/80 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">
                Risk-Based Security
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dynamically computes multi-factor risk scores from 0 to 100, adjusting authentication challenges in real-time.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-900/70 border border-slate-800 hover:border-emerald-800/80 rounded-xl p-5 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800/80 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-semibold text-white mb-2">
                Continuous Monitoring
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero-trust ongoing verification that persists throughout the entire active banking session, preventing post-login session hijacking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional vs FinGuard AI Comparison Section (Mandatory from prompt) */}
      <section className="py-16 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono-code uppercase tracking-widest text-cyan-400">
              Comparative Analysis
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              Traditional Authentication vs. FinGuard AI
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Why static credential checks fail in modern digital banking and how behavioral biometrics solve credential stuffing and account takeover.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traditional Authentication */}
            <div className="bg-slate-900/60 border border-rose-900/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-200">
                    Traditional Authentication
                  </h3>
                  <p className="text-xs text-rose-400 font-mono-code">
                    Vulnerable: Single Point of Compromise
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              </div>

              {/* Step Sequence */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-xs font-mono-code">
                    1
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex-1 text-xs font-mono-code text-slate-300">
                    Password / PIN Input
                  </div>
                </div>

                <div className="flex justify-center text-slate-600 font-mono-code text-xs">
                  ↓ (Static Binary Check)
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-xs font-mono-code">
                    2
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 flex-1 text-xs font-mono-code text-slate-300">
                    Direct Login (Full Unrestricted Access Granted)
                  </div>
                </div>
              </div>

              {/* Vulnerabilities bullet points */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                <div className="flex items-start gap-2 text-rose-300/90">
                  <span className="text-rose-500 font-bold">✕</span>
                  Stolen credentials bypass defense completely.
                </div>
                <div className="flex items-start gap-2 text-rose-300/90">
                  <span className="text-rose-500 font-bold">✕</span>
                  Zero continuous post-login monitoring if user leaves workstation unlocked.
                </div>
                <div className="flex items-start gap-2 text-rose-300/90">
                  <span className="text-rose-500 font-bold">✕</span>
                  No behavioral context or telemetry scoring on transactions.
                </div>
              </div>
            </div>

            {/* FinGuard AI Flow */}
            <div className="bg-slate-900/80 border border-cyan-700/50 rounded-2xl p-6 sm:p-8 relative shadow-xl shadow-cyan-950/30">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    FinGuard AI Multi-Stage Pipeline
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono-code">
                    Resilient: Behavioral Biometrics + ML Risk Engine
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              {/* Step Sequence */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold text-xs font-mono-code">
                    1
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex-1 text-xs font-mono-code text-slate-200">
                    Password / Login Credentials
                  </div>
                </div>

                <div className="flex justify-center text-cyan-500/80 font-mono-code text-xs">
                  ↓ (Keystroke & Pointer Telemetry)
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center font-bold text-xs font-mono-code">
                    2
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex-1 text-xs font-mono-code text-slate-200">
                    Behavioral Analysis (Dwell/Flight Variance, Mouse Curves)
                  </div>
                </div>

                <div className="flex justify-center text-indigo-500/80 font-mono-code text-xs">
                  ↓ (Feature Anomaly Vector)
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-violet-950 border border-violet-800 text-violet-400 flex items-center justify-center font-bold text-xs font-mono-code">
                    3
                  </div>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex-1 text-xs font-mono-code text-slate-200">
                    Risk Assessment (Score 0-100: Typing + Device + Time + Txn)
                  </div>
                </div>

                <div className="flex justify-center text-violet-500/80 font-mono-code text-xs">
                  ↓ (Policy Threshold Engine)
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono-code">
                    4
                  </div>
                  <div className="p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-800/80 flex-1 text-xs font-mono-code text-emerald-300 font-semibold">
                    Authentication Decision: Normal Allow / Step-Up / SOC Block
                  </div>
                </div>
              </div>

              {/* Protective benefits */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-start gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  Credentials stolen by attackers fail due to biometric cadence mismatch.
                </div>
                <div className="flex items-start gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  Zero-touch user verification without annoying intrusive captchas.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Model & Interactive Simulator Section */}
      <section className="py-16 bg-slate-900/20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SecurityDecisionModelCard interactiveScore={18} />
          <InteractiveBehaviorSimulator />
        </div>
      </section>

      {/* Bottom CTA to Demo */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Experience the Academic Behavioral Authentication Prototype
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Test real-time risk evaluation on fictional accounts: execute transfers, inspect biometric logs, and navigate the Admin SOC dashboard.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => loginAsUser('USR-101')}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Harish's Banking Dashboard (₹50,000)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={loginAsAdmin}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-rose-400" />
              <span>Launch Admin SOC Surveillance</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
