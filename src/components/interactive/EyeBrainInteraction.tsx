import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Monitor, Sun } from "lucide-react";

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
      <div className="relative w-full max-w-7xl aspect-[16/9] sm:aspect-[2/1] min-h-[380px] sm:min-h-[480px] md:min-h-[520px] bg-[#050505] rounded-lg overflow-hidden border border-white/10 shadow-inner">
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

        <svg
          viewBox="0 0 1200 600"
          className="w-full h-full absolute inset-0 font-sans z-0"
        >
          <defs>
            {/* 3D Gradients */}
            <radialGradient id="eye-sphere" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#dbeafe" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#60a5fa" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
            </radialGradient>
            
            <radialGradient id="iris-texture" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="20%" stopColor="#0ea5e9" />
              <stop offset="80%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#082f49" />
            </radialGradient>

            <linearGradient id="lens-3d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="nerve-3d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
            </linearGradient>

            <radialGradient id="brain-volume" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#312e81" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.95" />
            </radialGradient>

            <radialGradient id="cerebellum-volume" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f472b6" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#831843" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4c0519" stopOpacity="0.95" />
            </radialGradient>

            <linearGradient id="brainstem-3d" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </linearGradient>

            <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity="0.6" />
            </filter>

            <filter id="inner-glow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
              <feFlood floodColor="#38bdf8" floodOpacity="0.5" result="glowColor" />
              <feComposite in="glowColor" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ==== INCOMING LIGHT WAVES ==== */}
          <motion.path
            d="M 20 280 L 120 280"
            fill="none"
            stroke={active.lightColor}
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: [0, 1, 0] }}
            transition={{
              duration: active.speed,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ filter: `drop-shadow(0 0 12px ${active.lightColor})` }}
          />
          <motion.path
            d="M 20 320 L 110 320"
            fill="none"
            stroke={active.lightColor}
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 20, opacity: [0, 1, 0] }}
            transition={{
              duration: active.speed,
              delay: active.speed * 0.3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ filter: `drop-shadow(0 0 15px ${active.lightColor})` }}
          />

          {/* =========================================
                  MODULE 1: OCULAR RECEPTOR 
                 ========================================= */}
          {/* Module 1 Box */}
          <rect x="90" y="100" width="310" height="380" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="5 5" />
          <polyline points="90,100 110,100" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <polyline points="90,100 90,120" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <polyline points="400,480 380,480" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <polyline points="400,480 400,460" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          
          <text x="100" y="125" fill="#94a3b8" fontSize="12" fontFamily="monospace" letterSpacing="1">
            MODULE 01: OCULAR RECEPTOR
          </text>

          <g
            className="anatomy-eye cursor-pointer transition-all duration-300 hover:opacity-90"
            onMouseEnter={() => setHoveredPart("eye")}
            onMouseLeave={() => setHoveredPart(null)}
          >
            {/* Sclera & Globe (3D Sphere) */}
            <path
              d="M 160 170 Q 90 300 160 430 A 130 130 0 0 0 350 350 L 350 250 A 130 130 0 0 0 160 170 Z"
              fill="url(#eye-sphere)"
              filter="url(#drop-shadow)"
            />

            {/* Retina (Inner Neural Layer) Glow */}
            <path
              d="M 170 190 A 110 110 0 0 1 335 260 M 335 340 A 110 110 0 0 1 170 410"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="4"
              opacity="0.8"
              filter="url(#inner-glow)"
            />

            {/* Choroid (Middle Vascular Layer) */}
            <path
              d="M 165 180 A 120 120 0 0 1 345 255 M 345 345 A 120 120 0 0 1 165 420"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              opacity="0.4"
            />

            {/* Fovea centralis */}
            <path
              d="M 335 260 C 355 280 355 320 335 340"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="5"
              filter="url(#inner-glow)"
            />

            {/* Cornea (Front Bulge 3D) */}
            <path
              d="M 160 170 Q 90 300 160 430"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Cornea Highlight */}
            <path
              d="M 140 200 Q 110 250 120 320"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.8"
              style={{ filter: "blur(2px)" }}
            />

            {/* Iris (Realistic texture) */}
            <ellipse cx="163" cy="230" rx="4" ry="25" fill="url(#iris-texture)" transform="rotate(20 163 230)" />
            <ellipse cx="163" cy="370" rx="4" ry="25" fill="url(#iris-texture)" transform="rotate(-20 163 370)" />

            {/* Lens (3D) */}
            <ellipse
              cx="185"
              cy="300"
              rx="15"
              ry="50"
              fill="url(#lens-3d)"
              filter="url(#drop-shadow)"
            />
            {/* Lens Highlight */}
            <path d="M 175 270 Q 170 300 175 330" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" style={{ filter: "blur(1px)" }} />
            
            {/* Macula/Retina active dots */}
            <motion.circle cx="342" cy="280" r="2" fill="#22d3ee" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <motion.circle cx="345" cy="300" r="2.5" fill="#22d3ee" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }} />
            <motion.circle cx="342" cy="320" r="2" fill="#22d3ee" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }} />

            {/* Labels (from Image 2) */}
            {/* Cornea */}
            <polyline points="120,180 120,150 140,150" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            <text x="145" y="154" textAnchor="start" fill="#cbd5e1" fontSize="12" fontFamily="monospace">Cornea</text>

            {/* Outer dotted glow (like in Image 2) */}
            <path d="M 160 150 Q 80 300 160 450" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 8" opacity="0.8" />
            
            {/* Blue Y-shape (from Image 2 inside the eye) */}
            <path d="M 195 300 L 250 250 M 195 300 L 250 350 M 195 300 L 165 300" fill="none" stroke="#38bdf8" strokeWidth="4" filter="url(#inner-glow)" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="195" cy="300" r="6" fill="#0ea5e9" filter="url(#inner-glow)" />

          </g>

          {/* =========================================
                  MODULE 2: NEURAL PATHWAY 
                 ========================================= */}
          {/* Module 2 Box */}
          <rect x="360" y="210" width="350" height="180" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="5 5" />
          <text x="370" y="235" fill="#94a3b8" fontSize="12" fontFamily="monospace" letterSpacing="1">
            MODULE 02: NEURAL PATHWAY
          </text>

          <g
            className="anatomy-nerve cursor-pointer transition-all duration-300 hover:opacity-90"
            onMouseEnter={() => setHoveredPart("opticNerve")}
            onMouseLeave={() => setHoveredPart(null)}
          >
            {/* 3D Optic Nerve Tube */}
            <path
              d="M 330 270 Q 550 270 770 290 L 770 350 Q 550 330 330 330 Z"
              fill="url(#nerve-3d)"
              filter="url(#drop-shadow)"
            />

            {/* Optic Chiasm Bulge (from Image 2) */}
            <ellipse cx="550" cy="300" rx="35" ry="40" fill="url(#nerve-3d)" filter="url(#drop-shadow)" />
            <ellipse cx="550" cy="300" rx="25" ry="30" fill="rgba(15,23,42,0.8)" />

            {/* Pulsating Glow for Optic Nerve */}
            <motion.path
              d="M 330 300 Q 550 300 770 320"
              fill="none"
              strokeWidth="40"
              strokeLinecap="round"
              animate={{
                stroke: active.nerveGlowColor,
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: active.pulseDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ filter: "blur(12px)" }}
            />

            {/* Active Signal Streams */}
            <motion.path
              d="M 330 285 Q 550 285 770 305"
              fill="none"
              stroke={active.signalColor}
              strokeWidth="4"
              strokeDasharray={active.signalDash}
              initial={{ strokeDashoffset: 150 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: active.speed,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ filter: `drop-shadow(0 0 8px ${active.signalColor})` }}
            />
            <motion.path
              d="M 330 315 Q 550 315 770 335"
              fill="none"
              stroke={active.signalColor}
              strokeWidth="6"
              strokeDasharray={active.signalDash2}
              initial={{ strokeDashoffset: 200 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: active.speed,
                delay: active.speed * 0.2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ filter: `drop-shadow(0 0 12px ${active.signalColor})` }}
            />

            {/* Labels (from Image 2) */}
            {/* Optic Chiasm */}
            <polyline points="550,340 550,370 510,370" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            <text x="505" y="374" textAnchor="end" fill="#cbd5e1" fontSize="12" fontFamily="monospace">Optic Chiasm</text>
          </g>

          {/* =========================================
                  MODULE 3: CORTICAL PROCESSING 
                 ========================================= */}
          {/* Module 3 Box */}
          <rect x="670" y="70" width="450" height="420" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="5 5" />
          <polyline points="1120,490 1120,470" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <polyline points="1120,490 1100,490" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          <text x="680" y="95" fill="#94a3b8" fontSize="12" fontFamily="monospace" letterSpacing="1">
            MODULE 03: CORTICAL PROCESSING
          </text>

          <g
            className="anatomy-brain cursor-pointer transition-all duration-300 hover:opacity-95"
            transform="translate(10, 0)"
            onMouseEnter={(e) => {
              e.stopPropagation();
              setHoveredPart("brain");
            }}
            onMouseLeave={(e) => {
              e.stopPropagation();
              setHoveredPart(null);
            }}
          >
            {/* Brain Glow Effect based on stress */}
            <motion.circle
              cx="950"
              cy="270"
              r="220"
              fill={active.brainGlow}
              style={{ filter: "blur(70px)", pointerEvents: "none" }}
              animate={{ r: [220, 240, 220], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: active.speed, repeat: Infinity }}
            />

            {/* Realistic Cerebrum 3D Mass */}
            <path
              d="M 770 300 C 720 170, 810 50, 950 40 C 1120 30, 1240 110, 1260 250 C 1270 360, 1190 440, 1080 450 C 1000 460, 930 400, 920 360 C 870 340, 800 360, 770 300 Z"
              fill="url(#brain-volume)"
              filter="url(#drop-shadow)"
            />

            {/* Realistic Brain Folds (Sulci & Gyri) */}
            {/* Shadow lines */}
            <g stroke="#0f172a" strokeWidth="4" fill="none" opacity="0.6" style={{ filter: "blur(2px)" }}>
              <path d="M 810 220 Q 860 120 980 100 T 1100 130" />
              <path d="M 850 170 Q 950 140 1050 180 T 1170 230" />
              <path d="M 790 280 Q 880 230 960 270 T 1140 330" />
              <path d="M 940 80 Q 1060 60 1180 140" />
              <path d="M 1150 200 Q 1200 280 1170 360 T 1050 390" />
              <path d="M 1100 280 Q 1160 340 1080 410" />
              <path d="M 860 300 Q 890 270 930 290" />
            </g>
            {/* Highlight lines */}
            <g stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.2" style={{ filter: "blur(1px)" }}>
              <path d="M 810 216 Q 860 116 980 96 T 1100 126" />
              <path d="M 850 166 Q 950 136 1050 176 T 1170 226" />
              <path d="M 790 276 Q 880 226 960 266 T 1140 326" />
              <path d="M 940 76 Q 1060 56 1180 136" />
              <path d="M 1150 196 Q 1200 276 1170 356 T 1050 386" />
              <path d="M 1100 276 Q 1160 336 1080 406" />
              <path d="M 860 296 Q 890 266 930 286" />
            </g>

            {/* Ventricular System */}
            <path
              d="M 950 230 C 970 190 1050 200 1080 240 C 1030 220 990 220 950 230 Z"
              fill="#0f172a"
              opacity="0.6"
              filter="url(#inner-glow)"
            />

            {/* Thalamus (3D Oval) */}
            <ellipse
              cx="1000"
              cy="270"
              rx="40"
              ry="28"
              fill="url(#brain-volume)"
              filter="url(#drop-shadow)"
            />
            <ellipse cx="1000" cy="270" rx="35" ry="24" fill="#312e81" opacity="0.5" />

            {/* Corpus Callosum (C-shape) */}
            <path
              d="M 930 220 C 930 160 1080 140 1120 230 C 1060 190 990 180 930 220 Z"
              fill="#cbd5e1"
              opacity="0.8"
              filter="url(#drop-shadow)"
            />

            {/* Brainstem (Midbrain, Pons, Medulla) */}
            <path
              d="M 950 330 C 890 350 900 400 950 430 L 960 520 L 990 520 L 990 430 C 1020 400 1010 350 990 330 Z"
              fill="url(#brainstem-3d)"
              filter="url(#drop-shadow)"
            />
            {/* Brainstem Highlights */}
            <path d="M 950 430 C 920 400 920 370 950 350" stroke="#cbd5e1" strokeWidth="2" fill="none" opacity="0.4" />

            {/* Cerebellum (3D Mass at lower back) */}
            <path
              d="M 980 350 C 1060 300 1220 340 1180 460 C 1140 530 1000 490 980 450 Z"
              fill="url(#cerebellum-volume)"
              filter="url(#drop-shadow)"
            />
            {/* Cerebellum Texture (Folia) */}
            <g stroke="#4c0519" strokeWidth="2" fill="none" opacity="0.8" style={{ filter: "blur(0.5px)" }}>
              <path d="M 990 370 Q 1070 360 1150 400 M 985 390 Q 1070 380 1130 430 M 985 420 Q 1040 420 1110 460 M 990 440 Q 1030 440 1080 480 M 1040 335 Q 1120 350 1170 390 M 1100 480 Q 1140 470 1160 450" />
            </g>
            <g stroke="#f9a8d4" strokeWidth="1" fill="none" opacity="0.3">
              <path d="M 990 368 Q 1070 358 1150 398 M 985 388 Q 1070 378 1130 428 M 985 418 Q 1040 418 1110 458" />
            </g>

            {/* =========================================
                     INTERACTIVE ORGANS (SCN & Pineal) 
                    ========================================= */}

            {/* SCN (Suprachiasmatic Nucleus) */}
            <g
              transform="translate(900, 290)"
              className="cursor-pointer transition-all duration-300 hover:opacity-100"
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHoveredPart("scn");
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setHoveredPart(null);
              }}
            >
              {/* Outer Glow */}
              <motion.circle
                cx="0"
                cy="0"
                r="18"
                fill={active.scnColor}
                opacity="0.3"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: active.speed, repeat: Infinity }}
                style={{ filter: "blur(6px)" }}
              />
              {/* Core */}
              <motion.circle
                cx="0"
                cy="0"
                r="10"
                fill={active.scnColor}
                animate={{ fill: active.scnColor, scale: [1, 1.2, 1] }}
                transition={{ duration: active.speed, repeat: Infinity }}
                style={{ filter: `drop-shadow(0 0 10px ${active.scnColor})` }}
              />
              {/* Sci-fi Marker line */}
              <polyline points="0,15 0,60 50,60" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
              <text x="55" y="64" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
                Suprachiasmatic Nucleus <tspan x="55" y="80" fill="#64748b" fontSize="10">(Master Clock)</tspan>
              </text>
            </g>

            {/* Pineal Gland */}
            <g
              transform="translate(1045, 275)"
              className="cursor-pointer transition-all duration-300 hover:opacity-100"
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHoveredPart("pineal");
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setHoveredPart(null);
              }}
            >
              {/* Outer Glow */}
              <motion.circle
                cx="0"
                cy="0"
                r="14"
                fill={active.pinealColor}
                opacity={active.pinealOpacity * 0.4}
                style={{ filter: "blur(5px)" }}
              />
              {/* Core */}
              <motion.circle
                cx="0"
                cy="0"
                r="8"
                animate={{
                  fill: active.pinealColor,
                  opacity: active.pinealOpacity,
                }}
                transition={{ duration: 1 }}
                style={{
                  filter: `drop-shadow(0 0 8px ${active.pinealColor})`,
                }}
              />
              {/* Sci-fi Marker line */}
              <polyline points="5,-5 20,-20 80,-20" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
              <text x="85" y="-16" fill="#cbd5e1" fontSize="12" fontFamily="monospace">
                Pineal Gland <tspan x="85" y="0" fill="#64748b" fontSize="10">(Melatonin Production)</tspan>
              </text>
            </g>
          </g>
        </svg>

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
