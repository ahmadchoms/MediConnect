"use client";

import { motion } from "framer-motion";

export default function HeroSection({ title, children }) {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white relative">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-40 -left-40 bg-white rounded-full w-96 h-96"></div>
                <div className="absolute top-20 right-20 bg-white rounded-full w-64 h-64"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        {children}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}