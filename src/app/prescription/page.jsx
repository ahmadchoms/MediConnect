"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import HeroSection from "@/components/fragments/heroSection";
import { PrescriptionList } from "@/components/fragments/pharmacy/presciptionList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { firebaseService } from "@/lib/firebase/service";

export default function PrescriptionPage() {
    const [appointment, setAppointment] = useState([]);
    const [prescription, setPrescription] = useState([]);
    const [userId, setUserId] = useState("");
    const { data: session } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.user?.name) return;

            const userQuery = await firebaseService.queryDocument(
                "users",
                "name",
                session?.user?.name
            );
            if (userQuery.length > 0) {
                const userDoc = userQuery[0];
                setUserId(userDoc.id);

                const appointmentData = await firebaseService.getData("appointments");
                const filteredAppointments = appointmentData.filter((app) => app.userId === userDoc.id);
                setAppointment(filteredAppointments);

                const prescriptionData = await firebaseService.getData("prescriptions");
                const filteredPrescriptions = prescriptionData.filter((presc) =>
                    filteredAppointments.some(app => app.id === presc.appointmentId)
                );
                setPrescription(filteredPrescriptions);
            }
        };

        fetchData();
    }, [session]);

    return (
        <main>
            <HeroSection title="Resep Obat">
                Lihat detail resep yang telah diberikan oleh dokter, termasuk informasi obat, dosis, dan petunjuk penggunaan.
            </HeroSection>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle>Daftar Resep Dokter</CardTitle>
                                    <CardDescription>
                                        Lihat detail resep obat Anda
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <PrescriptionList prescriptions={prescription} />
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}