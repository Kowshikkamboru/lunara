import { useEffect } from 'react';
import Lenis from 'lenis';

export let lenis: Lenis | null = null;

export const scrollTo = (id: string, offset = -80) => {
  const element = document.getElementById(id);
  if (element && lenis) {
    lenis.scrollTo(element, { 
      offset, 
      lerp: 0.08, // Use physics-based linear interpolation
    });
  } else if (element) {
    // Fallback if lenis is not initialized
    const y = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

export function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with physics-based buttery scroll parameters
    lenis = new Lenis({
      lerp: 0.08, // The lower the value, the smoother/heavier the scroll
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly slow down the mouse wheel for elegance
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
