import React, { useState } from 'react'
import {
  Sparkles,
  Filter,
  CheckCircle2,
  ArrowRight,
  Zap,
  Info,
  Layers,
  UserCheck
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'
import { getRankedReciprocalMatches } from '../utils/matching'
import { ReciprocalMatchCard } from '../components/matching/ReciprocalMatchCard'
import { SkillGapBridge } from '../components/matching/SkillGapBridge'

export const MatchesPage: React.FC = () => {
  const { currentUser, users } = useSkillCircle()
  const [filterType, setFilterType] = useState<'all' | 'direct' | 'high_score'>('all')

  const rankedMatches = getRankedReciprocalMatches(currentUser, users)

  const filteredMatches = rankedMatches.filter(m => {
    if (filterType === 'direct') return m.isDirectReciprocal
    if (filterType === 'high_score') return m.compatibilityScore >= 90
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-navy-950 via-slate-900 to-teal-950 text-white p-8 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-teal-400" />
            <span>Reciprocal AI Matching Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Mutual Exchanges Designed For You
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            SkillCircle doesn't just find mentors. It pairs you with peers whose teaching capabilities and learning desires perfectly complement yours — creating a fair, zero-money exchange.
          </p>

          {/* Current User Snapshot */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="text-slate-400">Your Active Formula:</span>
            <span className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-teal-300 font-bold">
              Offer: {currentUser.teachSkills.map(s => s.name).join(', ')}
            </span>
            <span className="text-slate-500 font-bold">⇄</span>
            <span className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 font-bold">
              Seek: {currentUser.wantSkills.join(', ')}
            </span>
          </div>
        </div>

        {/* Decorative blur orb */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-xl transition ${
              filterType === 'all'
                ? 'bg-teal-500 text-slate-950 shadow'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Matches ({rankedMatches.length})
          </button>
          <button
            onClick={() => setFilterType('direct')}
            className={`px-4 py-2 rounded-xl transition ${
              filterType === 'direct'
                ? 'bg-teal-500 text-slate-950 shadow'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Direct Reciprocal ⇄
          </button>
          <button
            onClick={() => setFilterType('high_score')}
            className={`px-4 py-2 rounded-xl transition ${
              filterType === 'high_score'
                ? 'bg-teal-500 text-slate-950 shadow'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            90%+ Compatibility
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Info size={14} className="text-teal-500" />
          <span>Calculated via skill taxonomy, experience, and availability overlap.</span>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.map(match => (
          <ReciprocalMatchCard key={match.partner.id} match={match} />
        ))}
      </div>

      {/* Skill Gap Bridge Section */}
      <div className="pt-6">
        <SkillGapBridge searchedSkill={currentUser.wantSkills[0] || 'Python Programming'} />
      </div>
    </div>
  )
}
