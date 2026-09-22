"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register.schema";
import { useRouter } from "next/navigation";

export function useRegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      nim: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setApiError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/request-register-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: data.fullName.trim(),
            nim: data.nim.trim(),
            emailInstitusi: data.email.trim().toLowerCase(),
            password: data.password,
          }),
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Gagal mengirim OTP.");
      }

      if (!result?.token) {
        throw new Error("Token registrasi tidak diterima dari server.");
      }

      const params = new URLSearchParams({
        token: result.token,
      });

      router.push(`/register/verify?${params.toString()}`);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat registrasi.",
      );
    }
  };

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    apiError,
    onSubmit,
  };
}
