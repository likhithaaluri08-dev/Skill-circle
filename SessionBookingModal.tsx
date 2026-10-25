import React, { useState } from 'react'
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import { UserProfile } from '../../types'
import { useSkillCircle } from '../../context/SkillCircleContext'

interface SessionBookingModalProps {
  partner: UserProfile | null
  onClose: () => void
}

export const SessionBookingModal: React.FC<SessionBookingModalProps> = ({ partner, onClose }) => {
  const { currentUser, bookSession } = useSkillCircle()

  const [skillTaught, setSkillTaught] = useState(
    partner?.wantSkills[0] || currentUser.teachSkills[0]?.name || 'Skill'
  )
  const [skillReceived, setSkillReceived] = useState(
    partner?.teachSkills[0]?.name || 'Skill'
  )
  const [date, setDate] = useState('Tomorrow')
  const [time, setTime] = useState('5:00 PM')
  const [duration, setDuration] = useState(45)
  const [notes, setNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!partner) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    bookSession(partner, skillTaught, skillReceived, date, time, duration, notes)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Book Reciprocal Exchange
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Zero Money • Time Credits Only (30 mins = 30 credits)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Session Scheduled!</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              You and {partner.name} are set for a reciprocal skill exchange on {date} at {time}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Visual Exchange Pair */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-11 h-11 rounded-xl object-cover border border-teal-500/40"
                />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">You Teach:</span>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{skillTaught}</div>
                </div>
              </div>

              <div className="p-2 rounded-full bg-teal-500/10 text-teal-500 font-bold">
                ⇄
              </div>

              <div className="flex items-center gap-3 text-right">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">You Learn:</span>
                  <div className="font-bold text-sm text-teal-600 dark:text-teal-400">{skillReceived}</div>
                </div>
                <img
                  src={partner.avatar}
                  alt={partner.name}
                  className="w-11 h-11 rounded-xl object-cover border border-teal-500/40"
                />
              </div>
            </div>

            {/* Select Skill to Teach & Learn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  What you will teach {partner.name.split(' ')[0]}
                </label>
                <select
                  value={skillTaught}
                  onChange={e => setSkillTaught(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {currentUser.teachSkills.map(s => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.level})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  What you want to learn from {partner.name.split(' ')[0]}
                </label>
                <select
                  value={skillReceived}
                  onChange={e => setSkillReceived(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {partner.teachSkills.map(s => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.level})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Day
                </label>
                <select
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="Today">Today (Instant Matching)</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="This Saturday">This Saturday</option>
                  <option value="This Sunday">This Sunday</option>
                  <option value="Next Monday">Next Monday</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Time
                </label>
                <select
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="11:00 AM">11:00 AM (Morning)</option>
                  <option value="2:00 PM">2:00 PM (Afternoon)</option>
                  <option value="4:00 PM">4:00 PM (Evening)</option>
                  <option value="6:00 PM">6:00 PM (Evening)</option>
                  <option value="8:00 PM">8:00 PM (Night)</option>
                </select>
              </div>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Session Duration & Learning Credits
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[30, 45, 60].map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDuration(mins)}
                    className={`py-2 px-3 rounded-xl border text-center transition ${
                      duration === mins
                        ? 'bg-teal-500 text-slate-950 font-bold border-teal-500 shadow-md'
                        : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs'
                    }`}
                  >
                    <span className="block font-bold">{mins} mins</span>
                    <span className="text-[10px] opacity-80">+{mins} Credits</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes / Agenda */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Agenda / Learning Goals
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. 20m Canva layouts, 25m Python data scraping basics"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Security footnote */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <ShieldCheck size={16} className="text-teal-500 shrink-0" />
              <span>SkillCircle peer sessions are strictly non-monetary. Credits transfer upon mutual completion.</span>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2"
              >
                <span>Confirm & Send Request</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
