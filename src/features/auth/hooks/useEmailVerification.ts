"use client";

import {
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type RegisterData = {
  nama: string;
  nim: string;
  emailInstitusi: string;
  password: string;
};

export function useEmailVerification() {
  const router = useRouter();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [registerData, setRegisterData] = useState<RegisterData | null>(null);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("registerData");

    if (!storedData) {
      router.replace("/register");
      return;
    }

    try {
      setRegisterData(JSON.parse(storedData));
    } catch {
      sessionStorage.removeItem("registerData");
      router.replace("/register");
    }
  }, [router]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });
    if (digit && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedOtp = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pastedOtp) return;
    const nextOtp = ["", "", "", "", "", ""];
    pastedOtp.split("").forEach((digit, idx) => {
      nextOtp[idx] = digit;
    });
    setOtp(nextOtp);
    const focusIdx = Math.min(pastedOtp.length, 5);
    inputsRef.current[focusIdx]?.focus();
  };

  const handleVerify = async () => {
    if (!registerData) return;
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Masukkan kode OTP 6 digit.");
      return;
    }
    if (timeLeft <= 0) {
      setError("Kode OTP sudah kedaluwarsa. Silakan minta ulang.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: registerData.nama,
          nim: registerData.nim,
          emailInstitusi: registerData.emailInstitusi,
          password: registerData.password,
          otp: otpValue,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Verifikasi gagal.");
      }
      sessionStorage.removeItem("registerData");
      router.push("/login");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Terjadi kesalahan saat verifikasi.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!registerData || timeLeft > 0 || isResending) return;
    setError("");
    setIsResending(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/auth/request-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailInstitusi: registerData.emailInstitusi }),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Gagal mengirim ulang OTP.");
      }
      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(300);
      inputsRef.current[0]?.focus();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal mengirim ulang OTP.");
    } finally {
      setIsResending(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const isExpired = timeLeft <= 0;

  return {
    registerData,
    otp,
    timeLeft,
    minutes,
    seconds,
    isExpired,
    isLoading,
    isResending,
    error,
    inputsRef,
    handleOtpChange,
    handleKeyDown,
    handlePaste,
    handleVerify,
    handleResend,
  };
}
