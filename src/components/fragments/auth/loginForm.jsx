"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation/auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthForm } from "@/components/layouts/authForm";
import { FormInput } from "./inputForm";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : result.error
        );
        setIsLoading(false);
        return;
      }

      await router.push("/admin/dashboard");

      toast.success("Logged in successfully", {
        description: "Welcome back!",
        duration: 5000,
      });
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Login ke MediConnect"
      description="Masukan kredensial untuk login"
      error={error}
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      footerText="Don't have an account?"
      footerLinkText="Register here"
      footerLinkHref="/auth/signup"
    >
      <FormInput
        id="email"
        label="Email"
        type="email"
        placeholder="Masukan email"
        register={register}
        errors={errors}
      />
      <FormInput
        id="password"
        label="Password"
        type="password"
        placeholder="Masukan password"
        register={register}
        errors={errors}
      />
    </AuthForm>
  );
}
