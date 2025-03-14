"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react";
import { ModalLayout } from "@/components/layouts/admin-layout/modal-layout";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { DeleteConfirmationModal } from "@/components/layouts/admin-layout/modal-delete-layout";
import { firebaseService } from "@/lib/firebase/service"; // Sesuaikan path-nya
import { toast } from "sonner";
import { useFormRegister } from "@/hooks/useAuthForm";
import { registerSchema } from "@/lib/validation/auth";
import {
  FormDatePicker,
  FormInput,
  FormSelect,
} from "@/components/fragments/auth/inputForm";

export const columns = [
  { header: "Name", accessorKey: "name" },
  { header: "Address", accessorKey: "address" },
  { header: "Phone Number", accessorKey: "phoneNumber" },
  { header: "NIK", accessorKey: "nik" },
  { header: "Email", accessorKey: "email" },
  { header: "Gender", accessorKey: "gender" },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const pasien = row.original;
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);

      const { register, handleSubmit, setValue, watch, errors, reset } =
        useFormRegister(registerSchema, {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "patient",
          dateOfBirth: null,
          gender: "male",
          address: "",
          phoneNumber: "",
          nik: "",
        });

      useEffect(() => {
        if (isEditModalOpen && pasien) {
          setValue("name", pasien.name || "");
          setValue("email", pasien.email || "");
          setValue("nik", pasien.nik || "");
          setValue("dateOfBirth", pasien.dateOfBirth || null);
          setValue("gender", pasien.gender || "male");
          setValue("address", pasien.address || "");
          setValue("phoneNumber", pasien.phoneNumber || "");
        }
      }, [isEditModalOpen, pasien, setValue]);

      const handleUpdate = async (data) => {
        try {
          const updateData = { ...data };
          if (!updateData.password) {
            delete updateData.password;
            delete updateData.confirmPassword;
          }

          await firebaseService.updateDocument("users", pasien.id, updateData);
          setIsEditModalOpen(false);
          toast.success("Data pasien berhasil diperbarui!");
          window.location.reload();
        } catch (error) {
          console.error("Gagal memperbarui data pasien:", error);
          toast.error("Gagal memperbarui data pasien. Silakan coba lagi.");
        }
      };

      const handleDelete = async () => {
        try {
          await firebaseService.deleteDocument("users", pasien.id);
          setIsDeleteDialogOpen(false);
          toast.success("Pasien berhasil dihapus!");
          window.location.reload();
        } catch (error) {
          console.error("Gagal menghapus pasien:", error);
          toast.error("Gagal menghapus pasien. Silakan coba lagi.");
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
              {/* Tombol Detail */}
              <Link href={`/admin/pasien/${pasien.id}`} passHref>
                <div className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-600 rounded-md transition-colors cursor-pointer">
                  <Eye className="h-4 w-4 text-gray-500" />
                  Detail
                </div>
              </Link>
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
                  label="Nama Lengkap"
                  placeholder="Masukan Nama Lengkap"
                  register={register}
                  errors={errors}
                  defaultValue={pasien.name}
                />
                <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="Masukan Email"
                  register={register}
                  errors={errors}
                  defaultValue={pasien.email}
                />
                <FormInput
                  id="nik"
                  label="NIK"
                  placeholder="Masukan 16 digit NIK"
                  register={register}
                  errors={errors}
                  defaultValue={pasien.nik}
                />
                <FormDatePicker
                  id="dateOfBirth"
                  label="Tanggal Lahir"
                  value={
                    watch("dateOfBirth")
                      ? new Date(watch("dateOfBirth"))
                      : pasien.dateOfBirth
                      ? new Date(pasien.dateOfBirth)
                      : null
                  }
                  onChange={(date) =>
                    setValue("dateOfBirth", date.toISOString())
                  }
                  errors={errors}
                />
                <FormSelect
                  id="gender"
                  label="Jenis Kelamin"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                  defaultValue={pasien.gender}
                />
                <FormInput
                  id="address"
                  label="Alamat"
                  placeholder="Masukan Alamat"
                  register={register}
                  errors={errors}
                  defaultValue={pasien.address}
                />
                <FormInput
                  id="phoneNumber"
                  label="Nomor Telepon"
                  type="tel"
                  placeholder="Masukan Nomor Telepon"
                  register={register}
                  errors={errors}
                  defaultValue={pasien.phoneNumber}
                />
                <FormInput
                  id="password"
                  label="Password "
                  type="password"
                  placeholder="Masukan Password Baru"
                  register={register}
                  errors={errors}
                  required={false}
                />
                <FormInput
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Konfirmasi Password Baru"
                  register={register}
                  errors={errors}
                  required={false}
                />
                <div className="col-span-2 flex justify-end gap-2">
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Simpan Perubahan
                  </Button>
                </div>
              </div>
            </form>
          </ModalLayout>

          <DeleteConfirmationModal
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDelete}
            itemName={pasien.name}
            description="Apakah Anda yakin ingin menghapus data pasien"
          />
        </>
      );
    },
  },
];
