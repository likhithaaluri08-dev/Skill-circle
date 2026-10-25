import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  UserProfile,
  SessionBooking,
  CreditTransaction,
  LearningPod,
  RoadmapStep,
  NotificationItem,
  ChatMessage,
} from '../types'
import {
  ANANYA_PROFILE,
  RAHUL_PROFILE,
  SEED_USERS,
  INITIAL_PODS,
  INITIAL_ROADMAP,
  INITIAL_TRANSACTIONS,
  INITIAL_SESSIONS,
} from '../data/initialData'
import { fireConfetti } from '../utils/confetti'

interface SkillCircleContextType {
  currentUser: UserProfile
  users: UserProfile[]
  sessions: SessionBooking[]
  transactions: CreditTransaction[]
  learningPods: LearningPod[]
  roadmap: RoadmapStep[]
  notes: string
  notesFontSize: number
  theme: 'light' | 'dark'
  accessibility: { highContrast: boolean; largeText: boolean }
  notifications: NotificationItem[]
  chatMessages: Record<string, ChatMessage[]>
  activeBookingPartner: UserProfile | null
  activeProfileModal: UserProfile | null
  isEditProfileOpen: boolean
  isNotesExpanded: boolean
  feedbackModalSession: SessionBooking | null
  // Actions
  switchDemoUser: (userId: string) => void
  updateProfile: (updatedData: Partial<UserProfile>) => boolean
  bookSession: (partner: UserProfile, skillTaught: string, skillReceived: string, date: string, time: string, durationMinutes: number, notes?: string) => void
  acceptSession: (sessionId: string) => void
  rejectSession: (sessionId: string) => void
  rescheduleSession: (sessionId: string, newDate: string, newTime: string) => void
  cancelSession: (sessionId: string) => void
  completeSession: (sessionId: string) => void
  submitFeedback: (sessionId: string, rating: number, comment: string, skillConfidenceGain: number) => void
  joinPod: (podId: string) => void
  leavePod: (podId: string) => void
  toggleRoadmapStep: (stepId: string) => void
  generateCustomRoadmap: (goal: string) => void
  saveNotes: (content: string) => void
  adjustNotesFontSize: (delta: number) => void
  setIsNotesExpanded: (val: boolean) => void
  sendChatMessage: (partnerId: string, text: string, attachment?: ChatMessage['attachment']) => void
  markNotificationAsRead: (id: string) => void
  clearAllNotifications: () => void
  toggleTheme: () => void
  toggleHighContrast: () => void
  toggleLargeText: () => void
  openBookingModal: (partner: UserProfile) => void
  closeBookingModal: () => void
  openProfileModal: (user: UserProfile) => void
  closeProfileModal: () => void
  openEditProfile: () => void
  closeEditProfile: () => void
  setFeedbackModalSession: (session: SessionBooking | null) => void
}

const SkillCircleContext = createContext<SkillCircleContextType | undefined>(undefined)

const STORAGE_KEYS = {
  USER: 'skillcircle_currentUser_v2',
  USERS: 'skillcircle_allUsers_v2',
  SESSIONS: 'skillcircle_sessions_v2',
  TX: 'skillcircle_transactions_v2',
  PODS: 'skillcircle_pods_v2',
  ROADMAP: 'skillcircle_roadmap_v2',
  NOTES: 'skillcircle_notes_v2',
  NOTES_FONT_SIZE: 'skillcircle_notes_fs_v2',
  THEME: 'skillcircle_theme_v2',
  A11Y: 'skillcircle_a11y_v2',
  NOTIFS: 'skillcircle_notifs_v2',
  CHATS: 'skillcircle_chats_v2',
}

