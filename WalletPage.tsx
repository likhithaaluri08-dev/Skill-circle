import React, { useState } from 'react'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'

export const WalletPage: React.FC = () => {
  const { currentUser, transactions } = useSkillCircle()
  const [filterType, setFilterType] = useState<'all' | 'earned' | 'spent'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const totalEarned = transactions
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalSpent = transactions
    .filter(t => t.type === 'spent')
    .reduce((sum, t) => sum + t.amount, 0)

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const descMatch = t.description.toLowerCase().includes(q)
      const partnerMatch = t.partnerName?.toLowerCase().includes(q)
      if (!descMatch && !partnerMatch) return false
    }
    return true
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold">
          <Wallet size={14} className="text-amber-500" />
          <span>Non-Monetary Economy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Time Credit Wallet
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          SkillCircle operates on a strictly non-monetary learning economy. Teach a peer for 30 minutes, earn 30 Time Credits. Spend those credits anytime to receive 1-on-1 coaching.
        </p>
      </div>

      {/* Main Balance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Balance Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-navy-950 via-slate-900 to-teal-950 text-white border border-teal-500/40 shadow-2xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-300">
              Available Balance
            </span>
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
              <Sparkles size={18} />
            </div>
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-black text-teal-300 font-mono">
              {currentUser.credits}
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              Time Credits (= {(currentUser.credits / 60).toFixed(1)} Hours of 1-on-1 Learning)
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-teal-200">
            <ShieldCheck size={16} />
            <span>Encrypted Ledger Verified</span>
          </div>
        </div>

        {/* Total Earned Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Total Credits Earned</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <ArrowDownLeft size={16} />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            +{totalEarned}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Earned by teaching {currentUser.teachSkills[0]?.name || 'Skills'} to campus peers.
          </p>
        </div>

        {/* Total Spent Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Total Credits Redeemed</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
            -{totalSpent}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Redeemed for personalized mentorship in {currentUser.wantSkills[0] || 'New Skills'}.
          </p>
        </div>
      </div>

      {/* Rules Explainer Banner */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              The Golden Rule: 30 Mins Teaching = 30 Credits
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              All students have equal value. Whether you teach Canva or Machine Learning, 1 minute of your time equals 1 credit.
            </p>
          </div>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-teal-600 dark:text-teal-400 font-bold self-start sm:self-auto">
          Zero Commission
        </span>
      </div>

      {/* Transactions History Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Credit Transaction History
          </h3>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filterType === 'all'
                  ? 'bg-teal-500 text-slate-950'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('earned')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filterType === 'earned'
                  ? 'bg-teal-500 text-slate-950'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Earned Only
            </button>
            <button
              onClick={() => setFilterType('spent')}
              className={`px-3 py-1.5 rounded-xl transition ${
                filterType === 'spent'
                  ? 'bg-teal-500 text-slate-950'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Spent Only
            </button>
          </div>
        </div>

        {/* Transactions list */}
        <div className="space-y-3">
          {filteredTransactions.map(tx => (
            <div
              key={tx.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    tx.type === 'earned'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                  }`}
                >
                  {tx.type === 'earned' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                    {tx.description}
                  </h4>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {tx.date} {tx.partnerName && `• Partner: ${tx.partnerName}`}
                  </div>
                </div>
              </div>

              <div
                className={`font-black font-mono text-sm sm:text-base ${
                  tx.type === 'earned'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-cyan-600 dark:text-cyan-400'
                }`}
              >
                {tx.type === 'earned' ? `+${tx.amount}` : `-${tx.amount}`} Credits
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
