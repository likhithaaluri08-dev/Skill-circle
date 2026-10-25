import React from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { SkillCircleProvider, useSkillCircle } from './context/SkillCircleContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CircleBot } from './components/common/CircleBot'
import { VideoRoom } from './components/video/VideoRoom'
import { SessionBookingModal } from './components/booking/SessionBookingModal'
import { ProfileModal } from './components/profile/ProfileModal'
import { ProfileEditModal } from './components/profile/ProfileEditModal'
import { FeedbackModal } from './components/booking/FeedbackModal'

import { LandingPage } from './pages/LandingPage'
import { AuthPage } from './pages/AuthPage'
import { MatchesPage } from './pages/MatchesPage'
import { DiscoverPage } from './pages/DiscoverPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { PodsPage } from './pages/PodsPage'
import { SessionsPage } from './pages/SessionsPage'
import { WalletPage } from './pages/WalletPage'
import { ChatPage } from './pages/ChatPage'
import { ProfilePage } from './pages/ProfilePage'
import { GamificationPage } from './pages/GamificationPage'
import { ImpactDashboardPage } from './pages/ImpactDashboardPage'
import { AdminPage } from './pages/AdminPage'

const AppContent: React.FC = () => {
  const location = useLocation()
  const isVideoRoom = location.pathname.startsWith('/video-room')

  const {
    activeBookingPartner,
    closeBookingModal,
    activeProfileModal,
    closeProfileModal,
    isEditProfileOpen,
    closeEditProfile,
    feedbackModalSession,
    setFeedbackModalSession,
  } = useSkillCircle()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Hide navbar on video call page for immersive learning experience */}
      {!isVideoRoom && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/forgot-password" element={<AuthPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/pods" element={<PodsPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/gamification" element={<GamificationPage />} />
          <Route path="/impact" element={<ImpactDashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/video-room" element={<VideoRoom />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isVideoRoom && <Footer />}

      {/* Floating CircleBot AI on standard pages */}
      {!isVideoRoom && <CircleBot />}

      {/* Global Interactive Modals */}
      <SessionBookingModal
        partner={activeBookingPartner}
        onClose={closeBookingModal}
      />

      <ProfileModal
        user={activeProfileModal}
        onClose={closeProfileModal}
      />

      <ProfileEditModal
        isOpen={isEditProfileOpen}
        onClose={closeEditProfile}
      />

      <FeedbackModal
        session={feedbackModalSession}
        onClose={() => setFeedbackModalSession(null)}
      />
    </div>
  )
}

export function App() {
  return (
    <SkillCircleProvider>
      <AppContent />
    </SkillCircleProvider>
  )
}

export default App
