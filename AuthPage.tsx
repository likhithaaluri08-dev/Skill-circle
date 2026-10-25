import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'
import { fireConfetti } from '../utils/confetti'

export const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : searchParams.get('mode') === 'forgot' ? 'forgot' : 'login'
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode)

  const navigate = useNavigate()
  const { switchDemoUser, updateProfile } = useSkillCircle()

  // Form inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [college, setCollege] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // Status
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: '' }
    let score = 0
    if (pass.length >= 8) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' }
    if (score <= 3) return { score: 2, label: 'Medium', color: 'bg-amber-500' }
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' }
  }

  const passStrength = getPasswordStrength(password)

  // 1-Click Demo Login
  const handleDemoFill = (persona: 'ananya' | 'rahul' | 'admin') => {
    if (persona === 'ananya') {
      setEmail('ananya@skillcircle.dev')
      setPassword('Ananya@123')
      switchDemoUser('usr-ananya')
      setSuccess('Logged in as Ananya Sharma! Redirecting to reciprocal matches...')
      fireConfetti()
      setTimeout(() => navigate('/matches'), 800)
    } else if (persona === 'rahul') {
      setEmail('rahul@skillcircle.dev')
      setPassword('Rahul@123')
      switchDemoUser('usr-rahul')
      setSuccess('Logged in as Rahul Verma! Redirecting to reciprocal matches...')
      fireConfetti()
      setTimeout(() => navigate('/matches'), 800)
    } else {
      setEmail('admin@skillcircle.dev')
      setPassword('Admin@123')
      setSuccess('Logged in as Campus Admin! Redirecting to Admin Panel...')
      setTimeout(() => navigate('/admin'), 800)
    }
  }

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Basic Validations
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.')
      return
    }

    if (mode === 'forgot') {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setSuccess('Password reset link sent! Check your inbox.')
      }, 700)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Full Name is required to create your student account.')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      if (mode === 'signup') {
        updateProfile({
          name: name.trim(),
          email: email.trim(),
          college: college.trim() || 'University Campus',
        })
        setSuccess('Account created! Welcome to SkillCircle.')
        fireConfetti()
      } else {
        setSuccess('Logged in successfully!')
      }

      setTimeout(() => navigate('/matches'), 800)
    }, 600)
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-navy-900 via-teal-600 to-teal-400 flex items-center justify-center text-white font-black text-lg shadow-md">
              SC
            </div>
            <span className="font-black text-2xl text-navy-900 dark:text-white">SkillCircle</span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {mode === 'login' ? 'Welcome Back!' : mode === 'signup' ? 'Join SkillCircle' : 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login'
              ? 'Log in to manage your reciprocal skill exchanges'
              : mode === 'signup'
              ? 'Swap skills with students nationwide without paying money'
              : 'Enter your student email to receive recovery instructions'}
          </p>
        </div>

        {/* 1-Click Demo Fillers */}
        <div className="p-3.5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-teal-800 dark:text-teal-300">
            <span className="flex items-center gap-1">
              <Zap size={13} className="text-teal-500" />
              <span>1-Click Demo Quick Logins:</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('ananya')}
              className="py-1.5 px-2 rounded-xl bg-white dark:bg-slate-800 border border-teal-300 dark:border-teal-700/60 text-[11px] font-bold text-teal-700 dark:text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition shadow-sm"
              title="Ananya: Teaches Canva, Wants Python"
            >
              Ananya
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('rahul')}
              className="py-1.5 px-2 rounded-xl bg-white dark:bg-slate-800 border border-teal-300 dark:border-teal-700/60 text-[11px] font-bold text-teal-700 dark:text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition shadow-sm"
              title="Rahul: Teaches Python, Wants Canva"
            >
              Rahul
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="py-1.5 px-2 rounded-xl bg-white dark:bg-slate-800 border border-teal-300 dark:border-teal-700/60 text-[11px] font-bold text-teal-700 dark:text-teal-300 hover:bg-teal-500 hover:text-slate-950 transition shadow-sm"
              title="Administrator Role"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  College / Institution
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={e => setCollege(e.target.value)}
                  placeholder="e.g. National Institute of Design"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Student Email *
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@college.edu or gmail.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password *
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && mode === 'signup' && (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${passStrength.color}`}
                      style={{ width: `${(passStrength.score / 3) * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-right font-medium text-slate-500">
                    Strength: <span className="font-bold">{passStrength.label}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="accent-teal-500 w-4 h-4 rounded cursor-pointer"
                />
                <span>Remember Me</span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : mode === 'login' ? (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            ) : mode === 'signup' ? (
              <>
                <span>Create Student Account</span>
                <ArrowRight size={16} />
              </>
            ) : (
              <span>Send Reset Instructions</span>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setError(null)
                  setMode('signup')
                }}
                className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Sign Up Free
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setError(null)
                  setMode('login')
                }}
                className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
