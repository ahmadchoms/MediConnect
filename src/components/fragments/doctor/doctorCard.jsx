import Link from "next/link";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import { Badge } from "../../ui/badge";
import { Calendar } from "lucide-react";

export default function DoctorCard({ doctor, index }) {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-56 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(
              doctor.name.split(",")[0]
            )}`;
          }}
        />
        <Badge className="absolute top-3 right-3 bg-blue-500 text-blue-100">
          {doctor.categories.includes("specialist") ? "Spesialis" : "Umum"}
        </Badge>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {doctor.name}
        </h3>
        <p className="text-blue-600 mb-4">{doctor.specialty}</p>

        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Jadwal Praktik:
        </h4>
        <div className="space-y-1 mb-6">
          {doctor.schedule.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.day}</span>
              <span className="text-gray-900">{item.time}</span>
            </div>
          ))}
        </div>

        <Link href={`/appointments?doctor=${doctor.id}`}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Calendar className="mr-2 h-4 w-4" />
            Buat Janji
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
