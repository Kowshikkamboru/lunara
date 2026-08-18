import { useRef } from 'react';
import { motion } from 'motion/react';
import { SceneWrapper } from '../canvas/SceneWrapper';
import { HeroScene } from '../canvas/HeroScene';
import { FadeInView, FadeInItem } from '../FadeInView';

import { scrollTo } from '../../utils/scrollTo';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);


  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-night">
      {/* Eye Neural Image Integration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen flex items-center justify-center">
        <img 
          src="/eye_neu.png" 
          alt="Eye Neural Network" 
          // @ts-ignore
          fetchpriority="high"
          className="w-full h-full object-cover opacity-80 scale-105"
        />
      </div>

      {/* Interactive Neural Background */}
      <div className="absolute inset-0 z-0">
        <SceneWrapper>
          <HeroScene />
        </SceneWrapper>
      </div>
      
      {/* Sleek Theme Background Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-brand-cyan/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-violet/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Dark Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-night/80 via-brand-night/40 to-brand-night z-0 pointer-events-none" />

      {/* Content */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 flex flex-col items-center text-center pointer-events-none"
      >
        <FadeInView className="max-w-4xl flex flex-col items-center pointer-events-auto">
          <FadeInItem className="inline-block px-3.5 py-1 rounded-full border border-brand-cyan/30 text-[10px] sm:text-[11px] text-brand-cyan uppercase tracking-widest mb-6 bg-brand-cyan/5 backdrop-blur-md">
            Biological Signal Integrity
          </FadeInItem>
          
          <FadeInItem className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05] sm:leading-[0.95]">
            Signal over <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-cyan-200 to-brand-violet">
              stimulation.
            </span>
          </FadeInItem>
          
          <FadeInItem className="text-lg sm:text-xl md:text-2xl text-neutral-200 font-light mb-6 sm:mb-8">
            The last sense we take for granted.
          </FadeInItem>
          
          <FadeInItem className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2">
            The human visual system evolved under the rhythm of daylight and darkness. Modern screens deliver a continuous stream of blue-enriched light that overrides this rhythm, suppressing melatonin, disrupting circadian timing, and degrading the neural conditions required for sustained focus, emotional stability, and creative thought.
            <br /><br />
            <span className="text-neutral-200 font-medium">Lunara exists to restore the integrity of the signal between eye and brain.</span>
          </FadeInItem>

          <FadeInItem className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button 
              onClick={() => scrollTo('problem')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-sm text-xs sm:text-sm hover:bg-brand-cyan hover:text-black transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] cursor-pointer"
            >
              Explore the Science
            </button>
            <button 
              onClick={() => scrollTo('access')}
              className="w-full sm:w-auto px-8 py-3.5 border border-white/15 bg-white/[0.02] text-white font-semibold rounded-sm text-xs sm:text-sm hover:bg-white/10 hover:border-brand-cyan/40 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              Request Early Access
            </button>
          </FadeInItem>
        </FadeInView>
      </motion.div>
    </section>
  );
}
