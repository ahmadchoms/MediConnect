"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Plus } from "lucide-react";
import HeroSection from "@/components/fragments/heroSection";
import { useAppointment } from "@/hooks/useAppointment";
import AppointmentCard from "@/components/fragments/appointment/appointmentCard";

export default function AppointmentHistoryPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const { appointments } = useAppointment();

  const formatDate = useMemo(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", options);
    };
  }, []);

  const filteredAppointments = useMemo(() => {
    return statusFilter === "all"
      ? appointments
      : appointments.filter(appointment => appointment.status === statusFilter);
  }, [statusFilter, appointments]);

  return (
    <main>
      <HeroSection title="Riwayat Janji Temu">
        Lihat dan kelola semua janji temu Anda dengan dokter kami.
      </HeroSection>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Daftar Janji Temu</CardTitle>
                  <CardDescription>
                    Lihat status dan detail janji temu Anda
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Link href="/appointment">
                    <Button className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      Buat Janji Baru
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-sm text-muted-foreground">
                    {filteredAppointments.length} janji temu ditemukan
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="waiting">Menunggu Dokter</SelectItem>
                        <SelectItem value="confirmed">
                          Sudah Dikonfirmasi
                        </SelectItem>
                        <SelectItem value="completed">
                          Sudah Dilaksanakan
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-5">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment, index) => (
                      <AppointmentCard
                        key={appointment.invoice || index}
                        appointment={appointment}
                        formatDate={formatDate}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="p-4 flex justify-center items-center"
                    >
                      <p className="text-sm text-gray-400 text-center">
                        Tidak ada janji temu yang ditemukan.
                      </p>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}