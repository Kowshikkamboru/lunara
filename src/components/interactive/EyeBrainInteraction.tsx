import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Monitor, Sun } from "lucide-react";
import { AnatomyScene3D } from "./AnatomyScene3D";

const anatomyInfo = {
  eye: {
    title: "Ocular Receptor (Eye)",
    desc: "ipRGCs in the retina absorb short-wave blue light. Unlike regular photoreceptors, they don't form images—they directly dictate your circadian rhythm.",
  },
  opticNerve: {
    title: "Retinohypothalamic Tract",
    desc: "The direct neural cable to the brain's clock. Digital strain degrades transmission, shifting the healthy cyan pulse to a sluggish, fatigued amber.",
  },
  brain: {
    title: "Cerebral Cortex",
    desc: "Constant digital overstimulation forces the prefrontal cortex into sustained arousal, resulting in cognitive fatigue and elevated stress.",
  },
  scn: {
    title: "SCN (Master Clock)",
    desc: "The brain's central timekeeper. High-frequency digital light tricks the SCN into daytime mode, halting nighttime physiological processes.",
  },
  pineal: {
    title: "Pineal Gland",
    desc: "The melatonin factory. Artificial blue light suppresses its secretion, severely disrupting sleep architecture and cellular repair.",
  },
};

type AnatomyKey = keyof typeof anatomyInfo;

