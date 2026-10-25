import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  MessageSquare,
  AlertCircle
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'
import { SessionBooking } from '../types'

export const SessionsPage: React.FC = () => {
  const {
    sessions,
    acceptSession,
    rejectSession,
    rescheduleSession,
    cancelSession,
    completeSession,
  } = useSkillCircle()

  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'requested' | 'completed'>('all')
  const [rescheduleTarget, setRescheduleTarget] = useState<SessionBooking | null>(null)
  const [newDate, setNewDate] = useState('Tomorrow')
  const [newTime, setNewTime] = useState('6:00 PM')

  const filteredSessions = sessions.filter(s => {
    if (activeTab === 'confirmed') return s.status === 'confirmed'
    if (activeTab === 'requested') return s.status === 'requested'
    if (activeTab === 'completed') return s.status === 'completed'
    return true
  })

  const handleConfirmReschedule = () => {
    if (rescheduleTarget) {
      rescheduleSession(rescheduleTarget.id, newDate, newTime)
      setRescheduleTarget(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-bold">
          <Calendar size={14} className="text-teal-500" />
          <span>Session Schedule & History</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Reciprocal Sessions
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Track upcoming 1-on-1 calls, accept incoming exchange invites, or launch directly into your video room with whiteboard and notes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold w-fit">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'all'
              ? 'bg-teal-500 text-slate-950 shadow'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          All Sessions ({sessions.length})
        </button>
        <button
          onClick={() => setActiveTab('confirmed')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'confirmed'
              ? 'bg-teal-500 text-slate-950 shadow'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Upcoming / Confirmed
        </button>
        <button
          onClick={() => setActiveTab('requested')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'requested'
              ? 'bg-teal-500 text-slate-950 shadow'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Pending Requests
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'completed'
              ? 'bg-teal-500 text-slate-950 shadow'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Completed History
        </button>
      </div>

      {/* Sessions Grid */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <Calendar size={36} className="text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200">No sessions in this view</h3>
            <p className="text-xs text-slate-500">Go to Discover or AI Matches to request a new reciprocal exchange.</p>
          </div>
        ) : (
          filteredSessions.map(session => (
            <div
              key={session.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 transition hover:border-teal-500/40"
            >
              {/* Partner info and Skill details */}
              <div className="flex items-start gap-4">
                <img
                  src={session.partnerAvatar}
                  alt={session.partnerName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shadow-md shrink-0"
                />

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {session.partnerName}
                    </h3>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        session.status === 'confirmed'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : session.status === 'requested'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : session.status === 'completed'
                          ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30'
                          : 'bg-slate-500/10 text-slate-500'
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>

                  {/* Skills reciprocal description */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-500">Exchange:</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      Teach {session.skillTaught}
                    </span>
                    <span className="text-slate-400 font-bold">⇄</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">
                      Learn {session.skillReceived}
                    </span>
                  </div>

                  {/* Time and Duration */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar size={13} className="text-teal-500" />
                      <span>{session.date} at {session.time}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-amber-500" />
                      <span>{session.durationMinutes} mins ({session.creditsExchanged} Credits)</span>
                    </span>
                  </div>

                  {session.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                      "{session.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons based on status */}
              <div className="flex flex-wrap items-center gap-2 justify-end">
                {session.status === 'confirmed' && (
                  <>
                    <Link
                      to={`/video-room?partner=${session.partnerId}`}
                      className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <Video size={15} />
                      <span>Start Video Room</span>
                    </Link>

                    <button
                      onClick={() => completeSession(session.id)}
                      className="px-3.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-700 dark:text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition flex items-center gap-1"
                      title="Mark finished and release Time Credits"
                    >
                      <CheckCircle2 size={15} />
                      <span>Mark Complete</span>
                    </button>

                    <button
                      onClick={() => setRescheduleTarget(session)}
                      className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      Reschedule
                    </button>

                    <button
                      onClick={() => cancelSession(session.id)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {session.status === 'requested' && (
                  <>
                    <button
                      onClick={() => acceptSession(session.id)}
                      className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={15} />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => rejectSession(session.id)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-rose-500 transition"
                    >
                      Decline
                    </button>
                  </>
                )}

                {session.status === 'completed' && (
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      <span>Credits Awarded</span>
                    </span>
                    <Link
                      to={`/chat`}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Message partner"
                    >
                      <MessageSquare size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduleTarget && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Reschedule Session with {rescheduleTarget.partnerName}
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">New Day</label>
                <select
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">New Time</label>
                <select
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setRescheduleTarget(null)}
                className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="flex-1 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
