import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ADMIN_COOKIE_NAME, getAdminCredentials } from "@/lib/auth";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (token !== getAdminCredentials().token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"]
};
