const fallbackProfileImage = "/unknown.jpg";

export function resolveProfileImageUrl(
  imageUrl: string | null | undefined,
): string {
  if (!imageUrl?.trim()) {
    return fallbackProfileImage;
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    return imageUrl;
  }

  try {
    return new URL(imageUrl, backendUrl).toString();
  } catch {
    return fallbackProfileImage;
  }
}
