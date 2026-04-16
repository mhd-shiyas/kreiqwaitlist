"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

type FeatureCardProps = {
  feature: FeatureType;
  className?: string;
};

export function FeatureCard({ feature, className }: FeatureCardProps) {
  const p = genRandomPattern();

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden p-7 cursor-default group bg-white rounded-2xl border border-[rgba(0,64,255,0.13)]",
        className
      )}
      whileHover={{
        y: -6,
        boxShadow:
          "0 24px 48px rgba(0,64,255,0.10), 0 8px 20px rgba(0,0,0,0.06)",
      }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Hover border glow overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-[#0040FF] opacity-0"
        whileHover={{ opacity: 0.35 }}
        transition={{ duration: 0.28 }}
      />

      {/* Grid pattern background */}
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,64,255,0.04)] to-transparent [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="fill-[rgba(0,64,255,0.07)] stroke-[rgba(0,64,255,0.10)] absolute inset-0 h-full w-full mix-blend-normal"
          />
        </div>
      </div>

      {/* Grid glow on hover */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 w-full h-[70%] rounded-t-2xl opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 0%, rgba(0,64,255,0.18) 0%, rgba(0,64,255,0.07) 45%, transparent 75%)",
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hover tinted background */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(0,64,255,0.04)] to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.28 }}
      />

      {/* Icon */}
      <motion.div
        className="relative z-10 w-10 h-10 rounded-xl bg-[rgba(0,64,255,0.06)] border border-[rgba(0,64,255,0.12)] flex items-center justify-center"
        whileHover={{
          backgroundColor: "rgba(0,64,255,0.12)",
          scale: 1.1,
        }}
        transition={{ duration: 0.22 }}
      >
        <feature.icon
          className="w-5 h-5 text-[#0040FF]"
          strokeWidth={1.5}
          aria-hidden
        />
      </motion.div>

      <h3 className="relative z-10 mt-10 font-jakarta font-semibold text-[15px] text-[#0F0F11] transition-colors duration-200 group-hover:text-[#0040FF]">
        {feature.title}
      </h3>
      <p className="relative z-10 mt-2 font-jakarta text-sm text-[#8C8FA3] leading-relaxed font-light">
        {feature.description}
      </p>
    </motion.div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length?: number): number[][] {
  length = length ?? 5;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}
