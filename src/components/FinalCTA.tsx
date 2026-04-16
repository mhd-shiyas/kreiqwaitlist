"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { revealUp, revealStagger, VIEWPORT } from "@/lib/animations";
import EmailForm from "./EmailForm";
// import { WaitlistCounter } from "./WaitlistCounter";

/* Diagonal sweep beam */
function Beam({
  delay = 0,
  duration = 7,
  top,
  left,
  angle = -45,
  width = 280,
  opacity = 0.12,
}: {
  delay?: number;
  duration?: number;
  top: string;
  left: string;
  angle?: number;
  width?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left, rotate: angle, transformOrigin: "left center" }}
      initial={{ x: "-120%", opacity: 0 }}
      animate={{ x: "220%", opacity: [0, opacity, opacity, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 3 + delay,
        ease: "easeInOut",
      }}
    >
      <div
        style={{
          width,
          height: 1.5,
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.9) 60%, transparent 100%)`,
          filter: "blur(0.5px)",
        }}
      />
      {/* Soft glow behind the line */}
      <div
        style={{
          width,
          height: 8,
          marginTop: -5,
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 60%, transparent)`,
          filter: "blur(3px)",
        }}
      />
    </motion.div>
  );
}

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <section className="relative bg-white py-10 px-4 md:px-8">
      <div className="relative rounded-[28px] overflow-hidden bg-[#0040FF]">

        {/* ── Grain texture ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        {/* ── Subtle grid ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* ── Glow orbs ── */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-32 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)" }}
        />

        {/* ── Animated beam lines ── */}
        <Beam top="18%"  left="0%"   angle={-38} width={320} opacity={0.13} delay={0}   duration={7} />
        <Beam top="38%"  left="5%"   angle={-38} width={200} opacity={0.09} delay={2.5} duration={8} />
        <Beam top="62%"  left="0%"   angle={-38} width={260} opacity={0.11} delay={1.2} duration={6.5} />
        <Beam top="80%"  left="10%"  angle={-38} width={180} opacity={0.07} delay={3.8} duration={9} />
        <Beam top="10%"  left="55%"  angle={-38} width={300} opacity={0.10} delay={1.8} duration={7.5} />
        <Beam top="50%"  left="60%"  angle={-38} width={220} opacity={0.08} delay={4.2} duration={8.5} />

        {/* ── Content ── */}
        <div ref={ref} className="relative z-10 max-w-[580px] mx-auto px-8 py-24 text-center">
          <motion.div
            variants={revealStagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Eyebrow */}
            <motion.div variants={revealUp} className="flex justify-center mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 font-inter text-[12px] font-medium text-white/80 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse-dot" />
                Waitlist is open
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={revealUp}
              className="font-garamond font-medium text-[48px] md:text-[64px] text-white tracking-[-0.025em] leading-[1.05] mb-5"
            >
              Your content.<br />Your income.
            </motion.h2>

            {/* Subtext */}
            {/* <motion.p
              variants={revealUp}
              className="font-inter text-[16px] text-white/60 mb-10 leading-relaxed"
            >
              Join{" "}
              <span className="text-white font-semibold">
                <WaitlistCounter />
              </span>{" "}
              creators building the future of their brand.
            </motion.p> */}

            {/* Form */}
            <motion.div variants={revealUp} className="flex justify-center">
              <EmailForm dark />
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
