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
import { firebaseService } from "@/lib/firebase/service";
import {
  Activity,
  Ban,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Hourglass,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

const AcceptCancelActions = ({ row, onStatusChange }) => {
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);

  const handleAccept = async () => {
    try {
      await onStatusChange(row.original.id, "confirmed");
      setIsAcceptDialogOpen(false);

      toast.success("Janji temu berhasil dikonfirmasi.");
      window.location.reload();
    } catch (error) {
      console.error("Gagal mengkonfirmasi janji temu:", error);

      toast.error("Gagal mengkonfirmasi janji temu.");
    }
  };

  const handleDecline = async () => {
    try {
      await onStatusChange(row.original.id, "canceled");
      setIsDeclineDialogOpen(false);

      toast.success("Janji temu berhasil dibatalkan.");
      window.location.reload();
    } catch (error) {
      console.error("Gagal menolak janji temu:", error);

      toast.error("Gagal menolak janji temu.");
    }
  };

  return (
    <div className="flex space-x-2">
      {/* Accept */}
      <AlertDialog
        open={isAcceptDialogOpen}
        onOpenChange={setIsAcceptDialogOpen}
      >
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
          >
            <Check className="h-4 w-4 mr-1" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Janji Temu</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="py-3">
            Apakah Anda yakin ingin mengkonfirmasi janji temu dengan pasien{" "}
            <span className="font-semibold">{row.original.patientName}</span>{" "}
            pada tanggal{" "}
            <span className="font-semibold">{row.original.date}</span> jam{" "}
            <span className="font-semibold">{row.original.time}</span>?
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button
              onClick={handleAccept}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Konfirmasi
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Decline */}
      <AlertDialog
        open={isDeclineDialogOpen}
        onOpenChange={setIsDeclineDialogOpen}
      >
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
          >
            <X className="h-4 w-4 mr-1" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Batalkan Janji Temu</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="py-3">
            Apakah Anda yakin ingin menolak janji temu dengan pasien tanggal{" "}
            <span className="font-semibold">{row.original.date}</span> jam{" "}
            <span className="font-semibold">{row.original.time}</span>?
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <Button onClick={handleDecline} variant="destructive">
              Tolak Janji Temu
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
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
      const handleStatusChange = async (id, newStatus) => {
        try {
          await firebaseService.updateDocument("appointments", id, {
            status: newStatus,
          });
          console.log(
            `Status janji temu ${id} berhasil diupdate menjadi ${newStatus}`
          );
        } catch (error) {
          console.error("Gagal mengupdate status janji temu:", error);
        }
      };

      return (
        <div className="flex justify-end">
          {row.original.status === "waiting" && (
            <AcceptCancelActions
              row={row}
              onStatusChange={handleStatusChange}
            />
          )}
        </div>
      );
    },
  },
];
