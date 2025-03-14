"use client";

import HeroSection from "@/components/fragments/heroSection";
import MedicalHistoryService from "@/components/fragments/services/medicalHistory";
import PharmacyService from "@/components/fragments/services/pharmacyService";

export default function ServicesPage() {
    return (
        <main>
            <HeroSection title="Layanan Kami">
                MediConnect menyediakan berbagai layanan kesehatan komprehensif untuk mendukung
                kesehatan dan kesejahteraan Anda dengan teknologi modern dan pelayanan berkualitas.
            </HeroSection>
            <MedicalHistoryService />
            <PharmacyService />
        </main>
    );
}