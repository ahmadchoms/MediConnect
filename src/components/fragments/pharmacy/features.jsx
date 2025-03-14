import { motion } from "framer-motion";
import {
    ShieldCheck,
    Thermometer,
    Heart,
    Database
} from "lucide-react";

export default function PharmacyFeatures() {
    const features = [
        {
            icon: ShieldCheck,
            title: "Keamanan Data Terjamin",
            description: "Sistem enkripsi canggih melindungi informasi kesehatan Anda.",
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: Thermometer,
            title: "Penyimpanan Optimal",
            description: "Obat disimpan pada suhu dan kondisi ideal untuk menjaga kualitas.",
            color: "bg-green-100 text-green-600"
        },
        {
            icon: Heart,
            title: "Rekomendasi Personal",
            description: "Algoritma cerdas untuk saran obat sesuai riwayat kesehatan Anda.",
            color: "bg-red-100 text-red-600"
        },
        {
            icon: Database,
            title: "Riwayat Lengkap",
            description: "Akses riwayat pengobatan dan resep kapan pun dibutuhkan.",
            color: "bg-purple-100 text-purple-600"
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Fitur Canggih Apotek Digital
                    </h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={`mb-4 ${feature.color} p-3 rounded-full inline-flex items-center group-hover:scale-110 transition-transform`}>
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}