import Image from "next/image";
import { useState } from "react";
import { resolveProfileImageUrl } from "@/src/lib/profile-image";

/**
 * Avatar profil publik dengan fallback ke `unknown.jpg` ketika foto profil
 * tidak tersedia atau gagal dimuat.
 */
export default function ProfileAvatar({
  name,
  imageUrl,
  size = 112,
  className = "",
}: {
  name: string;
  imageUrl?: string | null;
  size?: number;
  className?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  // `resolveProfileImageUrl` sudah mengembalikan "/unknown.jpg" saat kosong.
  const src = imageFailed ? "/unknown.jpg" : resolveProfileImageUrl(imageUrl);

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-background-muted ring-4 ring-white ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={`Foto profil ${name}`}
        width={size}
        height={size}
        unoptimized
        loading="eager"
        className="h-full w-full object-cover"
        onError={() => setImageFailed(true)}
      />
    </div>
  );
}
