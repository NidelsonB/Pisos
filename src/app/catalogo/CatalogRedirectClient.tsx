"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function CatalogRedirectClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("categoria");
  const destination = selectedCategory
    ? `/productos?categoria=${encodeURIComponent(selectedCategory)}`
    : "/productos";

  useEffect(() => {
    router.replace(destination);
  }, [destination, router]);

  return (
    <main className="container page-shell">
      <section className="page-heading">
        <p className="eyebrow">Catalogo</p>
        <h1>Redirigiendo al catalogo de productos.</h1>
        <p>
          Si la redireccion no ocurre automaticamente, abre{" "}
          <Link href={destination}>productos</Link>.
        </p>
      </section>
    </main>
  );
}
