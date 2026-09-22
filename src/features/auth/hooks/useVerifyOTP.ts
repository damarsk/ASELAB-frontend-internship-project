"use client";

import {
  ClipboardEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

type RegistrationSession = {
  nama: string;
  emailInstitusi: string;
  expiresAt: string;
};

const INITIAL_TIME = 300;

export function useEmailVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const token = searchParams.get("token");

  const [session, setSession] = useState<RegistrationSession | null>(null);

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  const [isLoading, setIsLoading] = useState(true);

  const [isResending, setIsResending] = useState(false);

  const [error, setError] = useState("");

  const setTimeFromExpiration = (expiresAt: string) => {
    const expiration = new Date(expiresAt).getTime();

    const remaining = Math.max(0, Math.ceil((expiration - Date.now()) / 1000));

    setTimeLeft(remaining);
  };

  useEffect(() => {
    if (!token) {
      setError("Token registrasi tidak ditemukan.");
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      return;
    }

    const loadSession = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register/session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
            }),
            cache: "no-store",
          },
        );

        const contentType = response.headers.get("content-type") || "";

        const isJson = contentType.includes("application/json");

        if (!response.ok) {
          if (isJson) {
            const errorData = await response.json().catch(() => null);

            throw new Error(errorData?.error || `HTTP ${response.status}`);
          }

          const text = await response.text().catch(() => "");

          throw new Error(text || `HTTP ${response.status}`);
        }

        if (!isJson) {
          const text = await response.text().catch(() => "");

          throw new Error(
            `Server mengembalikan respons non-JSON: ${text.slice(0, 100)}`,
          );
        }

        const result = await response.json();

        if (!result?.data) {
          throw new Error(
            result?.error || "Data sesi registrasi tidak ditemukan.",
          );
        }

        setSession(result.data);
        setTimeFromExpiration(result.data.expiresAt);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Gagal mengambil sesi registrasi.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, [token]);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
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

    if (!pastedOtp) {
      return;
    }

    const nextOtp = ["", "", "", "", "", ""];

    pastedOtp.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });

    setOtp(nextOtp);

    const focusIndex = Math.min(pastedOtp.length, 5);

    inputsRef.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    if (!token) {
      setError("Token registrasi tidak ditemukan. Silakan registrasi ulang.");
      return;
    }

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            otp: otpValue,
          }),
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Verifikasi gagal.");
      }

      router.replace("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat verifikasi.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!token || timeLeft > 0 || isResending) {
      return;
    }

    setError("");
    setIsResending(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/request-register-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        },
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Gagal mengirim ulang OTP.");
      }

      setOtp(["", "", "", "", "", ""]);

      if (result?.data?.expiresAt) {
        setTimeFromExpiration(result.data.expiresAt);
      } else {
        setTimeLeft(INITIAL_TIME);
      }

      requestAnimationFrame(() => {
        inputsRef.current[0]?.focus();
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Gagal mengirim ulang OTP.",
      );
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
    token,
    session,
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
