import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, Microscope, Brain, ArrowRight } from 'lucide-react';
import { FadeInView, FadeInItem } from '../FadeInView';

export function Solutions() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="solutions" ref={containerRef} className="relative py-32 bg-transparent overflow-hidden">
      {/* Background aesthetic */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
      >
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-brand-violet/10 rounded-full blur-[120px]"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeInView>
            <FadeInItem className="inline-block px-3 py-1 rounded-full border border-brand-violet/30 text-[10px] text-brand-violet uppercase tracking-widest mb-6 bg-brand-violet/5">
              Capabilities & Solutions
            </FadeInItem>
            <FadeInItem className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Restoring the biological signal.
            </FadeInItem>
            <FadeInItem className="text-xl text-neutral-400">
              Our clinical-grade interventions bridge the gap between human neurobiology and digital environments, protecting cognitive resilience at the source.
            </FadeInItem>
          </FadeInView>
        </div>

        {/* Bento Box Layout */}
        <FadeInView className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-16 max-w-7xl mx-auto">
          
          {/* Solution 1: Lunara Core */}
          <FadeInItem className="lg:col-span-7 p-8 rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-white/10 hover:border-brand-cyan/30 hover:bg-neutral-900/60 transition-all duration-500 group relative overflow-hidden flex flex-col shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/10 flex items-center justify-center shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]">
                  <Shield className="w-5 h-5 text-brand-cyan" />
                </div>
                <span className="text-xs font-mono text-brand-cyan tracking-wider uppercase border border-brand-cyan/20 px-3 py-1 rounded-full bg-brand-cyan/5">Enterprise Software</span>
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Lunara Core</h3>
              <p className="text-neutral-400 leading-relaxed text-base">
                A dynamic, system-level therapeutic filter that modulates screen emissions based on your local circadian phase and real-time biometric feedback. It filters precise spectral bands known to suppress melatonin without severely distorting visual color fidelity.
              </p>
            </div>

            {/* Premium Video Bezel */}
            <div className="relative z-10 mt-auto w-full aspect-video rounded-2xl p-2 bg-white/5 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
              <div className="w-full h-full rounded-xl overflow-hidden relative bg-black">
                <iframe 
                  src="https://videos.sproutvideo.com/embed/799fdab71e1be6c6f0/2e07ad296a240f16?playerTheme=dark&playerColor=af3fd3&ambient=true" 
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Mechanism of Disease Video"
                />
              </div>
            </div>
          </FadeInItem>

          {/* Solution 2: Lunara Diagnostics */}
          <FadeInItem className="lg:col-span-5 p-8 rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-white/10 hover:border-brand-violet/30 hover:bg-neutral-900/60 transition-all duration-500 group relative overflow-hidden flex flex-col shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-bl from-brand-violet/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-brand-violet/5 via-transparent to-transparent" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl border border-brand-violet/20 bg-brand-violet/10 flex items-center justify-center mb-8 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]">
                <Microscope className="w-5 h-5 text-brand-violet" />
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Lunara Diagnostics</h3>
              <p className="text-neutral-400 leading-relaxed text-base mb-6">
                Clinical assessment tools for monitoring retinal-cortical stress and circadian misalignment. Used by occupational health professionals to measure baseline cognitive fatigue and identify visual-perceptual disorders before they manifest physically.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Real-time Cortical Stress Analytics",
                  "Circadian Phase Alignment Tracking",
                  "Visual-Perceptual Threshold Testing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-neutral-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-violet mr-3 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-auto pt-8 border-t border-white/5">
                <a 
                  href="https://noravisionrehab.org/patients-caregivers/what-is-neuro-optometric-rehabilitation"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-brand-violet text-sm font-medium hover:text-white transition-colors cursor-pointer group/link bg-brand-violet/10 px-5 py-3 rounded-xl border border-brand-violet/20 hover:bg-brand-violet/20"
                >
                  View NORA Clinical Rehabilitation Data
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </FadeInItem>

          {/* Solution 3: Neuro-Optic Protocols */}
          <FadeInItem className="lg:col-span-12 p-8 md:p-10 rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-white/10 hover:border-brand-cyan/30 hover:bg-neutral-900/60 transition-all duration-500 group relative overflow-hidden flex flex-col lg:flex-row gap-10 items-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/5 via-transparent to-brand-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col lg:w-5/12 h-full justify-center">
              <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-6 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                <Brain className="w-5 h-5 text-white" />
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Neuro-Optic Recovery Protocols</h3>
              <p className="text-neutral-400 leading-relaxed text-base mb-8">
                Guided visual training and light-therapy recovery programs designed specifically for knowledge workers experiencing chronic attention fragmentation. These protocols retrain healthy patterns of neural activation to restore prefrontal efficiency.
              </p>
              
              <a 
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3116540/"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-white text-sm font-medium hover:text-brand-cyan transition-colors cursor-pointer group/link w-fit"
              >
                Learn about Visual-Neural Recovery
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="relative z-10 lg:w-7/12 w-full aspect-video rounded-2xl p-2 bg-white/5 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
              <div className="w-full h-full rounded-xl overflow-hidden relative bg-black">
                <iframe 
                  src="https://videos.sproutvideo.com/embed/449fdab71e18e7cdcd/33a518960f9a7410?playerTheme=dark&playerColor=af3fd3&ambient=true" 
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Neuro-Optic Recovery Video"
                />
              </div>
            </div>
          </FadeInItem>

        </FadeInView>
      </div>
    </section>
  );
}
