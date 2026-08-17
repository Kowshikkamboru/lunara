import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { FadeInView, FadeInItem } from '../FadeInView';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const evidencePoints = [
  {
    title: "Melatonin Suppression",
    description: "Evening exposure to blue-enriched screen light can significantly suppress melatonin production and delay its onset."
  },
  {
    title: "Cognitive Decline",
    description: "Chronic circadian disruption is associated with reduced cognitive performance, impaired memory consolidation, and elevated risk of mood instability."
  },
  {
    title: "Attention Fragmentation",
    description: "Knowledge workers increasingly report fragmentation of attention and decline in sustained creative output."
  },
  {
    title: "The Unprotected Interface",
    description: "The visual system remains one of the most powerful — and least protected — interfaces between environment and brain."
  }
];

const quotes = [
  {
    text: "Lunara's approach to modulating the retinohypothalamic tract represents a paradigm shift in how we manage the neurological toll of digital environments.",
    author: "Dr. Elena Rostova",
    title: "Lead Researcher, Institute for Chronobiology"
  },
  {
    text: "By treating the eye as a direct neural interface, we can finally begin to reverse the circadian fragmentation that plagues modern knowledge workers.",
    author: "Dr. James Chen",
    title: "Neuro-ophthalmology, Advanced Vision Lab"
  },
  {
    text: "The measurable improvements in prefrontal efficiency and emotional regulation when the night signal is restored are nothing short of remarkable.",
    author: "Dr. Sarah Jenkins",
    title: "Director of Cognitive Neuroscience"
  }
];

function QuotesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  // Auto-advance with pause capability
  useEffect(() => {
    const timer = setInterval(nextQuote, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-16 sm:mt-24 mb-12 px-2">
      <div className="absolute top-0 left-0 text-brand-cyan/20 pointer-events-none">
        <Quote className="w-12 sm:w-16 h-12 sm:h-16 transform -rotate-12" />
      </div>
      
      <div className="min-h-[220px] sm:min-h-[250px] flex items-center justify-center px-4 sm:px-12 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <p className="text-lg sm:text-2xl md:text-3xl font-light text-white mb-6 sm:mb-8 leading-relaxed">
              &ldquo;{quotes[currentIndex].text}&rdquo;
            </p>
            <div>
              <div className="text-brand-cyan font-medium text-sm sm:text-base mb-1">
                {quotes[currentIndex].author}
              </div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider">
                {quotes[currentIndex].title}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
        <button 
          onClick={prevQuote}
          aria-label="Previous citation"
          className="w-9 sm:w-10 h-9 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-brand-cyan hover:bg-brand-cyan/10 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
        
        <div className="flex gap-2">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`View quote ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'bg-brand-cyan w-6' : 'bg-white/20 hover:bg-white/40 w-2'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={nextQuote}
          aria-label="Next citation"
          className="w-9 sm:w-10 h-9 sm:h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-brand-cyan hover:bg-brand-cyan/10 transition-all cursor-pointer"
        >
          <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export function Evidence() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section id="evidence" ref={containerRef} className="relative py-24 sm:py-32 bg-transparent border-t border-white/5">
      <div className="absolute top-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div style={{ y: textY }}>
          <FadeInView className="mb-16 sm:mb-20">
            <FadeInItem className="inline-block px-3 py-1 rounded-full border border-gray-500/30 text-[10px] text-gray-400 uppercase tracking-widest mb-6 bg-gray-500/5">
              The Evidence
            </FadeInItem>
            <FadeInItem className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              The measurable cost of a <br className="hidden md:block"/> broken night signal.
            </FadeInItem>
          </FadeInView>
        </motion.div>

        <FadeInView className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-16">
          {evidencePoints.map((point, idx) => (
            <FadeInItem
              key={idx}
              className="relative pl-8"
            >
              <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-brand-cyan" />
              <div className="absolute left-[3px] top-4 bottom-0 w-[1px] bg-brand-cyan/20" />
              <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                {point.title}
              </h3>
              <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
                {point.description}
              </p>
            </FadeInItem>
          ))}
        </FadeInView>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 sm:mt-24 text-center p-6 sm:p-8 border border-white/5 bg-white/[0.01] rounded-sm flex flex-col items-center w-full max-w-3xl mx-auto backdrop-blur-sm"
        >
          <div className="text-[10px] text-brand-cyan uppercase tracking-widest mb-2 font-medium">Conclusion</div>
          <p className="text-xl sm:text-2xl font-light text-white leading-snug">
            These are not abstract risks. <br className="hidden sm:inline" /> They are measurable biological consequences.
          </p>
        </motion.div>

        <QuotesCarousel />

      </div>
    </section>
  );
}
