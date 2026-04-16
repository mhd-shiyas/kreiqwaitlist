"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { revealUp, VIEWPORT } from "@/lib/animations";

const BLUE    = "#0040FF";
const BLUE_08 = "rgba(0,64,255,0.08)";
const BLUE_15 = "rgba(0,64,255,0.15)";
const BLUE_20 = "rgba(0,64,255,0.20)";

const cards = [
  {
    num: "01",
    title: "The algorithm ignores you.",
    body: "Your reach is shrinking every quarter, and no tool can explain why — or fix it.",
    tag: "−43% avg reach",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 12L5.5 7.5l3 2.5L13 3" stroke={BLUE} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="13" cy="3" r="1.5" fill={BLUE}/>
      </svg>
    ),
    stat: (
      <div className="flex items-end gap-[4px] h-9">
        {[100, 88, 92, 74, 78, 60, 64, 46, 50, 32].map((h, i) => (
          <div
            key={i}
            className="rounded-[3px] flex-1"
            style={{
              height: `${h * 0.36}px`,
              background: i >= 7 ? BLUE : `rgba(0,64,255,${0.12 + i * 0.04})`,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    num: "02",
    title: "Views don't pay rent.",
    body: "You have the audience, but no system to turn attention into sustainable income.",
    tag: "No monetisation path",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3C4.5 3 2 8 2 8s2.5 5 6 5 6-5 6-5-2.5-5-6-5z" stroke={BLUE} strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="8" cy="8" r="2" stroke={BLUE} strokeWidth="1.5"/>
        <path d="M13 3l-2.5 2.5" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    stat: (
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-0.5 flex-1 rounded-lg bg-[rgba(0,64,255,0.06)] border border-[rgba(0,64,255,0.12)] px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#AAADB8]">Views</span>
          <span className="font-inter font-bold text-[18px] text-[#0F0F11] leading-none">124K</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
          <path d="M4 10h12M12 6l4 4-4 4" stroke="#D0D3E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="flex flex-col gap-0.5 flex-1 rounded-lg bg-[#F7F8FA] border border-[#E8EAED] px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#AAADB8]">Revenue</span>
          <span className="font-inter font-bold text-[18px] text-[#C8CADB] leading-none">$0</span>
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "You're running 7 tools.",
    body: "Analytics here, scheduling there, editing somewhere else. Nothing connects to your goals.",
    tag: "Zero integration",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" rx="1.5" stroke={BLUE} strokeWidth="1.5"/>
        <rect x="9" y="2" width="5" height="5" rx="1.5" stroke={BLUE} strokeWidth="1.5"/>
        <rect x="2" y="9" width="5" height="5" rx="1.5" stroke={BLUE} strokeWidth="1.5"/>
        <rect x="9" y="9" width="5" height="5" rx="1.5" stroke={BLUE} strokeWidth="1.5"/>
      </svg>
    ),
    stat: (
      <div className="flex flex-col gap-3">
        {/* Row 1 */}
        <div className="flex items-center gap-2">
          {["Analytics", "Scheduler", "Editor", "Caption AI"].map((name, i) => (
            <div key={name} className="flex items-center gap-2">
              <span
                className="font-inter text-[12px] font-medium px-3 py-1.5 rounded-lg border whitespace-nowrap"
                style={{ background: BLUE_08, borderColor: BLUE_15, color: BLUE }}
              >
                {name}
              </span>
              {i < 3 && (
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="shrink-0">
                  <path d="M1 4h3M7 4h2M11 4h4" stroke="#C8CADB" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
                </svg>
              )}
            </div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="flex items-center gap-2">
          {["Trends", "Clips", "CRM"].map((name, i) => (
            <div key={name} className="flex items-center gap-2">
              <span
                className="font-inter text-[12px] font-medium px-3 py-1.5 rounded-lg border whitespace-nowrap"
                style={{ background: BLUE_08, borderColor: BLUE_15, color: BLUE }}
              >
                {name}
              </span>
              {i < 2 && (
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="shrink-0">
                  <path d="M1 4h3M7 4h2M11 4h4" stroke="#C8CADB" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
                </svg>
              )}
            </div>
          ))}
          {/* broken chain end */}
          <div className="flex items-center gap-1.5 ml-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
              <path d="M7 5.5H5a3.5 3.5 0 0 0 0 7h2M11 5.5h2a3.5 3.5 0 0 1 0 7h-2M6.5 9h5" stroke="#D0D3E0" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M13 3l2 2-2 2M5 13l-2 2 2 2" stroke="#E8EAED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-inter text-[11px] text-[#C8CADB]">not connected</span>
          </div>
        </div>
      </div>
    ),
  },
];

const CARD_TOP = 260;

function StackCard({
  card,
  index,
  scrollYProgress,
}: {
  card: (typeof cards)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const n = cards.length;
  const isLast = index === n - 1;

  const scale = useTransform(
    scrollYProgress,
    [index / n, (index + 1) / n],
    isLast ? [1, 1] : [1, 0.90 + index * 0.03]
  );

  return (
    <motion.div
      style={{
        scale,
        position: "sticky",
        top: `${CARD_TOP}px`,
        zIndex: index + 1,
        transformOrigin: "top center",
        marginBottom: index < n - 1 ? "10vh" : 0,
      }}
      className="group relative w-full rounded-[20px] bg-white border border-[#E8EAED] overflow-hidden
                 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.07)]
                 transition-all duration-300 cursor-default
                 hover:border-[rgba(0,64,255,0.22)] hover:shadow-[0_8px_48px_rgba(0,64,255,0.10)]"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${BLUE_20} 25%, ${BLUE} 50%, ${BLUE_20} 75%, transparent)` }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(0,64,255,0.05), transparent)" }}
      />

      <div className="relative z-10 px-8 pt-7 pb-7">

        {/* Icon + number */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border"
            style={{ background: BLUE_08, borderColor: BLUE_15 }}
          >
            {card.icon}
          </div>
          <span
            className="font-garamond font-bold text-[80px] leading-none select-none"
            style={{
              color: "rgba(0,64,255,0.12)",
            }}
          >
            {card.num}
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-5"
          style={{ background: `linear-gradient(90deg, ${BLUE_15} 0%, #E8EAED 50%, transparent 100%)` }}
        />

        {/* Title + body */}
        <h3 className="font-jakarta font-semibold text-[20px] text-[#0F0F11] mb-2 leading-snug">
          {card.title}
        </h3>
        <p className="font-jakarta text-[14px] text-[#8C8FA3] leading-[1.75] mb-6">
          {card.body}
        </p>

        {/* Inline stat */}
        {card.stat}

        {/* Tag */}
        <div className="flex justify-end mt-5">
          <span
            className="font-inter text-[11px] font-semibold px-3 py-1 rounded-full border"
            style={{ color: BLUE, background: BLUE_08, borderColor: BLUE_15 }}
          >
            {card.tag}
          </span>
        </div>

      </div>
    </motion.div>
  );
}

export default function Problem() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, VIEWPORT);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ minHeight: "150vh", paddingBottom: "120px" }}
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 pt-10 pb-7 text-center bg-white/95 backdrop-blur-sm">
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,64,255,0.10) 30%, rgba(0,64,255,0.10) 70%, transparent)" }}
        />
        <motion.div
          ref={headerRef}
          variants={revealUp}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <p className="pill-blue inline-flex mb-5">The Problem</p>
          <h2 className="font-garamond font-medium text-[38px] md:text-[52px] text-[#0F0F11] tracking-[-0.02em] leading-[1.08] mb-3">
            You&apos;re not the problem.
          </h2>
          <p className="font-inter text-[16px] text-[#8C8FA3] max-w-[400px] mx-auto leading-relaxed">
            Your tools were never designed to make you money.
          </p>
        </motion.div>
      </div>

      {/* Cards */}
      <div className="max-w-[720px] mx-auto px-6 pt-6">
        {cards.map((card, i) => (
          <StackCard key={card.num} card={card} index={i} scrollYProgress={scrollYProgress} />
        ))}
        <div className="h-16" />
      </div>
    </section>
  );
}
