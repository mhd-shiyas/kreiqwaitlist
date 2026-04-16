"use client";

import { motion } from "framer-motion";
import { scaleIn, revealUp, wordReveal } from "@/lib/animations";
import EmailForm from "./EmailForm";
// import { WaitlistCounter } from "./WaitlistCounter";
import HeroMockup from "./HeroMockup";
import { FloatingPathsBackground } from "@/components/ui/floating-paths";

const headingWords1 = ["Your", "content,"];
const headingWords2 = ["your", "income."];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Very subtle blue tint at top */}
      <div
        className="absolute inset-x-0 top-0 h-[560px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,64,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Subtle orbs */}
      <div className="orb-1" />
      <div className="orb-2" />

      {/* Animated floating paths */}
      <FloatingPathsBackground position={1} />
      <FloatingPathsBackground position={-1} />

      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto px-6 pt-[96px] pb-[100px]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* ── Left: Text ─────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left max-w-[600px]">

            {/* Badge */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="pill-blue">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0040FF] animate-pulse-dot" />
                Waitlist open
              </div>
            </motion.div>

            {/* H1 — EB Garamond, large, tight */}
            <h1 className="font-garamond font-medium text-[52px] md:text-[80px] leading-[1.02] tracking-[-0.02em] mb-7 text-[#0F0F11]">
              <span className="block">
                {headingWords1.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordReveal}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.07 }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block">
                {headingWords2.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordReveal}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: (headingWords1.length + i) * 0.07 }}
                    className="inline-block mr-[0.3em] gradient-text"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              variants={revealUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.48 }}
              className="font-inter text-[17px] md:text-[19px] text-[#4B4D58] max-w-[500px] mx-auto lg:mx-0 mb-10 leading-[1.7]"
            >
              Kreiq is the AI operating system for content creators —
              strategy, style intelligence, social analytics,
              and monetisation. All in one minimal platform.
            </motion.p>

            {/* Email form */}
            <motion.div
              variants={revealUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.58 }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <EmailForm id="hero-form" />
            </motion.div>

            {/* Trust row */}
            <motion.div
              variants={revealUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.72 }}
              className="flex flex-col items-center lg:items-start gap-3"
            >
              {/* <p className="font-inter text-sm text-[#8C8FA3]">
                <WaitlistCounter />{" "}
                <span>creators already joined</span>
              </p> */}
            </motion.div>
          </div>

          {/* ── Right: Mockup ───────────────────────────── */}
          <HeroMockup />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-inter text-[11px] tracking-[0.18em] uppercase font-semibold text-[#0040FF]">
            Scroll
          </span>
          <div className="flex flex-col items-center justify-start w-5 h-8 rounded-full border-2 border-[#0040FF] pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-[#0040FF]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
