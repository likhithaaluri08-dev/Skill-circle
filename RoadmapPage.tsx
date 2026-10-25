import React, { useState } from 'react'
import {
  Award,
  Sparkles,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Clock,
  ArrowRight,
  Send,
  Zap,
  BookOpen,
  Users
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'

export const RoadmapPage: React.FC = () => {
  const { roadmap, toggleRoadmapStep, generateCustomRoadmap, currentUser } = useSkillCircle()
  const [goalInput, setGoalInput] = useState('')
  const [expandedStepId, setExpandedStepId] = useState<string | null>(roadmap[0]?.id || null)

  const completedCount = roadmap.filter(s => s.isCompleted).length
  const totalSteps = roadmap.length
  const progressPercent = Math.round((completedCount / totalSteps) * 100)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!goalInput.trim()) return
    generateCustomRoadmap(goalInput)
    setGoalInput('')
    setExpandedStepId(null)
  }

  const sampleGoals = [
    'Frontend Developer',
    'Python & Data Analyst',
    'UI/UX Product Designer',
    'Machine Learning Engineer',
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-bold">
          <Award size={14} className="text-teal-500" />
          <span>Interactive Career Path</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          AI Learning Roadmap
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Enter any career or technical milestone. SkillCircle maps out the structured steps, estimated hours, and complementary peer skills to exchange along your journey.
        </p>
      </div>

      {/* Goal Generator Input Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles size={16} className="text-teal-500" />
          <span>Generate a Custom AI Roadmap</span>
        </h3>

        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={goalInput}
            onChange={e => setGoalInput(e.target.value)}
            placeholder="e.g. I want to become a Full Stack Web Developer..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <span>Generate Roadmap</span>
            <Zap size={15} />
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Quick ideas:</span>
          {sampleGoals.map(goal => (
            <button
              key={goal}
              type="button"
              onClick={() => generateCustomRoadmap(goal)}
              className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-500/20 hover:text-teal-600 dark:hover:text-teal-300 transition"
            >
              + {goal}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-navy-900 to-teal-800 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-lg">Overall Roadmap Mastery</h3>
            <p className="text-xs text-teal-200">
              {completedCount} of {totalSteps} modules completed ({progressPercent}%)
            </p>
          </div>
          <span className="text-2xl font-black text-teal-300">{progressPercent}%</span>
        </div>

        {/* Visual Progress Bar */}
        <div className="h-3 w-full bg-navy-950/60 rounded-full overflow-hidden p-0.5 border border-teal-500/30">
          <div
            className="h-full bg-gradient-to-r from-teal-400 to-cyan-300 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Timeline of Steps */}
      <div className="space-y-4">
        {roadmap.map((step, idx) => {
          const isExpanded = expandedStepId === step.id
          return (
            <div
              key={step.id}
              className={`rounded-3xl border transition-all ${
                step.isCompleted
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/50 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md'
              }`}
            >
              {/* Step Header */}
              <div
                onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      toggleRoadmapStep(step.id)
                    }}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition ${
                      step.isCompleted
                        ? 'bg-emerald-500 text-white shadow'
                        : 'border-2 border-slate-300 dark:border-slate-600 hover:border-teal-500 text-transparent'
                    }`}
                    title={step.isCompleted ? 'Mark incomplete' : 'Mark complete'}
                  >
                    <CheckCircle2 size={18} />
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        STEP {idx + 1}
                      </span>
                      {step.isCompleted && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                          Completed ✓
                        </span>
                      )}
                    </div>
                    <h4
                      className={`font-bold text-base ${
                        step.isCompleted
                          ? 'line-through text-slate-500 dark:text-slate-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Clock size={13} /> {step.estimatedHours}
                  </span>
                  <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              {/* Expandable Step Details */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">
                      Key Competencies & Milestones:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {step.keyConcepts.map(c => (
                        <span
                          key={c}
                          className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700"
                        >
                          • {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-teal-800 dark:text-teal-300">
                        Recommended Peer Skill to Exchange:
                      </span>
                      <div className="text-teal-700 dark:text-teal-400 font-semibold mt-0.5">
                        {step.recommendedPeerSkill}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleRoadmapStep(step.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow ${
                        step.isCompleted
                          ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          : 'bg-teal-500 hover:bg-teal-600 text-slate-950'
                      }`}
                    >
                      {step.isCompleted ? 'Mark as Incomplete' : 'Mark Step Complete (+50 XP)'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
