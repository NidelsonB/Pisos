import type { Metadata } from "next";
import Link from "next/link";

import { Lang } from "@/components/LanguageToggle";
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
        "Explora nuestro catalogo de pisos, azulejos, ceramicas, fachaletas, porcelanato y duelas en Santa Tecla, La Libertad y todo El Salvador.",
      alternates: {
        canonical: "/productos"
      }
    };
  }

  return {
    title: `${selectedCategory} en El Salvador`,
    description: `Cotiza ${selectedCategory.toLowerCase()} en El Salvador con Pisos Las Delicias. Inventario, precios y asesoria rapida desde Santa Tecla.`,
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
        <p className="eyebrow">
          <Lang es="Productos" en="Products" />
        </p>
        <h1>
          <Lang
            es="Pisos y azulejos para todos sus ambientes."
            en="Flooring and tile for every environment."
          />
        </h1>
        <p>
          <Lang es="Mostrando" en="Showing" /> {filteredProducts.length}{" "}
          <Lang
            es={`producto${filteredProducts.length === 1 ? "" : "s"}`}
            en={`product${filteredProducts.length === 1 ? "" : "s"}`}
          />
          {selectedCategory ? ` ${selectedCategory}` : ""}
          {!selectedCategory ? <Lang es=" disponibles" en=" available" /> : null}.
        </p>
      </section>

      <div className="filter-row">
        <Link className={!selectedCategory ? "filter-pill is-active" : "filter-pill"} href="/productos">
          <Lang es="Ver todos" en="View all" />
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
