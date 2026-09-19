import React from 'react';
import { GraduationCap, ShieldAlert } from 'lucide-react';

export const AcademicBanner: React.FC = () => {
  return (
    <div
      id="academic-disclaimer-banner"
      className="bg-slate-900/90 border-b border-cyan-900/40 px-4 py-2 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2"
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 px-2 py-0.5 rounded text-[11px] font-mono-code font-medium">
          <GraduationCap className="w-3.5 h-3.5" />
          ACADEMIC RESEARCH PROTOTYPE
        </span>
        <span className="text-slate-400 hidden sm:inline">
          Project: <strong className="text-slate-200">FinGuard AI</strong> — Behavioral Authentication & Real-Time Fraud Detection System
        </span>
      </div>

      <div className="flex items-center gap-3 text-[11px] text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400 font-mono-code">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Java Spring Boot Architecture Ready (REST Mock Mode)
        </span>
        <span className="hidden md:inline text-slate-500">|</span>
        <span className="hidden md:inline text-slate-400 flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-amber-400" />
          Fictional data only • No real banking integration
        </span>
      </div>
    </div>
  );
};
