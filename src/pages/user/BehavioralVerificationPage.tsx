import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import { RiskMeterGauge } from '../../components/RiskMeterGauge';
import {
  Shield,
  Fingerprint,
  Keyboard,
  Clock,
  Laptop,
  MousePointer,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Activity
} from 'lucide-react';

interface SecurityFactorStatus {
  name: string;
  status: 'NORMAL' | 'UNUSUAL' | 'SUSPICIOUS';
  score: number;
  weight: string;
  detail: string;
  icon: React.ReactNode;
}

export const BehavioralVerificationPage: React.FC = () => {
  const { currentUser, completeBehavioralVerification } = useAuth();
  const [analyzing, setAnalyzing] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Check if current user is the anomaly demo user
  const isAnomalyUser = currentUser?.id === 'USR-103';

  // Demo Factors according to prompt requirements
  const factors: SecurityFactorStatus[] = [
    {
      name: 'Typing Pattern',
      status: isAnomalyUser ? 'UNUSUAL' : 'NORMAL',
      score: isAnomalyUser ? 18 : 5,
      weight: '25%',
      detail: isAnomalyUser
        ? 'Dwell time +142ms variance from baseline profile'
        : '94ms avg dwell time, digram rhythm matches baseline',
      icon: <Keyboard className="w-4 h-4" />,
    },
    {
      name: 'Login Time',
      status: isAnomalyUser ? 'UNUSUAL' : 'NORMAL',
      score: isAnomalyUser ? 8 : 0,
      weight: '20%',
      detail: isAnomalyUser
        ? 'Access at 03:14 AM (off-hour academic study window)'
        : 'Standard active academic window (10:42 AM)',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      name: 'Device',
      status: isAnomalyUser ? 'SUSPICIOUS' : 'NORMAL',
      score: isAnomalyUser ? 12 : 0,
      weight: '20%',
      detail: isAnomalyUser
        ? 'Unrecognized Tor exit node IP proxy signature'
        : 'Recognized Dell XPS 15 / Windows 11 Chrome',
      icon: <Laptop className="w-4 h-4" />,
    },
    {
      name: 'Mouse Interaction',
      status: isAnomalyUser ? 'UNUSUAL' : 'NORMAL',
      score: isAnomalyUser ? 10 : 3,
      weight: '15%',
      detail: isAnomalyUser
        ? 'Linear coordinate translation with elevated acceleration'
        : 'Natural human curvature and acceleration variance',
      icon: <MousePointer className="w-4 h-4" />,
    },
    {
      name: 'Transaction Behavior',
      status: 'NORMAL',
      score: isAnomalyUser ? 0 : 10,
      weight: '20%',
      detail: 'Standard transaction velocity and recurring merchant profile',
      icon: <ArrowRightLeft className="w-4 h-4" />,
    },
  ];

  const totalRiskScore = isAnomalyUser ? 48 : 18;
  const riskLevel = isAnomalyUser ? 'MEDIUM' : 'LOW';

  useEffect(() => {
    // Step-by-step scanning animation for realistic cybersecurity feel
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < factors.length) {
          return prev + 1;
        } else {
          setAnalyzing(false);
          clearInterval(timer);
          return prev;
        }
      });
    }, 400);

    return () => clearInterval(timer);
  }, [factors.length]);

  const renderIndicator = (status: 'NORMAL' | 'UNUSUAL' | 'SUSPICIOUS') => {
    switch (status) {
      case 'NORMAL':
        return (
          <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded text-xs font-semibold">
            <span>✓</span> Normal
          </span>
        );
      case 'UNUSUAL':
        return (
          <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded text-xs font-semibold">
            <span>⚠</span> Unusual
          </span>
        );
      case 'SUSPICIOUS':
        return (
          <span className="inline-flex items-center gap-1 text-rose-400 bg-rose-950/60 border border-rose-800/80 px-2 py-0.5 rounded text-xs font-semibold">
            <span>✕</span> Suspicious
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-md">
        {/* Animated Scan Line Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
            <Fingerprint className={`w-6 h-6 ${analyzing ? 'animate-pulse text-cyan-300' : ''}`} />
          </div>

          <h2 className="text-2xl font-bold text-white font-display">
            {analyzing ? 'Analyzing your behavior...' : 'Behavioral verification completed'}
          </h2>

          <p className="text-xs text-slate-400 font-mono-code">
            User: <strong className="text-slate-200">{currentUser?.name || 'Harish Kumar'}</strong> ({currentUser?.email})
          </p>
        </div>

        {/* Factors List */}
        <div className="space-y-3">
          <div className="text-xs font-mono-code font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-800 pb-2">
            <span>Biometric & Telemetry Factors</span>
            <span>Security Status</span>
          </div>

          {factors.map((factor, idx) => {
            const isScanned = idx < currentStepIndex;

            return (
              <div
                key={factor.name}
                className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isScanned
                    ? 'bg-slate-950/80 border-slate-800'
                    : 'bg-slate-950/30 border-slate-900 opacity-40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
                    {factor.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <span>{factor.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono-code">
                        (Weight {factor.weight})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isScanned ? factor.detail : 'Evaluating continuous telemetry stream...'}
                    </div>
                  </div>
                </div>

                <div>{isScanned ? renderIndicator(factor.status) : <Activity className="w-4 h-4 text-slate-600 animate-spin" />}</div>
              </div>
            );
          })}
        </div>

        {/* Demo Risk Score Display */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <RiskMeterGauge score={totalRiskScore} level={riskLevel} size={150} />

          <div className="space-y-2 flex-1 text-center sm:text-left">
            <div className="text-xs font-mono-code uppercase text-slate-400">
              Composite Assessment
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-lg font-bold text-white">Risk Score:</span>
              <span className="text-xl font-bold font-mono-code text-cyan-400">
                {totalRiskScore}/100
              </span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xs text-slate-300">Risk Level:</span>
              <RiskScoreBadge level={riskLevel} score={totalRiskScore} size="sm" />
            </div>
            <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
              {riskLevel === 'LOW'
                ? 'Normal risk profile. User behavioral biometric patterns match stored baseline with high statistical confidence.'
                : 'Mild variance detected in hardware signature and key cadence. Continuous monitoring active.'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            id="btn-continue-to-dashboard"
            onClick={() => completeBehavioralVerification(totalRiskScore, riskLevel)}
            disabled={analyzing}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
              analyzing
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/30'
            }`}
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Prototype footnote */}
        <p className="text-[10px] text-center text-slate-500 font-mono-code">
          *Academic Demonstration: Keystroke and hardware vector verification simulated for React + Spring Boot architecture.
        </p>
      </div>
    </div>
  );
};
