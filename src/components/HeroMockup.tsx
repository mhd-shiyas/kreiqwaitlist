"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideInRight } from "@/lib/animations";

export default function HeroMockup() {
  const [showHook, setShowHook] = useState(false);
  const [showDna, setShowDna] = useState(false);
  const [typedText, setTypedText] = useState("");

  const fullText = "How to grow on LinkedIn in 2026";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowHook(true), 500);
        setTimeout(() => setShowDna(true), 1500);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      variants={slideInRight}
      initial="hidden"
      animate="visible"
      className="flex justify-center mt-12 lg:mt-0 shrink-0"
    >
      {/* Main Card */}
      <div className="animate-float w-full max-w-[360px] rounded-[24px] bg-white border border-[#E8EAED] shadow-[0_24px_80px_rgba(0,0,0,0.10),0_4px_16px_rgba(0,0,0,0.06)] p-6">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-inter text-[13px] font-medium text-[#0F0F11]">
            Content creation
          </span>
          <span className="w-2 h-2 rounded-full bg-[#0040FF] animate-pulse-dot shadow-[0_0_8px_rgba(0,64,255,0.6)]" />
        </div>

        {/* Topic input */}
        <div className="bg-[#F7F8FA] border border-[#E8EAED] rounded-xl px-4 py-3 mb-4">
          <p className="font-inter text-sm text-[#0F0F11]">
            {typedText}
            <span className="inline-block w-[2px] h-[14px] bg-[#0040FF] ml-0.5 -mb-0.5 animate-cursor" />
          </p>
        </div>

        {/* Hook output */}
        {showHook && (
          <motion.div
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.45 }}
            className="bg-[rgba(0,64,255,0.05)] border border-[rgba(0,64,255,0.15)] rounded-xl px-4 py-3 mb-4"
          >
            <p className="font-inter text-[11px] text-[#0040FF] mb-1 uppercase tracking-wider font-semibold">
              Hook
            </p>
            <p className="font-inter text-sm text-[#4B4D58] leading-relaxed">
              &ldquo;I posted 3x/week for 6 months. Here&apos;s what actually moved the needle.&rdquo;
            </p>
          </motion.div>
        )}

        {/* Platform chips */}
        <div className="flex gap-2 mb-4">
          {["Instagram", "LinkedIn", "Twitter"].map((p) => (
            <span
              key={p}
              className="px-3 py-1.5 rounded-full bg-[#F7F8FA] border border-[#E8EAED] font-inter text-[11px] text-[#8C8FA3]"
            >
              {p}
            </span>
          ))}
        </div>

        {/* DNA Card */}
        {showDna && (
          <motion.div
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="bg-[#F7F8FA] border border-[#E8EAED] rounded-xl px-4 py-3"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-inter text-[12px] font-medium text-[#0F0F11]">
                Style DNA
              </span>
              <span className="text-[10px] font-inter font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Matched
              </span>
            </div>
            <div className="flex items-end gap-1.5 h-10">
              {[75, 90, 60, 85, 45, 70, 95].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 rounded-sm"
                  style={{
                    background: `linear-gradient(to top, #0040FF, rgba(0,64,255,0.3))`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
