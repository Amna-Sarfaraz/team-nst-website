'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  hover = true,
  glass = false,
  gradient = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'rounded-xl p-6 transition-all duration-300',
        glass && 'glass',
        gradient && 'bg-gradient-to-br from-primary/10 to-transparent',
        !glass && !gradient && 'bg-white/5 border border-white/10',
        hover && 'hover:shadow-xl hover:shadow-primary/10 cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
