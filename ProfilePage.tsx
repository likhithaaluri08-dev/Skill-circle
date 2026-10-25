import React from 'react'
import {
  Sparkles,
  Edit3,
  Star,
  GraduationCap,
  Calendar,
  Clock,
  Award,
  Wallet,
  Globe,
  Flame,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'

export const ProfilePage: React.FC = () => {
  const { currentUser, openEditProfile } = useSkillCircle()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Profile Card Header */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Banner */}
        <div className="h-36 bg-gradient-to-r from-navy-950 via-teal-800 to-teal-500 relative p-6 flex justify-end items-start">
          <button
            onClick={openEditProfile}
            className="px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-white font-bold text-xs shadow-lg hover:scale-105 transition flex items-center gap-1.5"
          >
            <Edit3 size={14} className="text-teal-500" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Details Container */}
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 mb-6 gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-28 h-28 rounded-3xl object-cover border-4 border-white dark:border-slate-900 shadow-2xl"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900" />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 text-xs font-bold">
                <Star size={14} fill="currentColor" className="text-amber-500" />
                <span>{currentUser.rating}★ Rating</span>
                <span className="text-slate-400">({currentUser.reviewsCount})</span>
              </div>

              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/40 text-teal-700 dark:text-teal-300 text-xs font-bold">
                <ShieldCheck size={14} className="text-teal-500" />
                <span>Verified Student</span>
              </div>
            </div>
          </div>

          {/* Name & Academic info */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>{currentUser.name}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30 font-medium">
                @{currentUser.username}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <GraduationCap size={15} className="text-teal-500" />
                <span>{currentUser.college}</span>
              </span>
              <span>•</span>
              <span>{currentUser.year}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe size={13} className="text-cyan-500" />
                <span>Languages: {currentUser.languages.join(', ')}</span>
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {currentUser.bio}
          </p>

          {/* 4 Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center">
            <div>
              <span className="block text-2xl font-black text-slate-900 dark:text-white font-mono">
                {currentUser.completedExchanges}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Exchanges Finished</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-teal-600 dark:text-teal-400 font-mono">
                {currentUser.teachingHours}h
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Hours Taught</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
                {currentUser.credits}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Time Credits</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-amber-500 font-mono">
                🔥 {currentUser.streakDays}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Day Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Matrix (Teaches ⇄ Wants) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Can Teach */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles size={16} className="text-teal-500" />
              <span>Skills I Can Teach (Offers)</span>
            </h3>
            <span className="text-xs text-teal-600 dark:text-teal-400 font-bold">
              {currentUser.teachSkills.length} Verified
            </span>
          </div>

          <div className="space-y-2">
            {currentUser.teachSkills.map(s => (
              <div
                key={s.name}
                className="p-3.5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/40 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-extrabold text-sm text-teal-900 dark:text-teal-200 block">
                    {s.name}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Category: {s.category}
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-teal-500 text-slate-950 font-black text-[11px] shadow-sm">
                  {s.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Wants to Learn */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Clock size={16} className="text-cyan-500" />
              <span>Skills I Want to Learn (Wishlist)</span>
            </h3>
            <span className="text-xs text-cyan-600 dark:text-cyan-400 font-bold">
              {currentUser.wantSkills.length} Goals
            </span>
          </div>

          <div className="space-y-2">
            {currentUser.wantSkills.map(skill => (
              <div
                key={skill}
                className="p-3.5 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/40 flex items-center justify-between text-xs"
              >
                <span className="font-extrabold text-sm text-cyan-900 dark:text-cyan-200">
                  {skill}
                </span>
                <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
                  Seeking Peer Partner
                </span>
              </div>
            ))}
          </div>

          {/* Availability */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Current Availability:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentUser.availability.map(slot => (
                <span
                  key={slot}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium"
                >
                  📅 {slot}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Badges Gallery */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Award size={18} className="text-amber-500" />
          <span>Unlocked Achievements & Badges</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {currentUser.badges.map(b => (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-center space-y-2"
            >
              <div className="text-3xl">{b.icon}</div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">{b.name}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Reviews */}
      {currentUser.reviews && currentUser.reviews.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Star size={18} className="text-amber-500" />
            <span>Peer Recommendations & Reviews ({currentUser.reviews.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentUser.reviews.map(rev => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      className="w-8 h-8 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{rev.authorName}</div>
                      <div className="text-[10px] text-slate-400">{rev.authorRole} • {rev.date}</div>
                    </div>
                  </div>

                  <div className="flex text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold pt-1">
                  Boosted skill confidence by +{rev.skillConfidenceGain} levels
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
