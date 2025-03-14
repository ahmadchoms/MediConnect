"use client";
import { FormInput } from "@/components/fragments/auth/inputForm";
import { DeleteConfirmationModal } from "@/components/layouts/admin-layout/modal-delete-layout";
import { ModalLayout } from "@/components/layouts/admin-layout/modal-layout";
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
import { useFormRegister } from "@/hooks/useAuthForm";
import { firebaseService } from "@/lib/firebase/service";
import { medicationSchema } from "@/lib/validation/medication";
import {
  Activity,
  Ban,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  FileText,
  Hourglass,
  MoreHorizontal,
  Stethoscope,
  Trash,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const columns = [
  {
    accessorKey: "name",
    header: "Nama Obat",
  },
  {
    accessorKey: "dosage",
    header: "Dosis",
  },
  {
    accessorKey: "frequency",
    header: "Frekuensi",
  },
  {
    accessorKey: "quantity",
    header: "Kuantitas",
  },

  {
    accessorKey: "price",
    header: "Harga/tablet",
    cell: ({ row }) => `Rp ${row.original.price.toLocaleString()}`,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const obat = row.original;
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);

      const { register, handleSubmit, setValue, watch, errors, reset } =
        useFormRegister(medicationSchema, {
          name: "",
          frequency: "",
          dosage: "",
          price: "",
          quantity: "",
        });

      useEffect(() => {
        if (isEditModalOpen && obat) {
          setValue("name", obat.name || "");
          setValue("frequency", obat.frequency || "");
          setValue("dosage", obat.dosage || "");
          setValue("price", obat.price || "");
          setValue("quantity", obat.quantity || "");
        }
      }, [isEditModalOpen, obat, setValue]);

      const handleUpdate = async (data) => {
        try {
          await firebaseService.updateDocument("obat", obat.id, data);
          setIsEditModalOpen(false);
          toast.success("Data obat berhasil diperbarui!");
          console.log("Data berhasil disimpan:", data);
          window.location.reload();
        } catch (error) {
          console.error("Gagal memperbarui data obat:", error);
          toast.error("Gagal memperbarui data obat. Silakan coba lagi.");
        }
      };
      const handleDelete = async () => {
        try {
          await firebaseService.deleteDocument("obat", obat.id);
          setIsDeleteDialogOpen(false);
          toast.success("Obat berhasil dihapus!");
          window.location.reload();
        } catch (error) {
          toast.error("Gagal menghapus obat. Silakan coba lagi.");
        }
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
              className="w-36 p-2 bg-white rounded-lg shadow-xl border border-gray-100"
            >
              {/* Edit button */}
              <div
                className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors cursor-pointer"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Edit className="h-4 w-4 text-blue-500" />
                Edit
              </div>

              {/* Delete button */}
              <div
                className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash className="h-4 w-4 text-red-500" />
                Delete
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModalLayout
            title="Edit Data Pasien"
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  id="name"
                  label="Nama obat"
                  placeholder="Masukkan nama obat"
                  register={register}
                  errors={errors}
                  defaultValue={obat.name}
                />
                <FormInput
                  id="dosage"
                  label="Dosis"
                  placeholder="Masukkan dosis obat"
                  register={register}
                  errors={errors}
                  defaultValue={obat.dosage}
                />
                <FormInput
                  id="frequency"
                  label="Frekuensi"
                  placeholder="Masukkan frekuensi obat"
                  register={register}
                  errors={errors}
                  defaultValue={obat.frequency}
                />
                <FormInput
                  id="quantity"
                  label="Kuantitas"
                  type="number"
                  placeholder="Masukkan kuantitas obat"
                  register={register}
                  errors={errors}
                  defaultValue={obat.quantity}
                />
                <FormInput
                  id="price"
                  label="Harga"
                  type="number"
                  placeholder="Masukkan harga obat"
                  register={register}
                  errors={errors}
                  defaultValue={obat.price}
                />
              </div>
              <div className="col-span-2 flex justify-end">
                <Button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Simpan
                </Button>
              </div>
            </form>
          </ModalLayout>

          <DeleteConfirmationModal
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDelete}
            itemName={obat.name}
            description="Apakah Anda yakin ingin menghapus data obat "
          />
        </>
      );
    },
  },
];
