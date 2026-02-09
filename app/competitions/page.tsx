'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Trophy, Calendar, MapPin, Users, Award, Medal, Search, Filter } from 'lucide-react'
import Link from 'next/link'

interface Competition {
  id: string
  title: string
  description: string
  date: string
  location: string
  category: string
  result?: string
  team_members: string[]
  image_url?: string
  is_upcoming: boolean
}

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [filteredCompetitions, setFilteredCompetitions] = useState<Competition[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'All' | 'Upcoming' | 'Past'>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompetitions()
  }, [])

  useEffect(() => {
    filterCompetitions()
  }, [searchTerm, filterType, competitions])

  const fetchCompetitions = async () => {
    try {
      const response = await fetch('/api/competitions')
      const data = await response.json()
      if (data.success) {
        setCompetitions(data.data || [])
        setFilteredCompetitions(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching competitions:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterCompetitions = () => {
    let filtered = competitions

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (comp) =>
          comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comp.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by type
    if (filterType === 'Upcoming') {
      filtered = filtered.filter((comp) => comp.is_upcoming)
    } else if (filterType === 'Past') {
      filtered = filtered.filter((comp) => !comp.is_upcoming)
    }

    setFilteredCompetitions(filtered)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading competitions...</p>
        </div>
      </div>
    )
  }

  const upcomingCount = competitions.filter(c => c.is_upcoming).length
  const pastCount = competitions.filter(c => !c.is_upcoming).length
  const winsCount = competitions.filter(c => c.result && c.result.toLowerCase().includes('1st')).length

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
              Competitions
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Showcasing our competitive spirit and achievements in national and international tech competitions
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="glass rounded-2xl p-6 text-center">
              <Trophy className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{winsCount}+</div>
              <div className="text-gray-400">First Place Wins</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <Calendar className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{upcomingCount}</div>
              <div className="text-gray-400">Upcoming Events</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <Award className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{pastCount}+</div>
              <div className="text-gray-400">Competitions Entered</div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search competitions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-bg-card border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                  {(['All', 'Upcoming', 'Past'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        filterType === type
                          ? 'bg-primary text-white'
                          : 'bg-bg-card text-gray-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitions Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredCompetitions.length === 0 ? (
            <div className="text-center py-16">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No competitions found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompetitions.map((competition, index) => (
                <motion.div
                  key={competition.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="glass rounded-2xl overflow-hidden card-hover group"
                >
                  {/* Competition Image/Header */}
                  <div className="h-48 bg-gradient-to-br from-primary/30 to-secondary/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
                    <div className="absolute top-4 right-4">
                      {competition.is_upcoming ? (
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/50">
                          Upcoming
                        </span>
                      ) : competition.result ? (
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/50 flex items-center gap-1">
                          <Medal className="w-3 h-3" />
                          {competition.result}
                        </span>
                      ) : (
                        <span className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-xs font-semibold border border-gray-500/50">
                          Completed
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/50">
                        {competition.category}
                      </span>
                    </div>
                  </div>

                  {/* Competition Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors line-clamp-2">
                      {competition.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {competition.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        {new Date(competition.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        {competition.location}
                      </div>
                      {competition.team_members.length > 0 && (
                        <div className="flex items-center text-sm text-gray-400">
                          <Users className="w-4 h-4 mr-2 text-primary" />
                          {competition.team_members.length} Team Members
                        </div>
                      )}
                    </div>

                    {/* Team Members */}
                    {competition.team_members.length > 0 && (
                      <div className="border-t border-white/10 pt-4">
                        <div className="text-xs text-gray-500 mb-2">Team:</div>
                        <div className="flex flex-wrap gap-2">
                          {competition.team_members.slice(0, 3).map((member, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-bg-card px-2 py-1 rounded text-gray-300"
                            >
                              {member}
                            </span>
                          ))}
                          {competition.team_members.length > 3 && (
                            <span className="text-xs bg-bg-card px-2 py-1 rounded text-gray-300">
                              +{competition.team_members.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Achievements Highlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Notable Achievements</h2>
            <p className="text-gray-400 text-lg">Some of our proudest moments in competitive tech events</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { place: '1st', event: 'National AI Hackathon 2025', category: 'Machine Learning' },
              { place: '2nd', event: 'Pakistan Robotics Challenge', category: 'Robotics' },
              { place: '1st', event: 'Web Development Sprint', category: 'Web Development' },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-8 text-center card-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{achievement.place} Place</div>
                <h3 className="text-lg font-semibold text-white mb-2">{achievement.event}</h3>
                <p className="text-sm text-gray-400">{achievement.category}</p>
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
          <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-display font-bold mb-6 gradient-text">
            Join Our Winning Team
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be part of TEAM NST's competitive journey and represent NED at national and international events
          </p>
          <Link href="/join" className="btn-primary inline-flex items-center gap-2">
            Apply Now
            <Trophy className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
