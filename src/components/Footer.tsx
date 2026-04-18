"use client";

import Image from "next/image";
import kreiqLogo from "@/app/kreiqlogo.png";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E8EAED]">
      <div className="max-w-content mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Image
            src={kreiqLogo}
            alt="Kreiq"
            width={96}
            height={32}
            className="select-none"
          />

          {/* Links */}
          <div className="flex items-center gap-6">
            <span className="font-inter text-[13px] text-[#AAADB8]">
              &copy; 2026 Kreiq
            </span>
            <a
              href="mailto:hello@kreiq.ai"
              className="font-inter text-[13px] text-[#8C8FA3] hover:text-[#0040FF] transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/kreiqai?utm_source=qr&igsh=MW9jbW00eHF4ZnB6Nw=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#E8EAED] flex items-center justify-center text-[#8C8FA3] hover:text-[#0040FF] hover:border-[rgba(0,64,255,0.25)] transition-all duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/KreiqAI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-[#E8EAED] flex items-center justify-center text-[#8C8FA3] hover:text-[#0040FF] hover:border-[rgba(0,64,255,0.25)] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
