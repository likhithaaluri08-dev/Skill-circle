import { UserProfile, ReciprocalMatch } from '../types'

/**
 * Calculates mutual reciprocal skill compatibility score (0-100%) and explains "Why this match?"
 */
export function calculateReciprocalMatch(currentUser: UserProfile, peer: UserProfile): ReciprocalMatch {
  let score = 0
  const whyReasons: string[] = []

  // 1. Skill peer teaches that current user wants
  const userWants = currentUser.wantSkills.map(s => s.toLowerCase().trim())
  const peerTeaches = peer.teachSkills.map(s => s.name.toLowerCase().trim())

  const matchingSkillPeerOffers = peer.teachSkills.find(s =>
    userWants.some(w => s.name.toLowerCase().includes(w) || w.includes(s.name.toLowerCase()))
  )

  let offeredSkill = matchingSkillPeerOffers ? matchingSkillPeerOffers.name : (peer.teachSkills[0]?.name || 'Skills')

  if (matchingSkillPeerOffers) {
    score += 40
    whyReasons.push(`They teach ${matchingSkillPeerOffers.name} (${matchingSkillPeerOffers.level}), which matches your learning goals.`)
  } else {
    // Partial category overlap
    score += 15
  }

  // 2. Skill current user teaches that peer wants
  const peerWants = peer.wantSkills.map(s => s.toLowerCase().trim())
  const userTeaches = currentUser.teachSkills.map(s => s.name.toLowerCase().trim())

  const matchingSkillUserOffers = currentUser.teachSkills.find(s =>
    peerWants.some(w => s.name.toLowerCase().includes(w) || w.includes(s.name.toLowerCase()))
  )

  let desiredSkill = matchingSkillUserOffers ? matchingSkillUserOffers.name : (currentUser.teachSkills[0]?.name || 'Skills')

  if (matchingSkillUserOffers) {
    score += 40
    whyReasons.push(`You teach ${matchingSkillUserOffers.name}, which is on their active wishlist.`)
  } else {
    score += 15
  }

  const isDirectReciprocal = Boolean(matchingSkillPeerOffers && matchingSkillUserOffers)

  // 3. Availability overlap
  const sharedAvailability = currentUser.availability.filter(a =>
    peer.availability.map(p => p.toLowerCase()).includes(a.toLowerCase())
  )

  if (sharedAvailability.length > 0) {
    score += 12
    whyReasons.push(`Both are free on ${sharedAvailability.join(' and ')}.`)
  } else {
    score += 4
  }

  // 4. Experience match & rating reliability
  if (peer.rating >= 4.7) {
    score += 8
    whyReasons.push(`Top-rated peer instructor (${peer.rating}★ rating from ${peer.reviewsCount} exchanges).`)
  }

  // Cap between 40% and 98%
  const finalScore = Math.min(98, Math.max(45, score))

  return {
    partner: peer,
    compatibilityScore: finalScore,
    whyReasons,
    offeredSkill,
    desiredSkill,
    availabilityOverlap: sharedAvailability,
    isDirectReciprocal,
  }
}

export function getRankedReciprocalMatches(currentUser: UserProfile, allUsers: UserProfile[]): ReciprocalMatch[] {
  return allUsers
    .filter(u => u.id !== currentUser.id)
    .map(peer => calculateReciprocalMatch(currentUser, peer))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
}
