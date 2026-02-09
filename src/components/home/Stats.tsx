'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, FolderGit2, Trophy, Award } from 'lucide-react';

interface StatData {
  icon: any;
  value: number;
  label: string;
  suffix?: string;
}

export default function Stats() {
  const [stats, setStats] = useState<StatData[]>([
    { icon: Users, value: 0, label: 'Active Members', suffix: '+' },
    { icon: FolderGit2, value: 0, label: 'Projects Completed', suffix: '+' },
    { icon: Trophy, value: 0, label: 'Competitions Won', suffix: '+' },
    { icon: Award, value: 0, label: 'Achievements', suffix: '+' },
  ]);

  useEffect(() => {
    // Fetch actual stats from API
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        if (data.success) {
          setStats([
            { icon: Users, value: data.data.members || 150, label: 'Active Members', suffix: '+' },
            { icon: FolderGit2, value: data.data.projects || 45, label: 'Projects Completed', suffix: '+' },
            { icon: Trophy, value: data.data.competitions || 25, label: 'Competitions Won', suffix: '+' },
            { icon: Award, value: data.data.achievements || 30, label: 'Achievements', suffix: '+' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Use default values
        setStats([
          { icon: Users, value: 150, label: 'Active Members', suffix: '+' },
          { icon: FolderGit2, value: 45, label: 'Projects Completed', suffix: '+' },
          { icon: Trophy, value: 25, label: 'Competitions Won', suffix: '+' },
          { icon: Award, value: 30, label: 'Achievements', suffix: '+' },
        ]);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-transparent to-dark-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-6 md:p-8 rounded-xl text-center space-y-4 hover:bg-white/10 transition-all group"
            >
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <div className="font-display text-4xl md:text-5xl font-bold gradient-text">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm md:text-base text-gray-400 mt-2">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
