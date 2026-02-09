'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from '@/components/shared/Button';
import { ArrowRight, Code, Zap, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-20" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark" />

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <Zap className="w-4 h-4" />
            <span>NED University's Premier Tech Society</span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold">
              <span className="block">Innovation Through</span>
              <span className="gradient-text">Technology</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              TEAM NST empowers students to build, learn, and innovate with cutting-edge
              technology and collaborative projects
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Join Our Team
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="secondary">
                Explore Projects
              </Button>
            </Link>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            {[
              {
                icon: Code,
                title: 'Hands-On Projects',
                description: 'Build real-world applications and solutions',
              },
              {
                icon: Users,
                title: 'Expert Mentorship',
                description: 'Learn from experienced industry professionals',
              },
              {
                icon: Zap,
                title: 'Cutting-Edge Tech',
                description: 'Work with the latest technologies and tools',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass p-6 rounded-xl space-y-3 hover:bg-white/10 transition-all group"
              >
                <feature.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
