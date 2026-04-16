"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

/**
 * Pill button with a sliding arrow icon on hover.
 * Primary: solid #0040FF   Outline: ghost border
 */
export default function AnimatedButton({
  children,
  className,
  variant = "primary",
  ...props
}: AnimatedButtonProps) {
  const base =
    "relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer";

  const variants = {
    primary: "bg-[#0040FF] text-white hover:bg-[#0033cc]",
    outline:
      "bg-transparent border border-white/20 text-white hover:border-[#0040FF]/60 hover:bg-[#0040FF]/[0.08]",
  };

  const iconBg = {
    primary: "bg-white/20",
    outline: "bg-white/10",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
        {children}
      </span>
      <div
        className={cn(
          "absolute right-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
          iconBg[variant],
        )}
      >
        <ArrowUpRight size={16} />
      </div>
    </button>
  );
}
