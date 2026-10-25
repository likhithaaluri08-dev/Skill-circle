import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search,
  Filter,
  Sparkles,
  Star,
  GraduationCap,
  Calendar,
  ArrowRight,
  Compass,
  X
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'
import { calculateReciprocalMatch } from '../utils/matching'
import { SkillGapBridge } from '../components/matching/SkillGapBridge'

export const DiscoverPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''

  const { users, currentUser, openBookingModal, openProfileModal } = useSkillCircle()

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedExperience, setSelectedExperience] = useState<string>('All')
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All')

  const categories = ['All', 'Tech', 'Design', 'Languages', 'Business', 'Academics']
  const experienceLevels = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const availabilities = ['All', 'Weekdays', 'Weekends', 'Evenings']

  // Filter peers
  const filteredUsers = users
    .filter(u => u.id !== currentUser.id)
    .filter(u => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const nameMatch = u.name.toLowerCase().includes(q)
        const collegeMatch = u.college.toLowerCase().includes(q)
        const teachMatch = u.teachSkills.some(s => s.name.toLowerCase().includes(q))
        const wantMatch = u.wantSkills.some(s => s.toLowerCase().includes(q))
        if (!nameMatch && !collegeMatch && !teachMatch && !wantMatch) return false
      }

      // Category
      if (selectedCategory !== 'All') {
        const hasCategory = u.teachSkills.some(s => s.category.toLowerCase() === selectedCategory.toLowerCase())
        if (!hasCategory) return false
      }

      // Experience Level
      if (selectedExperience !== 'All') {
        if (u.experienceLevel.toLowerCase() !== selectedExperience.toLowerCase()) return false
      }

      // Availability
      if (selectedAvailability !== 'All') {
        const hasAvail = u.availability.some(a => a.toLowerCase().includes(selectedAvailability.toLowerCase()))
        if (!hasAvail) return false
      }

      return true
    })

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setSelectedExperience('All')
    setSelectedAvailability('All')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-bold">
          <Compass size={14} className="text-teal-500" />
          <span>Peer Discovery Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Explore Student Skill Mentors
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Search hundreds of student profiles across India. Filter by skills offered, skills needed, or schedule compatibility.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
        {/* Search input */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by skill name (Canva, Python, React), college, or student name..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Category */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Skill Category:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl font-semibold border transition ${
                    selectedCategory === cat
                      ? 'bg-teal-500 text-slate-950 border-teal-500 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Experience Level:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {experienceLevels.map(exp => (
                <button
                  key={exp}
                  onClick={() => setSelectedExperience(exp)}
                  className={`px-3 py-1 rounded-xl font-semibold border transition ${
                    selectedExperience === exp
                      ? 'bg-teal-500 text-slate-950 border-teal-500 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Availability:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availabilities.map(av => (
                <button
                  key={av}
                  onClick={() => setSelectedAvailability(av)}
                  className={`px-3 py-1 rounded-xl font-semibold border transition ${
                    selectedAvailability === av
                      ? 'bg-teal-500 text-slate-950 border-teal-500 shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results summary and Reset */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>{filteredUsers.length}</strong> available peer exchange partners</span>
          {(searchQuery || selectedCategory !== 'All' || selectedExperience !== 'All' || selectedAvailability !== 'All') && (
            <button
              onClick={clearFilters}
              className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Results */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(peer => {
            const matchInfo = calculateReciprocalMatch(currentUser, peer)
            return (
              <div
                key={peer.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl hover:shadow-2xl hover:border-teal-500/50 transition flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shadow-md"
                      />
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                          {peer.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                          {peer.college}
                        </p>
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 mt-0.5">
                          <Star size={12} fill="currentColor" />
                          <span>{peer.rating}</span>
                          <span className="text-slate-400">({peer.reviewsCount} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 flex items-center gap-1">
                      <Sparkles size={11} className="text-teal-500" />
                      <span>{matchInfo.compatibilityScore}%</span>
                    </span>
                  </div>

                  {/* Skills Grid */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="p-2.5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/40">
                      <span className="text-[10px] uppercase font-bold text-teal-800 dark:text-teal-300 block mb-1">
                        Offers to Teach:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {peer.teachSkills.map(s => (
                          <span
                            key={s.name}
                            className="px-2 py-0.5 rounded-lg bg-teal-500 text-slate-950 font-bold text-[11px]"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/40">
                      <span className="text-[10px] uppercase font-bold text-cyan-800 dark:text-cyan-300 block mb-1">
                        Wants to Learn:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {peer.wantSkills.map(s => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-semibold text-[11px]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => openProfileModal(peer)}
                    className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => openBookingModal(peer)}
                    className="flex-1 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-1"
                  >
                    <span>Request</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Empty State with Skill Gap Bridge */
        <div className="space-y-6">
          <SkillGapBridge searchedSkill={searchQuery || 'Selected Filters'} />
        </div>
      )}
    </div>
  )
}
