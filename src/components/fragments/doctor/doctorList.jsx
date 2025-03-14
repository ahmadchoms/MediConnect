"use client";

import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorCard from "@/components/fragments/doctor/doctorCard";
import { toast } from "sonner";
import { firebaseService } from "@/lib/firebase/service";

export default function DoctorListSection() {
    const [activeTab, setActiveTab] = useState("all");
    const [doctorsList, setDoctorsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDoctors = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await firebaseService.getData("doctors");
            setDoctorsList(response);
        } catch {
            toast.error("Gagal memuat data dokter");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    console.log(doctorsList)

    const filteredDoctors =
        activeTab === "all"
            ? doctorsList
            : doctorsList.filter((doctor) => doctor.categories.includes(activeTab));

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
                    <div className="flex justify-center mb-8">
                        <TabsList>
                            <TabsTrigger value="all">Semua Dokter</TabsTrigger>
                            <TabsTrigger value="general">Dokter Umum</TabsTrigger>
                            <TabsTrigger value="specialist">Dokter Spesialis</TabsTrigger>
                        </TabsList>
                    </div>

                    {["all", "general", "specialist"].map((tab) => (
                        <TabsContent key={tab} value={tab} className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredDoctors.map((doctor, index) => (
                                    <DoctorCard key={doctor.id} doctor={doctor} index={index} />
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}