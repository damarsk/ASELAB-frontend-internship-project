"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Nama lengkap wajib diisi")
      .min(3, "Nama minimal 3 karakter"),
    nim: z
      .string()
      .min(1, "NIM wajib diisi")
      .regex(/^\d+$/, "NIM hanya boleh berisi angka"),
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z
      .string()
      .min(1, "Password wajib diisi")
      .min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui Syarat & Ketentuan",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan Konfirmasi Password tidak cocok",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="grid h-screen w-screen grid-cols-1 overflow-hidden bg-white lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden rounded-tr-2xl rounded-br-2xl p-12 text-white lg:flex">
        <Image
          src="/images/hero-hackathon.jpg"
          alt="Hackathon Team"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-primary">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-primary" />
            Partner In
          </div>
          <span className="text-xs tracking-wider text-gray-300">SDGs 17</span>
        </div>

        <div className="relative z-10 max-w-lg space-y-4">
          <span className="inline-block rounded-full bg-brand-primary/20 px-3 py-1 text-xs font-semibold text-brand-primary-light backdrop-blur-md">
            🚀 #1 PLATFORM CARI TIM LOMBA
          </span>
          <h2 className="text-4xl font-extrabold leading-tight text-white">
            Bangun Tim Impian, <br />
            Menangkan Kompetisi Bergengsi.
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Temukan tim berdasarkan skill, minat, dan kompetisi yang ingin kamu
            ikuti. Bangun kolaborasi dan raih prestasi bersama.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center overflow-y-auto px-6 py-8 sm:px-12 lg:px-20 xl:px-28">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 text-left">
            <h1 className="text-2xl font-bold text-gray-900">Buat Akun</h1>
            <p className="mt-1 text-sm text-gray-500">
              Daftar dan mulai temukan tim lomba yang sesuai dengan skill dan
              minatmu.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="fullName"
                {...register("fullName")}
                placeholder="Masukkan nama lengkap....."
                className="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="nim"
                className="block text-sm font-medium text-gray-700"
              >
                NIM
              </label>
              <input
                type="text"
                id="nim"
                {...register("nim")}
                placeholder="Masukkan NIM....."
                className="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
              {errors.nim && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.nim.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="nama@student.telkomuniversity.ac.id"
                className="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="Masukkan password"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50/50 py-2 pl-4 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Konfirmasi Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  placeholder="Masukkan ulang password"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50/50 py-2 pl-4 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  {...register("agreeTerms")}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <label
                  htmlFor="agreeTerms"
                  className="ml-2.5 pt-1 text-xs font-medium text-gray-600"
                >
                  Saya menyetujui{" "}
                  <Link
                    href="/terms"
                    className="text-brand-primary hover:underline"
                  >
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link
                    href="/privacy"
                    className="text-brand-primary hover:underline"
                  >
                    Kebijakan Privasi
                  </Link>
                  .
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary-hover focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:opacity-50"
            >
              {isSubmitting ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs font-medium text-gray-700">
            Sudah Punya Akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-primary hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
