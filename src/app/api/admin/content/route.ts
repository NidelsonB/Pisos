import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/site-content";
import { SiteContent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-static";

function revalidateContentRoutes() {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/contacto");
  revalidatePath("/productos");
  revalidatePath("/quienes-somos");
  revalidatePath("/admin/dashboard");
}

export async function GET() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = (await request.json()) as SiteContent;
  const content = await saveSiteContent(body);
  revalidateContentRoutes();

  return NextResponse.json(content);
}
