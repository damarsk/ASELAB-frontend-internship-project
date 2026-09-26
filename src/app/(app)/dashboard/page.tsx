"use client";

import Header from "@/src/components/landing/Header";
import { useEffect, useState } from "react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export default function DashboardPage() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getCookie("token");

        if (!token) {
          throw new Error("Token tidak ditemukan");
        }

        const res = await fetch("/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Token invalid");
        }

        const data = await res.json();
        setUsername(data.data.nama);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat profil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Memuat profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex items-center bg-brand-primary-light px-32 py-4 h-64">
        <div>
          <h1 className="text-4xl font-medium mb-4">Halo, {username} 👋</h1>
          <p className="text-4xl font-medium">Temukan Tim yang Cocok</p>
          <p className="text-4xl text-brand-primary font-medium">
            Berdasarkan skill dan minatmu
          </p>
        </div>
      </div>
    </>
  );
}
