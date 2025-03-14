import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname.startsWith("/auth");
  const isAdminPath = pathname.startsWith("/admin");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(
        new URL(token.role === "admin" ? "/admin/dashboard" : "/", request.url)
      );
    }
    return NextResponse.next();
  }

  if (isAdminPath) {
    if (!token) {
      const redirectUrl = new URL("/auth/signin", request.url);
      redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    if (token && token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
  }

  // Handle non-authenticated users
  if (!token) {
    const redirectUrl = new URL("/auth/signin", request.url);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect admin users to dashboard if they try to access non-admin pages
  if (token.role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/auth/:path*", "/admin/:path*"],
};
