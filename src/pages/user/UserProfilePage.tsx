import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RiskScoreBadge } from '../../components/RiskScoreBadge';
import {
  User,
  Mail,
  Phone,
  Shield,
  Fingerprint,
  CheckCircle2,
  Calendar,
  Save,
  Sliders
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { currentUser, updateBehavioralRisk } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('+91 98450 12345');
  const [address, setAddress] = useState('Indiranagar, Bangalore, Karnataka, 560038');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <User className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white font-display">
                User Profile & Behavioral Baseline
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Account identity, personal contact details, and biometric calibration telemetry
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono-code">
            <span className="text-slate-400">UID:</span>
            <span className="text-cyan-400 font-bold">{currentUser?.id || 'USR-101'}</span>
          </div>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile metadata updated successfully in the demo session.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Identity Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 border-2 border-cyan-400 flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg shadow-cyan-500/20">
              {currentUser?.name.charAt(0) || 'H'}
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">{currentUser?.name || 'Harish Kumar'}</h2>
              <p className="text-xs text-slate-400 font-mono-code">{currentUser?.email || 'harish@finguard.demo'}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Account Role:</span>
                <span className="text-cyan-300 font-bold font-mono-code">{currentUser?.role || 'USER'}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Risk Status:</span>
                <RiskScoreBadge level={currentUser?.riskLevel || 'LOW'} score={currentUser?.riskScore || 18} size="sm" />
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Biometric Baseline:</span>
                <span className="text-emerald-400 font-bold font-mono-code">Calibrated (42 samples)</span>
              </div>
            </div>
          </div>

          {/* Edit Form & Behavioral Preferences */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase font-mono-code tracking-wider text-slate-300">
                Contact & Account Details
              </h3>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    disabled
                    value={currentUser?.name || 'Harish Kumar'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono-code cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser?.email || 'harish@finguard.demo'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 font-mono-code cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Contact Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono-code focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Registered Address</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Profile Info</span>
                </button>
              </form>
            </div>

            {/* Quick Demo Risk Profile Switcher */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Demo Behavioral Risk Simulation Switcher
              </h3>
              <p className="text-xs text-slate-400">
                Quickly toggle between behavioral states to test how the UI adapts in real-time:
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => updateBehavioralRisk(18, 'LOW')}
                  className="p-2 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 rounded-lg text-xs font-mono-code font-bold"
                >
                  Set LOW (18/100)
                </button>
                <button
                  onClick={() => updateBehavioralRisk(48, 'MEDIUM')}
                  className="p-2 bg-amber-950/60 hover:bg-amber-900 border border-amber-800 text-amber-300 rounded-lg text-xs font-mono-code font-bold"
                >
                  Set MEDIUM (48/100)
                </button>
                <button
                  onClick={() => updateBehavioralRisk(82, 'HIGH')}
                  className="p-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded-lg text-xs font-mono-code font-bold"
                >
                  Set HIGH (82/100)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
