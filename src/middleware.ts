import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./services/Auth";

// Define role-based routes
const roleBasedRoutes = {
  political: [/^\/political/],
  admin: [/^\/admin/],
};

type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();
 
  if (!user && (pathname.startsWith("/admin") || pathname.startsWith("/political"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
 
  if (user && (pathname.startsWith("/admin") || pathname.startsWith("/political"))) {
    if (user?.role) {
      const allowedRoutes = roleBasedRoutes[user?.role as Role];

      // Allow access if user's role matches
      if (allowedRoutes && allowedRoutes.some((route) => pathname.match(route))) {
        return NextResponse.next();
      }
    }
 
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Allow access to all other routes
  return NextResponse.next();
}

// Configuration for matching paths
export const config = {
  matcher: ["/admin/:path*", "/political/:path*"],
};
