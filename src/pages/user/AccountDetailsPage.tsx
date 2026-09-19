import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import {
  CreditCard,
  ShieldCheck,
  Building,
  Key,
  Layers,
  ArrowRightLeft,
  Lock,
  Copy,
  CheckCircle2
} from 'lucide-react';

export const AccountDetailsPage: React.FC = () => {
  const { currentUser, currentAccount, setCurrentRoute } = useAuth();
  const [copied, setCopied] = React.useState(false);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(currentAccount?.accountNumber || '4099 2810 5582');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                Account Details & Security Policy
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Fictional banking account specifications & behavioral biometric risk enforcement tier
            </p>
          </div>

          <button
            onClick={() => setCurrentRoute('transfer-money')}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 self-start sm:self-auto"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Transfer Funds</span>
          </button>
        </div>

        {/* Digital Banking Virtual Card Mockup */}
        <div className="bg-gradient-to-tr from-cyan-900 via-slate-900 to-blue-900 border border-cyan-700/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Card Chip & Network */}
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <span className="text-[10px] font-mono-code uppercase tracking-widest text-cyan-300">
                FinGuard AI Digital Debit
              </span>
              <div className="w-11 h-8 rounded-md bg-amber-400/90 border border-amber-300 flex items-center justify-center">
                <div className="w-8 h-5 border border-amber-600/40 rounded flex flex-col justify-between py-0.5">
                  <div className="border-b border-amber-600/40" />
                  <div className="border-b border-amber-600/40" />
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-display font-bold text-xl tracking-wider text-white">
                FIN<span className="text-cyan-400">GUARD</span>
              </span>
              <div className="text-[10px] text-cyan-300 font-mono-code">Biometric Protected</div>
            </div>
          </div>

          {/* Account Number */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-lg sm:text-2xl font-mono-code font-bold tracking-widest text-white">
                {currentAccount?.accountNumber || '4099 2810 5582'}
              </span>
              <button
                onClick={copyAccountNumber}
                className="p-1 hover:bg-white/10 rounded text-cyan-300 transition-colors"
                title="Copy Account Number"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-[10px] text-cyan-200 font-mono-code">
              IFSC: {currentAccount?.ifscCode || 'FING0004921'} • {currentAccount?.branch || 'Bangalore Central'}
            </div>
          </div>

          {/* Card Holder & Balance */}
          <div className="flex justify-between items-end border-t border-cyan-800/60 pt-4">
            <div>
              <span className="text-[10px] text-cyan-300 uppercase tracking-wider block">Account Holder</span>
              <span className="text-sm font-bold text-white tracking-wide">{currentUser?.name || 'Harish Kumar'}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-cyan-300 uppercase tracking-wider block">Total Balance</span>
              <span className="text-xl font-bold font-mono-code text-white">
                {currentAccount?.currency || '₹'}{(currentAccount?.balance || 50000).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Banking Limits & Security Enforcement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Specifications */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-cyan-400" />
              Account Specifications
            </h3>

            <div className="space-y-3 text-xs font-mono-code">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Account Type:</span>
                <span className="text-white font-bold">{currentAccount?.accountType || 'SAVINGS'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Account Status:</span>
                <span className="text-emerald-400 font-bold">{currentAccount?.status || 'ACTIVE'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Daily Transfer Limit:</span>
                <span className="text-white font-bold">{currentAccount?.currency || '₹'}{(currentAccount?.dailyLimit || 100000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Remaining Today:</span>
                <span className="text-cyan-400 font-bold">{currentAccount?.currency || '₹'}{(currentAccount?.remainingDailyLimit || 85000).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Biometric Policy */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              Behavioral Risk Policy
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono-code text-slate-400">Enforcement Tier:</span>
                <div className="text-xs font-bold text-cyan-300">
                  {currentAccount?.securityTier || 'TIER-2 (BEHAVIORAL_PROTECTED)'}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono-code text-slate-400">Step-Up Challenge Trigger:</span>
                <div className="text-xs font-semibold text-amber-300">
                  Risk score exceeding 30/100 or transfer &gt;₹25,000
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono-code text-slate-400">Hard Stop Threshold:</span>
                <div className="text-xs font-semibold text-rose-300">
                  Risk score 60-100 immediately blocks operation and creates SOC alert
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
