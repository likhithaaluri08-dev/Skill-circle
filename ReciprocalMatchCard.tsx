import React from 'react'
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Star,
  ArrowRight,
  GraduationCap,
  Zap,
  UserCheck
} from 'lucide-react'
import { ReciprocalMatch } from '../../types'
import { useSkillCircle } from '../../context/SkillCircleContext'

interface ReciprocalMatchCardProps {
  match: ReciprocalMatch
}

export const ReciprocalMatchCard: React.FC<ReciprocalMatchCardProps> = ({ match }) => {
  const { currentUser, openBookingModal, openProfileModal } = useSkillCircle()
  const { partner, compatibilityScore, whyReasons, offeredSkill, desiredSkill, isDirectReciprocal } = match

  return (
    <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden hover:shadow-2xl hover:border-teal-500/50 transition-all p-6 space-y-6">
      {/* Top Match Score Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 flex items-center gap-1.5 shadow-sm">
            <Sparkles size={13} className="text-teal-500" />
            <span>{compatibilityScore}% Mutual Match</span>
          </span>

          {isDirectReciprocal && (
            <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              Direct Reciprocal
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
          <Star size={14} fill="currentColor" />
          <span>{partner.rating}</span>
          <span className="text-slate-400 text-[11px]">({partner.reviewsCount})</span>
        </div>
      </div>

      {/* Animated Reciprocal Visual with Connection Lines */}
      <div className="relative py-2 flex items-center justify-between gap-4">
        {/* User 1 (You) */}
        <div className="flex flex-col items-center text-center z-10 w-28">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-300 dark:border-slate-700 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-navy-900 text-[10px] text-white font-bold">
              You
            </span>
          </div>
          <span className="mt-2 font-bold text-xs text-slate-800 dark:text-slate-200 truncate max-w-full">
            {currentUser.name.split(' ')[0]}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 font-semibold mt-0.5">
            Teaches {desiredSkill}
          </span>
        </div>

        {/* Animated Connection Line with Pulsing Particle */}
        <div className="flex-1 relative flex flex-col items-center justify-center">
          <svg className="w-full h-12 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 24">
            <defs>
              <linearGradient id={`grad-${partner.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00C2A8" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#00C2A8" />
              </linearGradient>
            </defs>

            {/* Glowing background line */}
            <path
              d="M 5,12 Q 50,2 95,12"
              fill="none"
              stroke="rgba(0, 194, 168, 0.25)"
              strokeWidth="4"
              strokeDasharray="4 4"
            />

            {/* Main animated connecting stroke */}
            <path
              d="M 5,12 Q 50,2 95,12"
              fill="none"
              stroke={`url(#grad-${partner.id})`}
              strokeWidth="2.5"
            />

            {/* Animated reciprocal pulse particle */}
            <circle cx="50" cy="7" r="4" fill="#00C2A8" className="animate-ping" opacity="0.8" />
            <circle cx="50" cy="7" r="3" fill="#ffffff" />
          </svg>

          <span className="text-[10px] font-bold tracking-wider uppercase text-teal-600 dark:text-teal-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-teal-500/30 -mt-2 shadow-sm">
            Reciprocal Flow
          </span>
        </div>

        {/* User 2 (Partner) */}
        <div className="flex flex-col items-center text-center z-10 w-28">
          <div className="relative">
            <img
              src={partner.avatar}
              alt={partner.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-teal-500 text-[10px] text-slate-950 font-bold">
              Match
            </span>
          </div>
          <span className="mt-2 font-bold text-xs text-slate-800 dark:text-slate-200 truncate max-w-full">
            {partner.name.split(' ')[0]}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-semibold mt-0.5">
            Teaches {offeredSkill}
          </span>
        </div>
      </div>

      {/* College and Info */}
      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <GraduationCap size={15} className="text-teal-500" />
          <span className="font-medium truncate max-w-[180px]">{partner.college}</span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">{partner.year}</span>
      </div>

      {/* "Why this match?" Explanation Box */}
      <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
          <Sparkles size={14} />
          <span>Why this match?</span>
        </h4>

        <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {whyReasons.map((reason, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <CheckCircle2 size={14} className="text-teal-500 shrink-0 mt-0.5" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Action Buttons */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={() => openProfileModal(partner)}
          className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          View Profile
        </button>

        <button
          onClick={() => openBookingModal(partner)}
          className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs font-extrabold shadow-md transition flex items-center justify-center gap-1.5"
        >
          <span>Request Exchange</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
