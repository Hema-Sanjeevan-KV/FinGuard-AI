import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bankingService } from '../../services/bankingService';
import { Transaction, RiskLevel } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import {
  History,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Info,
  X,
  ShieldCheck,
  AlertTriangle,
  ArrowRightLeft,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard
} from 'lucide-react';

export const TransactionHistoryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<'date' | 'amount' | 'riskScore'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  useEffect(() => {
    const loadTxns = async () => {
      if (!currentUser) return;
      try {
        const data = await bankingService.getTransactions(currentUser.id);
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadTxns();
  }, [currentUser]);

  // Filtered & Sorted transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        // Search query
        const matchSearch =
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.recipient && t.recipient.toLowerCase().includes(searchQuery.toLowerCase()));

        // Type filter
        const matchType = typeFilter === 'ALL' || t.type === typeFilter;

        // Risk filter
        const matchRisk = riskFilter === 'ALL' || t.riskLevel === riskFilter;

        return matchSearch && matchType && matchRisk;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortField === 'date') comp = b.timestamp - a.timestamp;
        if (sortField === 'amount') comp = b.amount - a.amount;
        if (sortField === 'riskScore') comp = b.riskScore - a.riskScore;
        return sortOrder === 'desc' ? comp : -comp;
      });
  }, [transactions, searchQuery, typeFilter, riskFilter, sortField, sortOrder]);

  const toggleSort = (field: 'date' | 'amount' | 'riskScore') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                Transaction History & Risk Audit
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Continuous monitoring log of all deposits, payments, and behavioral transfers for {currentUser?.name}
            </p>
          </div>

          <div className="text-xs font-mono-code text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
        </div>

        {/* Controls: Search, Filter, Sort */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, payee, or description..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono-code"
              />
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Types (Deposit/Transfer...)</option>
                <option value="DEPOSIT">Deposit</option>
                <option value="TRANSFER">Transfer</option>
                <option value="PAYMENT">Payment</option>
                <option value="WITHDRAWAL">Withdrawal</option>
              </select>
            </div>

            {/* Risk Filter */}
            <div>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Risk Levels</option>
                <option value="LOW">LOW Risk (&lt;30)</option>
                <option value="MEDIUM">MEDIUM Risk (30-59)</option>
                <option value="HIGH">HIGH Risk (60+)</option>
              </select>
            </div>
          </div>

          {/* Sort bar buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="font-mono-code text-[11px]">Sort By:</span>
            <button
              onClick={() => toggleSort('date')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono-code flex items-center gap-1 transition-colors ${
                sortField === 'date' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <span>Date</span>
              <ArrowUpDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => toggleSort('amount')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono-code flex items-center gap-1 transition-colors ${
                sortField === 'amount' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <span>Amount</span>
              <ArrowUpDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => toggleSort('riskScore')}
              className={`px-2.5 py-1 rounded-md text-xs font-mono-code flex items-center gap-1 transition-colors ${
                sortField === 'riskScore' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              <span>Risk Score</span>
              <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono-code uppercase text-[11px]">
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Description & Recipient</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Risk Level</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 font-mono-code">
                      No transactions matched the specified search and filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 text-slate-300 font-mono-code whitespace-nowrap">
                        {txn.date}
                      </td>
                      <td className="py-3 px-4 font-mono-code text-cyan-400 font-bold whitespace-nowrap">
                        {txn.id}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-slate-800 text-slate-300 border border-slate-700">
                          {txn.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white font-medium">{txn.description}</div>
                        {txn.recipient && (
                          <div className="text-[11px] text-slate-400">To: {txn.recipient}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right font-mono-code font-bold whitespace-nowrap">
                        <span className={txn.type === 'DEPOSIT' ? 'text-emerald-400' : 'text-slate-100'}>
                          {txn.type === 'DEPOSIT' ? '+' : '-'} {txn.currency}{txn.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          txn.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          txn.status === 'FLAGGED' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <RiskScoreBadge level={txn.riskLevel} score={txn.riskScore} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => setSelectedTxn(txn)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-[11px] font-mono-code transition-colors cursor-pointer"
                        >
                          Audit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Audit Modal for Selected Transaction */}
        {selectedTxn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white text-base">
                    Transaction Forensic Audit: {selectedTxn.id}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTxn(null)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Transfer Amount:</span>
                  <span className="font-mono-code font-bold text-white text-sm">
                    {selectedTxn.currency}{selectedTxn.amount.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono-code block">Decision Assessment</span>
                    <span className="text-xs font-bold text-slate-200">{selectedTxn.status}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-mono-code block">Composite Risk Score</span>
                    <RiskScoreBadge level={selectedTxn.riskLevel} score={selectedTxn.riskScore} size="sm" />
                  </div>
                </div>

                {/* Subfactor breakdown */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono-code font-semibold uppercase text-cyan-400 block mb-1">
                    Multi-Factor Risk Breakdown
                  </span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Behavioral Biometrics Risk:</span>
                    <span className="font-mono-code text-slate-200">
                      {selectedTxn.securityFactors?.behavioralRisk ?? 6}/25
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Device & Network Risk:</span>
                    <span className="font-mono-code text-slate-200">
                      {selectedTxn.securityFactors?.deviceRisk ?? 0}/20
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transaction Profile & Amount Risk:</span>
                    <span className="font-mono-code text-slate-200">
                      {selectedTxn.securityFactors?.transactionRisk ?? 8}/20
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <strong className="text-slate-200 block mb-0.5">Description Note:</strong>
                  {selectedTxn.description}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedTxn(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition-colors"
                >
                  Close Audit Inspector
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
