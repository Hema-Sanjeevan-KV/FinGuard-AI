import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bankingService } from '../../services/bankingService';
import { TransactionSecurityCheck } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import {
  ArrowRightLeft,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Wallet,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TransferMoneyPage: React.FC = () => {
  const { currentUser, currentAccount, refreshUserData, setCurrentRoute } = useAuth();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState<string>('5000');
  const [description, setDescription] = useState('Academic Research Equipment');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [securityCheckResult, setSecurityCheckResult] = useState<TransactionSecurityCheck | null>(null);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Evaluate Transaction Security before confirmation
  const handleSecurityCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setTransferSuccess(null);

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('Please specify a valid transfer amount.');
      return;
    }

    if (!recipient.trim()) {
      setErrorMessage('Recipient identifier is required.');
      return;
    }

    setIsEvaluating(true);
    try {
      // Calls banking service to simulate Spring Boot POST /api/transactions/security-check
      const check = await bankingService.evaluateTransactionSecurity({
        userId: currentUser?.id || 'USR-101',
        recipient,
        amount: numericAmount,
        description,
      });
      setSecurityCheckResult(check);
    } catch (err: any) {
      setErrorMessage(err.message || 'Security check evaluation failed.');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Confirm and execute the simulated transfer
  const handleConfirmTransfer = async () => {
    if (!securityCheckResult || !securityCheckResult.canProceed) return;

    setIsTransferring(true);
    setErrorMessage(null);

    try {
      const res = await bankingService.executeTransfer({
        userId: currentUser?.id || 'USR-101',
        recipient,
        amount: parseFloat(amount),
        description,
      });

      await refreshUserData();
      setTransferSuccess(
        `Transfer of ${res.transaction.currency}${res.transaction.amount.toLocaleString()} to ${recipient} simulated successfully! Reference ID: ${res.transaction.id}`
      );
      setSecurityCheckResult(null);
      setRecipient('');
      setAmount('');
      setDescription('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Transfer execution failed.');
    } finally {
      setIsTransferring(false);
    }
  };

  const presetAmounts = [2000, 5000, 15000, 45000, 85000];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                Simulated Money Transfer
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Test real-time behavioral biometric & transaction risk scoring prior to execution
            </p>
          </div>

          {/* Balance Pill */}
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs flex items-center gap-3">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-500 font-mono-code">Available Balance</div>
              <div className="font-bold text-white font-mono-code">
                {currentAccount?.currency || '₹'}{(currentAccount?.availableBalance || 48500).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {transferSuccess && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-start justify-between gap-3 animate-in fade-in">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{transferSuccess}</span>
            </div>
            <button
              onClick={() => setCurrentRoute('transaction-history')}
              className="text-cyan-400 hover:underline font-mono-code text-[11px] shrink-0"
            >
              View in History →
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Transfer Form (3 cols) */}
          <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-bold text-white uppercase font-mono-code tracking-wider text-slate-300">
              1. Transfer Parameters
            </h2>

            <form onSubmit={handleSecurityCheck} className="space-y-4">
              {/* Recipient */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Recipient Name / Payee Node / Account
                </label>
                <input
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. FinTech Cloud Labs Pvt Ltd"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono-code"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Transfer Amount (₹ INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-slate-500 font-mono-code">
                    ₹
                  </span>
                  <input
                    type="number"
                    required
                    min="1"
                    max="500000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="5000"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono-code font-bold"
                  />
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-slate-500 font-mono-code py-0.5">Quick Presets:</span>
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt.toString())}
                      className="px-2 py-0.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded text-[10px] font-mono-code text-slate-300 transition-colors"
                    >
                      ₹{amt.toLocaleString()} {amt > 50000 ? '(High Risk Demo)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Description / Purpose of Payment
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Academic Research Materials"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Try typing keywords like "urgent" or "crypto" to test the heuristic NLP fraud flag!
                </span>
              </div>

              {/* Action */}
              <button
                type="submit"
                disabled={isEvaluating}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isEvaluating ? (
                  <span>Evaluating Behavioral & Device Risk...</span>
                ) : (
                  <>
                    <span>Run Transaction Security Check</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Transaction Security Check Results (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-sm font-bold text-white font-mono-code uppercase">
                    Transaction Security Check
                  </h2>
                </div>
                {securityCheckResult && (
                  <RiskScoreBadge level={securityCheckResult.decision} score={securityCheckResult.overallRiskScore} size="sm" />
                )}
              </div>

              {securityCheckResult ? (
                <div className="space-y-4 animate-in fade-in">
                  {/* Risk breakdown numbers as specified in prompt */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs font-mono-code">
                    <div className="flex justify-between text-slate-300">
                      <span>Behavior Risk:</span>
                      <span className="text-cyan-400 font-bold">{securityCheckResult.behavioralRisk}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Device Risk:</span>
                      <span className="text-blue-400 font-bold">{securityCheckResult.deviceRisk}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Transaction Risk:</span>
                      <span className="text-amber-400 font-bold">{securityCheckResult.transactionRisk}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-white font-bold text-sm">
                      <span>Overall Risk:</span>
                      <span className="text-cyan-300">{securityCheckResult.overallRiskScore}</span>
                    </div>
                  </div>

                  {/* Decision Display */}
                  <div className="p-3.5 rounded-xl border bg-slate-950/80 border-slate-800 space-y-1.5">
                    <div className="text-[11px] uppercase font-mono-code text-slate-400">
                      Security Engine Decision:
                    </div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span className={securityCheckResult.decision === 'LOW' ? 'text-emerald-400' : securityCheckResult.decision === 'MEDIUM' ? 'text-amber-400' : 'text-rose-400'}>
                        {securityCheckResult.decision} RISK
                      </span>
                      <span className="text-xs text-slate-400 font-normal">
                        ({securityCheckResult.overallRiskScore}/100)
                      </span>
                    </div>
                    <div className={`text-xs font-semibold pt-1 flex items-center gap-1.5 ${
                      securityCheckResult.canProceed ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {securityCheckResult.canProceed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>"Transaction can proceed"</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>"Transaction blocked by FinGuard AI"</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1">
                      {securityCheckResult.message}
                    </p>
                  </div>

                  {/* Anomalies if any */}
                  {securityCheckResult.anomalies && securityCheckResult.anomalies.length > 0 && (
                    <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-900/60 text-[11px] text-amber-300 space-y-1">
                      <span className="font-semibold block font-mono-code">Flagged Anomalies:</span>
                      {securityCheckResult.anomalies.map((a, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span>•</span>
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Confirm CTA */}
                  {securityCheckResult.canProceed ? (
                    <button
                      onClick={handleConfirmTransfer}
                      disabled={isTransferring}
                      className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isTransferring ? (
                        <span>Executing Simulated Transfer...</span>
                      ) : (
                        <>
                          <span>Confirm & Complete Transfer</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2.5 px-4 bg-rose-950/80 border border-rose-800 text-rose-300 rounded-xl text-xs font-semibold cursor-not-allowed"
                    >
                      Transfer Suspended (Risk Exceeds 60)
                    </button>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs space-y-2">
                  <ShieldCheck className="w-8 h-8 text-slate-600 mx-auto" />
                  <p>Enter transfer parameters on the left and click "Run Transaction Security Check".</p>
                  <p className="text-[10px] font-mono-code text-slate-600">
                    Evaluates Keystroke flight time, Hardware hash, and Payee risk.
                  </p>
                </div>
              )}
            </div>

            {/* Academic Simulation Notice */}
            <div className="p-3.5 bg-slate-900/50 border border-slate-800/80 rounded-xl text-[10px] text-slate-400 font-mono-code space-y-1">
              <span className="text-cyan-400 font-semibold block uppercase">Academic Disclaimer:</span>
              <p>This is a demonstration prototype. Balance updates and transactions are simulated locally and do not interact with any external payment gateway.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
