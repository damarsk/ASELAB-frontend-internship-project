import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendBaseUrl) {
    return NextResponse.json(
      { message: "Backend URL is not configured" },
      { status: 500 },
    );
  }

  const authorization =
    request.headers.get("authorization") ??
    (request.cookies.get("token")?.value
      ? `Bearer ${request.cookies.get("token")?.value}`
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
  } catch (error) {
    return NextResponse.json(
      { message: "Backend service is currently unavailable" },
      { status: 503 },
    );
  }
}
