import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/token";
import { getErrorResponse } from "./lib/helpers";

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

let redirectToLogin = false;
export async function middleware(req: NextRequest) {
  let token: string | undefined;

  if (req.cookies.has("session_token")) {
    token = req.cookies.get("session_token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  if (req.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin))
    return;

  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/api/users") ||
      req.nextUrl.pathname.startsWith("/api/auth/logout"))
  ) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    );
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ["/", "/login", "/api/users/:path*", "/api/auth/logout"],
};
