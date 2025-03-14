"use client";

import Hero from "@/components/fragments/home/hero";
import VisionMision from "@/components/fragments/home/vision-mision";
import MainService from "@/components/fragments/home/main-service";
import Appointment from "@/components/fragments/home/appointment";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <VisionMision />
      <MainService />
      <Appointment />
    </main>
  );
}
