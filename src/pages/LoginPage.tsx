import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Lock, Mail, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeSelector from '../components/ThemeSelector';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('eleanor.vance@demo.elderguard.io');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, demoLogin, isLoading } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleQuickDemo = async (role: 'Elderly' | 'Caregiver') => {
    setError('');
    try {
      await demoLogin(role);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo login failed.');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors ${
      theme === 'black-purple'
        ? 'bg-[#08060e] text-white'
        : theme === 'black-white'
        ? 'bg-black text-white'
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Floating Theme Switcher */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <ThemeSelector variant="compact" />
      </div>

      {/* Top Brand */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link to="/" className="inline-flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
            theme === 'black-purple'
              ? 'bg-linear-to-tr from-purple-600 to-indigo-600 shadow-purple-950'
              : theme === 'black-white'
              ? 'bg-white text-black shadow-neutral-800'
              : 'bg-linear-to-tr from-blue-600 to-indigo-600 shadow-blue-500/25'
          }`}>
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="text-2xl font-black tracking-tight">ELDERGUARD</span>
        </Link>
        <h2 className="text-2xl font-black">Sign in to ElderGuard</h2>
        <p className="mt-1 text-xs opacity-70">
          Smart Elderly Safety & Emergency Assistance Prototype
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className={`py-8 px-6 sm:px-10 rounded-3xl border transition-colors shadow-2xl ${
          theme === 'black-purple'
            ? 'bg-[#120d1e] border-purple-900/40 text-white'
            : theme === 'black-white'
            ? 'bg-[#0c0c0c] border-neutral-800 text-white'
            : 'bg-white border-slate-200/80 shadow-slate-200/50 text-slate-900'
        }`}>
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer mt-2"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Fast Demo Accounts (1-Click)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('Elderly')}
                className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Elderly User
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Caregiver')}
                className="py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Caregiver Role
              </button>
            </div>
          </div>

          {/* Link to Register */}
          <div className="mt-6 text-center text-xs text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-blue-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>

        {/* Demo Data Disclaimer */}
        <p className="text-center text-2xs text-slate-400 mt-6">
          Student Prototype Demo • Mock Authentication
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
