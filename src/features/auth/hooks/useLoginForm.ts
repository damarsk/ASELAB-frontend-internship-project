"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
      const result = await signIn("credentials", {
        emailInstitusi: data.emailInstitusi,
        password: data.password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("root", {
          type: "manual",
          message: "Email atau password salah.",
        });
        return;
      }

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
