"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import SidebarLayout from "@/components/layouts/admin-layout/sidebar-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import DoctorCard from "@/components/fragments/admin/doctor/doctor-card";
import { DoctorFormModal } from "@/components/fragments/admin/doctor/doctor-form";
import { firebaseService } from "@/lib/firebase/service";

export default function DokterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [doctorsList, setDoctorsList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDoctors = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await firebaseService.getData("doctors");
      setDoctorsList(response);
    } catch {
      toast.error("Gagal memuat data dokter");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setIsModalOpen(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleSaveDoctor = async (doctorData) => {
    setIsSubmitting(true);
    if (!doctorData.specialty) {
      doctorData.specialty = "Dokter Umum";
    }
    try {
      const response = await fetch("/api/admin/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan data dokter");
      }

      toast.success("Data dokter berhasil disimpan");
      setIsModalOpen(false);
      fetchDoctors();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateDoctor = async (doctorData) => {
    setIsSubmitting(true);
    if (!doctorData.specialty) {
      doctorData.specialty = "Dokter Umum";
    }
    try {
      const response = await fetch(
        `/api/admin/doctors?id=${selectedDoctor.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorData),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menyimpan data dokter");
      }

      toast.success("Data dokter berhasil disimpan");
      setIsModalOpen(false);
      fetchDoctors();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await fetch(`/api/admin/doctors?id=${doctorId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data dokter");
      }

      toast.success("Data dokter berhasil dihapus");
      fetchDoctors();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const filteredDoctors = doctorsList.filter((doctor) => {
    const doctorCategory = Array.isArray(doctor.categories)
      ? doctor.categories[0]
      : doctor.categories;

    const matchesCategory =
      categoryFilter === "all" || doctorCategory === categoryFilter;

    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <SidebarLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            Manajemen Data Dokter
          </h1>
          <p className="text-gray-500 mt-1">
            Kelola dan pantau informasi lengkap dokter, termasuk spesialisasi,
            jadwal praktik, serta data terkait untuk memastikan pelayanan
            kesehatan yang optimal.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari nama dokter..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              defaultValue="all"
              onValueChange={(value) => setCategoryFilter(value)}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="general">Umum</SelectItem>
                <SelectItem value="specialist">Spesialis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleAddDoctor}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Dokter
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col items-center text-gray-500">
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p>Memuat data dokter...</p>
            </div>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-500">
              <p className="text-xl font-medium">Tidak ada data dokter</p>
              <p className="mt-1">
                Belum ada dokter yang sesuai dengan kriteria pencarian.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDoctors.map((doctor, index) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                index={index}
                onEdit={() => handleEditDoctor(doctor)}
                onDelete={() => handleDeleteDoctor(doctor.id)}
              />
            ))}
          </div>
        )}
      </div>

      <DoctorFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        doctor={selectedDoctor}
        onSave={handleSaveDoctor}
        onEdit={handleUpdateDoctor}
        isSubmitting={isSubmitting}
      />
    </SidebarLayout>
  );
}
