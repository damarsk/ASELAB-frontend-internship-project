import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`;
  const body = await request.text();
  const res = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await res.text();
  return new NextResponse(data, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") || "application/json",
    },
  });
}
