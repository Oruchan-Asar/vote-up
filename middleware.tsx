import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const isLoggedIn = cookies.get("user-info") !== null;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  } else if (
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register")
  ) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login/:path*", "/register/:path*", "/topic/:path*"],
};
