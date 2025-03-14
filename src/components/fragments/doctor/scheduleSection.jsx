"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState, useMemo } from "react";
import { firebaseService } from "@/lib/firebase/service";
import { toast } from "sonner";

const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const specialties = [
    { value: "anak", label: "Anak" },
    { value: "gigi", label: "Gigi" },
    { value: "kandungan", label: "Kandungan (Obstetri & Ginekologi)" },
    { value: "mata", label: "Mata" },
    { value: "tht", label: "Telinga, Hidung, Tenggorokan (THT)" },
    { value: "kulit", label: "Kulit & Kelamin" },
    { value: "saraf", label: "Saraf" },
    { value: "dalam", label: "Penyakit Dalam" },
    { value: "paru", label: "Paru" },
    { value: "jantung", label: "Jantung & Pembuluh Darah" },
    { value: "gizi", label: "Gizi Klinik" },
    { value: "psikologi", label: "Psikologi Klinis" },
    { value: "fisioterapi", label: "Fisioterapi" },
    { value: "rehabilitasi", label: "Rehabilitasi Medik" },
];

export default function ScheduleSection() {
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

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Jadwal Mingguan</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Lihat jadwal lengkap dokter kami berdasarkan hari dalam seminggu.
                    </p>
                </motion.div>

                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-blue-50">
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-900">Hari</th>
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-900">Dokter Umum</th>
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-900">Dokter Spesialis</th>
                            </tr>
                        </thead>
                        <tbody>
                            {daysOfWeek.map((day, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{day}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">
                                        <DoctorSchedule doctorsList={doctorsList} day={day} category="general" />
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">
                                        <DoctorSchedule doctorsList={doctorsList} day={day} category="specialist" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

function DoctorSchedule({ doctorsList, day, category }) {
    const filteredDoctors = useMemo(() => {
        return doctorsList.filter(
            (doc) => doc.categories.includes(category) && doc.schedule.some((s) => s.day === day)
        );
    }, [doctorsList, day, category]);

    if (filteredDoctors.length === 0) {
        return <span className="text-gray-400">Tidak ada jadwal</span>;
    }

    return filteredDoctors.map((doc, i) => {
        const specialtyLabel = specialties.find((s) => s.value === doc.specialty)?.label || doc.specialty;
        const schedule = doc.schedule.find((s) => s.day === day);
        const formattedTime = schedule ? `${schedule.startTime} - ${schedule.endTime}` : "-";

        return (
            <div key={i} className="mb-2 last:mb-0">
                <span className="font-medium">{doc.name}</span>
                <br />
                {category === "specialist" && <span className="text-blue-600">{specialtyLabel}</span>}
                <br />
                <span className="text-gray-500">{formattedTime}</span>
            </div>
        );
    });
}
