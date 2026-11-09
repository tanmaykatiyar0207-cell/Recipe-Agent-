"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SplineScene() {
  const [isHovered, setIsHovered] = useState(false);

  // Parabolic toss timing configuration
  // Total toss loop: 1.8 seconds
  const tossPhysics = {
    duration: 1.8,
    repeat: Infinity,
    ease: "easeInOut",
  };

  return (
    <div
      className="w-full h-full relative flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── Ambient Glow & Stage Background ─── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Large warm orange/amber radial aura */}
        <motion.div
          className="absolute w-[560px] h-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,0,0.22) 0%, rgba(255,149,0,0.08) 50%, transparent 72%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Elegant accent ring */}
        <div className="absolute w-[520px] h-[520px] rounded-full border border-orange-500/15 pointer-events-none" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-orange-500/5 pointer-events-none border-dashed" />
      </div>

      {/* ─── Hero Culinary Stage ─── */}
      <div className="relative w-full max-w-[560px] h-[540px] flex items-center justify-center">

        {/* Unified SVG Scene: 560 x 540 viewBox for 100% pixel-perfect alignment */}
        <svg
          viewBox="0 0 560 540"
          className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.65)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="hatGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            <linearGradient id="jacketGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="apronGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#D9480F" />
            </linearGradient>

            <linearGradient id="skilletMetal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="40%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            <linearGradient id="skilletRimGold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFB800" />
              <stop offset="50%" stopColor="#FFA000" />
              <stop offset="100%" stopColor="#FF6B00" />
            </linearGradient>

            <radialGradient id="skilletInterior" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#311B0B" />
              <stop offset="70%" stopColor="#17120E" />
              <stop offset="100%" stopColor="#0A0807" />
            </radialGradient>

            <linearGradient id="fireGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#E53E3E" />
              <stop offset="40%" stopColor="#FF6B00" />
              <stop offset="85%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            <radialGradient id="tomatoGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="60%" stopColor="#E53E3E" />
              <stop offset="100%" stopColor="#9B1C1C" />
            </radialGradient>

            <linearGradient id="mushroomGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F6E05E" />
              <stop offset="45%" stopColor="#ECC94B" />
              <stop offset="100%" stopColor="#B7791F" />
            </linearGradient>
          </defs>

          {/* ═════════════════════════════════════════════════════════
              CHEF CHARACTER (Left Side: Center X ~ 170, Y: 130 to 480)
             ═════════════════════════════════════════════════════════ */}
          <g id="chef-character">
            {/* ── Left Arm resting on hip ── */}
            <path
              d="M100 320 Q65 370 105 410"
              stroke="#1E293B"
              strokeWidth="28"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="108" cy="410" r="14" fill="#FBD38D" />

            {/* ── Body & Jacket ── */}
            <path
              d="M70 480 C70 380 100 300 170 290 L195 290 C265 300 295 380 295 480 Z"
              fill="url(#jacketGrad)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2.5"
            />

            {/* ── Orange Apron Bib ── */}
            <path
              d="M130 310 L235 310 L228 480 L137 480 Z"
              fill="url(#apronGrad)"
              opacity="0.95"
            />
            {/* Apron Straps */}
            <line x1="140" y1="310" x2="160" y2="290" stroke="#FF9500" strokeWidth="4.5" />
            <line x1="225" y1="310" x2="205" y2="290" stroke="#FF9500" strokeWidth="4.5" />

            {/* Jacket Double-breasted Buttons */}
            <circle cx="155" cy="350" r="4.5" fill="#FFFFFF" fillOpacity="0.85" />
            <circle cx="155" cy="390" r="4.5" fill="#FFFFFF" fillOpacity="0.85" />
            <circle cx="155" cy="430" r="4.5" fill="#FFFFFF" fillOpacity="0.85" />
            <circle cx="210" cy="350" r="4.5" fill="#FFFFFF" fillOpacity="0.85" />
            <circle cx="210" cy="390" r="4.5" fill="#FFFFFF" fillOpacity="0.85" />
            <circle cx="210" cy="430" r="4.5" fill="#FFFFFF" fillOpacity="0.85" />

            {/* Orange Silk Neckerchief ── */}
            <path
              d="M150 286 Q182 305 214 286 L196 318 Q182 312 168 318 Z"
              fill="#FF6B00"
            />

            {/* ── Chef Head & Face ── */}
            {/* Neck */}
            <rect x="164" y="260" width="36" height="32" rx="9" fill="#FBD38D" />

            {/* Head */}
            <ellipse cx="182" cy="225" rx="42" ry="46" fill="#FBD38D" />

            {/* Rosy Cheeks */}
            <circle cx="156" cy="238" r="8" fill="#F56565" opacity="0.32" />
            <circle cx="208" cy="238" r="8" fill="#F56565" opacity="0.32" />

            {/* Happy Arched Eyes */}
            <path
              d="M154 218 Q164 208 174 218"
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M190 218 Q200 208 210 218"
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Elegant Chef Moustache */}
            <path
              d="M182 236 C174 230 160 233 150 242 C160 245 174 243 182 239 C190 243 204 245 214 242 C204 233 190 230 182 236 Z"
              fill="#1E293B"
            />

            {/* Joyful Smile */}
            <path
              d="M172 248 Q182 258 192 248"
              stroke="#C53030"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* ── Chef Tall Toque (Hat) ── */}
            <g id="toque-hat">
              {/* Hat Puffs */}
              <path
                d="M140 184 C122 180 110 154 122 130 C134 106 164 110 170 118 C176 98 202 94 214 114 C226 102 250 112 248 134 C256 156 244 178 224 184 Z"
                fill="url(#hatGrad)"
                stroke="rgba(0,0,0,0.08)"
                strokeWidth="2"
              />
              {/* Pleat Creases */}
              <path d="M158 178 Q160 142 166 128" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M190 178 Q190 134 194 118" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M210 178 Q214 142 220 130" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />

              {/* Hat Headband */}
              <rect
                x="138"
                y="180"
                width="88"
                height="22"
                rx="6"
                fill="#FFFFFF"
                stroke="rgba(0,0,0,0.12)"
                strokeWidth="1.5"
              />
              {/* Golden trim on hat band */}
              <rect x="138" y="196" width="88" height="4.5" rx="2" fill="#FF6B00" />
            </g>
          </g>
        </svg>

        {/* ═════════════════════════════════════════════════════════
            PAN & TOSSING ARM SYSTEM
            Pivot origin at the chef's shoulder/elbow: (X: 250, Y: 320)
            Pan center sits right around (X: 410, Y: 345)
           ═════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 pointer-events-none"
        >
          {/* Animated Arm + Skillet group */}
          <motion.div
            className="absolute w-full h-full"
            style={{ transformOrigin: "260px 340px" }}
            animate={{
              rotate: [0, -16, 6, 0],
              y: [0, -12, 5, 0],
            }}
            transition={tossPhysics}
          >
            <svg
              viewBox="0 0 560 540"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ── Chef Right Forearm reaching forward to pan ── */}
              <path
                d="M230 335 Q290 320 330 335"
                stroke="#1E293B"
                strokeWidth="26"
                strokeLinecap="round"
                fill="none"
              />
              {/* Apron/Sleeve cuff */}
              <rect x="318" y="320" width="12" height="30" rx="4" fill="#FF6B00" />

              {/* Hand gripping the handle */}
              <ellipse cx="342" cy="336" rx="12" ry="14" fill="#FBD38D" />
              <path d="M336 326 Q348 332 340 346" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />

              {/* Pan Handle */}
              <path
                d="M338 336 L385 342"
                stroke="#1E293B"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M380 342 L396 344"
                stroke="#64748B"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* ── Fire Licks beneath Pan ── */}
              <motion.g
                animate={{
                  scaleY: [0.85, 1.3, 0.9],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                style={{ transformOrigin: "445px 380px" }}
              >
                <path
                  d="M405 372 Q420 398 435 372 Q450 408 465 370 Q480 398 495 372"
                  stroke="url(#fireGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                <ellipse
                  cx="450"
                  cy="378"
                  rx="45"
                  ry="9"
                  fill="url(#fireGrad)"
                  opacity="0.45"
                  filter="blur(4px)"
                />
              </motion.g>

              {/* ── Pan / Skillet (Center X: 450, Center Y: 348) ── */}
              {/* Outer Rim & Depth */}
              <ellipse
                cx="450"
                cy="348"
                rx="68"
                ry="26"
                fill="url(#skilletMetal)"
                stroke="url(#skilletRimGold)"
                strokeWidth="3"
              />
              {/* Deep Interior Pan Bowl */}
              <ellipse
                cx="450"
                cy="351"
                rx="62"
                ry="21"
                fill="url(#skilletInterior)"
              />

              {/* Sizzling oil glisten */}
              <path
                d="M415 352 Q450 359 485 352"
                stroke="#FFB800"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* Food base remaining in pan */}
              <circle cx="430" cy="353" r="4.5" fill="#E53E3E" />
              <circle cx="450" cy="355" r="5" fill="#ECC94B" />
              <circle cx="470" cy="352" r="4.5" fill="#38A169" />
              <circle cx="458" cy="350" r="3.5" fill="#FF8C00" />
            </svg>
          </motion.div>
        </div>

        {/* ═════════════════════════════════════════════════════════
            TOSSED INGREDIENTS & STEAM TRAILS
            Centered right above the Pan: X = 450px in the 560px grid (~ 80% left)
           ═════════════════════════════════════════════════════════ */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "80%", // Centers directly above the skillet (X: 450px / 560px)
            top: "52%",  // Aligns with the skillet rim (Y: 280px / 540px)
            transform: "translate(-50%, -50%)",
            width: "160px",
            height: "320px",
          }}
        >
          {/* Steam wisps rising straight out of the hot pan */}
          {[
            { x: -24, duration: 2.2, delay: 0 },
            { x: 4, duration: 2.6, delay: 0.5 },
            { x: 28, duration: 2.4, delay: 1.0 },
          ].map((steam, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-20 rounded-full"
              style={{
                left: `calc(50% + ${steam.x}px)`,
                bottom: "40px",
                background:
                  "linear-gradient(to top, rgba(255,255,255,0.25) 0%, rgba(255,184,0,0.18) 50%, transparent 100%)",
                filter: "blur(5px)",
              }}
              animate={{
                y: [0, -110],
                opacity: [0, 0.75, 0],
                scaleX: [0.8, 1.8, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: steam.duration,
                delay: steam.delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* ── 1. Ripe Cherry Tomato (Arcs from Pan -> Air -> Pan) ── */}
          <motion.div
            className="absolute left-[50%] -translate-x-1/2"
            style={{ bottom: "50px" }}
            animate={{
              x: [-12, -26, -10],
              y: [0, -175, 0], // launches 175px above the pan rim
              rotate: [0, -190, -360],
              scale: [0.95, 1.25, 0.95],
            }}
            transition={{
              ...tossPhysics,
              times: [0, 0.48, 1],
            }}
          >
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="18" r="11" fill="url(#tomatoGrad)" />
              <circle cx="13" cy="14" r="3.5" fill="#ffffff" fillOpacity="0.5" />
              <path
                d="M16 7 C16 4 18 3 19 2 M16 7 C14 5 12 6 11 7 M16 7 C18 6 21 7 21 8"
                stroke="#48BB78"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* ── 2. Sautéed Golden Mushroom Slice ── */}
          <motion.div
            className="absolute left-[50%] -translate-x-1/2"
            style={{ bottom: "52px" }}
            animate={{
              x: [12, 32, 14],
              y: [0, -160, 0],
              rotate: [0, 220, 360],
              scale: [0.95, 1.25, 0.95],
            }}
            transition={{
              ...tossPhysics,
              delay: 0.05,
              times: [0, 0.46, 1],
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M7 16 C7 9.5 11 5 16 5 C21 5 25 9.5 25 16 C25 18 23 19 20 19 L19 27 C19 28 17.5 29 16 29 C14.5 29 13 28 13 27 L12 19 C9 19 7 18 7 16 Z"
                fill="url(#mushroomGrad)"
              />
              <path d="M12 16 C14 17 18 17 20 16" stroke="#C7A779" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* ── 3. Fresh Broccoli Floret ── */}
          <motion.div
            className="absolute left-[50%] -translate-x-1/2"
            style={{ bottom: "50px" }}
            animate={{
              x: [-24, -38, -22],
              y: [0, -145, 0],
              rotate: [0, -150, -300],
              scale: [0.9, 1.2, 0.9],
            }}
            transition={{
              ...tossPhysics,
              delay: 0.03,
              times: [0, 0.49, 1],
            }}
          >
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="12" r="8" fill="#2E8540" />
              <circle cx="11" cy="15" r="6" fill="#38A169" />
              <circle cx="21" cy="15" r="6" fill="#48BB78" />
              <path d="M16 18 L16 28" stroke="#68D391" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* ── 4. Sizzling Golden Shrimp / Bell Pepper Slice ── */}
          <motion.div
            className="absolute left-[50%] -translate-x-1/2"
            style={{ bottom: "52px" }}
            animate={{
              x: [2, 10, 2],
              y: [0, -195, 0], // Reaches high dramatic apex
              rotate: [0, 180, 360],
              scale: [0.95, 1.35, 0.95],
            }}
            transition={{
              ...tossPhysics,
              delay: 0.02,
              times: [0, 0.45, 1],
            }}
          >
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 20 C6 14 10 7 18 6 C24 5 27 10 26 14 C25 17 21 18 19 16 C17 14 18 11 21 11"
                stroke="#FF6B00"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <circle cx="22" cy="8" r="2" fill="#1A202C" />
            </svg>
          </motion.div>

          {/* ── 5. Golden Seasoning & Herb Particles ── */}
          {[
            { x: -18, peakY: -140, delay: 0.08, size: 6, color: "#F6E05E" },
            { x: 22, peakY: -150, delay: 0.12, size: 5, color: "#FF9500" },
            { x: -2, peakY: -180, delay: 0.04, size: 7, color: "#68D391" },
            { x: 36, peakY: -130, delay: 0.1, size: 5, color: "#ED8936" },
          ].map((fleck, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full left-[50%] -translate-x-1/2"
              style={{
                width: fleck.size,
                height: fleck.size,
                backgroundColor: fleck.color,
                boxShadow: `0 0 8px ${fleck.color}`,
                bottom: "50px",
              }}
              animate={{
                x: [0, fleck.x, 0],
                y: [0, fleck.peakY, 0],
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                ...tossPhysics,
                delay: fleck.delay,
              }}
            />
          ))}
        </div>

        {/* ─── Floating Pro Chef Live Badge ─── */}
        <motion.div
          className="absolute -bottom-2 right-4 px-4 py-2 rounded-2xl glass border border-white/10 flex items-center gap-2.5 z-40 shadow-2xl backdrop-blur-md"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-white tracking-wide uppercase">Chef AI Sautéing</span>
            <span className="text-[9px] text-gray-400">Crafting personalized dishes</span>
          </div>
        </motion.div>

        {/* ─── Interactive Hover Cue ─── */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-2 left-8 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-[11px] text-primary-light z-40 font-medium backdrop-blur-sm"
          >
            🔥 Sautéing at high heat!
          </motion.div>
        )}
      </div>
    </div>
  );
}
