import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PharmacyService() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="order-2 md:order-1"
                    >
                        <div className="rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="/pharmacy.jpg"
                                alt="Resep Obat dari Dokter"
                                className="w-full h-auto"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/600x400?text=Resep+Obat";
                                }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="order-1 md:order-2"
                    >
                        <div className="flex items-center mb-6">
                            <FileText className="h-10 w-10 text-blue-600 mr-4" />
                            <h2 className="text-3xl font-bold text-gray-900">
                                Resep Obat dari Dokter
                            </h2>
                        </div>
                        <div className="w-20 h-1 bg-blue-500 mb-6" />
                        <p className="text-gray-600 mb-4">
                            Pasien dapat mengambil obat yang diresepkan langsung oleh dokter setelah melakukan konsultasi. Resep ini hanya bisa diperoleh dari dokter yang menangani pasien.
                        </p>
                        <ul className="text-gray-600 space-y-3 mb-6">
                            <li className="flex items-center">
                                <span className="mr-2 text-blue-600">✓</span>
                                Resep hanya diberikan setelah konsultasi dengan dokter
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2 text-blue-600">✓</span>
                                Pasien mengambil sendiri obat di apotek yang ditunjuk
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2 text-blue-600">✓</span>
                                Obat sesuai dengan diagnosis dokter
                            </li>
                        </ul>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <Link href="/prescription">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 text-white hover:bg-blue-500 w-full sm:w-auto"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <FileText className="mr-2 h-5 w-5" />
                                    Lihat Resep
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
                </div>
            </div>
        </section>
    );
}
