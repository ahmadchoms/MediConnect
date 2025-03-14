import { motion } from "framer-motion";
import { Award, CheckCircle, Users } from "lucide-react";

export default function ValueSection() {
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
                        Nilai-Nilai Kami
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
                    <motion.div
                        className="bg-white rounded-xl p-6 shadow-md text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0 }}
                    >
                        <div className="mb-4 flex justify-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <CheckCircle className="h-8 w-8 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Kualitas
                        </h3>
                        <p className="text-gray-600">
                            Kami berkomitmen untuk memberikan layanan kesehatan terbaik
                            sesuai dengan standar medis tertinggi.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-xl p-6 shadow-md text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="mb-4 flex justify-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Empati
                        </h3>
                        <p className="text-gray-600">
                            Kami memahami kebutuhan pasien dan memberikan pelayanan dengan
                            penuh perhatian dan kepedulian.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white rounded-xl p-6 shadow-md text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="mb-4 flex justify-center">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <Award className="h-8 w-8 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Inovasi
                        </h3>
                        <p className="text-gray-600">
                            Kami terus mengembangkan teknologi dan metode baru untuk
                            meningkatkan kualitas layanan kesehatan.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
