import React, { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Send,
  Smile,
  Paperclip,
  Mic,
  Video,
  CheckCheck,
  Image as ImageIcon,
  MoreVertical,
  Phone,
  Sparkles,
  Play,
  Square
} from 'lucide-react'
import { useSkillCircle } from '../context/SkillCircleContext'

export const ChatPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const initialPartnerId = searchParams.get('partner') || 'usr-rahul'

  const { users, currentUser, chatMessages, sendChatMessage } = useSkillCircle()

  const [activePartnerId, setActivePartnerId] = useState(initialPartnerId)
  const [inputText, setInputText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [voiceSeconds, setVoiceSeconds] = useState(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const activePartner = users.find(u => u.id === activePartnerId) || users[1]
  const conversation = chatMessages[activePartnerId] || []

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  // Voice recording timer simulator
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isRecordingVoice) {
      interval = setInterval(() => {
        setVoiceSeconds(prev => prev + 1)
      }, 1000)
    } else {
      setVoiceSeconds(0)
    }
    return () => clearInterval(interval)
  }, [isRecordingVoice])

  const emojis = ['👍', '🎉', '💡', '🔥', '🙌', '💻', '🎨', '🚀', '✨', '👏']

  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!inputText.trim()) return
    sendChatMessage(activePartnerId, inputText.trim())
    setInputText('')
    setShowEmojiPicker(false)
  }

  const handleSendVoice = () => {
    setIsRecordingVoice(false)
    sendChatMessage(activePartnerId, 'Voice Note (0:14)', {
      type: 'audio',
      url: '#',
      name: `Voice note • ${voiceSeconds}s`,
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const isImg = file.type.startsWith('image/')
        sendChatMessage(activePartnerId, isImg ? 'Shared an image' : `Shared file: ${file.name}`, {
          type: isImg ? 'image' : 'file',
          url: reader.result,
          name: file.name,
        })
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[750px]">
        {/* Left: Chat Contacts List */}
        <aside className="w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-black text-lg text-slate-900 dark:text-white mb-1">Messages</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct peer communication & session prep
            </p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {users
              .filter(u => u.id !== currentUser.id)
              .map(peer => {
                const isActive = peer.id === activePartnerId
                const lastMsg = chatMessages[peer.id]?.slice(-1)[0]
                return (
                  <div
                    key={peer.id}
                    onClick={() => setActivePartnerId(peer.id)}
                    className={`p-4 flex items-center gap-3 cursor-pointer transition ${
                      isActive
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-l-4 border-teal-500'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {peer.name}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {lastMsg ? lastMsg.timestamp : 'Active'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {lastMsg ? lastMsg.text : `Teaches: ${peer.teachSkills[0]?.name}`}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
        </aside>

        {/* Right: Active Chat Conversation */}
        <section className="flex-1 flex flex-col bg-white dark:bg-slate-900 overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <img
                src={activePartner.avatar}
                alt={activePartner.name}
                className="w-10 h-10 rounded-2xl object-cover border border-teal-500/50"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{activePartner.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                    Reciprocal Peer
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Teaches {activePartner.teachSkills[0]?.name} • Wants {activePartner.wantSkills[0]}
                </p>
              </div>
            </div>

            {/* Launch Video Room shortcut button */}
            <div className="flex items-center gap-2">
              <Link
                to={`/video-room?partner=${activePartner.id}`}
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5"
                title="Jump into live video room"
              >
                <Video size={16} />
                <span className="hidden sm:inline">Launch Video Room</span>
              </Link>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-slate-950/20 text-xs">
            {conversation.map(msg => {
              const isMe = msg.senderId === currentUser.id
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-8 h-8 rounded-xl object-cover self-end mb-1"
                    />
                  )}

                  <div className={`max-w-[70%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed text-sm ${
                        isMe
                          ? 'bg-teal-500 text-slate-950 font-medium rounded-br-none shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700/60 shadow-sm'
                      }`}
                    >
                      {/* Image Attachment preview */}
                      {msg.attachment?.type === 'image' && (
                        <div className="mb-2 rounded-xl overflow-hidden max-h-56">
                          <img
                            src={msg.attachment.url}
                            alt="Attachment"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Audio bubble preview */}
                      {msg.attachment?.type === 'audio' && (
                        <div className="flex items-center gap-3 p-2 rounded-xl bg-black/10 dark:bg-white/10 mb-1">
                          <button className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center">
                            <Play size={12} />
                          </button>
                          <div className="font-mono text-xs font-semibold">0:14 • Audio Note</div>
                        </div>
                      )}

                      <p>{msg.text}</p>
                    </div>

                    <div
                      className={`flex items-center gap-1 text-[10px] text-slate-400 ${
                        isMe ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck size={13} className="text-teal-600 dark:text-teal-400" />}
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2 overflow-x-auto text-xl">
              {emojis.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setInputText(prev => prev + e)}
                  className="hover:scale-125 transition p-1"
                >
                  {e}
                </button>
              ))}
            </div>
          )}

          {/* Voice Recording Active Bar */}
          {isRecordingVoice && (
            <div className="px-6 py-3 bg-rose-50 dark:bg-rose-950/40 border-t border-rose-200 dark:border-rose-900 flex items-center justify-between text-xs text-rose-700 dark:text-rose-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="font-bold">Recording Voice Note:</span>
                <span className="font-mono text-sm font-bold">{voiceSeconds}s</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRecordingVoice(false)}
                  className="px-3 py-1 rounded-lg border border-rose-300 text-xs font-semibold hover:bg-rose-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendVoice}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs shadow flex items-center gap-1"
                >
                  <Send size={12} /> Send Audio
                </button>
              </div>
            </div>
          )}

          {/* Message Input Controls */}
          <form
            onSubmit={handleSendText}
            className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900"
          >
            {/* Emoji toggle */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Add Emoji"
            >
              <Smile size={18} />
            </button>

            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Attach Image or Document"
            >
              <Paperclip size={18} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Voice record button */}
            <button
              type="button"
              onClick={() => setIsRecordingVoice(!isRecordingVoice)}
              className={`p-2.5 rounded-xl transition ${
                isRecordingVoice
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Record Voice Note"
            >
              <Mic size={18} />
            </button>

            {/* Input field */}
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Message ${activePartner.name.split(' ')[0]}...`}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />

            {/* Send button */}
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition shadow-md"
              title="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
