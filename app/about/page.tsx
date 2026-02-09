'use client'

import { motion } from 'framer-motion'
import { Users, Award, Target, Heart } from 'lucide-react'

const teamStructure = [
  {
    role: 'President',
    members: [{ name: 'John Doe', department: 'Computer Science' }],
  },
  {
    role: 'Vice President',
    members: [{ name: 'Jane Smith', department: 'Software Engineering' }],
  },
  {
    role: 'Technical Lead',
    members: [
      { name: 'Ali Ahmed', department: 'Computer Science' },
      { name: 'Sarah Khan', department: 'Software Engineering' },
    ],
  },
  {
    role: 'Event Coordinators',
    members: [
      { name: 'Hassan Ali', department: 'Computer Science' },
      { name: 'Fatima Noor', department: 'Software Engineering' },
    ],
  },
]

const mentors = [
  { name: 'Dr. Muhammad Asif', title: 'Faculty Advisor', department: 'CS Department' },
  { name: 'Engr. Ayesha Rahman', title: 'Technical Mentor', department: 'SE Department' },
]

const values = [
  {
    icon: Target,
    title: 'Innovation',
    description: 'We constantly push boundaries and embrace new technologies to solve real-world problems.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and knowledge sharing to achieve extraordinary results.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain high standards in everything we do, from projects to competitions.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Our love for technology drives us to learn, create, and inspire others.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
              About TEAM NST
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We are a passionate community of innovators, builders, and tech enthusiasts
              dedicated to advancing technology education at NED University.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl font-display font-bold mb-6 gradient-text">Our Story</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Founded in 2010, TEAM NST (NED Society of Technology) began as a small group of
                tech enthusiasts who wanted to create a platform for innovation and learning at
                NED University of Engineering & Technology.
              </p>
              <p>
                Over the years, we've grown into one of the most active and successful student
                societies at the university, with over 150 active members and dozens of successful
                projects, competitions, and events under our belt.
              </p>
              <p>
                Today, TEAM NST stands as a testament to what passion, dedication, and collaboration
                can achieve. We continue to push boundaries, inspire innovation, and prepare the
                next generation of technology leaders.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Our Values</h2>
            <p className="text-gray-400 text-lg">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 text-center card-hover"
              >
                <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Team Structure</h2>
            <p className="text-gray-400 text-lg">Meet the leaders driving our mission forward</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamStructure.map((section, index) => (
              <motion.div
                key={section.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{section.role}</h3>
                <div className="space-y-3">
                  {section.members.map((member) => (
                    <div key={member.name} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{member.name}</div>
                        <div className="text-sm text-gray-400">{member.department}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4 gradient-text">Our Mentors</h2>
            <p className="text-gray-400 text-lg">Guided by the best in the field</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-8 text-center card-hover"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white">
                  {mentor.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{mentor.name}</h3>
                <p className="text-primary font-semibold mb-1">{mentor.title}</p>
                <p className="text-gray-400 text-sm">{mentor.department}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
