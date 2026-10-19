"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const galleryImages = [
  { src: "/1.jpg", alt: "Kolaborasi tim dalam kompetisi" },
  { src: "/2.jpg", alt: "Tim berdiskusi mengembangkan ide" },
  { src: "/3.jpg", alt: "Mahasiswa bekerja bersama dalam tim" },
];

export default function AuthImageGallery() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % galleryImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      {galleryImages.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            activeImage === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
