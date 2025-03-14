"use client";

import LoginForm from "@/components/fragments/auth/loginForm";
import { AuthLayout } from "@/components/layouts/authLayout";
import { Shield, ShoppingBag } from "lucide-react";

export default function LoginPage() {
  const illustrationContent = (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Layanan Kesehatan Tanpa Hambatan
        </h3>
        <p className="text-gray-600">
          Akses rekam medis, janji temu, dan resep obat Anda dalam satu tempat yang aman.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <ShoppingBag className="w-11 h-11 bg-blue-500 rounded-md text-white p-2 mr-2" />
          <div>
            <h4 className="font-medium">Janji Temu Mudah</h4>
            <p className="text-sm text-gray-500">
              Pesan dan kelola janji temu Anda secara online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Shield className="w-11 h-11 bg-green-500 rounded-md text-white p-2 mr-2" />
          <div>
            <h4 className="font-medium">Aman & Privat</h4>
            <p className="text-sm text-gray-500">
              Informasi kesehatan Anda selalu terlindungi
            </p>
          </div>
        </div>
      </div>

    </>
  );

  return (
    <AuthLayout
      title="Selamat Datang Kembali di MediConnect"
      description="Akses catatan pasien, janji temu, dan layanan kesehatan Anda"
      bgColor="bg-blue-100"
      illustrationContent={illustrationContent}
    >
      <LoginForm />
    </AuthLayout>
  );
}
