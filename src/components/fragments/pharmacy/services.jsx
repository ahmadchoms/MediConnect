import { motion } from "framer-motion";
import {
    UserCheck,
    MessageCircleQuestion,
    PackageCheck,
    Clock
} from "lucide-react";

export default function PharmacyServices() {
    const services = [
        {
            icon: UserCheck,
            title: "Konsultasi Profesional",
            description: "Konsultasi langsung dengan apoteker bersertifikat untuk panduan medis terpercaya.",
            color: "text-blue-600"
        },
        {
            icon: MessageCircleQuestion,
            title: "Resep Online",
            description: "Proses resep digital aman, cepat, dan terjamin kerahasiaannya.",
            color: "text-green-600"
        },
        {
            icon: PackageCheck,
            title: "Verifikasi Kualitas",
            description: "Setiap obat melewati kontrol kualitas ketat sebelum dikirim.",
            color: "text-purple-600"
        },
        {
            icon: Clock,
            title: "Pengiriman Cepat",
            description: "Dapatkan obat dalam waktu 2-4 jam di area utama kota.",
            color: "text-orange-600"
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Layanan Unggulan Apotek Digital
                    </h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={`mb-4 ${service.color} group-hover:scale-110 transition-transform`}>
                                <service.icon className="h-12 w-12" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {service.title}
                            </h3>
                            <p className="text-gray-600">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}