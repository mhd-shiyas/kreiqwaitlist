"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import confetti from "canvas-confetti";

const emailSchema = z.email("Please enter a valid email");

interface EmailFormProps {
  dark?: boolean;
  id?: string;
}

export default function EmailForm({ dark, id }: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [position, setPosition] = useState(0);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0].message);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!data.success) {
        const msg =
          data.code === "ALREADY_REGISTERED"
            ? "You're already on the list!"
            : data.code === "INVALID_EMAIL"
            ? "Please enter a valid email"
            : "Something went wrong. Please try again.";
        setError(msg);
        setShake(true);
        setTimeout(() => setShake(false), 400);
        setLoading(false);
        return;
      }

      setPosition(data.position);
      setSuccess(true);
      setLoading(false);

      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#0040FF", "#4080FF", "#80A0FF", "#ffffff"],
      });
    } catch {
      setError("Something went wrong. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setLoading(false);
    }
  };

  const inputClass = `
    w-full h-[52px] rounded-xl px-[18px] font-inter text-[15px] outline-none transition-all duration-200
    ${dark
      ? `text-white placeholder-white/40 bg-white/[0.12] border ${
          error
            ? "border-rose-400/70 shadow-[0_0_0_3px_rgba(244,63,94,0.15)]"
            : "border-white/20 focus:border-white/50 focus:bg-white/[0.18] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]"
        }`
      : `text-[#0F0F11] placeholder-[#AAADB8] bg-white border ${
          error
            ? "border-rose-300 shadow-[0_0_0_3px_rgba(244,63,94,0.08)]"
            : "border-[#E8EAED] focus:border-[#0040FF]/50 focus:shadow-[0_0_0_3px_rgba(0,64,255,0.10)]"
        }`
    }
    ${shake ? "animate-shake" : ""}
  `;

  return (
    <div id={id} className="w-full max-w-[480px]">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your email"
                className={inputClass}
                disabled={loading}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className={`absolute -bottom-6 left-0 font-inter text-[12px] ${dark ? "text-rose-300" : "text-rose-500"}`}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`group h-[52px] min-w-[180px] rounded-xl font-inter font-medium text-[15px] flex items-center justify-center gap-2 shrink-0 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                dark
                  ? "bg-white text-[#0040FF] hover:bg-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.22)] hover:scale-[1.02] active:scale-[0.98]"
                  : "btn-gradient text-white"
              }`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <>
                  Get early access
                  <span aria-hidden="true" className="relative inline-flex overflow-hidden w-[1em]">
                    <span className="transition-transform duration-300 group-hover:translate-x-full">→</span>
                    <span className="absolute inset-0 -translate-x-full transition-transform duration-300 group-hover:translate-x-0">→</span>
                  </span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } }}
            className="flex flex-col items-center gap-3"
          >
            <svg className="w-16 h-16" viewBox="0 0 52 52">
              <circle
                className="checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke={dark ? "white" : "#0040FF"}
                strokeWidth="2"
              />
              <path
                className="checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
                stroke={dark ? "white" : "#0040FF"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className={`font-garamond font-semibold text-[28px] ${dark ? "text-white" : "text-[#0F0F11]"}`}>
              You&apos;re in.
            </h3>
            <p className={`font-inter text-base ${dark ? "text-white/60" : "text-[#8C8FA3]"}`}>
              #{position} on the list.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
