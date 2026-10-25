import React, { useRef, useState, useEffect } from 'react'
import {
  Pen,
  Highlighter,
  Eraser,
  RotateCcw,
  Trash2,
  Download,
  Square,
  Minus,
  Circle as CircleIcon,
  Check
} from 'lucide-react'

interface WhiteboardProps {
  partnerName?: string
}

type ToolType = 'pen' | 'highlighter' | 'eraser' | 'line' | 'rect' | 'circle'

export const Whiteboard: React.FC<WhiteboardProps> = ({ partnerName = 'Peer' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [tool, setTool] = useState<ToolType>('pen')
  const [color, setColor] = useState('#00C2A8') // SkillCircle Teal default
  const [strokeWidth, setStrokeWidth] = useState(4)
  const [history, setHistory] = useState<ImageData[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null)
  const [snapshot, setSnapshot] = useState<ImageData | null>(null)
  const [hasSavedNotice, setHasSavedNotice] = useState(false)

  const colors = [
    { name: 'Teal', hex: '#00C2A8' },
    { name: 'Navy', hex: '#0B1F3A' },
    { name: 'Sky', hex: '#38BDF8' },
    { name: 'Rose', hex: '#F43F5E' },
    { name: 'Amber', hex: '#F59E0B' },
    { name: 'Violet', hex: '#8B5CF6' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Dark Slate', hex: '#334155' },
  ]

  // Setup canvas size & background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const rect = parent.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
      // Dark slate background matching the learning room
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Initial grid pattern for professional graph feel
      drawBackgroundGrid(ctx, rect.width, rect.height)

      // Save initial blank state
      const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setHistory([initialData])
    }

    const handleResize = () => {
      // Keep canvas responsive without wiping drawings
      if (!canvas || !canvas.parentElement) return
      const pRect = canvas.parentElement.getBoundingClientRect()
      // If parent dimensions changed significantly
      if (Math.abs(canvas.offsetWidth - pRect.width) > 20) {
        const curData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
        canvas.width = pRect.width * dpr
        canvas.height = pRect.height * dpr
        canvas.style.width = `${pRect.width}px`
        canvas.style.height = `${pRect.height}px`
        if (ctx) {
          ctx.scale(dpr, dpr)
          ctx.fillStyle = '#0f172a'
          ctx.fillRect(0, 0, pRect.width, pRect.height)
          drawBackgroundGrid(ctx, pRect.width, pRect.height)
          if (curData) {
            ctx.putImageData(curData, 0, 0)
          }
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const drawBackgroundGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
    ctx.lineWidth = 1
    const gridSize = 24
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
  }

  // Get accurate coordinates
  const getCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  // Pointer Down
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.setPointerCapture(e.pointerId)
    const { x, y } = getCoords(e)
    setIsDrawing(true)
    setStartPos({ x, y })

    // Save snapshot for shapes preview
    setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height))

    ctx.beginPath()
    ctx.moveTo(x, y)

    // Set brush styles
    if (tool === 'eraser') {
      ctx.strokeStyle = '#0f172a'
      ctx.lineWidth = strokeWidth * 3
      ctx.globalAlpha = 1
    } else if (tool === 'highlighter') {
      ctx.strokeStyle = color
      ctx.lineWidth = strokeWidth * 2.5
      ctx.globalAlpha = 0.35
    } else {
      ctx.strokeStyle = color
      ctx.lineWidth = strokeWidth
      ctx.globalAlpha = 1
    }

    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }

  // Pointer Move
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPos) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y } = getCoords(e)

    if (tool === 'pen' || tool === 'highlighter' || tool === 'eraser') {
      ctx.lineTo(x, y)
      ctx.stroke()
    } else if (snapshot) {
      // Shape drawing preview: restore previous snapshot then draw candidate shape
      ctx.putImageData(snapshot, 0, 0)
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = strokeWidth
      ctx.globalAlpha = 1
      ctx.lineCap = 'round'

      if (tool === 'line') {
        ctx.moveTo(startPos.x, startPos.y)
        ctx.lineTo(x, y)
        ctx.stroke()
      } else if (tool === 'rect') {
        const width = x - startPos.x
        const height = y - startPos.y
        ctx.strokeRect(startPos.x, startPos.y, width, height)
      } else if (tool === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2))
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI)
        ctx.stroke()
      }
    }
  }

  // Pointer Up
  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    if (ctx) {
      // Save state to undo history
      const currentSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setHistory(prev => [...prev.slice(-20), currentSnapshot])
    }

    setIsDrawing(false)
    setStartPos(null)
    setSnapshot(null)
  }

  // Undo
  const handleUndo = () => {
    if (history.length <= 1) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const newHistory = [...history]
    newHistory.pop() // Remove current
    const previous = newHistory[newHistory.length - 1]
    if (previous) {
      ctx.putImageData(previous, 0, 0)
      setHistory(newHistory)
    }
  }

  // Clear Canvas
  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.scale(dpr, dpr)
    drawBackgroundGrid(ctx, canvas.offsetWidth, canvas.offsetHeight)
    ctx.restore()

    const clearedData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setHistory([clearedData])
  }

  // Export as PNG
  const handleExport = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = `SkillCircle-Whiteboard-${Date.now()}.png`
    link.click()

    setHasSavedNotice(true)
    setTimeout(() => setHasSavedNotice(false), 2500)
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900 select-none">
      {/* Top Whiteboard Toolbar */}
      <div className="px-4 py-2.5 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-slate-200">
        {/* Tool selector */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded-lg transition ${tool === 'pen' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
            title="Pen Tool (P)"
          >
            <Pen size={16} />
          </button>
          <button
            onClick={() => setTool('highlighter')}
            className={`p-2 rounded-lg transition ${tool === 'highlighter' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
            title="Highlighter Tool (H)"
          >
            <Highlighter size={16} />
          </button>
          <button
            onClick={() => setTool('line')}
            className={`p-2 rounded-lg transition ${tool === 'line' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
            title="Line Tool"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => setTool('rect')}
            className={`p-2 rounded-lg transition ${tool === 'rect' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
            title="Rectangle Tool"
          >
            <Square size={16} />
          </button>
          <button
            onClick={() => setTool('circle')}
            className={`p-2 rounded-lg transition ${tool === 'circle' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
            title="Circle Tool"
          >
            <CircleIcon size={16} />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-lg transition ${tool === 'eraser' ? 'bg-teal-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
            title="Eraser Tool (E)"
          >
            <Eraser size={16} />
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 px-2.5 py-1.5 rounded-xl border border-slate-700">
          {colors.map(c => (
            <button
              key={c.hex}
              onClick={() => {
                setColor(c.hex)
                if (tool === 'eraser') setTool('pen')
              }}
              className={`w-6 h-6 rounded-full transition transform hover:scale-110 flex items-center justify-center ${
                color === c.hex && tool !== 'eraser' ? 'ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-900 scale-110' : ''
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            >
              {color === c.hex && tool !== 'eraser' && (
                <Check size={12} className={c.hex === '#FFFFFF' ? 'text-black' : 'text-white'} />
              )}
            </button>
          ))}
        </div>

        {/* Stroke width selector */}
        <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700">
          <span className="text-xs text-slate-400 font-medium">Size:</span>
          <input
            type="range"
            min="2"
            max="20"
            value={strokeWidth}
            onChange={e => setStrokeWidth(Number(e.target.value))}
            className="w-20 accent-teal-400 cursor-pointer"
          />
          <span className="text-xs font-mono text-teal-300 w-4">{strokeWidth}px</span>
        </div>

        {/* Action Buttons: Undo, Clear, Export */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={history.length <= 1}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-40 transition"
            title="Undo stroke"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={handleClear}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-rose-400 transition"
            title="Clear entire whiteboard"
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs transition shadow"
            title="Export whiteboard image to PNG"
          >
            <Download size={14} />
            <span>{hasSavedNotice ? 'Saved PNG!' : 'Export'}</span>
          </button>
        </div>
      </div>

      {/* Main Drawing Canvas */}
      <div className="flex-1 w-full h-full relative cursor-crosshair overflow-hidden">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute inset-0 touch-none block"
        />

        {/* Bottom subtle watermark */}
        <div className="absolute bottom-2 right-3 pointer-events-none text-[11px] font-medium text-slate-500/70 select-none">
          SkillCircle Shared Canvas • {partnerName}
        </div>
      </div>
    </div>
  )
}
