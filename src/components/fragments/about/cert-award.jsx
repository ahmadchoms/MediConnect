import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function CertAward() {
    const awards = [
        {
            title: "Klinik Pelayanan Terbaik 2023",
            issuer: "Asosiasi Klinik Indonesia",
            year: "2023",
        },
        {
            title: "Penghargaan Inovasi Kesehatan Digital",
            issuer: "Kementerian Kesehatan RI",
            year: "2022",
        },
        {
            title: "Best Patient Experience",
            issuer: "Healthcare Awards Indonesia",
            year: "2022",
        },
    ];
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-3xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Penghargaan & Sertifikasi
                    </motion.h2>
                    <motion.div
                        className="w-20 h-1 bg-blue-500 mx-auto mb-6"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {awards.map((award, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-md flex items-start"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="mr-4 flex-shrink-0">
                                <Award className="h-10 w-10 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {award.title}
                                </h3>
                                <p className="text-blue-600 mb-1">{award.issuer}</p>
                                <p className="text-gray-500 text-sm">{award.year}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
