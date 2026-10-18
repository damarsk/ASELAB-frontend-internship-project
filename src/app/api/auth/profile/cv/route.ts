import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

async function getAuthorization(request: NextRequest) {
  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return (
    request.headers.get("authorization") ??
    (nextAuthToken?.backendToken
      ? `Bearer ${nextAuthToken.backendToken}`
      : null)
  );
}

async function getBackendUrl() {
  const backendBaseUrl =
    process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;

  return backendBaseUrl ? `${backendBaseUrl}/auth/profile/cv` : null;
}

export async function POST(request: NextRequest) {
  return proxyRequest(request, "POST", true);
}

export async function GET(request: NextRequest) {
  return proxyRequest(request, "GET", false);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request, "DELETE", false);
}

async function proxyRequest(
  request: NextRequest,
  method: "POST" | "GET" | "DELETE",
  hasBody: boolean,
) {
  const backendUrl = await getBackendUrl();
  if (!backendUrl) {
    return NextResponse.json(
      { message: "Backend URL is not configured" },
      { status: 500 },
    );
  }

  try {
    const authorization = await getAuthorization(request);
    const response = await fetch(backendUrl, {
      method,
      headers: authorization ? { Authorization: authorization } : undefined,
      body: hasBody ? await request.formData() : undefined,
    });

    if (method === "GET" && response.ok) {
      return new NextResponse(await response.arrayBuffer(), {
        status: response.status,
        headers: {
          "Content-Type":
            response.headers.get("content-type") || "application/pdf",
          "Content-Disposition":
            response.headers.get("content-disposition") || "attachment",
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
