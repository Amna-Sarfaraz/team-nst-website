'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

const featuredProjects = [
  {
    id: 1,
    title: 'AI-Powered Campus Assistant',
    description: 'An intelligent chatbot system to help students navigate campus life, find resources, and get instant answers to their queries.',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
    status: 'Completed',
    image: '/projects/ai-assistant.jpg',
  },
  {
    id: 2,
    title: 'Smart Parking System',
    description: 'IoT-based solution for efficient parking management using sensors and real-time data analytics.',
    tech: ['Arduino', 'IoT', 'MongoDB', 'Express'],
    status: 'In Progress',
    image: '/projects/smart-parking.jpg',
  },
  {
    id: 3,
    title: 'E-Learning Platform',
    description: 'Comprehensive online learning platform with interactive courses, quizzes, and peer-to-peer collaboration features.',
    tech: ['Next.js', 'PostgreSQL', 'WebRTC', 'AWS'],
    status: 'Completed',
    image: '/projects/elearning.jpg',
  },
]

export default function FeaturedProjects() {
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
          <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Featured Projects</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore some of our most innovative and impactful projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden card-hover group"
            >
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Completed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
                    <Github className="w-4 h-4" />
                    Code
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </button>
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
          className="text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-semibold"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
