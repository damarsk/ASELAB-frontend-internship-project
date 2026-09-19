"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register.schema";
import { requestOtpAction } from "../actions/requestOtp.action";
import { useRouter } from "next/navigation";

export function useRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

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

    const registerData = {
      nama: data.fullName,
      nim: data.nim,
      emailInstitusi: data.email,
      password: data.password,
    };
    try {
      sessionStorage.setItem("registerData", JSON.stringify(registerData));
    } catch (e) {
      console.warn("Failed to store registration data", e);
    }

    const otpResult = await requestOtpAction(data.email);
    if (!otpResult.success) {
      setApiError(otpResult.error || "Gagal mengirim OTP");
      return;
    }

    router.push("/register/verify");
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
