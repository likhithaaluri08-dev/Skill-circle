import React from 'react'
import {
  Compass,
  Sparkles,
  ArrowRight,
  BookOpen,
  Users,
  Lightbulb,
  CheckCircle2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSkillCircle } from '../../context/SkillCircleContext'

interface SkillGapBridgeProps {
  searchedSkill?: string
}

export const SkillGapBridge: React.FC<SkillGapBridgeProps> = ({ searchedSkill = 'Advanced Quantum Computing' }) => {
  const { users, openBookingModal } = useSkillCircle()

  // Suggest complementary partners
  const alternativeMentors = users.slice(1, 4)

  return (
    <div className="rounded-3xl bg-gradient-to-br from-navy-950 via-slate-900 to-teal-950 text-white p-8 border border-teal-500/30 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center font-bold">
            <Compass size={24} className="animate-spin text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold uppercase tracking-wider">
                Skill Gap Bridge Active
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              "You're one step away."
            </h3>
          </div>
        </div>

        <Link
          to="/roadmap"
          className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs transition shadow flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles size={14} />
          <span>Generate Learning Path</span>
        </Link>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
        While there isn't a direct 1-to-1 match for <strong className="text-teal-300">"{searchedSkill}"</strong> this minute, SkillCircle has identified 3 bridge paths to get you to your goal through foundational peer exchanges.
      </p>

      {/* Suggested 3 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h4 className="font-bold text-sm text-white">Master Prerequisite Skills</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Exchange your Canva or UI design skills for Python or Applied Statistics to unlock higher-tier comprehension.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h4 className="font-bold text-sm text-white">Join a Specialized Pod</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Hop into a 4-person learning circle where students share documentation, papers, and code reviews weekly.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h4 className="font-bold text-sm text-white">Multi-Hop Exchange</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Teach student A to earn 60 Time Credits, then spend those credits booking high-level sessions with student B.
          </p>
        </div>
      </div>

      {/* Recommended Bridging Mentors */}
      <div className="pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Available Bridge Partners Ready to Connect:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {alternativeMentors.map(peer => (
            <div
              key={peer.id}
              className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={peer.avatar}
                  alt={peer.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <div className="font-bold text-white">{peer.name}</div>
                  <div className="text-[11px] text-teal-400">Teaches: {peer.teachSkills[0]?.name}</div>
                </div>
              </div>
              <button
                onClick={() => openBookingModal(peer)}
                className="px-2.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[11px] transition shadow"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
