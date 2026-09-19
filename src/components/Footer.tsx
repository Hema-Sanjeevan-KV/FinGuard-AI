import React from 'react';
import { useAuth, AppRoute } from '../context/AuthContext';
import { Shield, Lock, Server, Database, Code2, GraduationCap, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentRoute } = useAuth();

  const handleNav = (route: AppRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-auto">
      {/* Top Architecture Specs Bar */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold text-slate-200">
              FinGuard AI: Academic Project Architecture Blueprint
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono-code">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" /> Frontend: React + TypeScript
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Server className="w-3.5 h-3.5 text-emerald-400" /> Planned Backend: Java 21 + Spring Boot 3
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Database className="w-3.5 h-3.5 text-amber-400" /> Planned DB: MySQL
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-3.5 h-3.5 text-violet-400" /> Security: REST + Behavioral Biometrics
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-base text-white tracking-wider">
                FIN<span className="text-cyan-400">GUARD</span> AI
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              "FinGuard AI: A Java-Based Behavioral Authentication and Real-Time Fraud Detection System for Digital Banking"
            </p>
            <p className="text-[11px] text-slate-500">
              Demonstrating continuous authentication via keystroke latency, pointer dynamics, and risk scoring.
            </p>
          </div>

          {/* Public Area Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-slate-200">
              1. Public Portal
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => handleNav('landing')} className="hover:text-cyan-400 transition-colors">
                  1. Landing Page Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-cyan-400 transition-colors">
                  2. About FinGuard AI Research
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('security-features')} className="hover:text-cyan-400 transition-colors">
                  3. Behavioral Security Features
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('login')} className="hover:text-cyan-400 transition-colors">
                  4. User / Admin Gateway Login
                </button>
              </li>
            </ul>
          </div>

          {/* User Banking Area */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-slate-200">
              2. User Banking Area
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => handleNav('behavioral-verify')} className="hover:text-cyan-400 transition-colors">
                  6. Behavioral Verification Check
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('user-dashboard')} className="hover:text-cyan-400 transition-colors">
                  7. Banking Dashboard (₹50k)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('account-details')} className="hover:text-cyan-400 transition-colors">
                  8. Account Details & Limits
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('transaction-history')} className="hover:text-cyan-400 transition-colors">
                  9. Transaction History (Filters)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('transfer-money')} className="hover:text-cyan-400 transition-colors">
                  10. Transfer Money (Risk Check)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('security-center')} className="hover:text-cyan-400 transition-colors">
                  11. Security Center & Devices
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('user-profile')} className="hover:text-cyan-400 transition-colors">
                  12. User Profile & Biometrics
                </button>
              </li>
            </ul>
          </div>

          {/* Admin SOC Area */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-rose-300">
              3. Admin Security Area (SOC)
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => handleNav('admin-dashboard')} className="hover:text-rose-400 transition-colors">
                  14. Admin Security Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin-users')} className="hover:text-rose-400 transition-colors">
                  15. User Management & Risk
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin-transactions')} className="hover:text-rose-400 transition-colors">
                  16. Transaction Monitoring Feed
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin-alerts')} className="hover:text-rose-400 transition-colors">
                  17. Fraud Alerts (Low/Med/High)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin-login-monitor')} className="hover:text-rose-400 transition-colors">
                  18. Login Attempt Monitoring
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin-behavioral')} className="hover:text-rose-400 transition-colors">
                  19. Behavioral Risk Monitoring (Formula)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin-analytics')} className="hover:text-rose-400 transition-colors">
                  20. Security Analytics & ROC
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="mt-8 pt-6 border-t border-slate-900 text-center space-y-2">
          <p className="text-slate-500 text-[11px]">
            Academic Prototype Notice: This application is an educational software design prototype prepared to demonstrate continuous behavioral biometrics and real-time fraud heuristics. It does not interface with real banking payment rails or real account numbers.
          </p>
          <div className="text-slate-600 text-[10px] font-mono-code">
            © 2026 FinGuard AI Research Prototype • REST API Ready • Spring Boot Java Architecture
          </div>
        </div>
      </div>
    </footer>
  );
};
