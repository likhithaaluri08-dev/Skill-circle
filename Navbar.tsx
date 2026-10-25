import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Users,
  Compass,
  Calendar,
  Wallet,
  MessageSquare,
  Award,
  BarChart3,
  Bell,
  Sun,
  Moon,
  Shield,
  Menu,
  X,
  User,
  ArrowRightLeft,
  Flame,
  CheckCircle2,
  Eye,
  Type
} from 'lucide-react'
import { useSkillCircle } from '../../context/SkillCircleContext'

export const Navbar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    currentUser,
    switchDemoUser,
    theme,
    toggleTheme,
    accessibility,
    toggleHighContrast,
    toggleLargeText,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    openEditProfile,
  } = useSkillCircle()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isA11yOpen, setIsA11yOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const unreadNotifs = notifications.filter(n => !n.isRead)

  const navLinks = [
    { to: '/matches', label: 'AI Matches', icon: Sparkles, highlight: true },
    { to: '/discover', label: 'Discover', icon: Compass },
    { to: '/roadmap', label: 'AI Roadmap', icon: Award },
    { to: '/pods', label: 'Learning Pods', icon: Users },
    { to: '/sessions', label: 'Sessions', icon: Calendar },
    { to: '/chat', label: 'Messages', icon: MessageSquare },
    { to: '/wallet', label: 'Credits', icon: Wallet },
    { to: '/impact', label: 'Impact', icon: BarChart3 },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-navy-900 via-teal-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition transform">
            <span className="font-extrabold text-lg tracking-tighter">SC</span>
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight text-navy-900 dark:text-white flex items-center gap-1.5 leading-none">
              <span>SkillCircle</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                P2P
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block leading-tight">
              Learn Without Money
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map(link => {
            const isActive = location.pathname === link.to
            const Icon = link.icon
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                } ${link.highlight && !isActive ? 'text-teal-600 dark:text-teal-400 font-bold' : ''}`}
              >
                <Icon size={15} />
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-2.5">
          {/* Credits Wallet Quick Pill */}
          <Link
            to="/wallet"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-bold transition hover:scale-105"
            title="Your Time Credits Wallet"
          >
            <Wallet size={14} className="text-amber-500" />
            <span>{currentUser.credits}</span>
            <span className="font-normal text-[10px] opacity-80">Credits</span>
          </Link>

          {/* Daily Streak */}
          <div
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 text-rose-700 dark:text-rose-300 text-xs font-bold"
            title="Daily Learning Streak"
          >
            <Flame size={14} className="text-rose-500 animate-bounce" />
            <span>{currentUser.streakDays}d Streak</span>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {/* Notifications Dropdown Drawer */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white">Notifications</h4>
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-slate-400 text-center py-4">No notifications yet.</p>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-2.5 rounded-xl border transition cursor-pointer ${
                          n.isRead
                            ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-500'
                            : 'bg-teal-50/60 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/50 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="font-semibold text-xs">{n.title}</div>
                        <div className="text-[11px] mt-0.5 leading-snug">{n.message}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{n.timestamp}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Accessibility Settings Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsA11yOpen(!isA11yOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Accessibility Settings"
            >
              <Eye size={18} />
            </button>

            {isA11yOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 text-xs space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white">Accessibility Options</h4>
                <div className="flex items-center justify-between">
                  <span>High Contrast Mode</span>
                  <input
                    type="checkbox"
                    checked={accessibility.highContrast}
                    onChange={toggleHighContrast}
                    className="accent-teal-500 w-4 h-4 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Large Text Mode</span>
                  <input
                    type="checkbox"
                    checked={accessibility.largeText}
                    onChange={toggleLargeText}
                    className="accent-teal-500 w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar / Demo Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-xl object-cover border border-teal-500/50 shadow-sm"
              />
              <span className="hidden lg:inline text-xs font-bold text-slate-800 dark:text-slate-200">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 text-xs space-y-2">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-slate-900 dark:text-white">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">@{currentUser.username}</div>
                  <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-1 font-semibold">
                    Teaches: {currentUser.teachSkills[0]?.name} • Wants: {currentUser.wantSkills[0]}
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition font-medium"
                >
                  <User size={15} />
                  <span>View Public Profile</span>
                </Link>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false)
                    openEditProfile()
                  }}
                  className="w-full text-left flex items-center gap-2 p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition font-medium"
                >
                  <Sparkles size={15} className="text-teal-500" />
                  <span>Edit Profile</span>
                </button>

                {/* 1-Click Demo Persona Switcher */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 px-1">
                    1-Click Demo Persona Switcher:
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        switchDemoUser('usr-ananya')
                        setIsUserMenuOpen(false)
                      }}
                      className={`w-full text-left p-2 rounded-xl text-[11px] flex items-center justify-between transition ${
                        currentUser.id === 'usr-ananya'
                          ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <span>Ananya (Canva ⇄ Python)</span>
                      {currentUser.id === 'usr-ananya' && <CheckCircle2 size={13} className="text-teal-500" />}
                    </button>

                    <button
                      onClick={() => {
                        switchDemoUser('usr-rahul')
                        setIsUserMenuOpen(false)
                      }}
                      className={`w-full text-left p-2 rounded-xl text-[11px] flex items-center justify-between transition ${
                        currentUser.id === 'usr-rahul'
                          ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <span>Rahul (Python ⇄ Canva)</span>
                      {currentUser.id === 'usr-rahul' && <CheckCircle2 size={13} className="text-teal-500" />}
                    </button>

                    <Link
                      to="/admin"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full text-left p-2 rounded-xl text-[11px] flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                    >
                      <Shield size={13} className="text-indigo-500" />
                      <span>Admin Panel</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden px-4 pt-2 pb-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <link.icon size={18} className="text-teal-500" />
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold px-2">
            <span>Current Credits:</span>
            <span className="text-amber-500 font-bold">{currentUser.credits} Time Credits</span>
          </div>
        </div>
      )}
    </header>
  )
}
