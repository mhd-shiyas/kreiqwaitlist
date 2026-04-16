import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import NumbersBar from "@/components/NumbersBar";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import StyleIntelligence from "@/components/StyleIntelligence";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <NumbersBar />
      <Problem />
      <Solution />
      <StyleIntelligence />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
