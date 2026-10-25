import React from 'react'
import {
  X,
  Star,
  MapPin,
  GraduationCap,
  Award,
  Calendar,
  Clock,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { UserProfile } from '../../types'
import { useSkillCircle } from '../../context/SkillCircleContext'

interface ProfileModalProps {
  user: UserProfile | null
  onClose: () => void
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose }) => {
  const { openBookingModal } = useSkillCircle()

  if (!user) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        {/* Banner with Close button */}
        <div className="h-28 bg-gradient-to-r from-navy-900 via-teal-700 to-teal-500 relative p-4 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-950/40 text-white hover:bg-slate-950/60 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Avatar and Main Info */}
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-14 mb-4 gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-xl"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose()
                  openBookingModal(user)
                }}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <Sparkles size={16} />
                <span>Request Exchange</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{user.name}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                @{user.username}
              </span>
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <GraduationCap size={14} className="text-teal-500" />
                <span>{user.college}</span>
              </span>
              <span>•</span>
              <span>{user.year}</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-amber-500">
                <Star size={13} fill="currentColor" />
                <span>{user.rating}</span>
                <span className="text-slate-400">({user.reviewsCount} reviews)</span>
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {user.bio}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 my-5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
            <div>
              <span className="block text-lg font-bold text-slate-900 dark:text-white">{user.completedExchanges}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Exchanges</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-teal-600 dark:text-teal-400">{user.teachingHours}h</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Hours Taught</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-cyan-600 dark:text-cyan-400">{user.credits}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Time Credits</span>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Can Teach You:
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.teachSkills.map(skill => (
                  <span
                    key={skill.name}
                    className="px-3 py-1 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-semibold"
                  >
                    {skill.name} ({skill.level})
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Wants to Learn:
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.wantSkills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Available Times:
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.availability.map(slot => (
                  <span
                    key={slot}
                    className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs"
                  >
                    📅 {slot}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          {user.reviews && user.reviews.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Peer Reviews ({user.reviews.length})
              </h4>
              <div className="space-y-3">
                {user.reviews.map(review => (
                  <div
                    key={review.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={review.authorAvatar}
                          alt={review.authorName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{review.authorName}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
