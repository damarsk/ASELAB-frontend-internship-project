"use client";

import { useRouter } from "next/navigation";
import { useEmailVerification } from "../../features/auth/hooks/useEmailVerification";

type RegisterData = {
  nama: string;
  nim: string;
  emailInstitusi: string;
  password: string;
};

export default function EmailVerification() {
  const router = useRouter();
  const {
    registerData,
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

  if (!registerData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-2xl">
          ✉️
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Verifikasi Email
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Kami telah mengirimkan kode verifikasi 6 digit ke
          </p>

          <p className="mt-1 break-all text-sm font-semibold text-indigo-600">
            {registerData.emailInstitusi}
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2">
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
              disabled={isLoading}
              aria-label={`Digit OTP ${index + 1}`}
              className="h-14 w-11 rounded-xl border border-slate-300 bg-white text-center text-xl font-semibold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-100"
            />
          ))}
        </div>

        <div className="mt-5 text-center text-sm text-slate-500">
          {isExpired ? (
            <span className="font-medium text-red-500">
              Kode OTP sudah kedaluwarsa
            </span>
          ) : (
            <>
              Kode berlaku selama{" "}
              <span className="font-semibold text-slate-900">
                {minutes}:{seconds}
              </span>
            </>
          )}
        </div>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleVerify}
          disabled={isLoading || isExpired || otp.join("").length !== 6}
          className="mt-6 h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {isLoading ? "Memverifikasi..." : "Verifikasi & Daftar"}
        </button>

        <div className="mt-5 text-center text-sm text-slate-500">
          Tidak menerima kode?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={!isExpired || isResending}
            className="font-semibold text-indigo-600 disabled:cursor-not-allowed disabled:text-slate-400"
          >
            {isResending ? "Mengirim..." : "Kirim ulang"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.push("/register")}
          className="mt-6 block w-full text-center text-sm text-slate-500 transition hover:text-slate-900"
        >
          ← Kembali ke registrasi
        </button>
      </div>
    </main>
  );
}
