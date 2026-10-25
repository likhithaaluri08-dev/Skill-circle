import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  Star,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  Layers,
  Award,
  Zap,
  BookOpen
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { users, openBookingModal } = useSkillCircle()

  // Animated counters
  const [counts, setCounts] = useState({
    students: 14250,
    skills: 520,
    hours: 92400,
    exchanges: 21300,
  })

  // Testimonials Carousel
  const testimonials = [
    {
      name: 'Ananya Sharma',
      role: 'Design Student @ NID',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      teaches: 'Canva & UI Design',
      learns: 'Python Programming',
      quote:
        'I saved ₹18,000 on bootcamps! Instead of watching recorded videos, Rahul and I swapped Canva tips for Python script reviews twice a week. The reciprocal model is revolutionary.',
      rating: 5,
    },
    {
      name: 'Rahul Verma',
      role: 'CS Undergrad @ IIT Delhi',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
      teaches: 'Python & Django',
      learns: 'Canva & Brand Design',
      quote:
        'Coding algorithms is second nature to me, but design felt impossible. Ananya broke down typography and layout in 45 minutes. My GitHub projects now look like venture-backed startups.',
      rating: 5,
    },
    {
      name: 'Rohan Mehta',
      role: 'Full Stack Dev @ BITS Pilani',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      teaches: 'React & Tailwind',
      learns: 'Public Speaking',
      quote:
        'The Time Credit system makes peer learning completely fair. No money changes hands, yet everyone shows up prepared because mutual commitment is at the heart of each session.',
      rating: 5,
    },
  ]

  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0)

  // Popular skills list
  const popularSkills = [
    { name: 'Python', category: 'Tech', icon: '🐍', students: '3.4k students', color: 'from-amber-500/20 to-teal-500/20' },
    { name: 'Canva', category: 'Design', icon: '🎨', students: '2.8k students', color: 'from-teal-500/20 to-cyan-500/20' },
    { name: 'React', category: 'Tech', icon: '⚛️', students: '2.1k students', color: 'from-cyan-500/20 to-blue-500/20' },
    { name: 'Public Speaking', category: 'Languages', icon: '🎙️', students: '1.9k students', color: 'from-rose-500/20 to-amber-500/20' },
    { name: 'Machine Learning', category: 'Tech', icon: '🤖', students: '2.5k students', color: 'from-purple-500/20 to-teal-500/20' },
    { name: 'Figma', category: 'Design', icon: '📐', students: '2.3k students', color: 'from-emerald-500/20 to-cyan-500/20' },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonialIdx(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIdx(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Soft decorative background gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-teal-500/20 via-cyan-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-extrabold shadow-sm animate-pulse">
              <Sparkles size={14} className="text-teal-500" />
              <span>AI-Powered Reciprocal Skill Exchange</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-navy-900 dark:text-white leading-[1.08]">
              Learn Without Money. <br />
              <span className="bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-600 bg-clip-text text-transparent">
                Grow Together.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Exchange skills instead of paying for courses. Teach what you already know, learn what you need, and build verified capabilities in real-time peer video rooms.
            </p>

            {/* CTA Buttons (Both working!) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/matches"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-base shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition flex items-center justify-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/discover"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold text-base shadow-md transition flex items-center justify-center gap-2"
              >
                <Compass size={18} className="text-teal-500" />
                <span>Explore Skills</span>
              </Link>
            </div>

            {/* Trust badge */}
            <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-teal-500" /> 100% Zero Fees
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-teal-500" /> Time Credit Ledger
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-teal-500" /> Real-time Video & Canvas
              </span>
            </div>
          </div>

          {/* HERO INTERACTIVE SHOWCASE CARD (Reciprocal Exchange in action) */}
          <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="text-center mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 dark:text-teal-400">
                Live Reciprocal AI Matching Example
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                Ananya Sharma ⇄ Rahul Verma
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Ananya Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                    alt="Ananya Sharma"
                    className="w-12 h-12 rounded-xl object-cover border-2 border-teal-500"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Ananya Sharma</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">National Institute of Design</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Teaches:</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">Canva & UI Design</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Wants:</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">Python Programming</span>
                  </div>
                </div>
              </div>

              {/* Center Match Bridge */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500 text-slate-950 text-xs font-black shadow-md animate-pulse">
                  <Sparkles size={13} />
                  <span>96% AI Match</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  Both need what the other knows.<br />
                  <strong className="text-teal-600 dark:text-teal-400">Reciprocal Exchange Plan Created</strong>
                </div>
                <Link
                  to="/video-room?partner=usr-rahul"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 dark:bg-teal-500 text-white dark:text-slate-950 font-bold text-xs hover:scale-105 transition shadow"
                >
                  <span>Launch Demo Room</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Rahul Card */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600"
                    alt="Rahul Verma"
                    className="w-12 h-12 rounded-xl object-cover border-2 border-teal-500"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Rahul Verma</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">IIT Delhi</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Teaches:</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">Python & Data</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Wants:</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">Canva & Visual Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ANIMATED COUNTERS */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <Users size={24} className="text-teal-500 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {counts.students.toLocaleString()}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Students Joined</div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <Layers size={24} className="text-cyan-500 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {counts.skills.toLocaleString()}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Skills Shared</div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <Clock size={24} className="text-amber-500 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {counts.hours.toLocaleString()}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Learning Hours</div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
              <Award size={24} className="text-emerald-500 mx-auto mb-2" />
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {counts.exchanges.toLocaleString()}+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Successful Exchanges</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (3 Animated Steps) */}
      <section className="py-20 bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 dark:text-teal-400">
              Simple 3-Step Exchange
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              How SkillCircle Works
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              No subscription paywalls. Learn anything by exchanging the expertise you already have.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 relative group hover:border-teal-500 transition shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-lg mb-6 group-hover:scale-110 transition">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Share Your Skills
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Add the skills you are confident teaching (Canva, Python, Web Dev, French) and list what you want to learn.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 relative group hover:border-teal-500 transition shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black text-lg mb-6 group-hover:scale-110 transition">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Find Your Perfect Partner
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Our Reciprocal AI algorithm pairs you with students who want what you teach and teach what you need.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 relative group hover:border-teal-500 transition shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg mb-6 group-hover:scale-110 transition">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Exchange Knowledge
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Jump into the encrypted live video room with synchronized whiteboard and notes. Earn 30 credits for every 30 mins!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR SKILLS SECTION (Clickable cards) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 dark:text-teal-400">
                Trending on Campus
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
                Popular Skills in Demand
              </h2>
            </div>
            <Link
              to="/discover"
              className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              <span>View all 500+ skills</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularSkills.map(s => (
              <div
                key={s.name}
                onClick={() => navigate(`/discover?search=${encodeURIComponent(s.name)}`)}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:shadow-xl transition cursor-pointer text-center space-y-2 group"
              >
                <div className="text-3xl mb-1 group-hover:scale-125 transition transform">
                  {s.icon}
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{s.name}</h4>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{s.students}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-400">
            Student Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black">
            Loved by 14,000+ Students Nationwide
          </h2>

          <div className="p-8 sm:p-12 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-2xl relative">
            <div className="flex justify-center mb-4 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            <p className="text-base sm:text-xl text-slate-200 italic leading-relaxed mb-6 font-normal">
              "{testimonials[currentTestimonialIdx].quote}"
            </p>

            <div className="flex items-center justify-center gap-3">
              <img
                src={testimonials[currentTestimonialIdx].avatar}
                alt={testimonials[currentTestimonialIdx].name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-teal-400"
              />
              <div className="text-left">
                <div className="font-bold text-sm text-white">
                  {testimonials[currentTestimonialIdx].name}
                </div>
                <div className="text-xs text-teal-300">
                  {testimonials[currentTestimonialIdx].role}
                </div>
              </div>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
                title="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs text-slate-400 font-mono">
                {currentTestimonialIdx + 1} / {testimonials.length}
              </span>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
                title="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Ready to swap skills without spending money?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Join Ananya, Rahul, and thousands of students expanding their careers through reciprocal peer learning today.
          </p>
          <div className="pt-2">
            <Link
              to="/matches"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-base shadow-xl transition hover:scale-105"
            >
              <span>Explore My Reciprocal Matches</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
