"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ContactInfoSection() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Informasi Kontak</h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kami selalu siap membantu Anda. Silakan hubungi kami melalui informasi di bawah ini atau gunakan formulir kontak.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="p-6 text-center h-full flex flex-col justify-between">
                            <div className="flex justify-center mb-4">
                                <Mail className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600">info@mediconnect.id</p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="p-6 text-center h-full flex flex-col justify-between">
                            <div className="flex justify-center mb-4">
                                <Phone className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Telepon</h3>
                            <p className="text-gray-600">+62 21 1234 5678</p>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="p-6 text-center h-full flex flex-col justify-between">
                            <div className="flex justify-center mb-4">
                                <MapPin className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Alamat</h3>
                            <p className="text-gray-600">
                                Jl. Kesehatan No. 123, Jakarta Selatan, DKI Jakarta, Indonesia
                            </p>
                        </Card>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}