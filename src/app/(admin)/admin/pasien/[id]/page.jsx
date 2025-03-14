"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MoveLeft,
  Clock,
  CheckCircle,
  Activity,
  Hourglass,
  Ban,
} from "lucide-react";
import { firebaseService } from "@/lib/firebase/service";

const PatientDetailsPage = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Ambil data pasien berdasarkan ID
        const userData = await firebaseService.getDocumentById("users", id);
        setUser(userData);

        // Ambil semua janji temu
        const allAppointments = await firebaseService.getData("appointments");

        // Filter janji temu berdasarkan userId yang cocok dengan id pasien
        const userAppointments = allAppointments.filter(
          (appointment) => appointment.userId === id
        );

        setAppointments(userAppointments);
        console.log("User Appointments:", userAppointments);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "";

    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      waiting: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        label: "Menunggu",
        icon: <Clock className="h-3 w-3 mr-1" />,
      },
      confirmed: {
        bg: "bg-emerald-100",
        text: "text-emerald-800",
        label: "Dikonfirmasi",
        icon: <CheckCircle className="h-3 w-3 mr-1" />,
      },
      completed: {
        bg: "bg-sky-100",
        text: "text-sky-800",
        label: "Selesai",
        icon: <Activity className="h-3 w-3 mr-1" />,
      },
      ongoing: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        label: "Sedang Berlangsung",
        icon: <Hourglass className="h-3 w-3 mr-1" />,
      },
      canceled: {
        bg: "bg-red-200",
        text: "text-red-800",
        label: "Dibatalkan",
        icon: <Ban className="h-3 w-3 mr-1" />,
      },
    };
    const config = statusConfig[status] || statusConfig.waiting;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs flex items-center w-fit ${config.bg} ${config.text}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  // Pisahkan janji temu menjadi yang akan datang dan yang sudah lewat
  const upcomingAppointments = appointments.filter((appt) => {
    const today = new Date();
    const dateParts = appt.date.split(" ");
    const day = parseInt(dateParts[0], 10);
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = monthNames.findIndex((m) => m === dateParts[1]);
    const year = parseInt(dateParts[2], 10);
    const apptDate = new Date(year, month, day);

    return (
      apptDate >= today ||
      appt.status === "waiting" ||
      appt.status === "confirmed" ||
      appt.status === "ongoing"
    );
  });

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Format mata uang
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Skeleton for profile card
  const ProfileSkeleton = () => (
    <Card className="lg:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle>Profil Pasien</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <Skeleton className="h-24 w-24 rounded-full mb-4" />
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Umur</p>
            <Skeleton className="h-4 w-32 mt-1" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">No. Telepon</p>
            <Skeleton className="h-4 w-32 mt-1" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <Skeleton className="h-4 w-48 mt-1" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Alamat</p>
            <Skeleton className="h-4 w-full mt-1" />
            <Skeleton className="h-4 w-3/4 mt-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Skeleton for appointments card
  const AppointmentsSkeleton = () => (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Riwayat Janji Temu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {[1, 2].map((_, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md mt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Detail Pasien</h1>
          <p className="text-gray-600">
            Lihat dan kelola informasi lengkap pasien
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/pasien")}
          >
            <MoveLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            <ProfileSkeleton />
            <AppointmentsSkeleton />
          </>
        ) : !user ? (
          <div className="p-6 text-center lg:col-span-3">
            <p>Pasien tidak ditemukan</p>
            <Button
              className="mt-4"
              onClick={() => router.push("/admin/pasien")}
            >
              Kembali ke Daftar Pasien
            </Button>
          </div>
        ) : (
          <>
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle>Profil Pasien</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-4">
                    <div className="bg-blue-100 text-blue-800 h-full w-full rounded-full flex items-center justify-center text-xl font-semibold">
                      {getInitials(user.name)}
                    </div>
                  </Avatar>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-500">{user.nik}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{user.gender}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Umur</p>
                    <p>
                      {user.dateOfBirth &&
                        `${calculateAge(user.dateOfBirth)} tahun (${new Date(
                          user.dateOfBirth
                        ).toLocaleDateString("id-ID")})`}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      No. Telepon
                    </p>
                    <p>{user.phoneNumber}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>{user.email}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Alamat</p>
                    <p>{user.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Riwayat Janji Temu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-2">
                      {upcomingAppointments.map((appointment, index) => (
                        <Card
                          key={index}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <div className="mr-3">
                                    <p className="font-medium text-lg">
                                      {appointment.date} • {appointment.time}
                                    </p>
                                    <p className="text-gray-600">
                                      {appointment.doctor}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {appointment.specialty}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  {getStatusBadge(appointment.status)}
                                  <Badge variant="outline">
                                    {appointment.invoice}
                                  </Badge>
                                </div>
                              </div>

                              <div className="bg-gray-50 p-3 rounded-md mt-2">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Biaya Konsultasi
                                    </p>
                                    <p className="font-medium">
                                      {formatCurrency(
                                        appointment.appointmentFee
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Biaya Administrasi
                                    </p>
                                    <p className="font-medium">
                                      {formatCurrency(appointment.handlingFee)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Biaya Obat
                                    </p>
                                    <p className="font-medium">
                                      {formatCurrency(
                                        appointment.medicationFee || 0
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Total
                                    </p>
                                    <p className="font-bold">
                                      {formatCurrency(
                                        (appointment.appointmentFee || 0) +
                                          (appointment.handlingFee || 0) +
                                          (appointment.medicationFee || 0)
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {appointment.reason && (
                                <div className="mt-3">
                                  <p className="text-sm text-gray-500">
                                    Keluhan
                                  </p>
                                  <p className="text-sm">
                                    {appointment.reason}
                                  </p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="p-40 text-center">
                      <p className="text-gray-500">
                        Tidak ada riwayat janji temu
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientDetailsPage;
