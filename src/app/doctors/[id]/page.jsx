"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import Link from "next/link";

const doctors = [
  {
    id: 1,
    name: "dr. Budi Santoso, Sp.PD",
    specialty: "Spesialis Penyakit Dalam",
    image: "/dr-budi.jpg",
    categories: ["specialist"],
    schedule: [
      { day: "Senin", time: "08:00 - 14:00" },
      { day: "Rabu", time: "13:00 - 19:00" },
      { day: "Jumat", time: "08:00 - 14:00" },
    ],
  },
  {
    id: 2,
    name: "dr. Siti Rahmawati, Sp.A",
    specialty: "Spesialis Anak",
    image: "/dr-budi.jpg",
    categories: ["specialist"],
    schedule: [
      { day: "Selasa", time: "08:00 - 14:00" },
      { day: "Kamis", time: "13:00 - 19:00" },
      { day: "Sabtu", time: "09:00 - 15:00" },
    ],
  },
];

export default function DoctorDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Ambil ID dari query parameter
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (id) {
      const foundDoctor = doctors.find((doc) => doc.id === parseInt(id));
      setDoctor(foundDoctor);
    }
  }, [id]);

  if (!doctor) {
    return <div className="text-center py-20">Dokter tidak ditemukan.</div>;
  }

  return (
    <main>
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Detail Dokter</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Informasi lengkap tentang dokter {doctor.name}.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(
                    doctor.name.split(",")[0]
                  )}`;
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h2 className="text-2xl font-bold">{doctor.name}</h2>
                <p className="text-blue-300">{doctor.specialty}</p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Jadwal Praktik:
              </h3>
              <div className="space-y-2">
                {doctor.schedule.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.day}</span>
                    <span className="text-gray-900">{item.time}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link href={`/appointments?doctor=${doctor.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                    <Calendar className="mr-2 h-4 w-4" />
                    Buat Janji
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Phone className="mr-2 h-4 w-4" />
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
