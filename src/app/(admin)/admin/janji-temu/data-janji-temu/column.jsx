"use client";
import { DeleteConfirmationModal } from "@/components/layouts/admin-layout/modal-delete-layout";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  Ban,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Hourglass,
  MoreHorizontal,
  Stethoscope,
  User,
} from "lucide-react";
import { useState } from "react";

const renderStatusBadge = (status) => {
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
  const config = statusConfig[status];
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs flex items-center w-fit ${config.bg} ${config.text}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

export const columns = [
  {
    accessorKey: "userName",
    header: "Pasien",
  },
  {
    accessorKey: "doctor",
    header: "Dokter",
    cell: ({ row }) => (
      <div className="flex flex-col space-y-1">
        <span className="font-medium">{row.original.doctor}</span>
        <span className="text-xs text-gray-600">{row.original.specialty}</span>
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Waktu",
    cell: ({ row }) => (
      <div className="flex flex-col space-y-1">
        <div className="flex items-center">
          <Calendar className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
          <span className="font-medium">{row.original.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1.5 text-sky-500" />
          <span className="text-xs text-gray-600">{row.original.time}</span>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "totalFee",
    header: "Total Biaya",
    cell: ({ row }) => {
      const totalFee =
        row.original.appointmentFee +
        row.original.handlingFee +
        row.original.medicationFee;
      return `Rp ${totalFee.toLocaleString()}`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => renderStatusBadge(row.original.status),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const appointment = row.original;
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      const handleDelete = () => {
        console.log(`Menghapus pasien: ${pasien.nama} dengan ID: ${pasien.id}`);
        // Logika untuk menghapus data
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-24 p-2 bg-white rounded-lg shadow-lg border border-gray-100"
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Eye className="h-4 w-4 text-gray-500" />
                    Detail
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="max-w-md space-y-4">
                  <AlertDialogHeader>
                    <div className="flex justify-between">
                      <AlertDialogTitle className="text-lg font-semibold">
                        Detail Janji Temu
                      </AlertDialogTitle>
                      <span className="text-sm text-gray-500">
                        {appointment.invoice}
                      </span>
                    </div>
                  </AlertDialogHeader>

                  <div className="space-y-4">
                    {renderStatusBadge(appointment.status)}

                    <div className="flex items-center space-x-3">
                      <Stethoscope className="text-gray-500" />
                      <div>
                        <div className="font-semibold">
                          {appointment.doctor}
                        </div>
                        <div className="text-xs text-gray-500">
                          {appointment.specialty}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="text-gray-500" />
                      <span className="font-semibold">{appointment.date}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="text-gray-500" />
                      <span className="font-semibold">{appointment.time}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="text-gray-500" />
                      <div>
                        <div className="font-semibold">
                          Nama Pasien: {appointment.userName}
                        </div>
                        <div className="text-xs text-gray-500">
                          Nomor Telepon: {appointment.userPhoneNumber}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <FileText className="text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {appointment.reason}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Biaya Konsultasi:
                        </span>
                        <span className="font-medium text-sm">
                          Rp{" "}
                          {appointment.appointmentFee
                            .toFixed(2)
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Biaya Prosedur:
                        </span>
                        <span className="font-medium text-sm">
                          Rp{" "}
                          {appointment.handlingFee.toFixed(2).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          Biaya Obat:
                        </span>
                        <span className="font-medium text-sm">
                          Rp{" "}
                          {appointment.medicationFee
                            .toFixed(2)
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2 border-t border-gray-300 pt-2">
                        <span className="text-sm text-gray-500">
                          Total Biaya:
                        </span>
                        <span className="font-medium text-sm">
                          Rp{" "}
                          {(
                            appointment.appointmentFee +
                            appointment.handlingFee +
                            appointment.medicationFee
                          )
                            .toFixed(2)
                            .toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Tutup</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteConfirmationModal
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDelete}
            description="Apakah Anda yakin ingin menghapus data janji temu?"
          />
        </>
      );
    },
  },
];
