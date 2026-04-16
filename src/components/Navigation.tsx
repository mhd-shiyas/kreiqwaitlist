"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import kreiqLogo from "@/app/kreiqlogo.png";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("hero-form")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-auto flex items-center justify-between px-3 py-2 rounded-2xl
          transition-all duration-300 w-full max-w-[480px]
          ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-[0_4px_32px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)]"
              : "bg-white/90 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.05)]"
          }`}
      >
        {/* ── Logo ── */}
        <div className="flex items-center shrink-0 pl-1">
          <Image
            src={kreiqLogo}
            alt="Kreiq"
            height={21}
            className="select-none w-auto"
            priority
          />
        </div>

        {/* ── CTA ── */}
        <button
          onClick={scrollToForm}
          className="btn-gradient shrink-0 h-9 px-5 rounded-xl
            font-inter text-[13px] font-medium text-white"
        >
          Get Early Access
        </button>
      </motion.nav>
    </div>
  );
}
