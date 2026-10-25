/**
 * Zero-dependency canvas confetti explosion effect
 */
export function fireConfetti() {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '99999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    document.body.removeChild(canvas)
    return
  }

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const colors = ['#00C2A8', '#0B1F3A', '#38BDF8', '#F59E0B', '#EC4899', '#10B981', '#6366F1']
  const particleCount = 120
  const particles: {
    x: number
    y: number
    w: number
    h: number
    vx: number
    vy: number
    color: string
    rotation: number
    rotationSpeed: number
    opacity: number
  }[] = []

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.4 + (Math.random() - 0.5) * 100,
      w: Math.random() * 8 + 6,
      h: Math.random() * 6 + 4,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1,
    })
  }

  let animationFrameId: number
  let frames = 0

  function render() {
    frames++
    ctx!.clearRect(0, 0, canvas.width, canvas.height)

    let alive = false
    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.35 // gravity
      p.vx *= 0.98 // air friction
      p.rotation += p.rotationSpeed
      if (frames > 30) {
        p.opacity -= 0.015
      }

      if (p.opacity > 0 && p.y < canvas.height + 50) {
        alive = true
        ctx!.save()
        ctx!.translate(p.x, p.y)
        ctx!.rotate((p.rotation * Math.PI) / 180)
        ctx!.globalAlpha = Math.max(0, p.opacity)
        ctx!.fillStyle = p.color
        ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx!.restore()
      }
    }

    if (alive && frames < 140) {
      animationFrameId = requestAnimationFrame(render)
    } else {
      cancelAnimationFrame(animationFrameId)
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }
  }

  render()
}
