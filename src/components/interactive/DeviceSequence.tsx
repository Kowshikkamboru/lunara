import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Monitor, Eye } from 'lucide-react';

export function DeviceSequence() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.65;
      videoRef.current.play().then(() => {
        setVideoLoaded(true);
      }).catch(() => {
        setVideoLoaded(false);
      });
    }
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] bg-black rounded-3xl border border-white/10 relative overflow-hidden flex items-center justify-center shadow-2xl shadow-brand-cyan/5">
       {/* Cinematic Video Background */}
       <div className="absolute inset-0 z-0 overflow-hidden">
         <video 
           ref={videoRef}
           autoPlay 
           loop 
           muted 
           playsInline
           onCanPlay={() => setVideoLoaded(true)}
           className={`w-full h-full object-cover transition-opacity duration-1000 ${
             videoLoaded ? 'opacity-40' : 'opacity-0'
           } mix-blend-screen`}
           style={{ filter: "contrast(1.2) brightness(0.9)" }}
         >
           <source src="/hero-bg.mp4" type="video/mp4" />
         </video>
       </div>
       
       {/* Dark overlay for contrast */}
       <div className="absolute inset-0 bg-gradient-to-t from-brand-night/80 via-brand-night/20 to-brand-night/60 z-0 pointer-events-none" />

       {/* Ambient Glows */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-violet/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
       
       {/* Grid overlay */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

       <motion.div className="relative w-full h-full flex items-center justify-center">
          
          {/* Phone Phase */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            animate={{
               opacity: [0, 1, 1, 0, 0, 0, 0],
               scale: [0.8, 1, 1.5, 2, 2, 2, 2]
            }}
            transition={{ duration: 12, repeat: Infinity, times: [0, 0.05, 0.28, 0.33, 0.34, 1, 1], ease: "easeInOut" }}
          >
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-150"></div>
                <Smartphone size={100} className="text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.6)] relative z-10 stroke-[1.5]" />
             </div>
             <div className="text-white font-medium tracking-wide text-center bg-black/40 px-6 py-3 rounded-full border border-white/5 backdrop-blur-md">
                Mobile Interface <br/> <span className="text-blue-400 font-mono text-xs mt-1.5 block uppercase tracking-widest">High-intensity Blue Emission</span>
             </div>
          </motion.div>

          {/* Monitor Phase */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            animate={{
               opacity: [0, 0, 0, 1, 1, 0, 0],
               scale: [0.8, 0.8, 0.8, 1, 1.5, 2, 2]
            }}
            transition={{ duration: 12, repeat: Infinity, times: [0, 0.33, 0.34, 0.39, 0.61, 0.66, 1], ease: "easeInOut" }}
          >
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full scale-150"></div>
                <Monitor size={120} className="text-indigo-400 drop-shadow-[0_0_20px_rgba(129,140,248,0.6)] relative z-10 stroke-[1.5]" />
             </div>
             <div className="text-white font-medium tracking-wide text-center bg-black/40 px-6 py-3 rounded-full border border-white/5 backdrop-blur-md">
                Desktop Workstation <br/> <span className="text-indigo-400 font-mono text-xs mt-1.5 block uppercase tracking-widest">Chronic Exposure</span>
             </div>
          </motion.div>

          {/* Eye Phase */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            animate={{
               opacity: [0, 0, 0, 0, 0, 1, 1, 0],
               scale: [0.8, 0.8, 0.8, 0.8, 0.8, 1, 1.5, 2]
            }}
            transition={{ duration: 12, repeat: Infinity, times: [0, 0.33, 0.66, 0.67, 0.72, 0.95, 1, 1], ease: "easeInOut" }}
          >
             <div className="relative mb-6">
                <div className="absolute inset-0 bg-brand-cyan/20 blur-2xl rounded-full scale-150"></div>
                <Eye size={120} className="text-brand-cyan drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] relative z-10 stroke-[1.5]" />
                {/* Blue light hitting the eye */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-brand-cyan/20 mix-blend-screen pointer-events-none"
                  animate={{ scale: [1, 2.5], opacity: [1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
             </div>
             <div className="text-white font-medium tracking-wide text-center bg-black/40 px-6 py-3 rounded-full border border-white/5 backdrop-blur-md">
                Retinal Interface <br/> <span className="text-brand-cyan font-mono text-xs mt-1.5 block uppercase tracking-widest">Signal Degradation</span>
             </div>
          </motion.div>

       </motion.div>
    </div>
  );
}
