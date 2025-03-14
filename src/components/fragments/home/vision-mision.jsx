import { motion } from "framer-motion";

export default function VisionMision() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <motion.h2
                        className="text-3xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Visi & Misi Kami
                    </motion.h2>
                    <motion.div
                        className="w-20 h-1 bg-blue-500 mx-auto mb-8"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <motion.div
                        className="bg-white rounded-xl p-8 shadow-md"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl font-bold text-blue-600 mb-4">Visi</h3>
                        <p className="text-gray-600">
                            Menjadi penyedia layanan kesehatan terkemuka yang menggabungkan
                            teknologi dan perawatan medis berkualitas tinggi, serta menjadi
                            mitra kesehatan yang dipercaya oleh masyarakat Indonesia.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-xl p-8 shadow-md"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl font-bold text-blue-600 mb-4">Misi</h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>
                                • Memberikan pelayanan kesehatan terbaik dengan standar
                                tertinggi
                            </li>
                            <li>
                                • Memanfaatkan teknologi untuk meningkatkan akses dan
                                efisiensi layanan
                            </li>
                            <li>
                                • Mengembangkan tim medis profesional yang berdedikasi dan
                                berkompeten
                            </li>
                            <li>
                                • Melakukan edukasi kesehatan kepada masyarakat secara
                                berkelanjutan
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
