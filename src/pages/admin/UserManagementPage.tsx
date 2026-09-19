import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/adminService';
import { User, RiskLevel } from '../../types';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import {
  Users,
  Search,
  Lock,
  Unlock,
  RotateCcw,
  Eye,
  X,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Laptop,
  Clock,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleLock = async (user: User) => {
    const shouldLock = user.accountStatus !== 'LOCKED';
    try {
      const updated = await adminService.updateUserStatus(user.id, shouldLock ? 'LOCKED' : 'ACTIVE');
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
      if (selectedUser?.id === user.id) setSelectedUser(updated);

      setActionFeedback(
        `Account ${user.name} (${user.id}) has been ${shouldLock ? 'LOCKED' : 'UNLOCKED'} by SOC Admin.`
      );
      setTimeout(() => setActionFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetBaseline = async (user: User) => {
    try {
      const updated = await adminService.resetBiometricBaseline(user.id);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
      if (selectedUser?.id === user.id) setSelectedUser(updated);

      setActionFeedback(
        `Biometric baseline vectors reset for ${user.name}. Recalibration required on next session.`
      );
      setTimeout(() => setActionFeedback(null), 3500);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                User Management & Behavioral Profile Controls
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Audit digital banking identities, review real-time risk scores, enforce locks, and reset baselines
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user name or ID..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono-code"
            />
          </div>
        </div>

        {/* Feedback Alert */}
        {actionFeedback && (
          <div className="p-4 bg-cyan-950/60 border border-cyan-800 text-cyan-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* User Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono-code text-[11px] uppercase">
                  <th className="py-3 px-4">User ID & Name</th>
                  <th className="py-3 px-4">Email / Role</th>
                  <th className="py-3 px-4">Current Device</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Risk Score</th>
                  <th className="py-3 px-4 text-right">Risk Level</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-white text-sm">{user.name}</div>
                      <div className="font-mono-code text-[11px] text-cyan-400">{user.id}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-slate-300 font-mono-code">{user.email}</div>
                      <span className="text-[10px] font-mono-code bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded">
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-slate-300">{user.currentDevice || 'Chrome / Windows'}</div>
                      <div className="text-[10px] text-slate-500 font-mono-code">
                        Last login: {user.lastLogin || 'Today'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono-code ${
                          user.accountStatus === 'ACTIVE'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        {user.accountStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono-code font-bold text-sm text-white whitespace-nowrap">
                      {user.riskScore}/100
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <RiskScoreBadge level={user.riskLevel} score={user.riskScore} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* View Details */}
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded text-xs transition-colors"
                          title="View Details & Biometrics"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Lock / Unlock */}
                        <button
                          onClick={() => handleToggleLock(user)}
                          className={`p-1.5 rounded text-xs transition-colors ${
                            user.accountStatus === 'LOCKED'
                              ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                              : 'bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800'
                          }`}
                          title={user.accountStatus === 'LOCKED' ? 'Unlock Account' : 'Lock Account'}
                        >
                          {user.accountStatus === 'LOCKED' ? (
                            <Unlock className="w-3.5 h-3.5" />
                          ) : (
                            <Lock className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Reset Baseline */}
                        <button
                          onClick={() => handleResetBaseline(user)}
                          className="p-1.5 bg-slate-800 hover:bg-amber-950 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-800 rounded text-xs transition-colors"
                          title="Reset Behavioral Baseline"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Details Forensic Modal */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white text-base">
                    User Security Audit: {selectedUser.name} ({selectedUser.id})
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Summary Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono-code">Account Status</span>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className={selectedUser.accountStatus === 'ACTIVE' ? 'text-emerald-400' : 'text-rose-400'}>
                        {selectedUser.accountStatus}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono-code">Composite Risk</span>
                    <RiskScoreBadge level={selectedUser.riskLevel} score={selectedUser.riskScore} size="sm" />
                  </div>
                </div>

                {/* Behavioral Details */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-mono-code uppercase font-semibold text-cyan-400 block mb-1">
                    Continuous Behavioral Profile Vectors
                  </span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Typing Cadence:</span>
                    <span className="text-white font-mono-code">
                      {selectedUser.id === 'USR-103' ? 'Anomaly (+142ms variance)' : 'Normal (94ms avg)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mouse Velocity & Jitter:</span>
                    <span className="text-white font-mono-code">
                      {selectedUser.id === 'USR-103' ? 'Teleportation linear vector' : 'Natural curved bezier'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Device Hardware Hash:</span>
                    <span className="text-white font-mono-code">
                      {selectedUser.id === 'USR-103' ? 'Tor Proxy / Linux Headless' : 'Trusted Dell XPS 15'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Baseline Calibration:</span>
                    <span className="text-emerald-400 font-mono-code">Verified (Spring Boot DB)</span>
                  </div>
                </div>

                {/* Quick actions inside modal */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleToggleLock(selectedUser)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 ${
                      selectedUser.accountStatus === 'LOCKED'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-rose-600 hover:bg-rose-500 text-white'
                    }`}
                  >
                    {selectedUser.accountStatus === 'LOCKED' ? (
                      <>
                        <Unlock className="w-3.5 h-3.5" /> Unlock Account
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" /> Lock Account
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleResetBaseline(selectedUser)}
                    className="flex-1 py-2 px-3 bg-amber-900/60 hover:bg-amber-800 border border-amber-800 text-amber-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Baseline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
