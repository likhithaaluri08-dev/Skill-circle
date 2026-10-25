export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface UserSkill {
  name: string
  category: 'Tech' | 'Design' | 'Languages' | 'Business' | 'Academics' | 'Music' | 'Other'
  level: ExperienceLevel
}

export interface UserReview {
  id: string
  authorName: string
  authorAvatar: string
  authorRole: string
  rating: number
  comment: string
  skillConfidenceGain: number
  date: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

export interface UserProfile {
  id: string
  name: string
  username: string
  email: string
  avatar: string
  bio: string
  college: string
  year: string
  teachSkills: UserSkill[]
  wantSkills: string[]
  experienceLevel: ExperienceLevel
  languages: string[]
  availability: string[]
  rating: number
  reviewsCount: number
  credits: number
  xp: number
  level: number
  streakDays: number
  completedExchanges: number
  teachingHours: number
  badges: Badge[]
  reviews: UserReview[]
}

export interface ReciprocalMatch {
  partner: UserProfile
  compatibilityScore: number
  whyReasons: string[]
  offeredSkill: string
  desiredSkill: string
  availabilityOverlap: string[]
  isDirectReciprocal: boolean
}

export interface SessionBooking {
  id: string
  partnerId: string
  partnerName: string
  partnerAvatar: string
  skillTaught: string
  skillReceived: string
  date: string
  time: string
  durationMinutes: number
  status: 'requested' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rejected'
  creditsExchanged: number
  notes?: string
  meetingLink?: string
}

export interface CreditTransaction {
  id: string
  type: 'earned' | 'spent'
  amount: number
  description: string
  date: string
  relatedSessionId?: string
  partnerName?: string
}

export interface LearningPod {
  id: string
  title: string
  category: string
  description: string
  membersCount: number
  maxMembers: number
  members: { name: string; avatar: string; role: string }[]
  nextSession: string
  sharedGoal: string
  progress: number
  isJoined?: boolean
}

export interface RoadmapStep {
  id: string
  title: string
  description: string
  estimatedHours: string
  keyConcepts: string[]
  recommendedPeerSkill: string
  isCompleted: boolean
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  text: string
  timestamp: string
  isRead: boolean
  attachment?: {
    type: 'image' | 'file' | 'audio'
    url: string
    name: string
  }
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  timestamp: string
  type: 'match' | 'session' | 'credit' | 'badge'
  isRead: boolean
}
