import { promises as fs } from "fs";
import path from "path";

import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo inválido" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
  const uploadPath = path.join(process.cwd(), "public", "uploads", safeFileName);

  await fs.writeFile(uploadPath, bytes);

  return NextResponse.json({ url: `/uploads/${safeFileName}` });
}