export const SkillCircleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Current user
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS)
    return saved ? JSON.parse(saved) : SEED_USERS
  })

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER)
    if (saved) return JSON.parse(saved)
    return ANANYA_PROFILE
  })

  // 2. Sessions
  const [sessions, setSessions] = useState<SessionBooking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS)
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS
  })

  // 3. Transactions
  const [transactions, setTransactions] = useState<CreditTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TX)
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS
  })

  // 4. Learning Pods
  const [learningPods, setLearningPods] = useState<LearningPod[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PODS)
    return saved ? JSON.parse(saved) : INITIAL_PODS
  })

  // 5. Roadmap
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROADMAP)
    return saved ? JSON.parse(saved) : INITIAL_ROADMAP
  })

  // 6. Notes
  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.NOTES) || 
      '## Peer Exchange Notes: Canva & Python\n\n' +
      '### Key Learnings (Canva):\n' +
      '- Grid ratio: Use 8pt alignment for typography hierarchies.\n' +
      '- Color harmony: Complementary teal (#00C2A8) with dark navy contrast (#0B1F3A).\n' +
      '- Visual balance: Negative space guides user focus naturally.\n\n' +
      '### Python Concepts Discussed:\n' +
      '1. Variables & Types: Strings, ints, and lists.\n' +
      '2. Loops: `for item in items:` list comprehensions simplify filtering.\n' +
      '3. Functions: Modular code with descriptive parameter names.\n\n' +
      '### Next Step:\n' +
      '- Build a script that reads CSV student lists and formats Canva certificates automatically.'
  })

  const [notesFontSize, setNotesFontSize] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTES_FONT_SIZE)
    return saved ? Number(saved) : 16
  })

  // 7. Theme & Accessibility
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light'
  })

  const [accessibility, setAccessibility] = useState<{ highContrast: boolean; largeText: boolean }>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.A11Y)
    return saved ? JSON.parse(saved) : { highContrast: false, largeText: false }
  })

  // 8. Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFS)
    if (saved) return JSON.parse(saved)
    return [
      {
        id: 'notif-1',
        title: 'New Reciprocal Match!',
        message: 'Rahul Verma teaches Python and wants Canva. 96% compatibility match!',
        timestamp: '10 mins ago',
        type: 'match',
        isRead: false,
      },
      {
        id: 'notif-2',
        title: 'Session Confirmed',
        message: 'Rahul accepted your exchange request for today at 4:00 PM.',
        timestamp: '1 hour ago',
        type: 'session',
        isRead: false,
      },
      {
        id: 'notif-3',
        title: 'Credits Credited',
        message: 'You earned 60 learning credits for teaching Canva typography.',
        timestamp: 'Yesterday',
        type: 'credit',
        isRead: true,
      },
    ]
  })

  // 9. Chat Messages
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHATS)
    if (saved) return JSON.parse(saved)
    return {
      'usr-rahul': [
        {
          id: 'msg-1',
          senderId: 'usr-rahul',
          senderName: 'Rahul Verma',
          senderAvatar: RAHUL_PROFILE.avatar,
          text: 'Hey Ananya! So thrilled to connect. I saw your Canva templates and they look top-notch.',
          timestamp: '3:15 PM',
          isRead: true,
        },
        {
          id: 'msg-2',
          senderId: 'usr-ananya',
          senderName: 'Ananya Sharma',
          senderAvatar: ANANYA_PROFILE.avatar,
          text: 'Hi Rahul! Thanks a lot! I really want to learn Python to automate generative SVG assets. Are you free for our call today at 4 PM?',
          timestamp: '3:18 PM',
          isRead: true,
        },
        {
          id: 'msg-3',
          senderId: 'usr-rahul',
          senderName: 'Rahul Verma',
          senderAvatar: RAHUL_PROFILE.avatar,
          text: 'Absolutely! I set up our shared whiteboard and code sandbox. See you in the video room!',
          timestamp: '3:20 PM',
          isRead: true,
        },
      ],
    }
  })

  // 10. Modals
  const [activeBookingPartner, setActiveBookingPartner] = useState<UserProfile | null>(null)
  const [activeProfileModal, setActiveProfileModal] = useState<UserProfile | null>(null)
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isNotesExpanded, setIsNotesExpanded] = useState(false)
  const [feedbackModalSession, setFeedbackModalSession] = useState<SessionBooking | null>(null)

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser))
  }, [currentUser])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions))
  }, [sessions])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TX, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PODS, JSON.stringify(learningPods))
  }, [learningPods])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(roadmap))
  }, [roadmap])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, notes)
  }, [notes])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES_FONT_SIZE, String(notesFontSize))
  }, [notesFontSize])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.A11Y, JSON.stringify(accessibility))
    if (accessibility.highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }

    if (accessibility.largeText) {
      document.documentElement.classList.add('large-text')
    } else {
      document.documentElement.classList.remove('large-text')
    }
  }, [accessibility])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifications))
  }, [notifications])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chatMessages))
  }, [chatMessages])

  // --- ACTIONS ---

  const switchDemoUser = (userId: string) => {
    const found = users.find(u => u.id === userId)
    if (found) {
      setCurrentUser(found)
    } else if (userId === 'usr-ananya') {
      setCurrentUser(ANANYA_PROFILE)
    } else if (userId === 'usr-rahul') {
      setCurrentUser(RAHUL_PROFILE)
    }
  }

  const updateProfile = (updatedData: Partial<UserProfile>): boolean => {
    const updated = { ...currentUser, ...updatedData }
    setCurrentUser(updated)
    setUsers(prev => prev.map(u => (u.id === currentUser.id ? updated : u)))
    return true
  }

  const bookSession = (
    partner: UserProfile,
    skillTaught: string,
    skillReceived: string,
    date: string,
    time: string,
    durationMinutes: number,
    notesText?: string
  ) => {
    const newSession: SessionBooking = {
      id: `sess-${Date.now()}`,
      partnerId: partner.id,
      partnerName: partner.name,
      partnerAvatar: partner.avatar,
      skillTaught,
      skillReceived,
      date,
      time,
      durationMinutes,
      status: 'confirmed', // Auto-confirmed in demo for instant gratification!
      creditsExchanged: durationMinutes,
      notes: notesText || `Reciprocal exchange: ${skillTaught} ⇄ ${skillReceived}`,
      meetingLink: `/video-room?partner=${partner.id}`,
    }

    setSessions(prev => [newSession, ...prev])
    setActiveBookingPartner(null)

    // Send notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Session Scheduled! 🎉',
        message: `Your exchange session with ${partner.name} on ${date} at ${time} is confirmed.`,
        timestamp: 'Just now',
        type: 'session',
        isRead: false,
      },
      ...prev,
    ])

    fireConfetti()
  }

  const acceptSession = (sessionId: string) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, status: 'confirmed' } : s))
    )
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Session Accepted',
        message: 'The session has been moved to your upcoming calendar.',
        timestamp: 'Just now',
        type: 'session',
        isRead: false,
      },
      ...prev,
    ])
  }

  const rejectSession = (sessionId: string) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, status: 'rejected' } : s))
    )
  }

  const rescheduleSession = (sessionId: string, newDate: string, newTime: string) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, date: newDate, time: newTime } : s))
    )
  }

  const cancelSession = (sessionId: string) => {
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, status: 'cancelled' } : s))
    )
  }

  const completeSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId)
    if (!session || session.status === 'completed') return

    // Mark completed
    setSessions(prev =>
      prev.map(s => (s.id === sessionId ? { ...s, status: 'completed' } : s))
    )

    // Add credits & XP
    const creditsEarned = session.durationMinutes || 30
    const newCredits = currentUser.credits + creditsEarned
    const newXp = currentUser.xp + 100
    const newLevel = Math.floor(newXp / 300) + 1
    const newCompleted = currentUser.completedExchanges + 1
    const newHours = currentUser.teachingHours + creditsEarned / 60

    const updatedUser: UserProfile = {
      ...currentUser,
      credits: newCredits,
      xp: newXp,
      level: newLevel,
      completedExchanges: newCompleted,
      teachingHours: Number(newHours.toFixed(1)),
    }

    setCurrentUser(updatedUser)
    setUsers(prev => prev.map(u => (u.id === currentUser.id ? updatedUser : u)))

    // Add transaction record
    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      type: 'earned',
      amount: creditsEarned,
      description: `Completed peer exchange: taught ${session.skillTaught} to ${session.partnerName} (${session.durationMinutes} mins)`,
      date: 'Today',
      partnerName: session.partnerName,
    }
    setTransactions(prev => [newTx, ...prev])

    fireConfetti()

    // Open feedback modal
    setFeedbackModalSession(session)
  }

  const submitFeedback = (
    sessionId: string,
    rating: number,
    comment: string,
    skillConfidenceGain: number
  ) => {
    const session = sessions.find(s => s.id === sessionId)
    if (!session) return

    // Update partner reviews
    setUsers(prev =>
      prev.map(u => {
        if (u.id === session.partnerId) {
          const newReview = {
            id: `rev-${Date.now()}`,
            authorName: currentUser.name,
            authorAvatar: currentUser.avatar,
            authorRole: `${session.skillTaught} Learner`,
            rating,
            comment,
            skillConfidenceGain,
            date: 'Just now',
          }
          const updatedReviews = [newReview, ...u.reviews]
          const newAvgRating =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          return {
            ...u,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: Number(newAvgRating.toFixed(2)),
          }
        }
        return u
      })
    )

    setFeedbackModalSession(null)
    fireConfetti()
  }

  const joinPod = (podId: string) => {
    setLearningPods(prev =>
      prev.map(p => {
        if (p.id === podId) {
          if (p.isJoined) return p
          const newMembers = [
            ...p.members,
            { name: currentUser.name, avatar: currentUser.avatar, role: 'Active Member' },
          ]
          return {
            ...p,
            members: newMembers,
            membersCount: newMembers.length,
            isJoined: true,
          }
        }
        return p
      })
    )
    fireConfetti()
  }

  const leavePod = (podId: string) => {
    setLearningPods(prev =>
      prev.map(p => {
        if (p.id === podId) {
          const newMembers = p.members.filter(m => m.name !== currentUser.name)
          return {
            ...p,
            members: newMembers,
            membersCount: newMembers.length,
            isJoined: false,
          }
        }
        return p
      })
    )
  }

  const toggleRoadmapStep = (stepId: string) => {
    setRoadmap(prev =>
      prev.map(step => {
        if (step.id === stepId) {
          const nextState = !step.isCompleted
          if (nextState) fireConfetti()
          return { ...step, isCompleted: nextState }
        }
        return step
      })
    )
  }

  const generateCustomRoadmap = (goal: string) => {
    const cleanGoal = goal.trim() || 'Software Engineer'
    const generatedSteps: RoadmapStep[] = [
      {
        id: `gen-1-${Date.now()}`,
        title: `Foundations of ${cleanGoal}`,
        description: `Understand the fundamental principles, terminologies, and baseline tools used in ${cleanGoal}.`,
        estimatedHours: '10 Hours',
        keyConcepts: ['Core Architecture', 'Essential Tools', 'Environment Setup', 'Syntax & Terminology'],
        recommendedPeerSkill: 'Intro Mentorship',
        isCompleted: true,
      },
      {
        id: `gen-2-${Date.now()}`,
        title: `Applied Core Techniques & Hands-on Labs`,
        description: `Execute practical exercises and mini-projects addressing common real-world challenges in ${cleanGoal}.`,
        estimatedHours: '15 Hours',
        keyConcepts: ['Practical Problem Solving', 'Debugging Patterns', 'Data Manipulation', 'Best Practices'],
        recommendedPeerSkill: 'Peer Code Review',
        isCompleted: false,
      },
      {
        id: `gen-3-${Date.now()}`,
        title: `Intermediate Project & Collaboration`,
        description: `Build a complete showcase project integrating third-party tools, testing, and modern standards.`,
        estimatedHours: '20 Hours',
        keyConcepts: ['Project Architecture', 'API Integrations', 'Testing & Verification', 'Documentation'],
        recommendedPeerSkill: 'Design & Review Partner',
        isCompleted: false,
      },
      {
        id: `gen-4-${Date.now()}`,
        title: `Portfolio Polish & Capstone Showcase`,
        description: `Refine your project code, publish an interactive demo, and present findings in peer exchange circles.`,
        estimatedHours: '12 Hours',
        keyConcepts: ['Deployment & Hosting', 'Performance Tuning', 'Public Presentation', 'Feedback Iteration'],
        recommendedPeerSkill: 'Public Speaking / Pitch Review',
        isCompleted: false,
      },
    ]

    setRoadmap(generatedSteps)
    fireConfetti()
  }

  const saveNotes = (content: string) => {
    setNotes(content)
  }

  const adjustNotesFontSize = (delta: number) => {
    setNotesFontSize(prev => Math.min(28, Math.max(12, prev + delta)))
  }

  const sendChatMessage = (
    partnerId: string,
    text: string,
    attachment?: ChatMessage['attachment']
  ) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      attachment,
    }

    setChatMessages(prev => ({
      ...prev,
      [partnerId]: [...(prev[partnerId] || []), newMsg],
    }))

    // Automatic friendly reply simulation after 1.5 seconds if talking to peer
    if (text.length > 2 && !attachment) {
      setTimeout(() => {
        const partner = users.find(u => u.id === partnerId)
        if (!partner) return
        const replies = [
          `Sounds fantastic! Let's cover that in our next video session.`,
          `Great question! I have some slides and code snippets ready to share.`,
          `Awesome progress! The reciprocal exchange is really helping me too.`,
          `Got it! Let me know when you're ready to jump into the video room.`,
        ]
        const replyText = replies[Math.floor(Math.random() * replies.length)]
        const autoReply: ChatMessage = {
          id: `reply-${Date.now()}`,
          senderId: partner.id,
          senderName: partner.name,
          senderAvatar: partner.avatar,
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: true,
        }
        setChatMessages(curr => ({
          ...curr,
          [partnerId]: [...(curr[partnerId] || []), autoReply],
        }))
      }, 1500)
    }
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const toggleHighContrast = () => {
    setAccessibility(prev => ({ ...prev, highContrast: !prev.highContrast }))
  }

  const toggleLargeText = () => {
    setAccessibility(prev => ({ ...prev, largeText: !prev.largeText }))
  }

  const openBookingModal = (partner: UserProfile) => {
    setActiveBookingPartner(partner)
  }

  const closeBookingModal = () => {
    setActiveBookingPartner(null)
  }

  const openProfileModal = (user: UserProfile) => {
    setActiveProfileModal(user)
  }

  const closeProfileModal = () => {
    setActiveProfileModal(null)
  }

  const openEditProfile = () => {
    setIsEditProfileOpen(true)
  }

  const closeEditProfile = () => {
    setIsEditProfileOpen(false)
  }

  return (
    <SkillCircleContext.Provider
      value={{
        currentUser,
        users,
        sessions,
        transactions,
        learningPods,
        roadmap,
        notes,
        notesFontSize,
        theme,
        accessibility,
        notifications,
        chatMessages,
        activeBookingPartner,
        activeProfileModal,
        isEditProfileOpen,
        isNotesExpanded,
        feedbackModalSession,
        switchDemoUser,
        updateProfile,
        bookSession,
        acceptSession,
        rejectSession,
        rescheduleSession,
        cancelSession,
        completeSession,
        submitFeedback,
        joinPod,
        leavePod,
        toggleRoadmapStep,
        generateCustomRoadmap,
        saveNotes,
        adjustNotesFontSize,
        setIsNotesExpanded,
        sendChatMessage,
        markNotificationAsRead,
        clearAllNotifications,
        toggleTheme,
        toggleHighContrast,
        toggleLargeText,
        openBookingModal,
        closeBookingModal,
        openProfileModal,
        closeProfileModal,
        openEditProfile,
        closeEditProfile,
        setFeedbackModalSession,
      }}
    >
      {children}
    </SkillCircleContext.Provider>
  )
}

export function useSkillCircle() {
  const context = useContext(SkillCircleContext)
  if (!context) {
    throw new Error('useSkillCircle must be used within a SkillCircleProvider')
  }
  return context
}
