"use client";

import { CardLayout } from "@/components/layouts/admin-layout/card-layout";
import SidebarLayout from "@/components/layouts/admin-layout/sidebar-layout";
import { columns } from "./columns";
import { medications } from "@/dummy/data";
import { ModalLayout } from "@/components/layouts/admin-layout/modal-layout";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/fragments/auth/inputForm";
import { useFormRegister } from "@/hooks/useAuthForm";
import { medicationSchema } from "@/lib/validation/medication";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { firebaseService } from "@/lib/firebase/service";

export default function ObatPage() {
  const { register, handleSubmit, errors, onSubmit, reset } = useFormRegister(
    medicationSchema,
    {
      name: "",
      dosage: "",
      frequency: "",
      quantity: "",
      price: "",
    }
  );

  const [obat, setObat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firebaseService.getData("obat");
        setObat(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleSave = async (data) => {
    try {
      console.log(data);
      await onSubmit(
        data,
        "/api/obat",
        "Berhasil menambahkan obat",
        "/admin/obat"
      );

      reset();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              Manajemen Data Obat
            </h1>
            <p className="text-gray-500 text-medium mt-1">
              Kelola dan pantau informasi lengkap obat, dosis, frekuensi, serta
              stok untuk memastikan ketersediaan dan keamanan penggunaan obat
              dalam pelayanan kesehatan
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <CardLayout
          title="Daftar Obat"
          description="Daftar obat yang tersedia di klinik"
          columns={columns}
          data={obat}
          itemsPerPage={10}
          searchPlaceholder="Cari nama obat..."
          searchFields={["name"]}
          content={
            <div>
              <ModalLayout
                title="Tambah Obat"
                trigger={
                  <Button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Tambah Obat
                  </Button>
                }
              >
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      id="name"
                      label="Nama obat"
                      placeholder="Masukkan nama obat"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      id="dosage"
                      label="Dosis"
                      placeholder="Masukkan dosis obat"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      id="frequency"
                      label="Frekuensi"
                      placeholder="Masukkan frekuensi obat"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      id="quantity"
                      label="Kuantitas"
                      type="number"
                      placeholder="Masukkan kuantitas obat"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      id="price"
                      label="Harga"
                      type="number"
                      placeholder="Masukkan harga obat"
                      register={register}
                      errors={errors}
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
            </div>
          }
        />
      )}
    </SidebarLayout>
  );
}
