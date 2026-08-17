import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FadeInView, FadeInItem } from '../FadeInView';

const applications = [
  "Research collaborations focused on visual-neural mechanisms and circadian health",
  "Enterprise programs supporting cognitive resilience in high-demand knowledge work",
  "Diagnostic and monitoring platforms for assessing signal integrity",
  "Development of therapeutic protocols grounded in spectral and neural science"
];

export function Applications() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

  return (
    <section id="applications" ref={containerRef} className="relative py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5">
            <motion.div style={{ y: textY }} className="h-full">
              <FadeInView className="sticky top-32">
              <FadeInItem className="inline-block px-3 py-1 rounded-full border border-brand-violet/30 text-[10px] text-brand-violet uppercase tracking-widest mb-6 bg-brand-violet/5">
                Applications
              </FadeInItem>
              <FadeInItem className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                From laboratory insight to lived clarity.
              </FadeInItem>
              <FadeInItem className="text-xl text-neutral-400 mb-8">
                Lunara works across research, clinical, and real-world environments to translate understanding of the eye–brain axis into practical outcomes.
              </FadeInItem>
            </FadeInView>
            </motion.div>
          </div>

          <FadeInView className="lg:col-span-7 space-y-4">
            {applications.map((app, idx) => (
              <FadeInItem
                key={idx}
                className="group p-8 rounded-sm bg-transparent border border-white/5 hover:border-brand-violet/30 transition-all duration-300 flex items-start gap-6 cursor-default"
              >
                <div className="mt-1 w-6 h-6 rounded-full border border-brand-violet/50 bg-brand-violet/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-3 h-3 text-brand-violet" />
                </div>
                <p className="text-lg text-neutral-300 group-hover:text-white transition-colors duration-300">
                  {app}
                </p>
              </FadeInItem>
            ))}
          </FadeInView>
          
        </div>
      </div>
    </section>
  );
}
