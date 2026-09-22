"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailInstitusi: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailInstitusi: data.emailInstitusi,
          password: data.password,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError("root", {
          type: "manual",
          message: result?.message || result?.error || "Login gagal.",
        });
        return;
      }

      document.cookie = `token=${result.token}; path=/; max-age=86400; SameSite=Lax`;

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("root", {
        type: "manual",
        message:
          err instanceof Error ? err.message : "Terjadi kesalahan koneksi.",
      });
    }
  };

  return {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  };
}
