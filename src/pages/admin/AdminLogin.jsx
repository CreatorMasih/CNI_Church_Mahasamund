import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function AdminLogin() {
  const { login, auth } = useCms();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@cnichurchmahasamund.org');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  // If already authenticated, redirect to /admin
  if (auth.isAuthenticated) {
    navigate('/admin', { replace: true });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const res = login(email.trim(), password.trim());
      setLoading(false);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Invalid credentials.');
      }
    }, 600);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #17202B 0%, #4E1822 50%, #17202B 100%)',
      }}
    >
      {/* Background Soft Glow Effects */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(216, 188, 118, 0.15) 0%, rgba(126, 38, 52, 0.08) 60%, transparent 80%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-6 sm:p-8 shadow-2xl relative"
          style={{
            background: 'rgba(23, 32, 43, 0.92)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(216, 188, 118, 0.35)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* Top Gold Accent Line */}
          <div
            className="absolute top-0 left-8 right-8 h-[2px] rounded-full"
            style={{ background: 'linear-gradient(to right, transparent, #D8BC76, transparent)' }}
          />

          {/* Branding Header */}
          <div className="text-center mb-8 space-y-2">
            <div
              className="w-14 h-14 rounded-full mx-auto flex items-center justify-center shadow-lg mb-3"
              style={{
                background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                border: '1.5px solid #D8BC76',
                color: '#FFFDF9',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-gold-soft"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M6 8h12" />
              </svg>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] block text-gold-soft">
              ADMINISTRATION PORTAL
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              CNI Church Mahasamund
            </h1>
            <p className="text-xs text-[#9E9A91]">
              Sign in to manage website content, services & community media
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl mb-6 text-xs text-red-200 border flex items-center space-x-2"
              style={{ background: 'rgba(126, 38, 52, 0.4)', borderColor: 'rgba(239, 68, 68, 0.4)' }}
            >
              <Shield className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8BC76]">
                Administrator Email / Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cnichurchmahasamund.org"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                  style={{
                    background: 'rgba(126, 38, 52, 0.25)',
                    border: '1px solid rgba(216, 188, 118, 0.3)',
                    fontSize: '15px',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#D8BC76'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(216, 188, 118, 0.3)'; }}
                />
                <Mail className="w-5 h-5 text-gold-soft absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D8BC76]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                  style={{
                    background: 'rgba(126, 38, 52, 0.25)',
                    border: '1px solid rgba(216, 188, 118, 0.3)',
                    fontSize: '15px',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#D8BC76'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(216, 188, 118, 0.3)'; }}
                />
                <Lock className="w-5 h-5 text-gold-soft absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-gold-soft transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 text-[#9E9A91] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-burgundy"
                  style={{ accentColor: '#B8944A' }}
                />
                <span>Remember session</span>
              </label>
              <span className="text-gold-soft/80 text-[11px]">Authorized Personnel Only</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center space-x-2 transition-all hover:brightness-110 active:scale-95 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #7E2634 0%, #4E1822 100%)',
                color: '#FFFDF9',
                border: '1px solid rgba(216, 188, 118, 0.4)',
                minHeight: '52px',
                boxShadow: '0 6px 20px rgba(126, 38, 52, 0.4)',
              }}
            >
              {loading ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>SIGN IN TO DASHBOARD</span>
                  <ArrowRight className="w-4 h-4 text-gold-soft" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Hint */}
          <div className="mt-6 pt-4 border-t border-gold/15 text-center text-[11px] text-[#9E9A91]">
            <p>Default Admin Login Credentials:</p>
            <p className="font-mono text-gold-soft mt-0.5">
              admin@cnichurchmahasamund.org / admin123
            </p>
          </div>
        </motion.div>

        {/* Back to Public Site */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-[#9E9A91] hover:text-gold-soft transition-colors inline-flex items-center space-x-1.5"
          >
            <span>← Return to Public Church Website</span>
          </a>
        </div>
      </div>
    </div>
  );
}
