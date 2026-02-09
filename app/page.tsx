'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AnimatedBackground from '@/components/AnimatedBackground'
import StatsSection from '@/components/StatsSection'
import FeaturedProjects from '@/components/FeaturedProjects'
import LatestUpdates from '@/components/LatestUpdates'
import { ArrowRight, Users, Trophy, Rocket } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-display font-bold mb-6">
                <span className="gradient-text">TEAM NST</span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 font-light mb-4">
                NED Society of Technology
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Empowering innovation through cutting-edge technology, fostering collaboration, 
              and building the next generation of tech leaders at NED University.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/join" className="btn-primary inline-flex items-center gap-2">
                Join Our Team
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/projects" className="btn-secondary inline-flex items-center gap-2">
                View Projects
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { icon: Users, label: 'Active Members', value: '150+' },
                { icon: Rocket, label: 'Projects Completed', value: '50+' },
                { icon: Trophy, label: 'Competitions Won', value: '25+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="glass rounded-2xl p-6 card-hover"
                >
                  <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div className="glass-strong rounded-2xl p-8 card-hover">
              <h2 className="text-3xl font-display font-bold mb-6 gradient-text">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                To cultivate a vibrant community of technology enthusiasts, providing them with 
                opportunities to learn, innovate, and excel in their technical pursuits. We strive 
                to bridge the gap between academic knowledge and real-world applications through 
                hands-on projects, competitions, and collaborative initiatives.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-8 card-hover">
              <h2 className="text-3xl font-display font-bold mb-6 gradient-text">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                To be recognized as the leading technology society in Pakistan, nurturing future 
                tech leaders who will drive innovation and contribute to solving global challenges. 
                We envision a future where every member of TEAM NST becomes a catalyst for 
                technological advancement and positive change.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <StatsSection />

      {/* Latest Updates Section */}
      <LatestUpdates />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center glass-strong rounded-2xl p-12"
        >
          <h2 className="text-4xl font-display font-bold mb-6 gradient-text">
            Ready to Join the Innovation?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Become part of a community that's shaping the future of technology
          </p>
          <Link href="/join" className="btn-primary inline-flex items-center gap-2">
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
