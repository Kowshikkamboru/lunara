import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Twitter, Linkedin, Mail, CheckCircle2 } from 'lucide-react';

const socialProof = [
  "Supported by NIH",
  "Clinical Trials Phase II",
  "Nature Neuroscience Featured",
  "ISO 13485 Certified"
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function Footer() {
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-transparent border-t border-white/5 pt-20 pb-10 relative z-10 overflow-hidden">
      {/* Background glow for premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Social Proof Sequence */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 mb-20 border-b border-white/5 pb-12"
        >
          {socialProof.map((proof, idx) => (
            <motion.div key={idx} variants={itemVariants} className="text-[11px] text-neutral-500 uppercase tracking-widest font-medium flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan/40" />
              {proof}
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-1 pr-4">
            <div 
              className="flex items-center gap-2 mb-6 cursor-pointer"
              onClick={() => scrollTo('hero')}
            >
              <div className="w-8 h-8 rounded-full border-2 border-brand-cyan flex items-center justify-center">
                <div className="w-1 h-4 bg-brand-cyan rotate-45"></div>
              </div>
              <span className="text-xl font-semibold tracking-tighter text-white">
                LUNARA
              </span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Modern light broke the neural night signal between our eyes and brain. 
              Lunara is rebuilding that interface.
            </p>
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }} 
              className="flex gap-4"
            >
              <motion.a 
                variants={itemVariants} 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
              <motion.a 
                variants={itemVariants} 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
              <motion.a 
                variants={itemVariants} 
                href="mailto:contact@lunarabio.com" 
                aria-label="Contact Email"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:text-brand-cyan hover:bg-brand-cyan/10 transition-all"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>

          {/* Platform / Links */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-[10px]">Platform</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollTo('problem')} className="text-sm text-neutral-400 hover:text-brand-cyan transition-colors text-left">The Central Problem</button>
              </li>
              <li>
                <button onClick={() => scrollTo('approach')} className="text-sm text-neutral-400 hover:text-brand-cyan transition-colors text-left">Scientific Approach</button>
              </li>
              <li>
                <button onClick={() => scrollTo('applications')} className="text-sm text-neutral-400 hover:text-brand-cyan transition-colors text-left">Clinical Applications</button>
              </li>
              <li>
                <button onClick={() => scrollTo('evidence')} className="text-sm text-neutral-400 hover:text-brand-cyan transition-colors text-left">Research & Evidence</button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-[10px]">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('approach'); }} className="text-sm text-neutral-400 hover:text-brand-cyan transition-colors">About Us</a>
              </li>
              <li>
                <a href="#partners" onClick={(e) => { e.preventDefault(); scrollTo('evidence'); }} className="text-sm text-neutral-400 hover:text-brand-cyan transition-colors">Research Partners</a>
              </li>
              <li>
                <a href="#press" onClick={(e) => { e.preventDefault(); scrollTo('evidence'); }} className="text-sm text-neutral-400 hover:text-brand-cyan transition-colors">Press & Media</a>
              </li>
              <li>
                <a href="#careers" onClick={(e) => { e.preventDefault(); scrollTo('access'); }} className="text-sm text-neutral-400 hover:text-brand-cyan transition-colors">Careers & Research Fellowships</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Early Access */}
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-[10px]">Research Updates</h4>
            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
              Subscribe to receive our latest peer-reviewed findings on circadian health and visual-neural mechanisms.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative rounded-sm">
              <div className={`relative rounded-sm transition-all duration-500 ${
                isFocused ? 'shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'shadow-none'
              }`}>
                <div className={`absolute inset-0 rounded-sm bg-gradient-to-r from-brand-cyan to-brand-violet opacity-0 transition-opacity duration-500 pointer-events-none blur-md ${isFocused ? 'opacity-40' : 'opacity-0'}`} />
                <div className={`relative flex gap-2 p-1 rounded-sm border transition-colors duration-500 bg-transparent z-10 ${
                  isFocused ? 'border-brand-cyan/50' : 'border-white/10'
                }`}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    required
                    aria-label="Email address for research updates"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder:text-neutral-600"
                  />
                  <button 
                    type="submit"
                    aria-label="Subscribe to updates"
                    className={`px-4 py-2 rounded-sm transition-colors flex items-center justify-center shrink-0 ${
                      isFocused ? 'bg-brand-cyan text-brand-night hover:bg-white' : 'bg-white/10 text-white hover:bg-brand-cyan hover:text-brand-night'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {isSubmitted && (
                <div className="flex items-center gap-2 mt-2 text-xs text-brand-cyan font-medium animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Thank you. You're subscribed to research updates.</span>
                </div>
              )}
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Lunara Biotechnology Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-xs text-neutral-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="text-xs text-neutral-500 hover:text-white transition-colors">Terms of Service</a>
            <a href="#cookies" onClick={(e) => e.preventDefault()} className="text-xs text-neutral-500 hover:text-white transition-colors">Security & Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
