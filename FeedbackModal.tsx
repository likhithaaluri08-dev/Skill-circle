import React, { useState } from 'react'
import {
  X,
  Star,
  Sparkles,
  Award,
  ThumbsUp,
  CheckCircle2
} from 'lucide-react'
import { SessionBooking } from '../../types'
import { useSkillCircle } from '../../context/SkillCircleContext'

interface FeedbackModalProps {
  session: SessionBooking | null
  onClose: () => void
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ session, onClose }) => {
  const { submitFeedback } = useSkillCircle()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [confidenceGain, setConfidenceGain] = useState(4)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!session) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    submitFeedback(session.id, rating, comment.trim() || 'Great reciprocal exchange session! Highly recommend.', confidenceGain)
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <h2 className="font-bold text-base">Exchange Completed! 🎉</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-900 hover:bg-black/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="text-center space-y-1">
            <img
              src={session.partnerAvatar}
              alt={session.partnerName}
              className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-teal-500 shadow-md mb-2"
            />
            <h3 className="font-bold text-slate-900 dark:text-white">
              Rate your exchange with {session.partnerName}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You taught <strong className="text-teal-600 dark:text-teal-400">{session.skillTaught}</strong> and learned <strong className="text-cyan-600 dark:text-cyan-400">{session.skillReceived}</strong>.
            </p>
          </div>

          {/* Star Rating */}
          <div className="space-y-1.5 text-center">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Overall Experience Rating
            </label>
            <div className="flex justify-center gap-2 pt-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-amber-400 hover:scale-125 transition"
                >
                  <Star
                    size={28}
                    fill={star <= rating ? 'currentColor' : 'none'}
                    className={star <= rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Skill Confidence Gain Slider */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Skill Confidence Gain:
              </span>
              <span className="font-bold text-teal-600 dark:text-teal-400 text-sm">
                +{confidenceGain} Levels Boost
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              value={confidenceGain}
              onChange={e => setConfidenceGain(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>Slight Boost</span>
              <span>Solid Progress</span>
              <span>Mastery Leap!</span>
            </div>
          </div>

          {/* Written Feedback */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Written Feedback (Appears on their public profile)
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="What made this peer exchange helpful? Share specific tips they gave you..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} />
            <span>Submit Feedback & Claim Credits</span>
          </button>
        </form>
      </div>
    </div>
  )
}
