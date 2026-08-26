import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Building,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../types';
import { DEMO_USERS } from '../data/renoFarmData';
import { AnimatedCowIcon } from './AnimatedCowIcon';

interface RenoFarmLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const RenoFarmLoginModal: React.FC<RenoFarmLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [tab, setTab] = useState<'signin' | 'register' | 'demo'>('demo');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserProfile['role']>('Farm Director');
  const [barnLocation, setBarnLocation] = useState('North Pasture & Milking Station');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectDemoUser = (user: UserProfile) => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Authenticated as ${user.name} (${user.role})`);
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 500);
    }, 600);
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (tab === 'signin') {
      if (!email || !password) {
        setError('Please enter your Reno Farm email and password.');
        return;
      }
      setIsLoading(true);

      // Check if matches demo or custom
      const matched = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
      const authenticatedUser: UserProfile = matched || {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email: email,
        role: 'Farm Director',
        farmName: 'Reno Farm Dairy Estate',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        facilityLocation: 'Main Control Terminal',
      };

      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage(`Welcome back, ${authenticatedUser.name}!`);
        setTimeout(() => {
          onLoginSuccess(authenticatedUser);
          onClose();
        }, 500);
      }, 700);
    } else {
      // Register
      if (!name || !email || !password) {
        setError('Please complete all required fields.');
        return;
      }
      setIsLoading(true);

      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: name,
        email: email,
        role: role,
        farmName: 'Reno Farm Dairy Estate',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        facilityLocation: barnLocation,
      };

      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage(`Staff account provisioned for ${newUser.name}!`);
        setTimeout(() => {
          onLoginSuccess(newUser);
          onClose();
        }, 500);
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative"
      >
        {/* Decorative Sky Blue Curve Backdrop */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-100 rounded-bl-[100px] pointer-events-none opacity-60" />
        <div className="absolute top-0 left-0 w-24 h-24 bg-sky-200/40 rounded-br-[60px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Section */}
        <div className="p-6 pb-4 pt-7 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center justify-center mb-3">
            <AnimatedCowIcon size="md" />
          </div>
          
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-sky-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RENO FARM SECURE ACCESS</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-1">
            Dairy Operations & IoT Portal
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Access real-time livestock biometrics, sustainable pasture analytics, and veterinary triage terminals.
          </p>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 mt-5 w-full max-w-xs text-xs font-bold">
            <button
              onClick={() => {
                setTab('demo');
                setError(null);
              }}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                tab === 'demo'
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              1-Click Demo
            </button>
            <button
              onClick={() => {
                setTab('signin');
                setError(null);
              }}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                tab === 'signin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setTab('register');
                setError(null);
              }}
              className={`flex-1 py-1.5 rounded-xl transition-all ${
                tab === 'register'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Enroll
            </button>
          </div>
        </div>

        {/* Dynamic Body */}
        <div className="p-6 pt-2 overflow-y-auto max-h-[65vh]">
          {/* Error / Success Notifications */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 1: 1-Click Demo Profiles */}
          {tab === 'demo' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select a Reno Farm Role Profile
                </span>
                <span className="text-[10px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                  Instant Authentication
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {DEMO_USERS.map((usr) => (
                  <button
                    key={usr.id}
                    disabled={isLoading}
                    onClick={() => handleSelectDemoUser(usr)}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-sky-50/60 hover:border-sky-300 hover:shadow-xs transition-all text-left flex items-center justify-between group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={usr.avatarUrl}
                        alt={usr.name}
                        className="w-11 h-11 rounded-2xl object-cover border border-slate-300 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 text-sm group-hover:text-sky-700">
                            {usr.name}
                          </span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                            {usr.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {usr.email}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {usr.facilityLocation}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition-all shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-2xl bg-sky-50/80 border border-sky-100 text-slate-600 text-[11px] leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Direct Telemetry Link:</strong> Selecting any role profile connects you instantly to the live IoT herd dataset, 7-day temperature trends, and pre-symptomatic alerts.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 & 3: Standard Sign-In or Registration Form */}
          {(tab === 'signin' || tab === 'register') && (
            <form onSubmit={handleStandardSubmit} className="space-y-3.5">
              {tab === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name & Title
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Wilson Aminoff"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-colors"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reno Farm Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="user@renofarm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Terminal Access Key / Password
                  </label>
                  {tab === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setError('Password reset instructions dispatched to farm supervisor.')}
                      className="text-[11px] font-semibold text-sky-600 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role Picker (For registration) */}
              {tab === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Staff Operational Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold cursor-pointer"
                    >
                      <option value="Farm Director">Farm Director (Executive Management)</option>
                      <option value="Chief Veterinarian">Chief Veterinarian (Clinical Triage)</option>
                      <option value="Herd Operations Lead">Herd Operations Lead (Ear-Tag & Pen Mgmt)</option>
                      <option value="Dairy Agronomist">Dairy Agronomist (Pasture & Soil)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Assigned Barn / Facility
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. South Pasture Rotary Barn"
                        value={barnLocation}
                        onChange={(e) => setBarnLocation(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Remember checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberTerminal"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="rememberTerminal" className="text-xs text-slate-600 cursor-pointer">
                  Remember this terminal station
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-4"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authorizing Reno Farm Access...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>{tab === 'signin' ? 'Sign In to Telemetry Hub' : 'Register & Enter Dashboard'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Reno Farm Dairy Estate • v3.2</span>
          <span className="flex items-center gap-1 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            256-bit IoT Encrypted
          </span>
        </div>
      </motion.div>
    </div>
  );
};
