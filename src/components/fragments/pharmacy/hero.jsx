import { motion } from "framer-motion";
import { ShieldCheck, Truck, Pill } from "lucide-react";

export default function PharmacyHero() {
    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="bg-blue-100 p-3 rounded-full inline-flex items-center">
                            <Pill className="h-6 w-6 text-blue-600 mr-2" />
                            <span className="text-blue-800 font-medium">Apotek Digital Premium</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                            Kesehatan Tanpa Batas, Obat Tepat Waktu
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Layanan apotek digital tercanggih yang menghubungkan Anda dengan
                            obat-obatan berkualitas, konsultasi profesional, dan kemudahan
                            tanpa kompromi.
                        </p>
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <ShieldCheck className="h-6 w-6 text-green-500" />
                                <span className="text-gray-700">100% Asli</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Truck className="h-6 w-6 text-blue-500" />
                                <span className="text-gray-700">Pengiriman Cepat</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="bg-blue-100/50 rounded-2xl p-8 shadow-2xl">
                            <img
                                src="/pill.jpg"
                                alt="Apotek Digital MediConnect"
                                className="rounded-xl shadow-lg transform transition-transform hover:scale-105"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/600x400?text=Apotek+Digital";
                                }}
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-blue-100">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-50 p-2 rounded-full">
                                        <Pill className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Obat Tersedia</p>
                                        <p className="font-bold text-gray-900">5000+ Jenis</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}