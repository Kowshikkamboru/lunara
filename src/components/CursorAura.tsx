import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CursorAura() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Start off-screen
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);

  // Apply smooth spring physics for a fluid, floating trailing effect
  const springConfig = { damping: 40, stiffness: 150, mass: 0.8 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on devices with hover/pointer capabilities to avoid sticky touch cursors
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      // Offset by 300px to perfectly center the 600x600 aura on the cursor tip
      cursorX.set(e.clientX - 300);
      cursorY.set(e.clientY - 300);
    };

    const handleMouseOut = (e: MouseEvent) => {
      // Hide the aura when cursor leaves the window
      if (e.relatedTarget === null) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-[100] hidden md:block mix-blend-screen"
      style={{
        x,
        y,
        opacity: isVisible ? 1 : 0,
        // Soft cyan core radiating into deep violet and fading to transparent
        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, rgba(167,139,250,0.03) 30%, rgba(0,0,0,0) 65%)',
      }}
      transition={{ opacity: { duration: 0.8 } }}
    />
  );
}
