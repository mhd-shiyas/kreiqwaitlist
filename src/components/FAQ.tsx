"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { revealUp, revealStagger, VIEWPORT } from "@/lib/animations";

const faqs = [
  {
    q: "What is Kreiq?",
    a: "Kreiq is an AI-powered operating system built specifically for content creators. It combines 17 AI modules — from strategy and style intelligence to monetisation and brand deals — into one minimal platform designed to help you grow your audience and income.",
  },
  {
    q: "Is my content private?",
    a: "Absolutely. Your content, analytics, and style data are encrypted and never shared with other users or third parties. We don't use your data to train models. Your creative IP stays yours.",
  },
  {
    q: "What platforms does Kreiq support at launch?",
    a: "At launch we support Instagram, TikTok, YouTube, LinkedIn, Twitter/X, and newsletters. More platforms are on the roadmap — founding members get to vote on what's next.",
  },
  {
    q: "How does Style Intelligence work?",
    a: "Style Intelligence analyses any public creator's content to extract their unique patterns — tone, hooks, formats, posting cadence, and engagement triggers. You can then apply these patterns as a blueprint while Kreiq ensures the output still sounds authentically like you.",
  },
];

function FAQItem({ item, index }: { item: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={revealUp}
      className="faq-border"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        id={`faq-${index}`}
        aria-expanded={open}
      >
        <span
          className={`font-inter font-medium text-base transition-colors duration-200 ${
            open ? "text-[#0040FF]" : "text-[#0F0F11]"
          }`}
        >
          {item.q}
        </span>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-200 ${
            open
              ? "bg-[#0040FF] text-white rotate-45"
              : "bg-[#F7F8FA] text-[#8C8FA3] border border-[#E8EAED]"
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 1v8M1 5h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-inter text-[15px] text-[#4B4D58] leading-[1.75] max-w-[560px]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <section className="bg-[#F7F8FA] border-t border-[#E8EAED]">
      <div ref={ref} className="max-w-[680px] mx-auto px-6 py-28">
        <motion.div
          variants={revealUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <p className="pill-blue inline-flex mb-6">FAQ</p>
          <h2 className="font-garamond font-medium text-[40px] md:text-[52px] text-[#0F0F11] tracking-[-0.02em] leading-[1.08]">
            Questions.
          </h2>
        </motion.div>

        <motion.div
          variants={revealStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
