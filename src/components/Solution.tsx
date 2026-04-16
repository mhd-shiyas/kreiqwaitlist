"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { revealUp, VIEWPORT } from "@/lib/animations";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import {
  LayoutGrid,
  Sliders,
  User,
  Pencil,
  DollarSign,
  FileText,
  SearchCheck,
  Users,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Strategy Engine",
    description: "AI-driven content strategy tailored to your niche, goals, and growth stage.",
    icon: LayoutGrid,
  },
  {
    title: "Style Intelligence",
    description: "Decode what makes top creators magnetic. Learn their DNA, then sound like yourself.",
    icon: Sliders,
  },
  {
    title: "Profile Intelligence",
    description: "Audit and optimise every profile to maximise discovery and conversion.",
    icon: User,
  },
  {
    title: "Content Creation",
    description: "Generate hooks, scripts, and carousels that match your voice and platform best practices.",
    icon: Pencil,
  },
  {
    title: "Monetisation Connector",
    description: "Connect your audience to revenue — courses, memberships, affiliates, and products.",
    icon: DollarSign,
  },
  {
    title: "Media Kit Generator",
    description: "Auto-generate a stunning media kit with real-time stats that brands actually want to see.",
    icon: FileText,
  },
  {
    title: "Brand Deal Finder",
    description: "AI matches you with brands that fit your niche, audience, and values. Auto-pitch included.",
    icon: SearchCheck,
  },
  {
    title: "Audience Ownership Builder",
    description: "Move followers off rented platforms and into your owned email and community channels.",
    icon: Users,
  },
  {
    title: "AI Authenticity Shield",
    description: "Ensures your AI-assisted content still sounds like you. No robotic outputs, ever.",
    icon: ShieldCheck,
  },
];

// ── Animated wrapper using framer-motion (same dep already installed) ──────
type AnimatedContainerProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <section className="bg-[#F7F8FA] pt-24 pb-32 border-t border-[#E8EAED]">
      <div ref={ref} className="max-w-content mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          variants={revealUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="pill-blue inline-flex mb-6">The Solution</p>
          <h2 className="font-garamond font-medium text-[40px] md:text-[56px] text-[#0F0F11] tracking-[-0.02em] leading-[1.08] mb-3">
            One platform.
          </h2>
          <h2 className="font-garamond font-medium text-[40px] md:text-[56px] tracking-[-0.02em] leading-[1.15] gradient-text pb-2 mb-5">
            Everything you need.
          </h2>
          <p className="font-inter text-[17px] text-[#8C8FA3] max-w-[440px] mx-auto leading-relaxed">
            17 AI modules. Minimal design. Built to make you money.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <AnimatedContainer
          delay={0.3}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <FeatureCard
              key={i}
              feature={feature}
            />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}
