"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { revealUp, revealStagger, VIEWPORT } from "@/lib/animations";
import EmailForm from "./EmailForm";

const benefits = [
  "Founding pricing locked",
  "Beta access first",
  "Shape the product",
];

export default function MidCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <section className="relative bg-[#F7F8FA] overflow-hidden py-32 border-t border-[#E8EAED]">
      {/* Centered radial glow */}
      <div
        className="absolute inset-x-0 top-0 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 50% 50%, rgba(0,64,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="relative z-10 max-w-[580px] mx-auto px-6 text-center"
      >
        <motion.div
          variants={revealStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={revealUp}
            className="font-garamond font-medium text-[36px] md:text-[52px] text-[#0F0F11] tracking-[-0.02em] leading-[1.08] mb-3"
          >
            Join before it goes public.
          </motion.h2>

          <motion.p
            variants={revealUp}
            className="font-inter text-[16px] text-[#8C8FA3] mb-10"
          >
            Founding members lock in early pricing.
          </motion.p>

          {/* Benefit chips */}
          <motion.div
            variants={revealUp}
            className="flex flex-wrap justify-center gap-2.5 mb-12"
          >
            {benefits.map((b) => (
              <span
                key={b}
                className="pill-neutral cursor-default"
              >
                {b}
              </span>
            ))}
          </motion.div>

          <motion.div variants={revealUp} className="flex justify-center">
            <EmailForm />
          </motion.div>

          <motion.p
            variants={revealUp}
            className="mt-6 font-inter text-xs text-[#AAADB8]"
          >
            No spam. No card. Cancel anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
