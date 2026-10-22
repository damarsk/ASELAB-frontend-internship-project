const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

function plural(value: number, unit: string) {
  return `${value} ${unit} lalu`;
}

/**
 * Format waktu relatif berurutan dari unit terbesar:
 * tahun > bulan > minggu > hari > jam > menit.
 */
export function formatRelativeTime(createdAt: string | Date): string {
  const date = createdAt instanceof Date ? createdAt : new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";

  const diff = Date.now() - date.getTime();
  if (diff < MINUTE) return "Baru saja";

  if (diff < HOUR) return plural(Math.floor(diff / MINUTE), "menit");
  if (diff < DAY) return plural(Math.floor(diff / HOUR), "jam");
  if (diff < WEEK) return plural(Math.floor(diff / DAY), "hari");
  if (diff < MONTH) return plural(Math.floor(diff / WEEK), "minggu");
  if (diff < YEAR) return plural(Math.floor(diff / MONTH), "bulan");
  return plural(Math.floor(diff / YEAR), "tahun");
}
