import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

type ProductsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const selectedCategory = typeof params.categoria === "string" ? params.categoria : "";

  if (!selectedCategory) {
    return {
      title: "Productos",
      description:
        "Explora nuestro catálogo de pisos, azulejos, cerámicas, fachaletas, porcelanato y duelas en Santa Tecla, La Libertad y todo El Salvador.",
      alternates: {
        canonical: "/productos"
      }
    };
  }

  return {
    title: `${selectedCategory} en El Salvador`,
    description: `Cotiza ${selectedCategory.toLowerCase()} en El Salvador con Pisos Las Delicias. Inventario, precios y asesoría rápida desde Santa Tecla.`,
    alternates: {
      canonical: `/productos?categoria=${encodeURIComponent(selectedCategory)}`
    }
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = (await searchParams) ?? {};
  const selectedCategory = typeof params.categoria === "string" ? params.categoria : "";
  const products = await getProducts();
  const categories = [...new Set(products.map((product) => product.category))].sort((a, b) =>
    a.localeCompare(b, "es")
  );

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <main className="container page-shell">
      <section className="page-heading">
        <p className="eyebrow">Productos</p>
        <h1>Pisos y azulejos para todos sus ambientes.</h1>
        <p>
          Mostrando {filteredProducts.length} producto{filteredProducts.length === 1 ? "" : "s"}
          {selectedCategory ? ` en ${selectedCategory}` : " disponibles"}.
        </p>
      </section>

      <div className="filter-row">
        <Link className={!selectedCategory ? "filter-pill is-active" : "filter-pill"} href="/productos">
          Ver todos
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            className={selectedCategory === category ? "filter-pill is-active" : "filter-pill"}
            href={`/productos?categoria=${encodeURIComponent(category)}`}
          >
            {category}
          </Link>
        ))}
      </div>

      <div className="products-grid products-grid--catalog">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
