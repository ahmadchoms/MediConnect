"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FormInput,
  FormSelect,
  FormDatePicker,
} from "@/components/fragments/auth/inputForm";
import {
  CalendarIcon,
  Save,
  UserCircle,
  Lock,
  Phone,
  MapPin,
  Mail,
  User,
  Pencil,
  Loader2,
} from "lucide-react";
import { firebaseService } from "@/lib/firebase/service";
import { toast, Toaster } from "sonner"; // Import Sonner

const profileSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  phoneNumber: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
  nik: z.string().min(16, { message: "NIK harus 16 digit" }).max(16),
  address: z.string().min(1, { message: "Alamat wajib diisi" }),
  gender: z.string().min(1, { message: "Jenis kelamin wajib diisi" }),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Password saat ini wajib diisi" }),
    newPassword: z
      .string()
      .min(8, { message: "Password baru minimal 8 karakter" }),
    confirmPassword: z.string().min(1, { message: "Konfirmasi password wajib diisi" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

const ProfileField = ({ label, value, icon: Icon, isEditing, children }) => (
  <div className="space-y-2">
    <div className="font-medium">{label}</div>
    {isEditing ? (
      children
    ) : (
      <div className="flex items-center p-2 border rounded-md bg-white">
        <Icon className="mr-2 h-5 w-5 text-gray-400" />
        <span>{value || "Tidak ada data"}</span>
      </div>
    )}
  </div>
);

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { data: session } = useSession();

  const {
    register: profileRegister,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    setValue: setProfileValue,
    watch: watchProfile,
    reset: resetProfile,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      nik: "",
      address: "",
      gender: "",
    },
  });

  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const watchGender = watchProfile("gender");

  useEffect(() => {
    async function fetchUserData() {
      if (!session?.user?.email) return;

      try {
        setLoading(true);
        const users = await firebaseService.getData("users");
        const user = users.find(user => user.email === session?.user?.email);

        if (user) {
          resetProfile({
            ...user,
            dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Gagal memuat data profil"); // Notifikasi error
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [session, resetProfile]);

  const onProfileSubmit = async (data) => {
    try {
      const users = await firebaseService.getData("users");
      const user = users.find(user => user.email === session.user.email);

      if (user) {
        await firebaseService.updateDocument("users", user.id, data);
        toast.success("Profil berhasil diperbarui"); // Notifikasi sukses
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Gagal memperbarui profil"); // Notifikasi error
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      console.log("Password change requested", data);
      resetPassword();
      toast.success("Permintaan perubahan password berhasil"); // Notifikasi sukses
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Gagal mengubah password"); // Notifikasi error
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const genderOptions = [
    { value: "male", label: "Laki-laki" },
    { value: "female", label: "Perempuan" },
  ];

  const roleDisplay = { patient: "Pasien", doctor: "Dokter", admin: "Admin" };

  return (
    <main>
      {/* Tambahkan Toaster untuk menampilkan notifikasi */}
      <Toaster position="top-center" richColors />

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Profil Saya</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Kelola informasi profil dan preferensi akun Anda
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="profile">Informasi Profil</TabsTrigger>
              <TabsTrigger value="security">Keamanan</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Informasi Profil</CardTitle>
                    <CardDescription>
                      Kelola detail dan informasi personal Anda
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "secondary" : "default"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      "Batal"
                    ) : (
                      <>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ProfileField
                        label="Nama Lengkap"
                        value={watchProfile("name")}
                        icon={User}
                        isEditing={isEditing}
                      >
                        <FormInput
                          id="name"
                          type="text"
                          placeholder="Masukkan nama lengkap"
                          register={profileRegister}
                          errors={profileErrors}
                        />
                      </ProfileField>

                      <ProfileField
                        label="Email"
                        value={watchProfile("email")}
                        icon={Mail}
                        isEditing={isEditing}
                      >
                        <FormInput
                          id="email"
                          type="email"
                          placeholder="Masukkan email"
                          register={profileRegister}
                          errors={profileErrors}
                        />
                      </ProfileField>

                      <ProfileField
                        label="Nomor Telepon"
                        value={watchProfile("phoneNumber")}
                        icon={Phone}
                        isEditing={isEditing}
                      >
                        <FormInput
                          id="phoneNumber"
                          type="text"
                          placeholder="Masukkan nomor telepon"
                          register={profileRegister}
                          errors={profileErrors}
                        />
                      </ProfileField>

                      <ProfileField
                        label="NIK"
                        value={watchProfile("nik")}
                        icon={UserCircle}
                        isEditing={isEditing}
                      >
                        <FormInput
                          id="nik"
                          type="text"
                          placeholder="Masukkan NIK"
                          register={profileRegister}
                          errors={profileErrors}
                        />
                      </ProfileField>

                      <ProfileField
                        label="Alamat"
                        value={watchProfile("address")}
                        icon={MapPin}
                        isEditing={isEditing}
                      >
                        <FormInput
                          id="address"
                          type="text"
                          placeholder="Masukkan alamat"
                          register={profileRegister}
                          errors={profileErrors}
                        />
                      </ProfileField>

                      <ProfileField
                        label="Jenis Kelamin"
                        value={genderOptions.find(opt => opt.value === watchGender)?.label || ""}
                        icon={User}
                        isEditing={isEditing}
                      >
                        <FormSelect
                          id="gender"
                          options={genderOptions}
                          setValue={setProfileValue}
                          watch={watchProfile}
                          errors={profileErrors}
                        />
                      </ProfileField>

                    </div>

                    {isEditing && (
                      <div className="mt-8 flex justify-end">
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Keamanan Akun</CardTitle>
                  <CardDescription>
                    Ubah password Anda untuk menjaga keamanan akun
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium">Password Saat Ini</div>
                        <div className="flex">
                          <Lock className="mr-2 h-5 w-5 text-gray-400" />
                          <input
                            type="password"
                            className="flex-1 px-3 py-2 border rounded-md"
                            {...passwordRegister("currentPassword")}
                          />
                        </div>
                        {passwordErrors.currentPassword && (
                          <p className="text-sm text-red-500">
                            {passwordErrors.currentPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="font-medium">Password Baru</div>
                        <div className="flex">
                          <Lock className="mr-2 h-5 w-5 text-gray-400" />
                          <input
                            type="password"
                            className="flex-1 px-3 py-2 border rounded-md"
                            {...passwordRegister("newPassword")}
                          />
                        </div>
                        {passwordErrors.newPassword && (
                          <p className="text-sm text-red-500">
                            {passwordErrors.newPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="font-medium">Konfirmasi Password Baru</div>
                        <div className="flex">
                          <Lock className="mr-2 h-5 w-5 text-gray-400" />
                          <input
                            type="password"
                            className="flex-1 px-3 py-2 border rounded-md"
                            {...passwordRegister("confirmPassword")}
                          />
                        </div>
                        {passwordErrors.confirmPassword && (
                          <p className="text-sm text-red-500">
                            {passwordErrors.confirmPassword.message}
                          </p>
                        )}
                      </div>

                      <div className="mt-6">
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Ubah Password
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}