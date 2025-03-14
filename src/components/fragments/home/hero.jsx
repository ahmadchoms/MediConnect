import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Hero() {
    const [isHovered, setIsHovered] = useState(false);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 py-20 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 z-0">
                <div className="absolute -top-40 -left-40 bg-white rounded-full w-96 h-96"></div>
                <div className="absolute top-20 right-20 bg-white rounded-full w-64 h-64"></div>
                <div className="absolute bottom-0 left-1/4 bg-white rounded-full w-48 h-48"></div>
            </div>

            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <motion.h1
                                className="text-4xl md:text-5xl font-bold mb-4"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                Perawatan Kesehatan Terbaik untuk Anda dan Keluarga
                            </motion.h1>
                            <motion.p
                                className="text-lg mb-8 text-blue-100"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                MediConnect hadir untuk memberikan pelayanan kesehatan
                                berkualitas dengan pendekatan yang modern dan terpadu.
                            </motion.p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    <Link href="/appointments">
                                        <Button
                                            size="lg"
                                            className="bg-white text-blue-700 hover:bg-blue-50 w-full sm:w-auto"
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >
                                            <Calendar className="mr-2 h-5 w-5" />
                                            Buat Janji
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
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                >
                                    <Link href="/contact">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-700 w-full sm:w-auto"
                                        >
                                            <Phone className="mr-2 h-5 w-5" />
                                            Hubungi Kami
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                            className="hidden md:block"
                        >
                            <div className="bg-white rounded-lg p-6 shadow-2xl">
                                <img
                                    src="/hero-image.jpg"
                                    alt="Dokter MediConnect"
                                    className="rounded-lg w-full h-auto"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://via.placeholder.com/600x400?text=Dokter+MediConnect";
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}