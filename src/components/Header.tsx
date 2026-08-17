import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-brand-night/85 backdrop-blur-xl py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollTo('hero')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && scrollTo('hero')}
          >
            <div className="w-8 h-8 rounded-full border-2 border-brand-cyan flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              <div className="w-1 h-4 bg-brand-cyan rotate-45"></div>
            </div>
            <span className="text-xl font-semibold tracking-tighter text-white">
              LUNARA
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
            <button onClick={() => scrollTo('problem')} className="hover:text-brand-cyan transition-colors cursor-pointer">The Problem</button>
            <button onClick={() => scrollTo('approach')} className="hover:text-brand-cyan transition-colors cursor-pointer">Science & Tech</button>
            <button onClick={() => scrollTo('applications')} className="hover:text-brand-cyan transition-colors cursor-pointer">Applications</button>
            <button onClick={() => scrollTo('evidence')} className="hover:text-brand-cyan transition-colors cursor-pointer">Research</button>
          </nav>

          <div className="hidden md:flex items-center">
            <button 
              onClick={() => scrollTo('access')} 
              className="px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm bg-white text-brand-night hover:bg-brand-cyan hover:text-brand-night transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer"
            >
              Access
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2 focus:outline-none focus:ring-1 focus:ring-brand-cyan rounded-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-brand-night/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24"
          >
            <nav className="flex flex-col gap-6 text-2xl font-display mt-8">
              <button onClick={() => scrollTo('problem')} className="text-left text-white hover:text-brand-cyan transition-colors border-b border-white/5 pb-4">The Problem</button>
              <button onClick={() => scrollTo('approach')} className="text-left text-white hover:text-brand-cyan transition-colors border-b border-white/5 pb-4">Scientific Approach</button>
              <button onClick={() => scrollTo('applications')} className="text-left text-white hover:text-brand-cyan transition-colors border-b border-white/5 pb-4">Applications</button>
              <button onClick={() => scrollTo('evidence')} className="text-left text-white hover:text-brand-cyan transition-colors border-b border-white/5 pb-4">Research & Evidence</button>
              <button onClick={() => scrollTo('access')} className="text-left text-brand-cyan hover:text-white transition-colors pt-2">Request Early Access</button>
            </nav>

            <div className="text-xs text-neutral-500 pb-6 border-t border-white/5 pt-4">
              Lunara Biotechnology &bull; Restoring Biological Signal Integrity
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
