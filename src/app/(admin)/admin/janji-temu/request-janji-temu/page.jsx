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
import { CardLayout } from "@/components/layouts/admin-layout/card-layout";
import { firebaseService } from "@/lib/firebase/service";
import { Skeleton } from "@/components/ui/skeleton";

export default function JanjiTemuPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

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
      const isWaiting = appointment.status === "waiting";

      return isWaiting;
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
      };
    });

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
                Request Janji Temu
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              Request Janji Temu
            </h1>
            <p className="text-gray-500 text-medium mt-1">
              Kelola semua janji temu pasien dengan dokter
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <CardLayout
          title="Daftar Request Janji Temu"
          description="Semua Request Janji Temu pasien dengan dokter"
          columns={columns}
          data={filteredAppointments}
          itemsPerPage={10}
          searchPlaceholder="Cari nama..."
          searchFields={["userName", "doctor"]}
        />
      )}
    </SidebarLayout>
  );
}
