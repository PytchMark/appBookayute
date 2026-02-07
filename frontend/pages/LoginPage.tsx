import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Eye, EyeOff, User, Lock, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { isSupabaseConfigured } from '../lib/supabase';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, setDemoUser, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Redirect based on role (handled in dashboard components)
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = (role: 'admin' | 'talent') => {
    setDemoUser(role);
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back to Home */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
              Portal <span className="text-brand-red">Access</span>
            </h1>
            <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">
              Secure Login for Members & Admin
            </p>
          </div>

          {/* Demo Mode Notice */}
          {!isSupabaseConfigured && (
            <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-1">Demo Mode Active</p>
                <p className="text-yellow-500/70 text-xs">
                  Supabase not configured. Use demo logins below or any email to test.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-900/20 border border-red-700/30 rounded-xl text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 flex items-center gap-2">
                <User className="w-3 h-3" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:border-brand-red outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500 flex items-center gap-2">
                <Lock className="w-3 h-3" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 pr-12 focus:border-brand-red outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-brand-red/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Login Buttons */}
          {!isSupabaseConfigured && (
            <div className="mt-8 pt-8 border-t border-zinc-900">
              <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold mb-4 text-center">
                Quick Demo Access
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleDemoLogin('talent')}
                  className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-center hover:border-zinc-700 transition-all"
                >
                  <span className="block text-white font-bold text-sm mb-1">Talent Portal</span>
                  <span className="text-zinc-500 text-[10px] uppercase">Demo Access</span>
                </button>
                <button
                  onClick={() => handleDemoLogin('admin')}
                  className="p-4 bg-zinc-900 border border-brand-red/30 rounded-xl text-center hover:border-brand-red transition-all"
                >
                  <span className="block text-brand-red font-bold text-sm mb-1">Admin Portal</span>
                  <span className="text-zinc-500 text-[10px] uppercase">Demo Access</span>
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center pt-8 mt-8 border-t border-zinc-900">
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold mb-4">Not on the roster yet?</p>
            <Link 
              to="/roster"
              className="text-white hover:text-brand-red transition-colors text-xs font-black uppercase tracking-widest"
            >
              Request Representation
            </Link>
          </div>
        </div>

        <p className="text-center mt-8 text-zinc-700 text-[9px] uppercase tracking-[0.4em]">
          Powered by Pytch Marketing LLC
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
