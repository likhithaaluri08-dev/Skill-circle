import React from 'react'
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'

export const ImpactDashboardPage: React.FC = () => {
  // Monthly growth data
  const monthlyData = [
    { month: 'May', exchanges: 1200, hours: 2400 },
    { month: 'Jun', exchanges: 2800, hours: 5600 },
    { month: 'Jul', exchanges: 5400, hours: 11200 },
    { month: 'Aug', exchanges: 9800, hours: 21500 },
    { month: 'Sep', exchanges: 15400, hours: 38900 },
    { month: 'Oct', exchanges: 21300, hours: 92400 },
  ]

  // Top skills volume
  const topSkillsData = [
    { skill: 'Python', hours: 28400, color: '#00C2A8' },
    { skill: 'Canva', hours: 22100, color: '#38BDF8' },
    { skill: 'React', hours: 18900, color: '#6366F1' },
    { skill: 'Figma', hours: 16200, color: '#F59E0B' },
    { skill: 'ML / AI', hours: 14800, color: '#EC4899' },
    { skill: 'Public Speaking', hours: 11500, color: '#10B981' },
  ]

  // Category breakdown
  const categoryData = [
    { name: 'Tech & Code', value: 42, color: '#00C2A8' },
    { name: 'Design & UI', value: 26, color: '#38BDF8' },
    { name: 'Data & AI', value: 16, color: '#6366F1' },
    { name: 'Languages', value: 10, color: '#F59E0B' },
    { name: 'Business', value: 6, color: '#EC4899' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30 text-xs font-bold">
          <BarChart3 size={14} className="text-teal-500" />
          <span>Macro Campus Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Community Impact Dashboard
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Real-time metrics measuring the nationwide impact of zero-fee student skill exchanges, saved tuition costs, and verified learning hours.
        </p>
      </div>

      {/* Top 4 Impact Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Total Exchanges</span>
            <Sparkles size={16} className="text-teal-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
            21,300+
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <ArrowUpRight size={13} />
            <span>+38% this month</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Verified Learning Hours</span>
            <Clock size={16} className="text-cyan-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400 font-mono">
            92,400+
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
            <ArrowUpRight size={13} />
            <span>Peer verified 1-on-1</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Skills Exchanged</span>
            <Layers size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
            520+
          </div>
          <div className="text-[11px] text-slate-400">Across 6 major domains</div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Tuition Money Saved</span>
            <ShieldCheck size={16} className="text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            ₹1.84 Cr
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">Zero Rupees Charged</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left AreaChart: Monthly Exchanges Growth */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                Cumulative Learning Hours & Exchanges
              </h3>
              <p className="text-xs text-slate-500">Rapid student adoption across 80+ universities</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              Exponential Curve
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorExchanges" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C2A8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00C2A8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#00C2A8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorExchanges)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Donut Chart: Skill Category Share */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-black text-base text-slate-900 dark:text-white">
              Category Distribution
            </h3>
            <p className="text-xs text-slate-500">Share of student skills requested</p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-slate-400">Top Domain</span>
              <span className="text-base font-black text-teal-500">Tech 42%</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            {categoryData.map(c => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{c.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BarChart: Top Skills by Total Hours Shared */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <h3 className="font-black text-base text-slate-900 dark:text-white">
          Most Popular Skills by Peer Teaching Hours
        </h3>
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topSkillsData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="skill" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="hours" fill="#00C2A8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
