"use client";

import HeroSection from "@/components/fragments/heroSection";
import ContactInfoSection from "@/components/fragments/contact/infoSection";
import ContactFormSection from "@/components/fragments/contact/formSection";

export default function ContactPage() {
    return (
        <main>
            <HeroSection title="Hubungi Kami">
                Kami siap membantu Anda. Hubungi kami untuk pertanyaan, saran, atau informasi lebih lanjut tentang layanan kami.
            </HeroSection>
            <ContactInfoSection />
            <ContactFormSection />
        </main>
    );
}