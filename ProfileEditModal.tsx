import React, { useState, useRef } from 'react'
import {
  X,
  Upload,
  Check,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  Camera,
  Loader2,
  RotateCcw
} from 'lucide-react'
import { useSkillCircle } from '../../context/SkillCircleContext'
import { UserSkill, ExperienceLevel } from '../../types'

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateProfile } = useSkillCircle()

  // Form states initialized from currentUser
  const [name, setName] = useState(currentUser.name)
  const [username, setUsername] = useState(currentUser.username)
  const [bio, setBio] = useState(currentUser.bio)
  const [college, setCollege] = useState(currentUser.college)
  const [year, setYear] = useState(currentUser.year)
  const [avatar, setAvatar] = useState(currentUser.avatar)
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(currentUser.experienceLevel)
  const [teachSkills, setTeachSkills] = useState<UserSkill[]>([...currentUser.teachSkills])
  const [wantSkills, setWantSkills] = useState<string[]>([...currentUser.wantSkills])
  const [languages, setLanguages] = useState<string[]>([...currentUser.languages])
  const [availability, setAvailability] = useState<string[]>([...currentUser.availability])

  // New item inputs
  const [newTeachSkill, setNewTeachSkill] = useState('')
  const [newTeachCategory, setNewTeachCategory] = useState<UserSkill['category']>('Tech')
  const [newTeachLevel, setNewTeachLevel] = useState<ExperienceLevel>('Intermediate')
  const [newWantSkill, setNewWantSkill] = useState('')
  const [newLanguage, setNewLanguage] = useState('')

  // UI status
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  if (!isOpen) return null

  // Check if form is dirty
  const isDirty =
    name !== currentUser.name ||
    username !== currentUser.username ||
    bio !== currentUser.bio ||
    college !== currentUser.college ||
    year !== currentUser.year ||
    avatar !== currentUser.avatar ||
    experienceLevel !== currentUser.experienceLevel ||
    JSON.stringify(teachSkills) !== JSON.stringify(currentUser.teachSkills) ||
    JSON.stringify(wantSkills) !== JSON.stringify(currentUser.wantSkills)

  // Handle image upload from computer
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WebP).')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image file is too large (maximum 5MB).')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result)
        setError(null)
      }
    }
    reader.onerror = () => {
      setError('Failed to read image file. Please try another image.')
    }
    reader.readAsDataURL(file)
  }

  // Add / Remove Teach Skill
  const handleAddTeachSkill = () => {
    const trimmed = newTeachSkill.trim()
    if (!trimmed) return
    if (teachSkills.some(s => s.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('That skill is already in your teaching list.')
      return
    }
    setTeachSkills(prev => [...prev, { name: trimmed, category: newTeachCategory, level: newTeachLevel }])
    setNewTeachSkill('')
    setError(null)
  }

  const handleRemoveTeachSkill = (skillName: string) => {
    setTeachSkills(prev => prev.filter(s => s.name !== skillName))
  }

  // Add / Remove Want Skill
  const handleAddWantSkill = () => {
    const trimmed = newWantSkill.trim()
    if (!trimmed) return
    if (wantSkills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setError('That skill is already in your learning wishlist.')
      return
    }
    setWantSkills(prev => [...prev, trimmed])
    setNewWantSkill('')
    setError(null)
  }

  const handleRemoveWantSkill = (skillName: string) => {
    setWantSkills(prev => prev.filter(s => s !== skillName))
  }

  // Add / Remove Language
  const handleAddLanguage = () => {
    const trimmed = newLanguage.trim()
    if (!trimmed) return
    if (!languages.includes(trimmed)) {
      setLanguages(prev => [...prev, trimmed])
    }
    setNewLanguage('')
  }

  const handleRemoveLanguage = (lang: string) => {
    setLanguages(prev => prev.filter(l => l !== lang))
  }

  // Toggle availability chip
  const toggleAvailability = (day: string) => {
    if (availability.includes(day)) {
      setAvailability(prev => prev.filter(d => d !== day))
    } else {
      setAvailability(prev => [...prev, day])
    }
  }

  // Save changes handler with validation
  const handleSave = () => {
    setError(null)

    // Validations
    if (!name.trim()) {
      setError('Full Name is required.')
      return
    }
    if (!college.trim()) {
      setError('College / Institution name is required.')
      return
    }
    if (teachSkills.length === 0) {
      setError('Please provide at least one skill you can teach.')
      return
    }
    if (wantSkills.length === 0) {
      setError('Please provide at least one skill you want to learn.')
      return
    }

    setIsSaving(true)

    setTimeout(() => {
      updateProfile({
        name: name.trim(),
        username: username.trim() || name.toLowerCase().replace(/\s+/g, '_'),
        bio: bio.trim(),
        college: college.trim(),
        year: year.trim(),
        avatar,
        experienceLevel,
        teachSkills,
        wantSkills,
        languages,
        availability,
      })

      setIsSaving(false)
      setSuccess(true)

      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 800)
    }, 400)
  }

  // Handle Cancel with dirty check
  const handleCancel = () => {
    if (isDirty) {
      setShowDiscardConfirm(true)
    } else {
      onClose()
    }
  }

  const confirmDiscard = () => {
    setShowDiscardConfirm(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Edit Student Profile</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update your reciprocal skills, availability, and learning preferences
              </p>
            </div>
          </div>

          <button
            onClick={handleCancel}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Error & Success alerts */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-2">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm flex items-center gap-2">
              <Check size={18} className="shrink-0" />
              <span>Profile updated successfully! Saved to persistent storage.</span>
            </div>
          )}

          {/* Avatar Upload Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <div className="relative group">
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-teal-500/60 shadow-md"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-slate-950/60 rounded-2xl opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white text-xs font-medium gap-1"
                title="Change profile picture"
              >
                <Camera size={20} />
                <span>Upload</span>
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Profile Photo</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Upload a clear picture so your peer exchange partners recognize you in video sessions.
              </p>
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium text-xs transition shadow flex items-center gap-1.5"
                >
                  <Upload size={14} />
                  <span>Choose Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setAvatar(
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
                    )
                  }
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Reset Default
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Ananya Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. ananya_design"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                College / University *
              </label>
              <input
                type="text"
                value={college}
                onChange={e => setCollege(e.target.value)}
                placeholder="e.g. National Institute of Design"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Year
              </label>
              <select
                value={year}
                onChange={e => setYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Recent Graduate">Recent Graduate</option>
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              About Me / Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell other students what you teach best and what you're excited to learn..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          {/* Skills I Can Teach */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Skills I Can Teach (Offers) *
              </label>
              <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                Used for reciprocal AI matching
              </span>
            </div>

            {/* List of currently taught skills */}
            <div className="flex flex-wrap gap-2">
              {teachSkills.map(s => (
                <span
                  key={s.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-medium"
                >
                  <span>{s.name}</span>
                  <span className="text-[10px] opacity-70">({s.level})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTeachSkill(s.name)}
                    className="hover:text-rose-500 ml-0.5"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            {/* Add new teach skill */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                value={newTeachSkill}
                onChange={e => setNewTeachSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTeachSkill())}
                placeholder="Add skill (e.g. Canva, Figma, SQL)..."
                className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <select
                value={newTeachLevel}
                onChange={e => setNewTeachLevel(e.target.value as ExperienceLevel)}
                className="px-2.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                type="button"
                onClick={handleAddTeachSkill}
                className="px-3 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium text-xs transition flex items-center justify-center gap-1"
              >
                <Plus size={14} /> Add Skill
              </button>
            </div>
          </div>

          {/* Skills I Want to Learn */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Skills I Want to Learn (Wishlist) *
              </label>
              <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
                Partners who teach these will match with you
              </span>
            </div>

            {/* List of currently wanted skills */}
            <div className="flex flex-wrap gap-2">
              {wantSkills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-medium"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveWantSkill(skill)}
                    className="hover:text-rose-500 ml-0.5"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            {/* Add new want skill */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newWantSkill}
                onChange={e => setNewWantSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddWantSkill())}
                placeholder="Add wishlist skill (e.g. Python, React, Public Speaking)..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddWantSkill}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs transition flex items-center gap-1"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Weekly Availability
            </label>
            <div className="flex flex-wrap gap-2">
              {['Weekdays', 'Weekends', 'Mornings', 'Afternoons', 'Evenings'].map(slot => {
                const isSelected = availability.includes(slot)
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggleAvailability(slot)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                      isSelected
                        ? 'bg-teal-500 text-white border-teal-500 shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {slot} {isSelected && '✓'}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {isDirty && (
              <span className="text-xs text-amber-500 font-medium hidden sm:inline">
                Unsaved modifications
              </span>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-sm shadow-md transition flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Discard Confirmation Alert */}
        {showDiscardConfirm && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
                <RotateCcw size={24} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Discard Unsaved Changes?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You have modifications that haven't been saved yet. Are you sure you want to discard them?
              </p>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setShowDiscardConfirm(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Keep Editing
                </button>
                <button
                  onClick={confirmDiscard}
                  className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