export function EyeBrainInteraction() {
  const [activeMode, setActiveMode] = useState<"sun" | "phone" | "monitor">(
    "sun",
  );
  const [hoveredPart, setHoveredPart] = useState<AnatomyKey | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  const config = {
    sun: {
      lightColor: "rgba(253, 224, 71, 0.8)",
      signalColor: "#22d3ee", // Cyan
      nerveCoreColor: "#a5f3fc",
      nerveOuterColor: "#06b6d4",
      nerveGlowColor: "rgba(6, 182, 212, 0.6)",
      pulseDuration: 1.2, // Rhythmic and healthy
      signalDash: "10 30",
      signalDash2: "15 45",
      brainGlow: "rgba(6, 182, 212, 0.05)",
      pinealColor: "#a78bfa",
      pinealOpacity: 1,
      scnColor: "#22c55e",
      stressOpacity: 0,
      noiseOpacity: 0,
      label: "Natural Solar Spectrum",
      desc: "Balanced circadian alignment. Melatonin rhythm intact. Minimal cognitive stress.",
      speed: 2,
    },
    phone: {
      lightColor: "rgba(59, 130, 246, 0.9)",
      signalColor: "#fcd34d", // Shift towards amber
      nerveCoreColor: "#fde68a",
      nerveOuterColor: "#d97706", // Muted amber
      nerveGlowColor: "rgba(217, 119, 6, 0.5)",
      pulseDuration: 2.5, // Slowing down
      signalDash: "4 40",
      signalDash2: "2 60",
      brainGlow: "rgba(239, 68, 68, 0.15)",
      pinealColor: "#4b5563",
      pinealOpacity: 0.3,
      scnColor: "#ef4444",
      stressOpacity: 0.6,
      noiseOpacity: 0.4,
      label: "Smartphone Usage",
      desc: "Intense short-wave blue light. Acute melatonin suppression. Rising cognitive stress.",
      speed: 0.8,
    },
    monitor: {
      lightColor: "rgba(99, 102, 241, 0.9)",
      signalColor: "#f59e0b", // Deep Amber
      nerveCoreColor: "#fcd34d",
      nerveOuterColor: "#92400e", // Darker muted amber
      nerveGlowColor: "rgba(146, 64, 14, 0.4)",
      pulseDuration: 4.0, // Sluggish and stressed
      signalDash: "2 80",
      signalDash2: "1 100",
      brainGlow: "rgba(249, 115, 22, 0.15)",
      pinealColor: "#6b7280",
      pinealOpacity: 0.5,
      scnColor: "#f97316",
      stressOpacity: 0.8,
      noiseOpacity: 0.7,
      label: "Computer Monitor",
      desc: "Chronic blue light exposure. Circadian delay. Prefrontal cortex fatigue.",
      speed: 1.2,
    },
  };

  const active = config[activeMode];

  return (
    <div className="w-full flex flex-col items-center bg-black/40 backdrop-blur-sm rounded-sm border border-white/5 p-4 md:p-8 mt-16 shadow-2xl relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDQwIEw0MCA0MCBMNDAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] z-0 pointer-events-none" />

      {/* Control Panel */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 z-10 relative">
        <button
          onClick={() => setActiveMode("sun")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all ${activeMode === "sun" ? "border-yellow-400 text-yellow-400 bg-yellow-400/10" : "border-white/10 text-white/40 hover:text-white/80"}`}
        >
          <Sun size={16} /> Natural Light
        </button>
        <button
          onClick={() => setActiveMode("phone")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all ${activeMode === "phone" ? "border-blue-400 text-blue-400 bg-blue-400/10" : "border-white/10 text-white/40 hover:text-white/80"}`}
        >
          <Smartphone size={16} /> Smartphone
        </button>
        <button
          onClick={() => setActiveMode("monitor")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all ${activeMode === "monitor" ? "border-indigo-400 text-indigo-400 bg-indigo-400/10" : "border-white/10 text-white/40 hover:text-white/80"}`}
        >
          <Monitor size={16} /> Monitor
        </button>
      </div>

      {/* Interactive Diagram */}
      <div 
        className="relative w-full max-w-7xl aspect-[16/9] sm:aspect-[2/1] min-h-[380px] sm:min-h-[480px] md:min-h-[720px] rounded-lg overflow-hidden border border-white/10 shadow-inner"
        style={{
          background: "radial-gradient(circle at center, #09111b 0%, #02050a 65%, #000000 100%)",
        }}
      >
        {/* Stress overlay */}
        <motion.div
          animate={{ opacity: active.stressOpacity }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-red-500/5 mix-blend-screen pointer-events-none z-0"
        />

        {/* Digital Post-Processing Scanline Overlay */}
        <motion.div
          animate={{ opacity: active.noiseOpacity }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.08) 2px, rgba(59, 130, 246, 0.08) 4px)`,
            mixBlendMode: "screen",
          }}
        />
        {/* Cooling Color Burn Overlay */}
        <motion.div
          animate={{ opacity: active.noiseOpacity * 0.8 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-blue-900 pointer-events-none z-10 mix-blend-color-burn"
        />

        {/* 3D Interactive Scene */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white/30 text-sm font-mono animate-pulse">Loading 3D Model...</div>
            </div>
          }>
            <AnatomyScene3D
              signalColor={active.signalColor}
              lightColor={active.lightColor}
              brainGlow={active.brainGlow}
              scnColor={active.scnColor}
              pinealColor={active.pinealColor}
              pinealOpacity={active.pinealOpacity}
              speed={active.speed}
              nerveGlowColor={active.nerveGlowColor}
              setHoveredPart={setHoveredPart}
              autoRotate={autoRotate}
            />
          </Suspense>
        </div>

        {/* View Controls Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[40] flex gap-3 items-center px-4 py-2 border border-white/10 rounded-full bg-black/40 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className="border-none rounded-full px-4 py-2 bg-white/10 text-white/80 hover:bg-white/20 transition-colors text-xs font-medium cursor-pointer"
          >
            {autoRotate ? "Pause" : "Play"}
          </button>
          <span className="text-white/40 text-[10px] sm:text-xs">
            Drag to explore · Scroll to zoom
          </span>
        </div>

        {/* Interactive Legend Overlay */}
        <AnimatePresence>
          {hoveredPart && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 sm:top-6 right-3 sm:right-6 z-30 bg-black/85 backdrop-blur-xl border border-brand-cyan/30 p-3 sm:p-5 rounded-lg max-w-[240px] sm:max-w-[280px] shadow-[0_10px_40px_rgba(0,0,0,0.6)] pointer-events-none"
            >
              <h4 className="text-brand-cyan font-bold text-xs sm:text-sm mb-1 sm:mb-2 uppercase tracking-wider">
                {anatomyInfo[hoveredPart].title}
              </h4>
              <p className="text-neutral-300 text-[11px] sm:text-xs leading-relaxed">
                {anatomyInfo[hoveredPart].desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data Overlay */}
        <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-4 pointer-events-none z-20">
          <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-3.5 sm:p-5 rounded-lg max-w-sm shadow-2xl">
            <h4 className="text-white font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2 flex items-center gap-2">
              {activeMode === "sun" ? (
                <Sun size={16} className="text-yellow-400 shrink-0" />
              ) : activeMode === "phone" ? (
                <Smartphone size={16} className="text-blue-400 shrink-0" />
              ) : (
                <Monitor size={16} className="text-indigo-400 shrink-0" />
              )}
              <span>{active.label}</span>
            </h4>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              {active.desc}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {active.stressOpacity > 0 && (
              <motion.div
                key="stress-alert"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-red-500 font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-widest flex flex-col gap-1.5 sm:gap-2 bg-red-950/50 p-3 sm:p-4 rounded-lg border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)] backdrop-blur-md"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Cognitive Stress Detected
                </div>
                <div className="text-[10px] text-red-300/70 leading-tight">
                  Alert: High-frequency blue light <br /> causing SCN
                  desynchronization.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
