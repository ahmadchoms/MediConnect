import Link from "next/link";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export const HeaderSection = ({ title, description }) => (
  <motion.div
    className="mb-8 flex flex-col items-center"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center mb-4">
      <Activity className="w-11 h-11 bg-blue-500 rounded-md text-white p-2 mr-2" />
      <span className="text-2xl font-bold text-gray-900">MediConnect</span>
    </div>
    <h1 className="text-3xl font-bold text-center text-gray-9z00">{title}</h1>
    <p className="text-gray-600 mt-2 text-center">{description}</p>
  </motion.div>
);
