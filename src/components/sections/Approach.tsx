import { useRef } from 'react';
import { EyeBrainInteraction } from '../interactive/EyeBrainInteraction';
import { Activity, Eye, Zap, Search } from 'lucide-react';
import { FadeInView, FadeInItem } from '../FadeInView';
import { motion, useScroll, useTransform } from 'motion/react';

const pillars = [
  {
    icon: <Eye className="w-6 h-6 text-brand-cyan" />,
    title: "Spectral Intelligence",
    description: "Adaptive optical and digital environments calibrated to melanopic sensitivity curves and circadian phase. Light that informs rather than overwhelms."
  },
  {
    icon: <Activity className="w-6 h-6 text-brand-violet" />,
    title: "Closed-Loop Visual Training",
    description: "Real-time visual stimuli guided by biometric feedback. Protocols designed to retrain healthy patterns of neural activation and recovery."
  },
  {
    icon: <Zap className="w-6 h-6 text-brand-cyan" />,
    title: "Neuroprotective Support",
    description: "Targeted approaches that support retinal–cortical resilience under conditions of chronic visual load."
  },
  {
    icon: <Search className="w-6 h-6 text-brand-violet" />,
    title: "Signal Diagnostics",
    description: "Non-invasive methods for assessing visual-neural stress and circadian alignment, enabling precise and personalized intervention."
  }
];

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="approach" ref={sectionRef} className="relative py-32 bg-transparent border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeInView>
            <FadeInItem className="inline-block px-3 py-1 rounded-full border border-brand-cyan/30 text-[10px] text-brand-cyan uppercase tracking-widest mb-6 bg-brand-cyan/5">
              Research Area
            </FadeInItem>
            <FadeInItem className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Precision tools for a biological problem.
            </FadeInItem>
            <FadeInItem className="text-xl text-neutral-400">
              We develop interventions that respect the spectral, temporal, and neural realities of human light detection.
            </FadeInItem>
          </FadeInView>
        </div>

          <FadeInView>
            <EyeBrainInteraction />
          </FadeInView>

        {/* Pillars Grid */}
        <FadeInView className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <FadeInItem
              key={idx}
              className="p-8 rounded-sm bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full border-2 border-brand-cyan/20 flex items-center justify-center mb-6 bg-brand-cyan/5">
                {pillar.icon}
              </div>
              <h3 className="text-xl text-white font-medium mb-3">
                {pillar.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {pillar.description}
              </p>
            </FadeInItem>
          ))}
        </FadeInView>

      </div>
    </section>
  );
}
