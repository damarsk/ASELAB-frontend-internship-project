"use client";

import { useRouter } from "next/navigation";
import { useEmailVerification } from "../../features/auth/hooks/useVerifyOTP";

export default function VerifyOTP() {
  const router = useRouter();

  const {
    session,
    otp,
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
  } = useEmailVerification();

  if (isLoading && !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-[#6B7280]">Memuat sesi registrasi...</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl text-red-500">
            !
          </div>

          <h1 className="text-xl font-bold text-[#111827]">
            Sesi Registrasi Tidak Ditemukan
          </h1>

          <p className="mt-2 text-sm text-[#6B7280]">
            {error || "Silakan kembali ke halaman registrasi."}
          </p>

          <button
            type="button"
            onClick={() => router.push("/register")}
            className="mt-6 h-11 w-full rounded-xl bg-[#16A34A] text-sm font-semibold text-white transition hover:bg-[#15803D]"
          >
            Kembali ke Registrasi
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-[#111827]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111827]">
            Verifikasi Email
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            Kami telah mengirimkan kode verifikasi 6 digit ke
          </p>

          <p className="mt-1 break-all text-sm font-semibold text-[#6B7280]">
            {session.emailInstitusi}
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(element) => {
                inputsRef.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={value}
              onChange={(event) => handleOtpChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={handlePaste}
              disabled={isLoading || isResending}
              aria-label={`Digit OTP ${index + 1}`}
              className="h-14 w-12 rounded-xl border-0 bg-[#E5E7EB] text-center text-xl font-semibold text-[#111827] outline-none transition focus:ring-2 focus:ring-[#16A34A] disabled:bg-[#F3F4F6]"
            />
          ))}
        </div>

        <div className="mt-5 text-center text-sm text-[#6B7280]">
          Kode Berlaku Selama{" "}
          <span className="font-semibold text-[#111827]">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        </div>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleVerify}
          disabled={
            isLoading || isResending || isExpired || otp.join("").length !== 6
          }
          className="mt-6 h-12 w-full rounded-xl bg-[#16A34A] text-sm font-semibold text-white transition hover:bg-[#15803D] disabled:cursor-not-allowed disabled:bg-[#D1D5DB]"
        >
          {isLoading ? "Memverifikasi..." : "Verifikasi"}
        </button>

        <div className="mt-5 text-center text-sm text-[#6B7280]">
          <span className="font-medium text-[#111827]">
            Tidak Menerima Kode?
          </span>{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={!isExpired || isResending || isLoading}
            className="font-semibold text-[#16A34A] transition hover:text-[#15803D] disabled:cursor-not-allowed disabled:text-[#9CA3AF]"
          >
            {isResending ? "Mengirim..." : "Kirim Ulang"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.push("/register")}
          className="mt-6 block w-full text-center text-sm text-[#16A34A] transition hover:text-[#15803D]"
        >
          ← Kembali ke halaman Registrasi
        </button>
      </div>
    </main>
  );
}
