import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  Server,
  Database,
  Code2,
  Lock,
  Layers,
  CheckCircle2,
  FileCode,
  Network,
  Cpu,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentRoute } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Title Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-cyan-950/60 border border-cyan-800 px-3 py-1 rounded-full text-xs font-mono-code text-cyan-300">
            <GraduationCap className="w-4 h-4" /> Academic Capstone & Research Specification
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            FinGuard AI: Academic Architecture Blueprint
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            "A Java-Based Behavioral Authentication and Real-Time Fraud Detection System for Digital Banking"
          </p>
        </div>

        {/* Abstract & Research Problem */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            1. Research Motivation & Problem Statement
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Conventional digital banking systems rely predominantly on static knowledge-based authentication
            (passwords, PINs) supplemented by discrete step-up tokens (SMS/Email OTPs). These mechanisms suffer
            from severe vulnerabilities to credential stuffing, phishing, malware keyloggers, and post-login session
            hijacking. Once an attacker obtains the static credentials, the traditional bank server considers the
            session authenticated and legitimate.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            <strong>FinGuard AI</strong> addresses this challenge through continuous behavioral biometric profiling.
            By capturing subconscious physiological rhythms—specifically keystroke dwell and flight time variance,
            mouse trajectory curvature, and contextual device-network metadata—the system creates a persistent,
            zero-friction risk scoring engine.
          </p>
        </div>

        {/* Planned Technology Stack */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            2. Full-Stack System Architecture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frontend */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Frontend Prototype</h3>
                  <p className="text-xs text-cyan-400 font-mono-code">React 19 + TypeScript</p>
                </div>
              </div>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Client telemetry capture (Keystroke & Mouse coordinates)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Clean API service abstraction layer for Spring Boot
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Responsive SOC & User Banking Dashboards
                </li>
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Target Core Backend</h3>
                  <p className="text-xs text-emerald-400 font-mono-code">Java 21 + Spring Boot 3</p>
                </div>
              </div>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Spring Security & JWT Authentication Filters
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Behavioral Biometric Feature Extraction Engine
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Real-time Transaction Fraud Scoring Pipeline
                </li>
              </ul>
            </div>

            {/* Database */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Target Database</h3>
                  <p className="text-xs text-amber-400 font-mono-code">MySQL 8.0 / JPA Hibernate</p>
                </div>
              </div>
              <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Users, Accounts, and Ledgers schema
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Biometric Baseline Vectors table (flight/dwell averages)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  Audit logs & Security Alerts repository
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* REST API Contract Documentation */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            3. Spring Boot REST API Endpoint Mappings
          </h2>
          <p className="text-xs text-slate-400">
            The frontend application is structured with decoupled services located in <code className="text-cyan-300 font-mono-code">src/services/</code>, perfectly mirroring the planned Spring Boot controllers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono-code text-xs space-y-2">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                // Auth & Biometrics Controller
              </div>
              <div className="text-slate-300">
                <span className="text-emerald-400">POST</span> /api/auth/login
              </div>
              <div className="text-slate-300">
                <span className="text-emerald-400">POST</span> /api/auth/behavior
              </div>
              <div className="text-slate-300">
                <span className="text-rose-400">POST</span> /api/auth/logout
              </div>
              <div className="text-slate-300">
                <span className="text-blue-400">GET</span> /api/users
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono-code text-xs space-y-2">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                // Banking & Transaction Controller
              </div>
              <div className="text-slate-300">
                <span className="text-blue-400">GET</span> /api/accounts
              </div>
              <div className="text-slate-300">
                <span className="text-blue-400">GET</span> /api/transactions
              </div>
              <div className="text-slate-300">
                <span className="text-emerald-400">POST</span> /api/transactions
              </div>
              <div className="text-slate-300">
                <span className="text-emerald-400">POST</span> /api/transactions/security-check
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono-code text-xs space-y-2">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                // Security & Alert Controller
              </div>
              <div className="text-slate-300">
                <span className="text-blue-400">GET</span> /api/security/risk
              </div>
              <div className="text-slate-300">
                <span className="text-blue-400">GET</span> /api/security/alerts
              </div>
              <div className="text-slate-300">
                <span className="text-emerald-400">POST</span> /api/security/alerts/&#123;id&#125;/resolve
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono-code text-xs space-y-2">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                // Admin SOC Controller
              </div>
              <div className="text-slate-300">
                <span className="text-blue-400">GET</span> /api/admin/dashboard
              </div>
              <div className="text-slate-300">
                <span className="text-blue-400">GET</span> /api/admin/users
              </div>
              <div className="text-slate-300">
                <span className="text-blue-400">GET</span> /api/admin/analytics
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-between items-center bg-slate-900 p-6 rounded-xl border border-slate-800">
          <div>
            <h3 className="font-bold text-white text-base">Ready to test the prototype?</h3>
            <p className="text-xs text-slate-400 mt-1">
              Switch directly into the user banking workflow or explore security indicators.
            </p>
          </div>
          <button
            onClick={() => setCurrentRoute('security-features')}
            className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-2"
          >
            <span>Explore Security Features</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
