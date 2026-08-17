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
            <linearGradient id="glassy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="brain-glass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#312e81" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient
              id="organ-glass"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* ==== INCOMING LIGHT WAVES ==== */}
          <motion.path
            d="M 20 280 L 140 280"
            fill="none"
            stroke={active.lightColor}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: [0, 1, 0] }}
            transition={{
              duration: active.speed,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ filter: `drop-shadow(0 0 10px ${active.lightColor})` }}
          />
          <motion.path
            d="M 20 320 L 130 320"
            fill="none"
            stroke={active.lightColor}
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 20, opacity: [0, 1, 0] }}
            transition={{
              duration: active.speed,
              delay: active.speed * 0.3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ filter: `drop-shadow(0 0 10px ${active.lightColor})` }}
          />

          {/* =========================================
                  MODULE 1: ANATOMICAL EYE CROSS-SECTION 
                 ========================================= */}
          <g
            className="anatomy-eye cursor-pointer transition-all duration-300 hover:opacity-80"
            onMouseEnter={() => setHoveredPart("eye")}
            onMouseLeave={() => setHoveredPart(null)}
          >
            {/* Background Fill for the whole eye */}
            <path
              d="M 160 170 Q 90 300 160 430 A 130 130 0 0 0 350 350 L 350 250 A 130 130 0 0 0 160 170 Z"
              fill="url(#glassy)"
              stroke="#38bdf8"
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Vitreous Body */}
            <path
              d="M 180 190 A 110 110 0 0 0 340 350 L 340 250 A 110 110 0 0 0 180 190 Z"
              fill="rgba(255,255,255,0.02)"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.6"
            />

            {/* Sclera (Outer White Layer) */}
            <path
              d="M 160 170 A 130 130 0 0 1 350 250 M 350 350 A 130 130 0 0 1 160 430"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="3"
              opacity="0.8"
            />

            {/* Choroid (Middle Vascular Layer) */}
            <path
              d="M 165 180 A 120 120 0 0 1 345 255 M 345 345 A 120 120 0 0 1 165 420"
              fill="none"
              stroke="#818cf8"
              strokeWidth="2"
              opacity="0.6"
            />

            {/* Retina (Inner Neural Layer) */}
            <path
              d="M 170 190 A 110 110 0 0 1 335 260 M 335 340 A 110 110 0 0 1 170 410"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2"
              opacity="0.9"
            />

            {/* Fovea centralis (Macula Dip) */}
            <path
              d="M 335 260 C 360 280 360 320 335 340"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
            />

            {/* Cornea (Front Bulge) */}
            <path
              d="M 160 170 Q 90 300 160 430"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
              opacity="0.6"
            />

            {/* Lens */}
            <ellipse
              cx="180"
              cy="300"
              rx="18"
              ry="60"
              fill="#cbd5e1"
              stroke="#64748b"
              strokeWidth="2"
              opacity="0.9"
            />

            {/* Iris (Top and Bottom) */}
            <path
              d="M 163 178 L 175 235 L 150 230 Z"
              fill="url(#glassy)"
              stroke="#38bdf8"
              strokeWidth="1"
            />
            <path
              d="M 163 422 L 175 365 L 150 370 Z"
              fill="url(#glassy)"
              stroke="#38bdf8"
              strokeWidth="1"
            />

            {/* --- EYE LABELS --- */}
            {/* Sclera */}
            <polyline
              points="230,110 250,110 270,180"
              fill="none"
              stroke="#64748b"
            />
            <text x="225" y="114" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Sclera
            </text>

            {/* Choroid */}
            <polyline
              points="280,130 300,130 300,195"
              fill="none"
              stroke="#64748b"
            />
            <text x="275" y="134" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Choroid
            </text>

            {/* Retina */}
            <polyline
              points="330,150 350,150 320,215"
              fill="none"
              stroke="#64748b"
            />
            <text x="325" y="154" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Retina
            </text>

            {/* Fovea centralis */}
            <polyline
              points="420,200 400,200 345,280"
              fill="none"
              stroke="#64748b"
            />
            <text
              x="425"
              y="204"
              textAnchor="start"
              fill="#cbd5e1"
              fontSize="12"
            >
              Fovea centralis
            </text>

            {/* Vitreous Body */}
            <polyline
              points="260,500 280,500 250,370"
              fill="none"
              stroke="#64748b"
            />
            <text x="255" y="504" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Vitreous body
            </text>

            {/* Lens */}
            <polyline
              points="100,500 120,500 170,365"
              fill="none"
              stroke="#64748b"
            />
            <text x="95" y="504" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Lens
            </text>

            {/* Iris */}
            <polyline
              points="60,450 80,450 160,390"
              fill="none"
              stroke="#64748b"
            />
            <text x="55" y="454" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Iris
            </text>

            {/* Cornea */}
            <polyline
              points="60,110 80,110 135,210"
              fill="none"
              stroke="#64748b"
            />
            <text x="55" y="114" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Cornea
            </text>
          </g>

          {/* =========================================
                  MODULE 2: OPTIC NERVE & NEURAL SIGNALS 
                  (Placed behind Eye and Brain to connect them smoothly)
                 ========================================= */}
          <g
            className="anatomy-nerve cursor-pointer transition-all duration-300 hover:opacity-80"
            onMouseEnter={() => setHoveredPart("opticNerve")}
            onMouseLeave={() => setHoveredPart(null)}
          >
            {/* Pulsating Glow for Optic Nerve */}
            <motion.path
              d="M 330 300 Q 550 300 770 320"
              fill="none"
              strokeWidth="50"
              strokeLinecap="round"
              animate={{
                stroke: active.nerveGlowColor,
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                duration: active.pulseDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ filter: "blur(12px)" }}
            />

            {/* Optic Nerve Outline - Sweeping directly from eye to brain */}
            <motion.path
              d="M 330 300 Q 550 300 770 320"
              fill="none"
              strokeWidth="45"
              strokeLinecap="round"
              opacity="0.15"
              animate={{ stroke: active.nerveOuterColor }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M 330 300 Q 550 300 770 320"
              fill="none"
              strokeWidth="35"
              strokeLinecap="round"
              opacity="0.1"
              animate={{ stroke: active.nerveCoreColor }}
              transition={{ duration: 1 }}
            />

            {/* Active Signal Streams */}
            <motion.path
              d="M 330 290 Q 550 290 770 310"
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
              d="M 330 310 Q 550 310 770 330"
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

            {/* Optic Nerve Label */}
            <polyline
              points="480,420 500,420 520,335"
              fill="none"
              stroke="#64748b"
            />
            <text x="475" y="424" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Optic nerve
            </text>
          </g>

          {/* =========================================
                  MODULE 3: ANATOMICAL BRAIN CROSS-SECTION 
                 ========================================= */}
          <g
            className="anatomy-brain cursor-pointer transition-all duration-300 hover:opacity-80"
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
              r="180"
              fill={active.brainGlow}
              style={{ filter: "blur(60px)", pointerEvents: "none" }}
              animate={{ r: [180, 200, 180], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: active.speed, repeat: Infinity }}
            />

            {/* Cerebrum - Refined to match image */}
            <path
              d="M 770 300 C 720 180, 800 60, 940 50 C 1100 40, 1220 120, 1240 250 C 1250 350, 1180 430, 1080 440 C 1000 450, 940 400, 930 360 C 880 340, 800 360, 770 300 Z"
              fill="url(#brain-glass)"
              stroke="#818cf8"
              strokeWidth="1"
              opacity="0.8"
            />

            {/* Internal Cerebrum Gyri / Folds structure (Stylized) */}
            <path
              d="M 830 200 C 860 100 970 80 1040 120"
              stroke="#818cf8"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M 910 110 C 1020 90 1140 160 1180 270"
              stroke="#818cf8"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M 1150 200 C 1200 280 1170 360 1050 390"
              stroke="#818cf8"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />

            {/* Corpus Callosum (C-shape above ventricles) */}
            <path
              d="M 940 220 C 940 170 1070 150 1110 230 C 1050 200 990 190 940 220 Z"
              fill="url(#organ-glass)"
              stroke="#e2e8f0"
              strokeWidth="1"
            />

            {/* Ventricular System (Blueish area below Corpus Callosum) */}
            <path
              d="M 960 230 C 980 190 1060 200 1080 240 C 1030 220 990 220 960 230 Z"
              fill="url(#glassy)"
              stroke="#38bdf8"
              strokeWidth="1"
            />

            {/* Thalamus / Diencephalon (Purple oval center) */}
            <ellipse
              cx="1000"
              cy="270"
              rx="35"
              ry="25"
              fill="url(#organ-glass)"
              stroke="#818cf8"
              strokeWidth="1"
            />

            {/* Hippocampus (Greenish curve wrapping Thalamus) */}
            <path
              d="M 1000 295 C 950 300 940 330 950 360 C 960 320 990 310 1010 295 Z"
              fill="url(#organ-glass)"
              stroke="#2dd4bf"
              strokeWidth="1"
            />

            {/* Pons (Orange Brainstem bulge) */}
            <path
              d="M 940 340 C 880 360 890 410 940 440 L 980 440 L 980 340 Z"
              fill="url(#organ-glass)"
              stroke="#94a3b8"
              strokeWidth="1"
            />

            {/* Medulla oblongata (Yellow stalk below Pons) */}
            <path
              d="M 940 440 L 950 530 L 980 530 L 980 440 Z"
              fill="url(#organ-glass)"
              stroke="#64748b"
              strokeWidth="1"
            />

            {/* Cerebellum (Pinkish mass at lower back) */}
            <path
              d="M 980 350 C 1060 300 1200 340 1160 460 C 1120 530 1000 490 980 450 Z"
              fill="url(#brain-glass)"
              opacity="0.8"
              stroke="#6366f1"
              strokeWidth="2"
            />

            {/* Cerebellum Texture (Folia lines) */}
            <path
              d="M 990 370 Q 1070 360 1130 400 M 985 390 Q 1070 380 1110 430 M 985 420 Q 1040 420 1090 460"
              stroke="#6366f1"
              strokeWidth="1.5"
              fill="none"
              opacity="0.7"
            />

            {/* --- BRAIN LABELS --- */}
            {/* Cerebrum */}
            <polyline
              points="790,130 810,130 880,160"
              fill="none"
              stroke="#64748b"
            />
            <text x="785" y="134" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Cerebrum
            </text>

            {/* Ventricular system */}
            <polyline
              points="850,170 870,170 970,225"
              fill="none"
              stroke="#64748b"
            />
            <text x="845" y="174" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Ventricular system
            </text>

            {/* Corpus Callosum */}
            <polyline
              points="1200,180 1180,180 1100,210"
              fill="none"
              stroke="#64748b"
            />
            <text
              x="1205"
              y="184"
              textAnchor="start"
              fill="#cbd5e1"
              fontSize="12"
            >
              Corpus Callosum
            </text>

            {/* Hippocampus */}
            <polyline
              points="840,330 860,330 950,330"
              fill="none"
              stroke="#64748b"
            />
            <text x="835" y="334" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Hippocampus
            </text>

            {/* Pons */}
            <polyline
              points="1130,410 1110,410 965,390"
              fill="none"
              stroke="#64748b"
            />
            <text
              x="1135"
              y="414"
              textAnchor="start"
              fill="#cbd5e1"
              fontSize="12"
            >
              Pons
            </text>

            {/* Cerebellum */}
            <polyline
              points="820,450 840,450 990,430"
              fill="none"
              stroke="#64748b"
            />
            <text x="815" y="454" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Cerebellum
            </text>

            {/* Medulla oblongata */}
            <polyline
              points="850,500 870,500 945,470"
              fill="none"
              stroke="#64748b"
            />
            <text x="845" y="504" textAnchor="end" fill="#cbd5e1" fontSize="12">
              Medulla oblongata
            </text>

            {/* =========================================
                     INTERACTIVE ORGANS (SCN & Pineal) 
                    ========================================= */}

            {/* SCN (Suprachiasmatic Nucleus) - Master Clock (Placed in Hypothalamus area, front of Thalamus) */}
            <g
              transform="translate(920, 290)"
              className="cursor-pointer transition-all duration-300 hover:opacity-80"
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHoveredPart("scn");
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setHoveredPart(null);
              }}
            >
              <motion.circle
                cx="0"
                cy="0"
                r="12"
                animate={{ fill: active.scnColor, scale: [1, 1.3, 1] }}
                transition={{ duration: active.speed, repeat: Infinity }}
                style={{ filter: `drop-shadow(0 0 16px ${active.scnColor})` }}
              />
              <polyline
                points="-30,30 -15,30 -5,10"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
              />
              <text
                x="-35"
                y="34"
                fill="#f8fafc"
                fontSize="12"
                textAnchor="end"
                fontWeight="bold"
              >
                SCN (Master Clock)
              </text>
            </g>

            {/* Pineal Gland (Melatonin Production) - (Placed behind Thalamus) */}
            <g
              transform="translate(1050, 275)"
              className="cursor-pointer transition-all duration-300 hover:opacity-80"
              onMouseEnter={(e) => {
                e.stopPropagation();
                setHoveredPart("pineal");
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setHoveredPart(null);
              }}
            >
              <motion.circle
                cx="0"
                cy="0"
                r="9"
                animate={{
                  fill: active.pinealColor,
                  opacity: active.pinealOpacity,
                }}
                transition={{ duration: 1 }}
                style={{
                  filter: `drop-shadow(0 0 12px ${active.pinealColor})`,
                }}
              />
              <polyline
                points="40,25 20,25 5,5"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
              />
              <text
                x="45"
                y="29"
                fill="#f8fafc"
                fontSize="12"
                textAnchor="start"
                fontWeight="bold"
              >
                Pineal Gland
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
