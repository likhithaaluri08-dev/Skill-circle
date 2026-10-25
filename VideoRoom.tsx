import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Monitor,
  PhoneOff,
  PenTool,
  FileText,
  Users,
  Clock,
  Sparkles,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize2,
  Minimize2,
  CheckCircle2
} from 'lucide-react'
import { useSkillCircle } from '../../context/SkillCircleContext'
import { Whiteboard } from './Whiteboard'
import { NotesPanel } from './NotesPanel'

export const VideoRoom: React.FC = () => {
  const [searchParams] = useSearchParams()
  const partnerIdParam = searchParams.get('partner') || 'usr-rahul'
  const navigate = useNavigate()
  const { currentUser, users, completeSession, sessions } = useSkillCircle()

  const partner = users.find(u => u.id === partnerIdParam) || users[1]

  // Media states
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const screenVideoRef = useRef<HTMLVideoElement | null>(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null)

  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)

  // Remote simulation states
  const [isRemoteCameraOn, setIsRemoteCameraOn] = useState(true)
  const [isRemoteMicOn, setIsRemoteMicOn] = useState(true)

  // Auxiliary panels
  const [activeTab, setActiveTab] = useState<'video' | 'whiteboard' | 'both'>('both')
  const [isNotesOpen, setIsNotesOpen] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Timer state
  const [secondsElapsed, setSecondsElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true)

  // Initialize camera & microphone stream
  useEffect(() => {
    let stream: MediaStream | null = null

    async function startMedia() {
      try {
        setCameraError(null)
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('MediaDevices API is not supported in this browser environment.')
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user',
          },
          audio: true,
        })

        setLocalStream(stream)
        setHasCameraPermission(true)

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
          localVideoRef.current.play().catch(e => {
            console.warn('Video autoPlay prevented:', e)
          })
        }
      } catch (err: any) {
        console.warn('Camera/mic access error:', err)
        setHasCameraPermission(false)
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setCameraError('Camera and microphone permission was denied. Please allow access in browser site settings.')
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setCameraError('No physical camera or microphone detected. Interactive virtual camera feed is active.')
        } else {
          setCameraError(err.message || 'Unable to access local video stream.')
        }
      }
    }

    startMedia()

    return () => {
      // Clean up tracks on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
      }
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // Handle local video ref updates when stream arrives
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
      localVideoRef.current.play().catch(() => {})
    }
  }, [localStream, isCameraOn])

  // Timer countdown / countup
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  // Format time (MM:SS)
  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60)
    const secs = totalSecs % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Toggle Camera
  const toggleCamera = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks()
      videoTracks.forEach(track => {
        track.enabled = !isCameraOn
      })
    }
    setIsCameraOn(!isCameraOn)
  }

  // Toggle Microphone
  const toggleMic = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks()
      audioTracks.forEach(track => {
        track.enabled = !isMicOn
      })
    }
    setIsMicOn(!isMicOn)
  }

  // Toggle Screen Share
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStream) {
        screenStream.getTracks().forEach(t => t.stop())
      }
      setScreenStream(null)
      setIsScreenSharing(false)
    } else {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
          throw new Error('Screen sharing is not supported by your browser.')
        }
        const sStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
        setScreenStream(sStream)
        setIsScreenSharing(true)

        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = sStream
        }

        sStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false)
          setScreenStream(null)
        }
      } catch (err: any) {
        console.warn('Screen share canceled or not available:', err)
        setIsScreenSharing(false)
      }
    }
  }

  // Handle Leave Session
  const handleLeaveSession = () => {
    // Check if there is an active session with this partner
    const active = sessions.find(s => s.partnerId === partner.id && s.status === 'confirmed')
    if (active) {
      completeSession(active.id)
    }

    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
    }
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop())
    }

    navigate('/sessions')
  }

  return (
    <div className={`min-h-screen bg-slate-950 text-white flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Top Learning Room Bar */}
      <header className="px-6 py-3 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="font-semibold text-base sm:text-lg flex items-center gap-2 text-slate-100">
              <span>SkillCircle Live Room:</span>
              <span className="text-teal-400 font-bold">{partner.teachSkills[0]?.name || 'Skill'}</span>
              <span className="text-slate-400">⇄</span>
              <span className="text-cyan-400 font-bold">{currentUser.teachSkills[0]?.name || 'Skill'}</span>
            </h1>
          </div>

          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-teal-300 border border-teal-500/30">
            <Sparkles size={13} /> Reciprocal Exchange
          </span>
        </div>

        {/* Center Timer & View Switcher */}
        <div className="flex items-center gap-4">
          {/* Live Timer */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 font-mono text-sm">
            <Clock size={15} className="text-teal-400" />
            <span className="font-semibold text-slate-200">{formatTimer(secondsElapsed)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              className="text-slate-400 hover:text-slate-200 ml-1 transition"
            >
              {isTimerRunning ? <Pause size={13} /> : <Play size={13} />}
            </button>
            <button
              onClick={() => setSecondsElapsed(0)}
              title="Reset timer"
              className="text-slate-400 hover:text-slate-200 transition"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          {/* Mode switch */}
          <div className="hidden lg:flex items-center p-1 bg-slate-800/90 rounded-lg border border-slate-700 text-xs font-medium">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1 rounded-md transition ${activeTab === 'video' ? 'bg-teal-500 text-slate-950 font-semibold shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Video Only
            </button>
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1 rounded-md transition ${activeTab === 'both' ? 'bg-teal-500 text-slate-950 font-semibold shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Split View
            </button>
            <button
              onClick={() => setActiveTab('whiteboard')}
              className={`px-3 py-1 rounded-md transition ${activeTab === 'whiteboard' ? 'bg-teal-500 text-slate-950 font-semibold shadow' : 'text-slate-300 hover:text-white'}`}
            >
              Whiteboard Only
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition border ${
              isNotesOpen
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Notes</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <button
            onClick={handleLeaveSession}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition"
          >
            <PhoneOff size={16} />
            <span>End Call</span>
          </button>
        </div>
      </header>

      {/* Camera Alert / Error Banner if permission denied */}
      {cameraError && (
        <div className="bg-amber-950/80 border-b border-amber-600/50 px-6 py-2.5 text-xs sm:text-sm text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={18} className="text-amber-400 shrink-0" />
            <span>{cameraError}</span>
          </div>
          <button
            onClick={() => setCameraError(null)}
            className="text-amber-400 hover:text-amber-100 font-semibold underline text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Learning Room Canvas */}
      <main className="flex-1 flex overflow-hidden p-3 gap-3 relative">
        {/* Left / Center Work Area */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {/* VIDEO PANELS SECTION */}
          {(activeTab === 'video' || activeTab === 'both') && (
            <div
              className={`grid gap-3 transition-all ${
                activeTab === 'video'
                  ? 'flex-1 grid-cols-1 md:grid-cols-2'
                  : 'h-64 sm:h-72 grid-cols-1 md:grid-cols-2'
              }`}
            >
              {/* REMOTE PARTICIPANT VIDEO PANEL */}
              <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shadow-lg group">
                {isRemoteCameraOn ? (
                  <div className="relative w-full h-full">
                    {/* Simulated live peer video feed */}
                    <img
                      src={partner.avatar}
                      alt={partner.name}
                      className="w-full h-full object-cover filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <img
                      src={partner.avatar}
                      alt={partner.name}
                      className="w-24 h-24 rounded-full border-4 border-slate-700 shadow-xl mb-3 object-cover"
                    />
                    <h3 className="font-semibold text-lg text-slate-100">{partner.name}</h3>
                    <p className="text-xs text-slate-400">{partner.college}</p>
                    <span className="mt-2 text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400">
                      Camera disabled
                    </span>
                  </div>
                )}

                {/* Remote Participant Badges & Audio indicator */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                  <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
                    <span className="font-semibold text-slate-100">{partner.name}</span>
                    <span className="text-teal-400 font-medium">({partner.teachSkills[0]?.name || 'Teacher'})</span>
                  </div>

                  {isRemoteMicOn ? (
                    <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30" title="Audio connected">
                      <Volume2 size={14} className="animate-pulse" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30" title="Muted">
                      <MicOff size={14} />
                    </div>
                  )}
                </div>

                {/* Peer Remote Camera toggle test control for demo */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition z-10">
                  <button
                    onClick={() => setIsRemoteCameraOn(!isRemoteCameraOn)}
                    className="text-xs px-2.5 py-1 rounded bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700"
                    title="Simulate peer camera toggle"
                  >
                    {isRemoteCameraOn ? 'Simulate Cam Off' : 'Simulate Cam On'}
                  </button>
                </div>
              </div>

              {/* LOCAL USER CAMERA PANEL (YOUR REAL FACE) */}
              <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shadow-lg group">
                {/* Real video element receiving getUserMedia stream */}
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted // Always mute local video so user doesn't hear own echo!
                  className={`w-full h-full object-cover transform -scale-x-100 ${
                    !isCameraOn || !localStream ? 'hidden' : 'block'
                  }`}
                />

                {/* If Camera is toggled off or unavailable, display clear avatar/fallback card */}
                {(!isCameraOn || !localStream) && (
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-24 h-24 rounded-full border-4 border-teal-500/50 shadow-xl mb-3 object-cover"
                    />
                    <h3 className="font-semibold text-lg text-slate-100">{currentUser.name} (You)</h3>
                    <p className="text-xs text-slate-400">{currentUser.college}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      <CameraOff size={13} className="text-rose-400" />
                      {!isCameraOn ? 'Camera paused' : 'Camera stream initializing'}
                    </span>
                  </div>
                )}

                {/* Local user badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                  <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
                    <span className="font-semibold text-slate-100">You ({currentUser.name.split(' ')[0]})</span>
                    <span className="text-cyan-400 font-medium">({currentUser.teachSkills[0]?.name || 'Learner'})</span>
                  </div>

                  {!isMicOn && (
                    <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30" title="You are muted">
                      <MicOff size={14} />
                    </div>
                  )}

                  {localStream && isCameraOn && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      HD Live
                    </span>
                  )}
                </div>

                {/* Screen Share Preview Overlay if active */}
                {isScreenSharing && screenStream && (
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-indigo-600/90 text-white text-xs flex items-center gap-1.5 shadow">
                    <Monitor size={13} /> Presenting Screen
                  </div>
                )}
              </div>
            </div>
          )}

          {/* WHITEBOARD SECTION */}
          {(activeTab === 'whiteboard' || activeTab === 'both') && (
            <div className="flex-1 min-h-[350px] relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-900 flex flex-col">
              <Whiteboard partnerName={partner.name} />
            </div>
          )}
        </div>

        {/* Right Collapsible Notes Sidebar */}
        {isNotesOpen && (
          <aside className="w-80 lg:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col overflow-hidden transition-all shrink-0">
            <NotesPanel onClose={() => setIsNotesOpen(false)} partnerName={partner.name} />
          </aside>
        )}
      </main>

      {/* Floating Bottom Control Bar */}
      <footer className="px-6 py-3 bg-slate-900/95 backdrop-blur border-t border-slate-800 flex items-center justify-between z-20">
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="font-medium text-slate-300">Room Status:</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Encrypted WebRTC P2P
          </span>
        </div>

        {/* Core Media Buttons */}
        <div className="flex items-center gap-3 mx-auto">
          {/* Camera toggle */}
          <button
            onClick={toggleCamera}
            className={`p-3.5 rounded-full transition shadow-md flex items-center justify-center ${
              isCameraOn
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
                : 'bg-rose-600 text-white hover:bg-rose-700 ring-2 ring-rose-400'
            }`}
            title={isCameraOn ? 'Turn camera off' : 'Turn camera on'}
          >
            {isCameraOn ? <Camera size={20} /> : <CameraOff size={20} />}
          </button>

          {/* Microphone toggle */}
          <button
            onClick={toggleMic}
            className={`p-3.5 rounded-full transition shadow-md flex items-center justify-center ${
              isMicOn
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
                : 'bg-rose-600 text-white hover:bg-rose-700 ring-2 ring-rose-400'
            }`}
            title={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
          >
            {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          {/* Screen Share toggle */}
          <button
            onClick={toggleScreenShare}
            className={`p-3.5 rounded-full transition shadow-md flex items-center justify-center ${
              isScreenSharing
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
            }`}
            title={isScreenSharing ? 'Stop sharing screen' : 'Share your screen'}
          >
            <Monitor size={20} />
          </button>

          {/* Whiteboard switcher button */}
          <button
            onClick={() => setActiveTab(activeTab === 'whiteboard' ? 'video' : 'whiteboard')}
            className={`p-3.5 rounded-full transition shadow-md flex items-center justify-center ${
              activeTab === 'whiteboard'
                ? 'bg-teal-500 text-slate-950 font-bold ring-2 ring-teal-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
            }`}
            title="Toggle Whiteboard full view"
          >
            <PenTool size={20} />
          </button>

          {/* End Call Button */}
          <button
            onClick={handleLeaveSession}
            className="px-5 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold transition shadow-lg flex items-center gap-2 ring-2 ring-rose-500/50"
            title="Leave & complete session"
          >
            <PhoneOff size={20} />
            <span className="hidden md:inline">Leave Session</span>
          </button>
        </div>

        {/* Right Info */}
        <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400">
          <span>Credits: <strong className="text-teal-400 font-bold">+{currentUser.credits}</strong></span>
        </div>
      </footer>
    </div>
  )
}
