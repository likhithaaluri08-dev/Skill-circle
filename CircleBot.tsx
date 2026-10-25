import React, { useState } from 'react'
import {
  Bot,
  X,
  Send,
  Sparkles,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Zap
} from 'lucide-react'
import { useSkillCircle } from '../../context/SkillCircleContext'

export const CircleBot: React.FC = () => {
  const { currentUser } = useSkillCircle()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    {
      role: 'bot',
      text: `Hey ${currentUser.name.split(' ')[0]}! I'm CircleBot, your AI skill exchange advisor. How can I assist your reciprocal learning today?`,
    },
  ])
  const [input, setInput] = useState('')

  const quickPrompts = [
    'How does reciprocal matching work?',
    'How do I earn time credits?',
    'Who is my best Python partner?',
    'What are Learning Pods?',
  ]

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input
    if (!q.trim()) return

    const userMsg = q.trim()
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    if (!textToSend) setInput('')

    // Generate intelligent contextual response
    setTimeout(() => {
      let botResponse = ''
      const lower = userMsg.toLowerCase()

      if (lower.includes('match') || lower.includes('reciprocal')) {
        botResponse = `Reciprocal AI matching finds someone whose teaching and learning needs complement yours! For example, you teach ${currentUser.teachSkills[0]?.name} and want ${currentUser.wantSkills[0] || 'Python'}. Our algorithm pairs you with Rahul Verma who teaches Python and wants ${currentUser.teachSkills[0]?.name}! Both teach, both learn, zero money.`
      } else if (lower.includes('credit') || lower.includes('money') || lower.includes('cost')) {
        botResponse = `SkillCircle is 100% money-free. Every 30 minutes you spend teaching a peer awards you 30 Time Credits in your wallet. You can spend those credits anytime to learn from other mentors!`
      } else if (lower.includes('partner') || lower.includes('python') || lower.includes('who')) {
        botResponse = `Based on your profile, your highest compatibility match is Rahul Verma (96% match)! He is available on Weekends and Evenings just like you, and has a 4.8★ mentor rating.`
      } else if (lower.includes('pod') || lower.includes('cohort')) {
        botResponse = `Learning Pods are small cohorts of 3-5 students who meet weekly to tackle a shared goal together (e.g. "Frontend Beginners Circle" or "Python Data Crunchers"). Joining a pod keeps your learning streak high!`
      } else {
        botResponse = `Great question! In SkillCircle, peer collaboration is the fastest way to accelerate your career. Check out the Discover tab to explore partners, or open the AI Learning Roadmap to generate custom milestones for your goal!`
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }])
    }, 700)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Bot Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[460px] animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-navy-900 to-teal-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center font-bold">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  <span>CircleBot AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[11px] text-teal-200">Peer Exchange Advisor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={13} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700/60'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="pt-2 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Suggested Questions:
                </span>
                <div className="flex flex-col gap-1.5">
                  {quickPrompts.map(qp => (
                    <button
                      key={qp}
                      onClick={() => handleSend(qp)}
                      className="text-left p-2 rounded-xl bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/40 border border-teal-200 dark:border-teal-800/40 text-teal-800 dark:text-teal-300 text-[11px] font-medium transition"
                    >
                      {qp}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask CircleBot anything..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 transition shadow"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-navy-900 dark:bg-teal-500 text-white dark:text-slate-950 shadow-2xl hover:scale-105 active:scale-95 transition border-2 border-teal-400 group"
      >
        <div className="relative">
          <Bot size={20} className="text-teal-400 dark:text-slate-950" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-navy-900 dark:border-teal-500" />
        </div>
        <span className="font-bold text-sm tracking-wide">CircleBot AI</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 dark:bg-black/20 text-teal-300 dark:text-slate-900 font-semibold">
          Ask
        </span>
      </button>
    </div>
  )
}
