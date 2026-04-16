"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { revealUp, revealStagger, slideInRight, VIEWPORT } from "@/lib/animations";

const dnaRows = [
  {
    label: "TONE",
    value: "Direct, punchy, contrarian",
    icon: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10M7 2l5 5-5 5" stroke="#0040FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "blue",
  },
  {
    label: "HOOK STYLE",
    value: "Pattern interrupt + stat opener",
    icon: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M7 1v2M7 11v2M1 7h2m8 0h2M3.22 3.22l1.41 1.41m4.74 4.74 1.41 1.41M3.22 10.78l1.41-1.41m4.74-4.74 1.41-1.41" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: "purple",
  },
  {
    label: "CTA PATTERN",
    value: "Low friction, curiosity gap",
    icon: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <path d="M7 2a5 5 0 1 1 0 10A5 5 0 0 1 7 2zm0 3v2.5l1.5 1" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: "green",
  },
  {
    label: "FORMAT",
    value: "Short-form video, carousel, thread",
    icon: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="#D97706" strokeWidth="1.5"/>
        <path d="M5.5 5.5l3 2-3 2V5.5z" fill="#D97706"/>
      </svg>
    ),
    color: "amber",
  },
  {
    label: "CADENCE",
    value: "5x/week, peak Mon + Thu AM",
    icon: (
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="#E11D48" strokeWidth="1.5"/>
        <path d="M5 2v2M9 2v2M2 6h10" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    color: "rose",
  },
];

const colorMap: Record<string, string> = {
  blue:   "bg-kreiq-dim border-kreiq-border text-kreiq",
  purple: "bg-purple-50 border-purple-100 text-purple-700",
  green:  "bg-emerald-50 border-emerald-100 text-emerald-700",
  amber:  "bg-amber-50 border-amber-100 text-amber-700",
  rose:   "bg-rose-50 border-rose-100 text-rose-700",
};

const iconBgMap: Record<string, string> = {
  blue:   "bg-kreiq-dim border-kreiq-border",
  purple: "bg-purple-50 border-purple-100",
  green:  "bg-emerald-50 border-emerald-100",
  amber:  "bg-amber-50 border-amber-100",
  rose:   "bg-rose-50 border-rose-100",
};

const bullets = [
  "Analyse any creator's content DNA in seconds",
  "Extract proven patterns without copying style",
  "Generate content that's authentically you — but sharper",
];

export default function StyleIntelligence() {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <section className="relative bg-white overflow-hidden py-32 border-t border-[#E8EAED]">
      {/* Background glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,64,255,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── Left ── */}
          <motion.div
            variants={revealStagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={revealUp} className="inline-block mb-6">
              <span className="pill-blue">Style Intelligence Engine</span>
            </motion.div>

            <motion.h2
              variants={revealUp}
              className="font-garamond font-medium text-[40px] md:text-[52px] leading-[1.08] tracking-[-0.025em] mb-6 text-[#0F0F11]"
            >
              <span className="gradient-text">Learn from the best.</span>
              <br />
              <span className="gradient-text">Sound like yourself.</span>
            </motion.h2>

            <motion.p
              variants={revealUp}
              className="font-inter text-[16px] text-[#8C8FA3] mb-10 max-w-[400px] leading-[1.8]"
            >
              Decode what makes top creators magnetic — their tone, hooks,
              formats, and rhythm. Then apply those patterns to your unique voice.
            </motion.p>

            <motion.div variants={revealStagger} className="flex flex-col gap-4">
              {bullets.map((text) => (
                <motion.div
                  key={text}
                  variants={revealUp}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0040FF] flex items-center justify-center shrink-0 mt-0.5 shadow-[0_2px_8px_rgba(0,64,255,0.35)]">
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-inter text-[15px] text-[#4B4D58] leading-[1.6]">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: DNA card ── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Card glow */}
            <div
              className="absolute inset-0 rounded-[28px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(0,64,255,0.10) 0%, transparent 70%)",
                filter: "blur(24px)",
                transform: "translateY(12px) scale(0.95)",
              }}
            />

            <div className="relative rounded-[24px] bg-white border border-[#E8EAED] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.04),0_12px_48px_rgba(0,0,0,0.07),0_0_0_1px_rgba(0,64,255,0.05)]">

              {/* Top gradient bar */}
              <div className="h-[3px] w-full bg-gradient-to-r from-[#0040FF] via-[#6680FF] to-[#0040FF]" />

              <div className="p-7">
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0040FF] to-[#6680FF] flex items-center justify-center shadow-[0_2px_10px_rgba(0,64,255,0.3)]">
                        <span className="font-mono text-[11px] font-bold text-white tracking-tight">AH</span>
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-inter font-semibold text-[13px] text-[#0F0F11] leading-tight">
                        @alexhormozi
                      </span>
                      <span className="font-mono text-[10px] text-[#AAADB8]">2.1M followers</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                    <span className="font-inter text-[11px] text-emerald-700 font-semibold">DNA ready</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="gradient-divider mb-6" />

                {/* DNA rows */}
                <div className="flex flex-col gap-4">
                  {dnaRows.map((row, i) => (
                    <motion.div
                      key={row.label}
                      variants={revealUp}
                      initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      transition={{ delay: 0.35 + i * 0.12 }}
                      className="flex items-center gap-3"
                    >
                      {/* Icon */}
                      <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${iconBgMap[row.color]}`}>
                        {row.icon}
                      </div>

                      {/* Label + value */}
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#AAADB8]">
                          {row.label}
                        </span>
                        <span className="font-inter text-[12.5px] text-[#2E3040] font-medium truncate">
                          {row.value}
                          {i === 0 && (
                            <span className="inline-block w-[2px] h-[12px] bg-[#0040FF] ml-0.5 -mb-0.5 animate-cursor" />
                          )}
                        </span>
                      </div>

                      {/* Tag chip */}
                      <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border font-inter ${colorMap[row.color]}`}>
                        {i === 0 ? "High" : i === 1 ? "Key" : i === 2 ? "Active" : i === 3 ? "Multi" : "Set"}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  variants={revealUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: 1.0 }}
                  className="btn-gradient w-full mt-7 py-3.5 rounded-xl font-inter font-semibold text-[14px] text-white flex items-center justify-center gap-2"
                >
                  Apply DNA to my content
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
