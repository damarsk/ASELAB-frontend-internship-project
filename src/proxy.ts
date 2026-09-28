import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secret = process.env.NEXTAUTH_SECRET;
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (secret && (pathname === "/login" || pathname.startsWith("/register"))) {
    const token = await getToken({ req: request, secret });

    if (
      token?.backendToken &&
      backendBaseUrl &&
      (await isBackendTokenValid(backendBaseUrl, token.backendToken))
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (token?.backendToken) {
      return clearSessionCookies(NextResponse.next());
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!secret || !backendBaseUrl) {
      return redirectToLogin(request, pathname);
    }

    try {
      const token = await getToken({ req: request, secret });

      if (!token?.backendToken) {
        return redirectToLogin(request, pathname);
      }

      if (!(await isBackendTokenValid(backendBaseUrl, token.backendToken))) {
        throw new Error("Token invalid");
      }
    } catch {
      return clearSessionCookies(redirectToLogin(request, pathname));
    }
  }

  return NextResponse.next();
}

async function isBackendTokenValid(
  backendBaseUrl: string,
  backendToken: string,
) {
  try {
    const response = await fetch(`${backendBaseUrl}/auth/profile`, {
      headers: { Authorization: `Bearer ${backendToken}` },
      signal: AbortSignal.timeout(5000),
    });

    return response.ok;
  } catch {
    return false;
  }
}

function clearSessionCookies(response: NextResponse) {
  response.cookies.delete("next-auth.session-token");
  response.cookies.delete("__Secure-next-auth.session-token");
  return response;
}

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirectTo", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register/:path*"],
};
