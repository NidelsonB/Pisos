import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/auth";
import { deleteProduct, saveProduct } from "@/lib/products";
import { ProductInput } from "@/lib/types";

export const runtime = "nodejs";

function revalidateProductRoutes(slug?: string) {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/contacto");
  revalidatePath("/productos");
  revalidatePath("/quienes-somos");
  revalidatePath("/admin/dashboard");

  if (slug) {
    revalidatePath(`/productos/${slug}`);
  }
}

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = (await request.json()) as ProductInput;
  const product = await saveProduct(body);
  revalidateProductRoutes(product.slug);

  return NextResponse.json(product);
}

export async function DELETE(request: Request) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = (await request.json()) as { id?: string };

  if (!id) {
    return NextResponse.json({ error: "Producto inválido" }, { status: 400 });
  }

  await deleteProduct(id);
  revalidateProductRoutes();

  return NextResponse.json({ ok: true });
}
