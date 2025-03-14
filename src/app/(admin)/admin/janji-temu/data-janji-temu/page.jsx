"use client";
import { useState, useEffect } from "react";
import SidebarLayout from "@/components/layouts/admin-layout/sidebar-layout";
import { columns } from "./column";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, FileText, Ban, CheckCircle, Hourglass } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardLayout } from "@/components/layouts/admin-layout/card-layout";
import { firebaseService } from "@/lib/firebase/service";
import { Skeleton } from "@/components/ui/skeleton"; // Impor Skeleton

export default function JanjiTemuPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsData = await firebaseService.getData("appointments");
        setAppointments(appointmentsData);

        const usersData = await firebaseService.getData("users");
        setUsers(usersData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesStatus =
        statusFilter === "all" || appointment.status === statusFilter;
      return matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt.seconds * 1000); // Konversi ke Date
      const dateB = new Date(b.createdAt.seconds * 1000); // Konversi ke Date
      return dateA - dateB;
    })
    .map((appointment) => {
      // Cari user yang sesuai dengan userID pada appointment
      const user = users.find((user) => user.id === appointment.userId);
      return {
        ...appointment,
        userName: user ? user.name : "Unknown",
        userPhoneNumber: user ? user.phoneNumber : "Unknown",
      };
    });

  // Skeleton untuk Statistik
  const StatisticSkeleton = () => (
    <Card>
      <CardContent className="p-6 flex items-center">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="ml-4 space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-[50px]" />
        </div>
      </CardContent>
    </Card>
  );

  // Skeleton untuk Tabel
  const TableSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  );

  return (
    <SidebarLayout>
      <div className="space-y-2 mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-gray-500 hover:text-blue-600">
                Janji Temu
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/admin/janji-temu/data-janji-temu"
                className="font-semibold text-blue-600"
              >
                Data Janji Temu
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              Data Janji Temu
            </h1>
            <p className="text-gray-500 text-medium mt-1">
              Kelola semua janji temu pasien dengan dokter
            </p>
          </div>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {loading ? (
          <>
            <StatisticSkeleton />
            <StatisticSkeleton />
            <StatisticSkeleton />
            <StatisticSkeleton />
            <StatisticSkeleton />
          </>
        ) : (
          <>
            <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
              <CardContent className="p-6 flex items-center">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Di konfirmasi
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {
                      appointments.filter((app) => app.status === "confirmed")
                        .length
                    }
                  </h3>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-50 to-white border-yellow-100">
              <CardContent className="p-6 flex items-center">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Menunggu</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {
                      appointments.filter((app) => app.status === "waiting")
                        .length
                    }
                  </h3>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
              <CardContent className="p-6 flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Hourglass className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Sedang Berlangsung
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {
                      appointments.filter((app) => app.status === "ongoing")
                        .length
                    }
                  </h3>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
              <CardContent className="p-6 flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Telah Selesai
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {
                      appointments.filter((app) => app.status === "completed")
                        .length
                    }
                  </h3>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-white border-red-100">
              <CardContent className="p-6 flex items-center">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Ban className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Dibatalkan
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {
                      appointments.filter((app) => app.status === "canceled")
                        .length
                    }
                  </h3>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <CardLayout
          title="Daftar Data Janji Temu"
          description="Semua data janji temu pasien dengan dokter"
          columns={columns}
          data={filteredAppointments}
          itemsPerPage={10}
          searchPlaceholder="Cari nama..."
          searchFields={["patientName", "doctor"]}
          content={
            <div>
              <Select
                defaultValue="all"
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="waiting">Menunggu</SelectItem>
                  <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                  <SelectItem value="ongoing">Sedang Berlangsung</SelectItem>
                  <SelectItem value="canceled">Dibatalkan</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />
      )}
    </SidebarLayout>
  );
}
