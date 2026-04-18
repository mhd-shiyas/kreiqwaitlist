"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { revealUp, revealStagger } from "@/lib/animations";

interface Stat {
  numericEnd: number;
  suffix: string;
  prefix: string;
  label: string;
}

const stats: Stat[] = [
  { numericEnd: 207, suffix: "M+", prefix: "",  label: "Creators worldwide" },
  { numericEnd: 95,  suffix: "%",  prefix: "",  label: "Earn under $15K" },
  { numericEnd: 254, suffix: "B",  prefix: "$", label: "Creator economy" },
  { numericEnd: 17,  suffix: "",   prefix: "",  label: "AI modules" },
];

function CountUp({
  end,
  prefix,
  suffix,
  inView,
}: {
  end: number;
  prefix: string;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [inView, end]);

  return (
    <span className="count-up font-garamond font-semibold text-[40px] md:text-[52px] text-white tracking-[-0.02em]">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function NumbersBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  return (
    <section ref={ref} className="relative bg-white pb-10 px-4 md:px-10">
      <div className="max-w-content mx-auto">
        <motion.div
          variants={revealStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-kreiq bg-kreiq overflow-hidden"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={revealUp}
              className={`flex flex-col items-center text-center py-10 px-6 ${
                i < stats.length - 1
                  ? "border-r border-white/20"
                  : ""
              } ${i < 2 ? "border-b border-white/20 md:border-b-0" : ""}`}
            >
              <CountUp
                end={stat.numericEnd}
                prefix={stat.prefix}
                suffix={stat.suffix}
                inView={inView}
              />
              <span className="font-inter text-sm text-white/70 mt-2 tracking-[0.01em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
