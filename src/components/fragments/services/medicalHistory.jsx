"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AppointmentHistoryService() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center mb-6">
                            <CalendarCheck className="h-10 w-10 text-blue-600 mr-4" />
                            <h2 className="text-3xl font-bold text-gray-900">
                                Riwayat Janji Temu
                            </h2>
                        </div>
                        <div className="w-20 h-1 bg-blue-500 mb-6" />
                        <p className="text-gray-600 mb-4">
                            Pantau dan kelola janji temu Anda dengan dokter secara mudah melalui sistem MediConnect.
                            Akses informasi lengkap mengenai janji temu yang telah dilakukan dan rencana kunjungan selanjutnya.
                        </p>
                        <ul className="text-gray-600 space-y-3 mb-6">
                            <li className="flex items-center">
                                <span className="mr-2 text-blue-600">✓</span>
                                Riwayat janji temu yang tersimpan dengan aman
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2 text-blue-600">✓</span>
                                Detail dokter dan layanan yang telah dikunjungi
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2 text-blue-600">✓</span>
                                Kemudahan melihat jadwal janji temu selanjutnya
                            </li>
                        </ul>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <Link href="/appointment-list">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 text-white hover:bg-blue-500 w-full sm:w-auto"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <CalendarCheck className="mr-2 h-5 w-5" />
                                    Lihat Riwayat Janji Temu
                                    <motion.span
                                        initial={{ x: 0 }}
                                        animate={{ x: isHovered ? 5 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </motion.span>
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="/appointment-history.jpg"
                                alt="Riwayat Janji Temu"
                                className="w-full h-auto"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/600x400?text=Riwayat+Janji+Temu";
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
