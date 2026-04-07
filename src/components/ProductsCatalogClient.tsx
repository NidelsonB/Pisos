"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ProductCard } from "@/components/ProductCard";
import { Lang } from "@/components/LanguageToggle";
import { Product } from "@/lib/types";

type ProductsCatalogClientProps = {
  products: Product[];
  categories: string[];
};

export function ProductsCatalogClient({ products, categories }: ProductsCatalogClientProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("categoria") ?? "";
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
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
    </>
  );
}
