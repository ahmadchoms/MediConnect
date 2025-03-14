import { serviceItems } from '@/dummy/data'
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
} from "lucide-react";

export default function MainService() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <motion.h2
                        className="text-3xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Layanan Utama
                    </motion.h2>
                    <motion.div
                        className="w-20 h-1 bg-blue-500 mx-auto mb-8"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    />
                    <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                        Kami menyediakan berbagai layanan kesehatan untuk memenuhi
                        kebutuhan Anda dan keluarga.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {serviceItems.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-shadow"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="mb-4 flex justify-center">{service.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {service.title}
                            </h3>
                            <p className="text-gray-600">{service.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href="/services">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            Lihat Semua Layanan
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
