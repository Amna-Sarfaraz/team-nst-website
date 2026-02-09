'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Trophy, Award, Medal, Star, Download, ExternalLink } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: string
  image_url?: string
  certificate_url?: string
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [filteredAchievements, setFilteredAchievements] = useState<Achievement[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  useEffect(() => {
    filterAchievements()
  }, [selectedCategory, achievements])

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements')
      const data = await response.json()
      if (data.success) {
        setAchievements(data.data || [])
        setFilteredAchievements(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAchievements = () => {
    if (selectedCategory === 'All') {
      setFilteredAchievements(achievements)
    } else {
      setFilteredAchievements(achievements.filter((a) => a.category === selectedCategory))
    }
  }

  const categories = ['All', ...Array.from(new Set(achievements.map((a) => a.category)))]

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading achievements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
              Our Achievements
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Celebrating excellence, innovation, and success in technology
            </p>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Trophy, label: 'Total Awards', value: achievements.length, color: 'text-yellow-400' },
              { icon: Medal, label: 'First Place', value: achievements.filter(a => a.title.toLowerCase().includes('1st')).length, color: 'text-gold-400' },
              { icon: Award, label: 'Certifications', value: achievements.filter(a => a.certificate_url).length, color: 'text-blue-400' },
              { icon: Star, label: 'Categories', value: categories.length - 1, color: 'text-purple-400' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass rounded-2xl p-6 text-center card-hover"
              >
                <stat.icon className={`w-10 h-10 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}+</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 sticky top-20 bg-background/80 backdrop-blur-lg z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/50'
                    : 'bg-bg-card text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Gallery */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredAchievements.length === 0 ? (
            <div className="text-center py-16">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No achievements found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="glass rounded-2xl overflow-hidden card-hover group"
                >
                  {/* Achievement Image */}
                  <div className="h-56 bg-gradient-to-br from-primary/30 to-secondary/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Trophy className="w-24 h-24 text-primary/50" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/50">
                        {achievement.category}
                      </span>
                    </div>
                  </div>

                  {/* Achievement Info */}
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(achievement.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {achievement.description}
                    </p>

                    {/* Actions */}
                    {achievement.certificate_url && (
                      <div className="flex gap-3">
                        <a
                          href={achievement.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-primary/30"
                        >
                          <Download className="w-4 h-4" />
                          Certificate
                        </a>
                        <button className="flex items-center justify-center gap-2 bg-bg-card hover:bg-bg-card-hover text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors border border-white/10">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4 gradient-text">
              Recognition & Awards
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our dedication to excellence has been recognized by leading organizations and institutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Best Tech Society 2025',
                org: 'Higher Education Commission',
                description: 'Recognized for outstanding contribution to technology education',
              },
              {
                title: 'Innovation Excellence Award',
                org: 'Pakistan Engineering Council',
                description: 'Awarded for innovative projects and research initiatives',
              },
              {
                title: 'Community Impact Award',
                org: 'NED University',
                description: 'Honored for positive impact on student community',
              },
            ].map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-6 card-hover"
              >
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
                <p className="text-primary text-sm font-semibold mb-3">{award.org}</p>
                <p className="text-gray-400 text-sm">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center glass-strong rounded-2xl p-12"
        >
          <Star className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-display font-bold mb-6 gradient-text">
            Be Part of Our Success Story
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join TEAM NST and contribute to our legacy of excellence and achievement
          </p>
          <a href="/join" className="btn-primary inline-flex items-center gap-2">
            Join Our Team
            <Trophy className="w-5 h-5" />
          </a>
        </motion.div>
      </section>
    </div>
  )
}
