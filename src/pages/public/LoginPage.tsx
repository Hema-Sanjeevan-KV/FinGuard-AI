import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS } from '../../data/mockData';
import { authService } from '../../services/authService';
import {
  Shield,
  Lock,
  Mail,
  Fingerprint,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAsUser, loginAsAdmin, setCurrentRoute } = useAuth();
  const [email, setEmail] = useState('harish@finguard.demo');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('USR-101');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Calls auth service (prepared for Spring Boot POST /api/auth/login)
      const res = await authService.login({ email, password, rememberMe });
      if (res.user.role === 'ADMIN') {
        await loginAsAdmin();
      } else {
        // Direct transition to Behavioral Verification page as requested
        await loginAsUser(res.user.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDemoUser = (user: typeof MOCK_USERS[0]) => {
    setSelectedUser(user.id);
    setEmail(user.email);
    setPassword('DemoSecured#2026');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Background cyber lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-3 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-xl shadow-cyan-500/20 ring-1 ring-cyan-400/40 mx-auto">
          <Shield className="w-7 h-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
          FIN<span className="text-cyan-400">GUARD</span> AI
        </h2>
        <p className="text-xs text-slate-400">
          Digital Banking Security & Behavioral Verification Gateway
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900/90 border border-slate-800 py-8 px-6 sm:px-10 shadow-2xl rounded-2xl space-y-6 backdrop-blur-md">
          {/* Demo Account Quick Pickers */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-code font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Profiles
              </span>
              <span className="text-[10px] text-slate-500 font-mono-code">Select to pre-fill</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MOCK_USERS.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleSelectDemoUser(u)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    selectedUser === u.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-sm'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">{u.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-400 font-mono-code truncate">
                    {u.role === 'ADMIN' ? 'Admin SOC' : u.riskLevel + ' Risk'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Username / Email */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                User Identifier / Email Address
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono-code"
                  placeholder="harish@finguard.demo"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Security Password
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-10 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono-code"
                  placeholder="Enter demo password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me & Security Notice */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Remember device</span>
              </label>

              <span className="text-[11px] text-cyan-400 flex items-center gap-1 font-mono-code">
                <ShieldCheck className="w-3.5 h-3.5" /> Biometrics Armed
              </span>
            </div>

            {/* Login CTA Button */}
            <button
              id="btn-submit-login"
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-lg shadow-cyan-500/20 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none transition-all cursor-pointer"
            >
              {isLoading ? (
                <span>Initializing behavioral analysis...</span>
              ) : (
                <>
                  <span>Authenticate & Verify Behavior</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Information Box */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-[11px] text-slate-400 space-y-2">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5 text-xs">
              <Fingerprint className="w-4 h-4 text-cyan-400" />
              Continuous Behavioral Biometric Protection
            </div>
            <p className="leading-relaxed">
              Upon submitting credentials, FinGuard AI performs an automated continuous behavioral biometric assessment. Keystroke dwell time, mouse vector curvature, and device entropy will be verified against the baseline profile.
            </p>
            <div className="text-[10px] text-slate-500 font-mono-code pt-1 border-t border-slate-800/80">
              *Academic Prototype Simulation: Simulates Spring Boot POST /api/auth/login and /api/auth/behavior.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
