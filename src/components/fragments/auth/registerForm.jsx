"use client";

import { registerSchema } from "@/lib/validation/auth";
import { FormDatePicker, FormInput, FormSelect } from "./inputForm";
import { AuthForm } from "@/components/layouts/authForm";
import { useFormRegister } from "@/hooks/useAuthForm";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    error,
    isLoading,
    onSubmit,
  } = useFormRegister(registerSchema, {
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

  const handleRegister = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    onSubmit(
      { ...data, dateOfBirth: new Date(data.dateOfBirth).toISOString() },
      "/api/register",
      "Registration successful",
      "/auth/signin"
    );
  };

  return (
    <AuthForm
      title="Register"
      description="Bergabunglah dengan MediConnect untuk mengakses layanan kesehatan kami"
      error={error}
      isLoading={isLoading}
      onSubmit={handleSubmit(handleRegister)}
      footerText="Already have an account?"
      footerLinkText="Login here"
      footerLinkHref="/auth/signin"
    >
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
        value={watch("dateOfBirth") ? new Date(watch("dateOfBirth")) : null}
        onChange={(date) => setValue("dateOfBirth", date.toISOString())}
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
        errors={errors}
        watch={watch}
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
    </AuthForm>
  );
}
