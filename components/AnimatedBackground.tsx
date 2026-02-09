'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface Atom {
  x: number
  y: number
  radius: number
  orbitRadius: number
  angle: number
  speed: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Particles for constellation
    const particles: Particle[] = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      })
    }

    // Atoms
    const atoms: Atom[] = []
    const atomCount = 5

    for (let i = 0; i < atomCount; i++) {
      atoms.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 8,
        orbitRadius: 40 + Math.random() * 30,
        angle: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02,
      })
    }

    // Geometric shapes
    const shapes: { x: number; y: number; size: number; rotation: number; rotationSpeed: number }[] = []
    const shapeCount = 8

    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 30 + Math.random() * 50,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      })
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(11, 11, 15, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw constellation particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(167, 139, 250, 0.6)'
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.2 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      // Draw atoms
      atoms.forEach(atom => {
        atom.angle += atom.speed

        // Draw nucleus
        ctx.beginPath()
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(124, 58, 237, 0.8)'
        ctx.fill()

        // Draw orbiting electrons
        for (let i = 0; i < 3; i++) {
          const electronAngle = atom.angle + (i * Math.PI * 2) / 3
          const electronX = atom.x + Math.cos(electronAngle) * atom.orbitRadius
          const electronY = atom.y + Math.sin(electronAngle) * atom.orbitRadius

          // Orbit path
          ctx.beginPath()
          ctx.arc(atom.x, atom.y, atom.orbitRadius, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(167, 139, 250, 0.1)'
          ctx.lineWidth = 1
          ctx.stroke()

          // Electron
          ctx.beginPath()
          ctx.arc(electronX, electronY, 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(167, 139, 250, 0.9)'
          ctx.fill()
        }
      })

      // Draw geometric shapes
      shapes.forEach(shape => {
        shape.rotation += shape.rotationSpeed

        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)

        // Draw hexagon
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i
          const x = Math.cos(angle) * shape.size
          const y = Math.sin(angle) * shape.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)'
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.restore()

        // Slow drift
        shape.y += 0.1
        if (shape.y > canvas.height + shape.size) {
          shape.y = -shape.size
          shape.x = Math.random() * canvas.width
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas opacity-30"
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  )
}
