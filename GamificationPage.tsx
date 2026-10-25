import React from 'react'
import {
  Award,
  Trophy,
  Zap,
  Flame,
  Star,
  Users,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'
import { fireConfetti } from '../utils/confetti'

export const GamificationPage: React.FC = () => {
  const { currentUser, users } = useSkillCircle()

  // Ranked leaderboard by XP
  const sortedUsers = [...users].sort((a, b) => b.xp - a.xp)

  const xpCurrent = currentUser.xp % 300
  const xpTarget = 300
  const levelProgress = Math.round((xpCurrent / xpTarget) * 100)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold">
          <Trophy size={14} className="text-amber-500" />
          <span>Peer Recognition & Levels</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Campus Skill Champions
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Every minute you teach peer students earns XP, advances your mastery level, and climbs the national campus skill exchange leaderboard.
        </p>
      </div>

      {/* User XP & Level Overview Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-navy-950 via-slate-900 to-teal-950 text-white border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-400 shadow-xl"
            />
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg bg-teal-500 text-slate-950 text-xs font-black">
              Lvl {currentUser.level}
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="font-black text-xl text-white">{currentUser.name}</h3>
            <p className="text-xs text-teal-300 font-semibold">
              Tier {currentUser.level} Peer Mentor • {currentUser.xp} Total XP
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <span>Next Level in: <strong>{xpTarget - xpCurrent} XP</strong></span>
            </div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full md:w-72 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-teal-400">Level {currentUser.level}</span>
            <span className="text-cyan-400">Level {currentUser.level + 1}</span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-700"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <div className="text-[11px] text-right text-slate-400">
            {xpCurrent} / {xpTarget} XP ({levelProgress}%)
          </div>
        </div>
      </div>

      {/* Achievements & Badges Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award size={20} className="text-teal-500" />
            <span>Achievement Badges</span>
          </h2>
          <span className="text-xs text-slate-500">
            {currentUser.badges.length} of 5 Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentUser.badges.map(b => (
            <div
              key={b.id}
              onClick={fireConfetti}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-teal-500/50 hover:shadow-xl transition cursor-pointer flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-2xl group-hover:scale-110 transition shrink-0">
                {b.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{b.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    Unlocked ✓
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  {b.description}
                </p>
                {b.unlockedAt && (
                  <span className="text-[10px] text-slate-400 block pt-1 font-mono">
                    Unlocked on {b.unlockedAt}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Locked Badge Demo */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-850/60 border border-dashed border-slate-300 dark:border-slate-800 flex items-start gap-4 opacity-75">
            <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
              <Lock size={20} />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-slate-700 dark:text-slate-300">25 Hours Shared</h4>
              <p className="text-slate-500 leading-snug">
                Conduct 25 verified hours of reciprocal teaching across 10+ students.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                Progress: 6.5 / 25 Hours
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Campus Leaderboard */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy size={18} className="text-amber-500" />
              <span>Weekly Campus Leaderboard</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Top peer mentors ranked by verified learning hours and community feedback
            </p>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Resets Sunday Midnight
          </span>
        </div>

        {/* Table list */}
        <div className="space-y-2">
          {sortedUsers.map((user, idx) => {
            const isMe = user.id === currentUser.id
            return (
              <div
                key={user.id}
                className={`p-4 rounded-2xl flex items-center justify-between gap-4 transition ${
                  isMe
                    ? 'bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800/80 shadow-sm'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                      idx === 0
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : idx === 1
                        ? 'bg-slate-300 text-slate-900'
                        : idx === 2
                        ? 'bg-amber-700/60 text-white'
                        : 'text-slate-400'
                    }`}
                  >
                    #{idx + 1}
                  </div>

                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />

                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{user.name}</span>
                      {isMe && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500 text-slate-950 font-bold">
                          You
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                      {user.college} • Teaches: {user.teachSkills[0]?.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-right text-xs">
                  <div className="hidden sm:block">
                    <span className="block font-bold text-slate-900 dark:text-white">{user.teachingHours}h</span>
                    <span className="text-[10px] text-slate-400">Hours Taught</span>
                  </div>

                  <div>
                    <span className="block font-black text-teal-600 dark:text-teal-400 font-mono text-sm sm:text-base">
                      {user.xp} XP
                    </span>
                    <span className="text-[10px] text-slate-400">Level {user.level}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
