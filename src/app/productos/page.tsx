import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductsCatalogClient } from "@/components/ProductsCatalogClient";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Explora nuestro catalogo de pisos, azulejos, ceramicas, fachaletas, porcelanato y duelas en Santa Tecla, La Libertad y todo El Salvador.",
  alternates: {
    canonical: "/productos"
  }
};

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = [...new Set(products.map((product) => product.category))].sort((a, b) =>
    a.localeCompare(b, "es")
  );

  return (
    <main className="container page-shell">
      <Suspense fallback={null}>
        <ProductsCatalogClient products={products} categories={categories} />
      </Suspense>
    </main>
  );
}
