"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { revealUp, revealStagger, VIEWPORT } from "@/lib/animations";

interface Plan {
  name: string;
  monthly: number;
  annual: number;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    features: [
      "3 AI modules",
      "Basic analytics",
      "1 platform connected",
      "Community access",
    ],
  },
  {
    name: "Pro",
    monthly: 29,
    annual: 23,
    features: [
      "All 17 AI modules",
      "Advanced analytics",
      "5 platforms connected",
      "Style Intelligence",
      "Priority support",
    ],
  },
  {
    name: "Growth",
    monthly: 79,
    annual: 63,
    popular: true,
    features: [
      "Everything in Pro",
      "Monetisation Connector",
      "Brand Deal Finder",
      "Media Kit Generator",
      "Unlimited platforms",
      "Dedicated account manager",
    ],
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);
  const [annual, setAnnual] = useState(false);

  return (
    <section className="bg-white border-t border-[#E8EAED]">
      <div ref={ref} className="max-w-[1000px] mx-auto px-6 py-28">
        <motion.div
          variants={revealUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <p className="pill-blue inline-flex mb-6">Pricing</p>
          <h2 className="font-garamond font-medium text-[40px] md:text-[56px] text-[#0F0F11] tracking-[-0.02em] leading-[1.08] mb-8">
            Simple pricing.
          </h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span
              className={`font-inter text-sm cursor-pointer transition-colors ${
                !annual ? "text-[#0F0F11] font-medium" : "text-[#8C8FA3]"
              }`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`toggle-track ${annual ? "on" : "off"}`}
              aria-label="Toggle annual billing"
            >
              <span className={`toggle-thumb ${annual ? "on" : "off"}`} />
            </button>
            <span
              className={`font-inter text-sm cursor-pointer transition-colors ${
                annual ? "text-[#0F0F11] font-medium" : "text-[#8C8FA3]"
              }`}
              onClick={() => setAnnual(true)}
            >
              Annual
            </span>
            {annual && (
              <span className="pill-blue text-[11px]">20% off</span>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={revealStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={revealUp}
              className={`relative rounded-[20px] p-8 transition-all duration-250 ${
                plan.popular
                  ? "bg-[#0040FF] text-white shadow-[0_16px_48px_rgba(0,64,255,0.25)] scale-[1.02]"
                  : "bg-[#F7F8FA] border border-[#E8EAED] hover:border-[rgba(0,64,255,0.20)] hover:shadow-[0_8px_32px_rgba(0,64,255,0.08)] hover:-translate-y-1"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0F0F11] text-white px-4 py-1 rounded-full font-inter text-[11px] font-semibold tracking-[0.06em] uppercase whitespace-nowrap">
                  Most popular
                </span>
              )}

              <p className={`font-inter font-semibold text-sm mb-1 ${plan.popular ? "text-white/70" : "text-[#0040FF]"}`}>
                {plan.name}
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`font-garamond font-semibold text-[42px] leading-none tracking-tight ${plan.popular ? "text-white" : "text-[#0F0F11]"}`}>
                  ${annual ? plan.annual : plan.monthly}
                </span>
                <span className={`font-inter text-sm ${plan.popular ? "text-white/60" : "text-[#8C8FA3]"}`}>/month</span>
              </div>

              <div className={`h-px my-6 ${plan.popular ? "bg-white/20" : "bg-[#E8EAED]"}`} />

              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2.5 font-inter text-sm ${plan.popular ? "text-white/85" : "text-[#4B4D58]"}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                      <path
                        d="M3 7l2.8 2.8L11 4.2"
                        stroke={plan.popular ? "rgba(255,255,255,0.8)" : "#10B981"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={revealUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 font-inter text-sm text-[#8C8FA3]"
        >
          Waitlist members get <span className="text-[#0040FF] font-medium">40% off</span> their first year.
        </motion.p>
      </div>
    </section>
  );
}
