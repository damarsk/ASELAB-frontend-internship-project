import Image from "next/image";
import { useState } from "react";
import { resolveProfileImageUrl } from "@/src/lib/profile-image";

/**
 * Avatar pengguna dengan fallback ke `unknown.jpg` ketika foto profil
 * tidak tersedia atau gagal dimuat.
 */
export default function UserAvatar({
  name,
  imageUrl,
  size = 48,
  className = "",
  imageClassName = "",
}: {
  name: string;
  imageUrl?: string | null;
  size?: number;
  /** Kelas untuk wrapper (mis. rounded-full / rounded-xl). */
  className?: string;
  /** Kelas tambahan untuk elemen gambar. */
  imageClassName?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  // `resolveProfileImageUrl` sudah mengembalikan "/unknown.jpg" saat kosong.
  const src = imageFailed ? "/unknown.jpg" : resolveProfileImageUrl(imageUrl);

  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-background-muted ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={`Foto profil ${name}`}
        width={size}
        height={size}
        unoptimized
        className={`h-full w-full object-cover ${imageClassName}`}
        onError={() => setImageFailed(true)}
      />
    </div>
  );
}
