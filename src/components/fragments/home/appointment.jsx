import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Calendar,
} from "lucide-react";

export default function Appointment() {
    return (
        <section className="py-16 bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <motion.h2
                        className="text-3xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Siap untuk janji temu dengan dokter kami?
                    </motion.h2>
                    <motion.p
                        className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Buat janji temu dengan dokter kami sekarang untuk mendapatkan
                        perawatan kesehatan terbaik bagi Anda dan keluarga.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link href="/appointments">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50"
                            >
                                <Calendar className="mr-2 h-5 w-5" />
                                Buat Janji Sekarang
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
