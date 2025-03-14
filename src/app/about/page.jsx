"use client";

import CertAward from "@/components/fragments/about/cert-award";
import History from "@/components/fragments/about/history";
import ValueSection from "@/components/fragments/about/value";
import HeroSection from "@/components/fragments/heroSection";

export default function AboutPage() {
  return (
    <main>
      <HeroSection title="Tentang Kami">Mengenal lebih dekat dengan MediConnect dan komitmen kami dalam memberikan layanan kesehatan terbaik.</HeroSection>
      <History />
      <ValueSection />
      <CertAward />
    </main>
  );
}
