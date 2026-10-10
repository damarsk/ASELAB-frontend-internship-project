# <...>

Platform untuk membantu mahasiswa dan peserta kompetisi menemukan partner lomba, membentuk tim, dan mengelola anggota tim. Repository ini berisi aplikasi frontend; data autentikasi dan profil diambil dari backend Partnerin.

## Fitur

- Registrasi dengan verifikasi OTP dan login email institusi
- Dashboard, daftar tim publik (filter, pagination), dan detail tim
- Pembuatan dan pengelolaan tim (anggota, join request, pengaturan, tautan grup)
- Profil, notifikasi, dan daftar kompetisi

## Teknologi

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, NextAuth 4 (JWT), React Hook Form + Zod, pnpm.

## Memulai

Prasyarat: Node.js yang kompatibel dengan Next.js 16, pnpm, dan backend Partnerin yang sedang berjalan.

```bash
git clone https://github.com/damarsk/ASELAB-frontend-internship-project/tree/main
cd partnerin
pnpm install
cp .env.example .env.local   # lalu isi nilainya
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Environment Variable

| Variable                                | Wajib | Keterangan                                             |
| --------------------------------------- | ----- | ------------------------------------------------------ |
| `NEXT_PUBLIC_BACKEND_URL`               | Ya    | Base URL backend, contoh `http://localhost:3001/api`   |
| `NEXTAUTH_SECRET`                       | Ya    | Secret session (buat dengan `openssl rand -base64 32`) |
| `NEXTAUTH_URL`                          | Ya    | URL frontend, contoh `http://localhost:3000`           |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Tidak | Hanya jika Google OAuth diaktifkan                     |

Jangan commit `.env.local` atau secret ke repository.

## Integrasi Backend

Login menghasilkan token dari backend yang disimpan di JWT NextAuth dan divalidasi oleh `src/proxy.ts` sebelum halaman terlindungi dibuka. Backend harus menyediakan endpoint `/auth/login`, `/auth/register`, `/auth/request-register-otp`, `/auth/register/session`, dan `/auth/profile` (header `Authorization: Bearer <token>`), serta mengizinkan origin frontend lewat CORS.

## Perintah

```bash
pnpm dev     # development server
pnpm lint    # ESLint
pnpm build   # production build
pnpm start   # jalankan hasil build
```

Jalankan `pnpm lint` dan `pnpm build` sebelum membuat pull request.

## Catatan

- Data tim dan kompetisi sebagian masih dari `src/data/`; perlu diganti dengan request API.
- Perubahan kontrak backend disesuaikan di `src/app/api/` dan `src/lib/auth.ts`.

## Deployment

Atur ketiga environment variable wajib untuk production, lalu:

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```
