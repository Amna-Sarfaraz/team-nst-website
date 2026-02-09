'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, MapPin, Users, Clock, Filter, Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  event_type: 'Workshop' | 'Seminar' | 'Hackathon' | 'Meetup' | 'Other'
  max_participants?: number
  registered_count: number
  image_url?: string
  is_upcoming: boolean
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'All' | 'Upcoming' | 'Past'>('All')
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [searchTerm, filterType, eventTypeFilter, events])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      if (data.success) {
        setEvents(data.data || [])
        setFilteredEvents(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterEvents = () => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterType === 'Upcoming') {
      filtered = filtered.filter((event) => event.is_upcoming)
    } else if (filterType === 'Past') {
      filtered = filtered.filter((event) => !event.is_upcoming)
    }

    if (eventTypeFilter !== 'All') {
      filtered = filtered.filter((event) => event.event_type === eventTypeFilter)
    }

    setFilteredEvents(filtered)
  }

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Workshop: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      Seminar: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      Hackathon: 'bg-red-500/20 text-red-400 border-red-500/50',
      Meetup: 'bg-green-500/20 text-green-400 border-green-500/50',
      Other: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
    }
    return colors[type] || colors.Other
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading events...</p>
        </div>
      </div>
    )
  }

  const upcomingEvents = events.filter((e) => e.is_upcoming)
  const pastEvents = events.filter((e) => !e.is_upcoming)

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
              Events & Workshops
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join us for inspiring tech talks, hands-on workshops, and networking opportunities
            </p>
          </motion.div>

          {/* Event Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="glass rounded-2xl p-6 text-center">
              <CalendarIcon className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{upcomingEvents.length}</div>
              <div className="text-gray-400">Upcoming Events</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <Users className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-gray-400">Total Participants</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{pastEvents.length}+</div>
              <div className="text-gray-400">Events Conducted</div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-bg-card border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex gap-2 flex-1">
                  {(['All', 'Upcoming', 'Past'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                        filterType === type
                          ? 'bg-primary text-white'
                          : 'bg-bg-card text-gray-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <select
                  value={eventTypeFilter}
                  onChange={(e) => setEventTypeFilter(e.target.value)}
                  className="bg-bg-card border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="All">All Types</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Meetup">Meetup</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No events found matching your criteria.</p>
            </div>
          ) : (
            <>
              {/* Upcoming Events */}
              {filteredEvents.filter((e) => e.is_upcoming).length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-display font-bold mb-8 gradient-text">
                    Upcoming Events
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents
                      .filter((e) => e.is_upcoming)
                      .map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                      ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {filteredEvents.filter((e) => !e.is_upcoming).length > 0 && (
                <div>
                  <h2 className="text-3xl font-display font-bold mb-8 text-gray-400">
                    Past Events
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents
                      .filter((e) => !e.is_upcoming)
                      .map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} isPast />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-card/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center glass-strong rounded-2xl p-12"
        >
          <CalendarIcon className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-display font-bold mb-6 gradient-text">
            Stay Updated on Events
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join TEAM NST to get notified about upcoming workshops, seminars, and tech events
          </p>
          <Link href="/join" className="btn-primary inline-flex items-center gap-2">
            Join Our Community
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

function EventCard({ event, index, isPast = false }: { event: Event; index: number; isPast?: boolean }) {
  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Workshop: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      Seminar: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      Hackathon: 'bg-red-500/20 text-red-400 border-red-500/50',
      Meetup: 'bg-green-500/20 text-green-400 border-green-500/50',
      Other: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
    }
    return colors[type] || colors.Other
  }

  const spotsLeft = event.max_participants ? event.max_participants - event.registered_count : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`glass rounded-2xl overflow-hidden card-hover group ${isPast ? 'opacity-75' : ''}`}
    >
      {/* Event Header */}
      <div className="h-48 bg-gradient-to-br from-primary/30 to-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEventTypeColor(event.event_type)}`}>
            {event.event_type}
          </span>
          {!isPast && spotsLeft && spotsLeft > 0 && spotsLeft <= 10 && (
            <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold border border-red-500/50">
              {spotsLeft} spots left
            </span>
          )}
        </div>
      </div>

      {/* Event Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
            {new Date(event.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Users className="w-4 h-4 mr-2 text-primary" />
            {event.registered_count} registered
            {event.max_participants && ` / ${event.max_participants} max`}
          </div>
        </div>

        {/* Register Button */}
        {!isPast && (
          <button className="w-full btn-primary text-sm py-2">
            Register Now
          </button>
        )}
        {isPast && (
          <div className="text-center text-sm text-gray-500 py-2">
            Event Completed
          </div>
        )}
      </div>
    </motion.div>
  )
}
