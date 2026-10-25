export * from './types/index'

// Legacy SIH types if needed
export interface Skill {
  skill: string
  current: number
  required: number
  group: 'Technical' | 'Professional'
  last_assessed?: string
}

export interface Course {
  id: string
  title: string
  skill: string
  level: string
  duration: string
  lessons: number
  color: string
  description: string
  progress: number
  outcomes?: string[]
  provider?: string
}
