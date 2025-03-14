"use client";

import { motion } from "framer-motion";
import { PrescriptionCard } from "./presciptionCard";

export const PrescriptionList = ({ prescriptions }) => {
    return (
        <div className="space-y-5">
            {prescriptions.length > 0 ? (
                prescriptions.map((prescription, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <PrescriptionCard prescription={prescription} />
                    </motion.div>
                ))
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 flex justify-center items-center"
                >
                    <p className="text-sm text-gray-400 text-center">
                        Tidak ada resep yang ditemukan.
                    </p>
                </motion.div>
            )}
        </div>
    );
};