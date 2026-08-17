import { useRef } from 'react';
import { motion } from 'motion/react';
import { DeviceSequence } from '../interactive/DeviceSequence';
import { FadeInView, FadeInItem } from '../FadeInView';

export function Problem() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section id="problem" ref={containerRef} className="relative py-32 overflow-hidden bg-brand-night">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div>
            <FadeInView margin="-100px">
            <FadeInItem className="inline-block px-3 py-1 rounded-full border border-brand-cyan/30 text-[10px] text-brand-cyan uppercase tracking-widest mb-6 bg-brand-cyan/5">
              The Problem
            </FadeInItem>
            
            <FadeInItem className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-tight">
              The eye is the highest-bandwidth neural interface.
            </FadeInItem>
            
            <FadeInItem className="space-y-6 text-neutral-400 text-lg leading-relaxed">
              <p>
                Light does more than form images. A specialized population of retinal cells — intrinsically photosensitive retinal ganglion cells — projects directly to the brain's master clock via the retinohypothalamic tract.
              </p>
              <p>
                When this pathway is exposed to artificial blue light at biologically inappropriate times, the consequences are systemic: melatonin suppression, circadian fragmentation, reduced prefrontal efficiency, and measurable impairment in cognitive flexibility, working memory, and emotional regulation.
              </p>
              <p className="font-medium text-neutral-200">
                What begins as visual overload becomes a distributed neural problem.
              </p>
            </FadeInItem>
            
            <FadeInItem className="mt-12 pl-6 border-l border-brand-cyan/30">
              <p className="text-xl text-white font-medium">
                Lunara addresses the signal at its source.
              </p>
            </FadeInItem>
          </FadeInView>
          </motion.div>
          
          {/* Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full relative"
          >
            <DeviceSequence />
          </motion.div>
        
        </div>
      </div>
    </section>
  );
}
