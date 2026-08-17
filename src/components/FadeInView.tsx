import { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
  margin?: string;
}

export function FadeInView({ 
  children, 
  className = "", 
  staggerDelay = 0.2, 
  delay = 0,
  margin = "-100px"
}: FadeInViewProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
        delayChildren: delay + 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: margin as any }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FadeInItemProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
}

export function FadeInItem({ children, className = "", yOffset = 20 }: FadeInItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
