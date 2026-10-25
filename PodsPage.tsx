import React, { useState } from 'react'
import {
  Users,
  Sparkles,
  Calendar,
  Target,
  ArrowRight,
  Plus,
  CheckCircle2,
  X,
  Clock
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'

export const PodsPage: React.FC = () => {
  const { learningPods, joinPod, leavePod, currentUser } = useSkillCircle()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Tech & Code')
  const [sharedGoal, setSharedGoal] = useState('')
  const [nextSession, setNextSession] = useState('Thursday at 6:00 PM')

  const handleCreatePod = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !sharedGoal.trim()) return

    // In a real database this persists; our context manages learningPods state
    setIsCreateOpen(false)
    setTitle('')
    setSharedGoal('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-bold">
            <Users size={14} className="text-teal-500" />
            <span>Cohort Learning Circles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Learning Pods
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
            Learn together in focused cohorts of 3–5 students. Share weekly projects, hold each other accountable, and accelerate reciprocal mastery without spending money.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Start a New Pod</span>
        </button>
      </div>

      {/* Pods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPods.map(pod => (
          <div
            key={pod.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl hover:shadow-2xl hover:border-teal-500/50 transition flex flex-col justify-between space-y-5"
          >
            <div>
              {/* Top Category & Member slots */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {pod.category}
                </span>

                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                  {pod.membersCount} / {pod.maxMembers} Students
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">
                {pod.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {pod.description}
              </p>

              {/* Shared Goal Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <Target size={14} className="text-teal-500" />
                  <span>Shared Cohort Goal:</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {pod.sharedGoal}
                </p>

                {/* Progress bar */}
                <div className="pt-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold mb-1">
                    <span>Goal Progress</span>
                    <span>{pod.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all"
                      style={{ width: `${pod.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Next Session */}
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
                <Calendar size={14} className="text-cyan-500" />
                <span>Next Session: <strong className="text-slate-700 dark:text-slate-200">{pod.nextSession}</strong></span>
              </div>

              {/* Member Avatar Pile */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-2 overflow-hidden">
                  {pod.members.map((m, idx) => (
                    <img
                      key={idx}
                      src={m.avatar}
                      alt={m.name}
                      title={`${m.name} (${m.role})`}
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                    />
                  ))}
                </div>

                <span className="text-[11px] text-slate-400">
                  {pod.maxMembers - pod.membersCount > 0
                    ? `${pod.maxMembers - pod.membersCount} spots left`
                    : 'Pod Full'}
                </span>
              </div>
            </div>

            {/* Action Buttons: Join or Leave */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              {pod.isJoined ? (
                <div className="flex items-center gap-2">
                  <span className="flex-1 py-2 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={14} /> Joined Pod
                  </span>
                  <button
                    onClick={() => leavePod(pod.id)}
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:border-rose-400 transition"
                  >
                    Leave
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => joinPod(pod.id)}
                  disabled={pod.membersCount >= pod.maxMembers}
                  className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Users size={14} />
                  <span>Join Learning Pod</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create New Pod Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Create a Learning Pod</h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePod} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Pod Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Next.js 15 Fullstack Cohort"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Tech & Code">Tech & Code</option>
                  <option value="Design & Visuals">Design & Visuals</option>
                  <option value="Data & AI">Data & AI</option>
                  <option value="Public Speaking">Public Speaking</option>
                  <option value="Language Exchange">Language Exchange</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Shared Cohort Goal *</label>
                <textarea
                  rows={2}
                  value={sharedGoal}
                  onChange={e => setSharedGoal(e.target.value)}
                  placeholder="e.g. Build and launch 2 fullstack open-source apps"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs shadow-md transition"
              >
                Create Cohort
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
