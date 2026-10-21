import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * CV hanya bisa diunduh oleh pemilik akun (lewat /api/auth/profile/cv)
 * atau oleh leader yang memiliki Join Request berstatus PENDING dari
 * pemilik CV. Aturan ini ditegakkan di backend, proxy hanya meneruskan.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const backendBaseUrl =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;
  const { id } = await params;

  if (!Number.isSafeInteger(Number(id)) || Number(id) <= 0) {
    return NextResponse.json(
      { error: "ID pengguna tidak valid." },
      { status: 400 },
    );
  }

  if (!backendBaseUrl) {
    return NextResponse.json(
      { message: "Backend URL is not configured" },
      { status: 500 },
    );
  }

  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const authorization =
    request.headers.get("authorization") ??
    (nextAuthToken?.backendToken
      ? `Bearer ${nextAuthToken.backendToken}`
      : null);

  if (!authorization) {
    return NextResponse.json(
      { error: "Sesi login tidak ditemukan." },
      { status: 401 },
    );
  }

  try {
    const response = await fetch(`${backendBaseUrl}/auth/profile/${id}/cv`, {
      method: "GET",
      headers: { Authorization: authorization },
      cache: "no-store",
    });

    if (response.ok) {
      return new NextResponse(await response.arrayBuffer(), {
        status: response.status,
        headers: {
          "Content-Type":
            response.headers.get("content-type") || "application/pdf",
          "Content-Disposition":
            response.headers.get("content-disposition") ||
            'attachment; filename="CV.pdf"',
        },
      });
    }

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Backend service is currently unavailable" },
      { status: 503 },
    );
  }
}
