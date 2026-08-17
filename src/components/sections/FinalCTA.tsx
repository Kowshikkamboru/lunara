import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SceneWrapper } from '../canvas/SceneWrapper';
import { FinalScene } from '../canvas/FinalScene';
import { FadeInView, FadeInItem } from '../FadeInView';

export function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="access" ref={containerRef} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-t border-white/5">
      {/* Canvas Background */}
      <div className="absolute inset-0 z-0">
        <SceneWrapper>
          <FinalScene />
        </SceneWrapper>
      </div>
      
      {/* Sleek Theme Background Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-violet/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-brand-night/60 backdrop-blur-[2px] z-0 pointer-events-none" />

      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <FadeInView className="flex flex-col items-center">
          <FadeInItem className="inline-block px-3 py-1 rounded-full border border-brand-violet/30 text-[10px] text-brand-violet uppercase tracking-widest mb-6 bg-brand-violet/5">
            Phase 01
          </FadeInItem>
          <FadeInItem className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Begin the restoration.
          </FadeInItem>
          
          <FadeInItem className="text-xl md:text-2xl text-neutral-300 font-light mb-12 max-w-2xl mx-auto">
            The neural night is not permanently lost. <br />
            The signal between eye and brain can be understood, protected, and restored.
          </FadeInItem>

          <FadeInItem className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-sm text-sm hover:bg-brand-cyan hover:text-white transition-colors duration-300">
              Talk to Our Team
            </button>
            <button 
              onClick={() => scrollTo('evidence')}
              className="w-full sm:w-auto px-8 py-3 border border-neutral-700 font-semibold rounded-sm text-sm hover:bg-neutral-800 transition-colors duration-300"
            >
              Read the Research
            </button>
          </FadeInItem>
          
          <FadeInItem className="text-sm text-neutral-500">
            Early research partnerships and pilot programs now open.
          </FadeInItem>
        </FadeInView>
      </motion.div>
    </section>
  );
}
