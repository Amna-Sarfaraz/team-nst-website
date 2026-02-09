'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Award } from 'lucide-react';
import Card from '@/components/shared/Card';
import { formatDate } from '@/lib/utils';

export default function LatestUpdates() {
  const updates = [
    {
      type: 'event',
      icon: Calendar,
      title: 'Tech Talk: Future of AI',
      description: 'Join us for an insightful session on AI trends and applications',
      date: '2024-02-15',
      location: 'Main Auditorium',
    },
    {
      type: 'achievement',
      icon: Award,
      title: '1st Place at National Hackathon',
      description: 'Our team won the grand prize with their innovative IoT solution',
      date: '2024-02-10',
    },
    {
      type: 'workshop',
      icon: Users,
      title: 'Web Development Workshop',
      description: 'Learn modern web development with Next.js and React',
      date: '2024-02-20',
      location: 'Computer Lab',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-dark to-dark-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Latest <span className="gradient-text">Updates</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Stay informed about our recent activities and upcoming events
            </p>
          </motion.div>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.map((update, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <update.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatDate(update.date)}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold mb-2">
                      {update.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {update.description}
                    </p>
                  </div>

                  {update.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      {update.location}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission and Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card gradient className="space-y-4">
            <h3 className="font-display text-2xl font-bold">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To empower students with practical technology skills, foster innovation through
              collaborative projects, and build a community of passionate tech enthusiasts who
              can make a real-world impact.
            </p>
          </Card>

          <Card gradient className="space-y-4">
            <h3 className="font-display text-2xl font-bold">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              To be the leading technology society that bridges the gap between academic
              learning and industry requirements, producing skilled professionals who drive
              technological advancement in Pakistan and beyond.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
