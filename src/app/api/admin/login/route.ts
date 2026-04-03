import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_COOKIE_NAME, getAdminCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const credentials = getAdminCredentials();

  if (username !== credentials.username || password !== credentials.password) {
    return NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, credentials.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return NextResponse.redirect(new URL("/admin/dashboard", request.url), { status: 303 });
}
