"use client";

import DoctorListSection from "@/components/fragments/doctor/doctorList";
import ScheduleSection from "@/components/fragments/doctor/scheduleSection";
import HeroSection from "@/components/fragments/heroSection";

export default function DoctorsPage() {
  return (
    <main>
      <HeroSection title="Jadwal Dokter">Temui dokter berpengalaman kami untuk mendapatkan perawatan kesehatan terbaik.</HeroSection>
      <DoctorListSection />
      <ScheduleSection />
    </main>
  );
}