import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = request.headers.get("authorization");
  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`;
  const res = await fetch(backendUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ?? "",
    },
  });
  const data = await res.text();
  return new NextResponse(data, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") || "application/json",
    },
  });
}
