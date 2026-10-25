import { decodeJwt } from "jose";

/**
 * Cek apakah JWT sudah expired.
 * Return true kalau expired atau tidak valid.
 */
export function isJwtExpired(token: string): boolean {
  try {
    const payload = decodeJwt(token);
    if (!payload.exp) return true;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp <= nowInSeconds;
  } catch {
    return true;
  }
}
