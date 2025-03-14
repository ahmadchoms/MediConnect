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
];
