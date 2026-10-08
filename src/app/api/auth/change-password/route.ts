import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

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

  try {
    const body = await request.text();
    const response = await fetch(`${backendBaseUrl}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
      body,
    });
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
