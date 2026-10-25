import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Send,
  CheckCircle2
} from 'lucide-react'

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail('')
      setSubscribed(false)
    }, 3000)
  }

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Vision */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-navy-900 via-teal-600 to-teal-400 flex items-center justify-center text-white font-extrabold text-sm shadow">
                SC
              </div>
              <span className="font-extrabold text-lg text-white">SkillCircle</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-powered peer-to-peer skill exchange ecosystem. Students teach skills they know and learn skills they need without paying money.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <ShieldCheck size={16} />
              <span>100% Non-Monetary • Time Credits</span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explore Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/matches" className="hover:text-teal-400 transition">
                  Reciprocal AI Matching
                </Link>
              </li>
              <li>
                <Link to="/discover" className="hover:text-teal-400 transition">
                  Discover Student Skills
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-teal-400 transition">
                  AI Learning Roadmap
                </Link>
              </li>
              <li>
                <Link to="/pods" className="hover:text-teal-400 transition">
                  Learning Pods (Cohorts)
                </Link>
              </li>
              <li>
                <Link to="/video-room" className="hover:text-teal-400 transition">
                  Live Virtual Learning Room
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Impact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/wallet" className="hover:text-teal-400 transition">
                  Time Credit Wallet
                </Link>
              </li>
              <li>
                <Link to="/gamification" className="hover:text-teal-400 transition">
                  Badges & Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-teal-400 transition">
                  Community Impact Analytics
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-teal-400 transition">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Campus Digest</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get weekly curated skill exchange alerts and student peer success stories.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter college email..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold transition"
                title="Subscribe"
              >
                <Send size={15} />
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-teal-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> Subscribed to campus updates!
              </span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SkillCircle Technologies Inc. Built for Students, Powered by Reciprocal AI.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/discover" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/discover" className="hover:text-slate-300">Terms of Exchange</Link>
            <Link to="/admin" className="hover:text-slate-300">Campus Trust & Safety</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
