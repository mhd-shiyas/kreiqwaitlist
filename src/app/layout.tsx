import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kreiq — The AI Operating System for Content Creators",
  description:
    "Strategy, style intelligence, social analytics, and monetisation. All in one minimal platform. Join the waitlist.",
  openGraph: {
    title: "Kreiq — Your content, your income.",
    description:
      "The AI operating system for content creators. 17 AI modules. Minimal design. Built to make you money.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrains.variable}`}>
      <body className="font-jakarta antialiased">
        {children}
      </body>
    </html>
  );
}
