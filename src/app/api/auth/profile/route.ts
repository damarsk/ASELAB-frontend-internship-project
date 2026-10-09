import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const backendBaseUrl =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;

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
  const backendUrl = `${backendBaseUrl}/auth/profile`;

  try {
    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
    });

    const data = await res.text();

    return new NextResponse(data, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Backend service is currently unavailable" },
      { status: 503 },
    );
  }
}
