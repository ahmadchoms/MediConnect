import { motion } from "framer-motion";

export default function History() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Sejarah MediConnect
                        </h2>
                        <div className="w-20 h-1 bg-blue-500 mb-6" />
                        <p className="text-gray-600 mb-4">
                            MediConnect didirikan pada tahun 2045 oleh sekelompok dokter
                            yang memiliki visi untuk membuat layanan kesehatan lebih mudah
                            diakses oleh masyarakat Indonesia.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Berawal dari sebuah klinik kecil di Jakarta, MediConnect terus
                            berkembang hingga memiliki beberapa cabang di kota-kota besar di
                            Indonesia. Dengan menggabungkan teknologi modern dan pelayanan
                            kesehatan berkualitas, MediConnect telah menjadi pionir dalam
                            inovasi kesehatan digital di Indonesia.
                        </p>
                        <p className="text-gray-600">
                            Saat ini, MediConnect telah melayani lebih dari 100.000 pasien
                            dengan berbagai layanan kesehatan mulai dari konsultasi umum,
                            pemeriksaan laboratorium, hingga konsultasi dengan dokter
                            spesialis.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="/gedung-mediconnect.jpg"
                                alt="Gedung MediConnect"
                                className="w-full h-auto"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://via.placeholder.com/600x400?text=Gedung+MediConnect";
                                }}
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                            <p className="text-2xl font-bold">Sejak 2045</p>
                            <p>Melayani dengan sepenuh hati</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
