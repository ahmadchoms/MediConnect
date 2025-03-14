"use client";

import RegisterForm from "@/components/fragments/auth/registerForm";
import { AuthLayout } from "@/components/layouts/authLayout";
import { BriefcaseBusiness, Clock } from "lucide-react";

export default function RegisterPage() {
  const illustrationContent = (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          Kesehatan Lebih Mudah
        </h3>
        <p className="text-gray-600">
          Buat akun Anda untuk mulai mengelola perjalanan kesehatan dengan mudah.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <Clock className="w-11 h-11 bg-blue-500 rounded-md text-white p-2 mr-2" />
          <div>
            <h4 className="font-medium">Jadwalkan Janji Temu</h4>
            <p className="text-sm text-gray-500">
              Pesan dan kelola kunjungan kesehatan Anda
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BriefcaseBusiness className="w-11 h-11 bg-green-500 rounded-md text-white p-2 mr-2" />
          <div>
            <h4 className="font-medium">Rekam Medis</h4>
            <p className="text-sm text-gray-500">
              Akses informasi kesehatan Anda kapan saja
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <AuthLayout
      title="Buat akun Anda"
      description="Bergabung dengan MediConnect untuk mengelola kesehatan Anda dengan aman"
      bgColor="bg-green-100"
      illustrationContent={illustrationContent}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
