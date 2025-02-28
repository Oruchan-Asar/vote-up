import { NextResponse } from "next/server";

export async function middleware() {
  // For now, we'll just let all requests through
  // In a real app, you would implement your own authentication check here
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login/:path*", "/register/:path*"],
};
