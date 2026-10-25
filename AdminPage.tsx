import React, { useState } from 'react'
import {
  Shield,
  Users,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Plus,
  Send,
  Search,
  BellRing
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'

export const AdminPage: React.FC = () => {
  const { users } = useSkillCircle()

  const [activeTab, setActiveTab] = useState<'users' | 'reports' | 'skills' | 'announcements'>('users')
  const [userList, setUserList] = useState(users)
  const [searchUser, setSearchUser] = useState('')

  // Featured skills manager
  const [featuredSkills, setFeaturedSkills] = useState<string[]>([
    'Python',
    'Canva',
    'React',
    'Figma',
    'Public Speaking',
    'Machine Learning',
  ])
  const [newSkill, setNewSkill] = useState('')

  // Demo Reports
  const [reports, setReports] = useState([
    {
      id: 'rep-1',
      reportedUser: 'Vikram Singh',
      reporter: 'Meera Iyer',
      reason: 'Audio connection was dropping repeatedly during 20m Python debug.',
      status: 'pending',
      date: 'Yesterday',
    },
    {
      id: 'rep-2',
      reportedUser: 'Anonymous Student',
      reporter: 'Rahul Verma',
      reason: 'No-show for booked Sunday session without prior notice.',
      status: 'pending',
      date: '3 days ago',
    },
  ])

  // Announcement state
  const [announcement, setAnnouncement] = useState('')
  const [publishedNotice, setPublishedNotice] = useState<string | null>(null)

  const toggleVerify = (userId: string) => {
    setUserList(prev =>
      prev.map(u => (u.id === userId ? { ...u, completedExchanges: u.completedExchanges + 1 } : u))
    )
  }

  const handleResolveReport = (reportId: string) => {
    setReports(prev => prev.filter(r => r.id !== reportId))
  }

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkill.trim() || featuredSkills.includes(newSkill.trim())) return
    setFeaturedSkills(prev => [...prev, newSkill.trim()])
    setNewSkill('')
  }

  const handleRemoveSkill = (skill: string) => {
    setFeaturedSkills(prev => prev.filter(s => s !== skill))
  }

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    if (!announcement.trim()) return
    setPublishedNotice(announcement.trim())
    setAnnouncement('')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 text-xs font-bold">
            <Shield size={14} className="text-indigo-500" />
            <span>Campus Trust & Operations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            SkillCircle Admin Panel
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Platform governance, user verification, dispute resolutions, and system-wide announcements.
          </p>
        </div>
      </div>

      {/* Published Notice Banner if any */}
      {publishedNotice && (
        <div className="p-4 rounded-2xl bg-teal-500 text-slate-950 font-bold text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <BellRing size={16} />
            <span>Active Broadcast: "{publishedNotice}"</span>
          </div>
          <button
            onClick={() => setPublishedNotice(null)}
            className="text-slate-950 hover:underline font-extrabold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold w-fit">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'users'
              ? 'bg-teal-500 text-slate-950 shadow'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          User Management ({userList.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'reports'
              ? 'bg-teal-500 text-slate-950 shadow'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Reports & Disputes ({reports.length})
        </button>
        <button
          onClick={() => setActiveTab('skills')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'skills'
              ? 'bg-teal-500 text-slate-950 shadow'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Featured Skills ({featuredSkills.length})
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'announcements'
              ? 'bg-teal-500 text-slate-950 shadow'
              : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          Campus Announcements
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Student Directory</h3>
            <div className="relative w-64">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchUser}
                onChange={e => setSearchUser(e.target.value)}
                placeholder="Search students..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500">
                <tr>
                  <th className="p-3 rounded-l-xl">Student</th>
                  <th className="p-3">College</th>
                  <th className="p-3">Teaches</th>
                  <th className="p-3">Credits</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {userList
                  .filter(u => u.name.toLowerCase().includes(searchUser.toLowerCase()))
                  .map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{user.name}</div>
                          <div className="text-[11px] text-slate-400">@{user.username}</div>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{user.college}</td>
                      <td className="p-3 font-semibold text-teal-600 dark:text-teal-400">
                        {user.teachSkills[0]?.name}
                      </td>
                      <td className="p-3 font-bold font-mono">{user.credits}</td>
                      <td className="p-3 text-amber-500 font-bold">{user.rating}★</td>
                      <td className="p-3">
                        <button
                          onClick={() => toggleVerify(user.id)}
                          className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-700 dark:text-teal-300 hover:bg-teal-500 hover:text-slate-950 font-bold text-[11px] transition"
                        >
                          Verify Badge
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Active Dispute Queue</h3>
          {reports.length === 0 ? (
            <p className="text-slate-400 text-xs py-8 text-center">No outstanding reports. All clear!</p>
          ) : (
            <div className="space-y-3">
              {reports.map(rep => (
                <div
                  key={rep.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white">
                      Reported: <span className="text-rose-500">{rep.reportedUser}</span> • By: {rep.reporter}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-snug">{rep.reason}</p>
                    <span className="text-[10px] text-slate-400">{rep.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleResolveReport(rep.id)}
                      className="px-3 py-1.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
                    >
                      Resolve & Dismiss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Featured Skills Tab */}
      {activeTab === 'skills' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Curate Featured Skills on Landing Page
          </h3>

          <form onSubmit={handleAddSkill} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              placeholder="Add skill tag (e.g. Next.js, Flutter)..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
            >
              Add
            </button>
          </form>

          <div className="flex flex-wrap gap-2">
            {featuredSkills.map(s => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-semibold"
              >
                <span>{s}</span>
                <button
                  onClick={() => handleRemoveSkill(s)}
                  className="hover:text-rose-500 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Broadcast System-Wide Announcement
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Notify all active students of upcoming exchange hackathons, server updates, or new pod cohorts.
          </p>

          <form onSubmit={handlePublishAnnouncement} className="space-y-3">
            <textarea
              rows={3}
              value={announcement}
              onChange={e => setAnnouncement(e.target.value)}
              placeholder="e.g. 🎉 National Peer Hackathon starts this Saturday! Earn double Time Credits for every exchange session."
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-black text-xs shadow-md flex items-center gap-2"
            >
              <Send size={14} />
              <span>Broadcast Notice</span>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
