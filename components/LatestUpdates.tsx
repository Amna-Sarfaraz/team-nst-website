'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Trophy } from 'lucide-react'
import Link from 'next/link'

const updates = [
  {
    id: 1,
    type: 'event',
    title: 'Tech Talk: Introduction to Machine Learning',
    date: '2026-02-15',
    location: 'Main Auditorium',
    icon: Calendar,
  },
  {
    id: 2,
    type: 'competition',
    title: 'TEAM NST Wins National Hackathon',
    date: '2026-02-01',
    description: 'First place in the AI category',
    icon: Trophy,
  },
  {
    id: 3,
    type: 'recruitment',
    title: 'New Member Recruitment Drive',
    date: '2026-02-20',
    location: 'CS Department',
    icon: Users,
  },
]

export default function LatestUpdates() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Latest Updates</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay informed about our recent activities and upcoming events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 card-hover cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <update.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{update.title}</h3>
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(update.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  {update.location && (
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      {update.location}
                    </div>
                  )}
                  {update.description && (
                    <p className="text-sm text-gray-400 mt-2">{update.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            href="/events"
            className="text-primary hover:text-secondary transition-colors font-semibold"
          >
            View All Events →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
