"use client";
import { useState, useEffect } from "react";
import SidebarLayout from "@/components/layouts/admin-layout/sidebar-layout";
import { columns } from "./columns";
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
import { useFormRegister } from "@/hooks/useAuthForm";
import { registerSchema } from "@/lib/validation/auth";
import {
  FormDatePicker,
  FormInput,
  FormSelect,
} from "@/components/fragments/auth/inputForm";
import { ModalLayout } from "@/components/layouts/admin-layout/modal-layout";
import { Button } from "@/components/ui/button";

export default function PatientPage() {
  const { register, handleSubmit, setValue, watch, errors, reset, onSubmit } =
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
    });

  const [genderFilter, setGenderFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firebaseService.getData("users");
        setUsers(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users
    .filter((user) => {
      const matchesStatus =
        genderFilter === "all" || user.gender === genderFilter;
      const isAdmin = user.role !== "admin";
      return matchesStatus && isAdmin;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt.seconds * 1000); // Konversi ke Date
      const dateB = new Date(b.createdAt.seconds * 1000); // Konversi ke Date
      return dateB - dateA;
    });

  console.log(filteredUsers);

  const handleSave = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await onSubmit(
        { ...data, dateOfBirth: new Date(data.dateOfBirth).toISOString() },
        "/api/register",
        "Berhasil menambahkan pasien",
        "/admin/pasien"
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
            <h1 className="text-2xl font-bold text-blue-600">Data Pasien</h1>
            <p className="text-gray-500 text-medium mt-1">
              Kelola data pasien yang terdaftar
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <CardLayout
          title="Daftar Data Pasien"
          description="Semua data pasien yang terdaftar"
          columns={columns}
          data={filteredUsers}
          itemsPerPage={10}
          searchPlaceholder="Cari nama..."
          searchFields={["name", "nik"]}
          content={
            <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
              <Select
                defaultValue="all"
                onValueChange={(value) => setGenderFilter(value)} // Perbaiki di sini
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Gender</SelectItem>
                  <SelectItem value="male">male</SelectItem>
                  <SelectItem value="female">female</SelectItem>
                </SelectContent>
              </Select>
              <ModalLayout
                title="Tambah Pasien"
                trigger={
                  <Button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Tambah Pasien
                  </Button>
                }
              >
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      id="name"
                      label="Nama Lengkap"
                      placeholder="Masukan Nama Lengkap"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="Masukan Email"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      id="nik"
                      label="NIK"
                      placeholder="Masukan 16 digit NIK"
                      register={register}
                      errors={errors}
                    />
                    <FormDatePicker
                      id="dateOfBirth"
                      label="Tanggal Lahir"
                      value={
                        watch("dateOfBirth")
                          ? new Date(watch("dateOfBirth"))
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
                    />
                    <FormInput
                      id="address"
                      label="Alamat"
                      placeholder="Masukan Alamat"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      id="phoneNumber"
                      label="Nomor Telepon"
                      type="tel"
                      placeholder="Masukan Nomor Telepon"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      id="password"
                      label="Password"
                      type="password"
                      placeholder="Masukan Password"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      placeholder="Masukan Konfirmasi Password"
                      register={register}
                      errors={errors}
                    />
                    <div className="col-span-2 flex justify-end">
                      <Button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        Simpan
                      </Button>
                    </div>
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
