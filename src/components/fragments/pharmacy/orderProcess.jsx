import { motion } from "framer-motion";
import {
    FileText,
    MessageCircle,
    PackagePlus,
    Truck
} from "lucide-react";

export default function PharmacyProcess() {
    const steps = [
        {
            icon: FileText,
            title: "Upload Resep",
            description: "Unggah resep dokter atau konsultasikan dengan apoteker kami.",
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: MessageCircle,
            title: "Konsultasi",
            description: "Konsultasi online dengan apoteker untuk konfirmasi dan saran.",
            color: "bg-green-100 text-green-600"
        },
        {
            icon: PackagePlus,
            title: "Proses Obat",
            description: "Kami mempersiapkan obat sesuai resep dengan standar kualitas tinggi.",
            color: "bg-purple-100 text-purple-600"
        },
        {
            icon: Truck,
            title: "Pengiriman",
            description: "Obat dikirim ke alamat Anda dengan layanan kurir tercepat.",
            color: "bg-orange-100 text-orange-600"
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Alur Pemesanan Obat
                    </h2>
                    <div className="w-20 h-1 bg-blue-500 mx-auto" />
                </div>

                <div className="relative">
                    <div className="hidden md:flex absolute inset-0 items-center justify-center">
                        <div className="w-full h-1 bg-gray-200 absolute"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-lg text-center relative"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 
                  w-12 h-12 flex items-center justify-center rounded-full 
                  bg-white border-4 border-gray-100 shadow-md">
                                    <span className="text-gray-600 font-bold">{index + 1}</span>
                                </div>
                                <div className={`mb-4 ${step.color} p-3 rounded-full inline-flex items-center mx-auto`}>
                                    <step.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}