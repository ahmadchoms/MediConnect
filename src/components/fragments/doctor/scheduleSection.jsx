"use client";

import { motion } from "framer-motion";
import { doctors } from "@/dummy/data";

const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function ScheduleSection() {
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
                                        {renderDoctorSchedule(day, "general")}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">
                                        {renderDoctorSchedule(day, "specialist")}
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

function renderDoctorSchedule(day, category) {
    const filteredDoctors = doctors.filter(
        (d) => d.categories.includes(category) && d.schedule.some((s) => s.day === day)
    );

    if (filteredDoctors.length === 0) {
        return <span className="text-gray-400">Tidak ada jadwal</span>;
    }

    return filteredDoctors.map((doc, i) => (
        <div key={i} className="mb-2 last:mb-0">
            <span className="font-medium">{doc.name}</span>
            <br />
            {category === "specialist" && (
                <span className="text-blue-600">{doc.specialty}</span>
            )}
            <br />
            <span className="text-gray-500">
                {doc.schedule.find((s) => s.day === day)?.time}
            </span>
        </div>
    ));
}