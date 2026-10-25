import React, { useState, useEffect } from 'react'
import {
  FileText,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  X,
  CheckCircle2,
  Copy,
  Download,
  Bold,
  List,
  Sparkles
} from 'lucide-react'
import { useSkillCircle } from '../../context/SkillCircleContext'

interface NotesPanelProps {
  onClose?: () => void
  partnerName?: string
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ onClose, partnerName = 'Peer' }) => {
  const { notes, saveNotes, notesFontSize, adjustNotesFontSize, isNotesExpanded, setIsNotesExpanded } = useSkillCircle()
  const [localText, setLocalText] = useState(notes)
  const [isSaved, setIsSaved] = useState(true)
  const [copied, setCopied] = useState(false)

  // Sync with global notes
  useEffect(() => {
    setLocalText(notes)
  }, [notes])

  // Debounced auto-save
  useEffect(() => {
    setIsSaved(false)
    const timeout = setTimeout(() => {
      saveNotes(localText)
      setIsSaved(true)
    }, 600)
    return () => clearTimeout(timeout)
  }, [localText, saveNotes])

  const wordCount = localText.trim() ? localText.trim().split(/\s+/).length : 0
  const charCount = localText.length

  const handleCopy = () => {
    navigator.clipboard.writeText(localText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([localText], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `SkillCircle-Notes-${partnerName.replace(/\s+/g, '_')}-${Date.now()}.md`
    link.click()
    URL.revokeObjectURL(url)
  }

  const insertSnippet = (prefix: string) => {
    setLocalText(prev => prev + '\n' + prefix + ' ')
  }

  return (
    <div
      className={`flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-100 ${
        isNotesExpanded
          ? 'fixed inset-4 sm:inset-10 z-50 rounded-2xl shadow-2xl border border-slate-700 bg-slate-900/98 backdrop-blur'
          : ''
      }`}
    >
      {/* Header with Title & Zoom Controls */}
      <div className="px-4 py-3 bg-slate-850 border-b border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-teal-400" />
          <h3 className="font-semibold text-sm text-slate-200">Exchange Notes</h3>
          <span className="text-[11px] text-slate-400 hidden sm:inline">({partnerName})</span>
        </div>

        {/* Toolbar: Font Zoom Controls & Expand */}
        <div className="flex items-center gap-1.5">
          {/* Zoom Out Font */}
          <button
            onClick={() => adjustNotesFontSize(-2)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Decrease font size (A-)"
          >
            <ZoomOut size={15} />
          </button>

          {/* Current Font Indicator */}
          <span className="text-xs font-mono text-teal-300 px-1 select-none font-semibold" title="Current font size">
            {notesFontSize}px
          </span>

          {/* Zoom In Font */}
          <button
            onClick={() => adjustNotesFontSize(2)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Increase font size (A+)"
          >
            <ZoomIn size={15} />
          </button>

          {/* Expand into modal / contract */}
          <button
            onClick={() => setIsNotesExpanded(!isNotesExpanded)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition ml-1"
            title={isNotesExpanded ? 'Collapse notes view' : 'Expand notes to fullscreen'}
          >
            {isNotesExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>

          {/* Close button if provided */}
          {onClose && !isNotesExpanded && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-1"
              title="Close notes panel"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Formatting Quick-Bar */}
      <div className="px-4 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => insertSnippet('### ')}
            className="px-2 py-0.5 rounded hover:bg-slate-800 hover:text-slate-200 transition font-semibold"
            title="Heading"
          >
            H3
          </button>
          <button
            onClick={() => insertSnippet('- ')}
            className="px-2 py-0.5 rounded hover:bg-slate-800 hover:text-slate-200 transition"
            title="Bullet Point"
          >
            <List size={14} />
          </button>
          <button
            onClick={() => insertSnippet('**Key takeaway:**')}
            className="px-2 py-0.5 rounded hover:bg-slate-800 hover:text-slate-200 transition"
            title="Bold Point"
          >
            <Bold size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="hover:text-slate-200 transition flex items-center gap-1"
            title="Copy all notes to clipboard"
          >
            <Copy size={13} />
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="hover:text-slate-200 transition flex items-center gap-1"
            title="Download notes file"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Save MD</span>
          </button>
        </div>
      </div>

      {/* Notes Textarea Area (Custom Font Size & Scrolling) */}
      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          value={localText}
          onChange={e => setLocalText(e.target.value)}
          placeholder="Take notes during the exchange... Markdown formatted headings, code snippets, and action items."
          style={{
            fontSize: `${notesFontSize}px`,
            lineHeight: 1.65,
          }}
          className="w-full h-full min-h-[300px] bg-transparent text-slate-100 placeholder-slate-500 resize-none focus:outline-none font-sans"
        />
      </div>

      {/* Footer Status: Auto-saved indicator, word count */}
      <div className="px-4 py-2 bg-slate-850 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          {isSaved ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>Saved locally</span>
            </span>
          ) : (
            <span className="text-amber-400 animate-pulse">Saving changes...</span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
        </div>
      </div>
    </div>
  )
}
