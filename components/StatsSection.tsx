'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Users, Rocket, Trophy, Award } from 'lucide-react'

interface Stat {
  icon: any
  label: string
  value: number
  suffix: string
}

export default function StatsSection() {
  const stats: Stat[] = [
    { icon: Users, label: 'Active Members', value: 150, suffix: '+' },
    { icon: Rocket, label: 'Projects Completed', value: 50, suffix: '+' },
    { icon: Trophy, label: 'Competitions Won', value: 25, suffix: '+' },
    { icon: Award, label: 'Achievements', value: 40, suffix: '+' },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Our Impact</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = stat.value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        setCount(stat.value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, stat.value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onViewportEnter={() => setIsVisible(true)}
      className="glass rounded-2xl p-8 card-hover text-center"
    >
      <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
      <div className="text-5xl font-bold gradient-text mb-2">
        {count}
        {stat.suffix}
      </div>
      <div className="text-gray-400 font-medium">{stat.label}</div>
    </motion.div>
  )
}
