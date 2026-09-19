import React, { useState } from 'react';
import { useAuth, AppRoute } from '../context/AuthContext';
import { MOCK_USERS } from '../data/mockData';
import {
  Shield,
  LayoutDashboard,
  ArrowRightLeft,
  History,
  Lock,
  UserCheck,
  Users,
  Eye,
  AlertOctagon,
  Fingerprint,
  BarChart3,
  Menu,
  X,
  ChevronDown,
  Info,
  Layers,
  Sparkles,
  LogOut,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, currentRoute, setCurrentRoute, switchUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isPublic = ['landing', 'about', 'security-features', 'login'].includes(currentRoute);
  const isAdmin = currentRoute.startsWith('admin-');
  const isUser = !isPublic && !isAdmin;

  const navigate = (route: AppRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Subtitle */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl tracking-wider text-white">
                  FIN<span className="text-cyan-400">GUARD</span> AI
                </span>
                <span className="text-[10px] uppercase font-mono-code px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
                  v1.0 Prototyping
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight hidden sm:block">
                Behavioral Authentication & Real-Time Fraud Detection
              </p>
            </div>
          </div>

          {/* Center Navigation - Context Aware */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Area Switcher Tabs */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 mr-2">
              <button
                id="nav-tab-public"
                onClick={() => navigate('landing')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  isPublic
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Public Area
              </button>
              <button
                id="nav-tab-user"
                onClick={() => navigate('user-dashboard')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  isUser
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                User Banking
              </button>
              <button
                id="nav-tab-admin"
                onClick={() => navigate('admin-dashboard')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  isAdmin
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin SOC Portal
              </button>
            </div>

            {/* Contextual Links based on current area */}
            {isPublic && (
              <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                <button
                  onClick={() => navigate('landing')}
                  className={`px-2.5 py-1.5 text-xs rounded-md transition-colors ${currentRoute === 'landing' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => navigate('about')}
                  className={`px-2.5 py-1.5 text-xs rounded-md transition-colors ${currentRoute === 'about' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  About Research
                </button>
                <button
                  onClick={() => navigate('security-features')}
                  className={`px-2.5 py-1.5 text-xs rounded-md transition-colors ${currentRoute === 'security-features' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  Security Features
                </button>
              </div>
            )}

            {isUser && (
              <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                <button
                  onClick={() => navigate('user-dashboard')}
                  className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1.5 ${currentRoute === 'user-dashboard' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('transfer-money')}
                  className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1.5 ${currentRoute === 'transfer-money' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  Transfer
                </button>
                <button
                  onClick={() => navigate('transaction-history')}
                  className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1.5 ${currentRoute === 'transaction-history' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  <History className="w-3.5 h-3.5" />
                  History
                </button>
                <button
                  onClick={() => navigate('account-details')}
                  className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1.5 ${currentRoute === 'account-details' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Account
                </button>
                <button
                  onClick={() => navigate('security-center')}
                  className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1.5 ${currentRoute === 'security-center' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  Security Center
                </button>
              </div>
            )}

            {isAdmin && (
              <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
                <button
                  onClick={() => navigate('admin-dashboard')}
                  className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1 ${currentRoute === 'admin-dashboard' ? 'text-rose-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  SOC Home
                </button>
                <button
                  onClick={() => navigate('admin-alerts')}
                  className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1 ${currentRoute === 'admin-alerts' ? 'text-rose-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                  Fraud Alerts
                </button>
                <button
                  onClick={() => navigate('admin-users')}
                  className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1 ${currentRoute === 'admin-users' ? 'text-rose-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Users
                </button>
                <button
                  onClick={() => navigate('admin-behavioral')}
                  className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1 ${currentRoute === 'admin-behavioral' ? 'text-rose-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
                  Behavior Risk
                </button>
                <button
                  onClick={() => navigate('admin-analytics')}
                  className={`px-2 py-1 text-xs rounded-md transition-colors flex items-center gap-1 ${currentRoute === 'admin-analytics' ? 'text-rose-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  Analytics
                </button>
              </div>
            )}
          </nav>

          {/* Right Action: Demo User Switcher & Profile */}
          <div className="flex items-center gap-3">
            {/* Quick Demo Persona Switcher */}
            <div className="relative">
              <button
                id="demo-user-selector-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 hover:border-slate-600 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 transition-all shadow-inner"
              >
                <div className={`w-2 h-2 rounded-full ${currentUser?.role === 'ADMIN' ? 'bg-rose-500' : currentUser?.id === 'USR-103' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <span className="max-w-[110px] truncate">{currentUser?.name || 'Harish Kumar'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Persona Selector Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2 py-1 text-[10px] font-mono-code uppercase text-slate-400 border-b border-slate-800 mb-1 flex justify-between items-center">
                    <span>Academic Demo Profiles</span>
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </div>
                  {MOCK_USERS.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        switchUser(user.id);
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        currentUser?.id === user.id
                          ? 'bg-cyan-950/60 border border-cyan-800/80 text-white'
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-slate-800 text-[10px] font-bold flex items-center justify-center font-mono-code text-cyan-300">
                          {user.avatarInitials}
                        </span>
                        <div>
                          <div className="font-medium text-slate-100">{user.name}</div>
                          <div className="text-[10px] text-slate-400">{user.role === 'ADMIN' ? 'Security SOC' : user.accountStatus}</div>
                        </div>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono-code ${
                        user.riskLevel === 'LOW' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        user.riskLevel === 'MEDIUM' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {user.riskScore}/100
                      </span>
                    </button>
                  ))}

                  <div className="pt-2 mt-2 border-t border-slate-800 flex justify-between">
                    <button
                      onClick={() => {
                        navigate('login');
                        setUserDropdownOpen(false);
                      }}
                      className="text-[11px] text-cyan-400 hover:underline px-2 py-1"
                    >
                      Simulate Login Flow
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="text-[11px] text-slate-400 hover:text-rose-400 px-2 py-1 flex items-center gap-1"
                    >
                      <LogOut className="w-3 h-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
          <div className="text-xs font-semibold text-slate-400 font-mono-code uppercase">
            Platform Sections
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => navigate('landing')}
              className={`p-2 rounded text-xs font-medium text-center ${isPublic ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'}`}
            >
              Public
            </button>
            <button
              onClick={() => navigate('user-dashboard')}
              className={`p-2 rounded text-xs font-medium text-center ${isUser ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'}`}
            >
              User Banking
            </button>
            <button
              onClick={() => navigate('admin-dashboard')}
              className={`p-2 rounded text-xs font-medium text-center ${isAdmin ? 'bg-rose-600 text-white' : 'bg-slate-900 text-slate-300'}`}
            >
              Admin SOC
            </button>
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-1">
            <div className="text-[11px] font-mono-code text-slate-500 uppercase">User Shortcuts</div>
            <button onClick={() => navigate('user-dashboard')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-cyan-400">Dashboard</button>
            <button onClick={() => navigate('transfer-money')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-cyan-400">Transfer Money (Security Check)</button>
            <button onClick={() => navigate('transaction-history')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-cyan-400">Transaction History</button>
            <button onClick={() => navigate('security-center')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-cyan-400">Security Center</button>
            <button onClick={() => navigate('behavioral-verify')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-cyan-400">Behavioral Verification Page</button>
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-1">
            <div className="text-[11px] font-mono-code text-slate-500 uppercase">Admin SOC Shortcuts</div>
            <button onClick={() => navigate('admin-dashboard')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-rose-400">Admin SOC Dashboard</button>
            <button onClick={() => navigate('admin-alerts')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-rose-400">Fraud Alerts Center</button>
            <button onClick={() => navigate('admin-transactions')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-rose-400">Transaction Surveillance</button>
            <button onClick={() => navigate('admin-behavioral')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-rose-400">Behavioral Risk Monitoring</button>
            <button onClick={() => navigate('admin-login-monitor')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-rose-400">Login Monitoring</button>
            <button onClick={() => navigate('admin-analytics')} className="w-full text-left py-1.5 text-xs text-slate-300 hover:text-rose-400">Security Analytics</button>
          </div>
        </div>
      )}
    </header>
  );
};
