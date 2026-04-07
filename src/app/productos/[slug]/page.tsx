import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductBySlug, getProducts } from "@/lib/products";
import { withBasePath } from "@/lib/paths";
import { siteConfig } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado"
    };
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: product.keywords,
    alternates: {
      canonical: `/productos/${product.slug}`
    },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      images: [
        {
          url: product.image,
          alt: product.name
        }
      ]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`${siteConfig.url}${product.image}`],
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${siteConfig.url}/productos/${product.slug}`
    }
  };

  return (
    <main className="container product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="product-page__media">
        <Image src={withBasePath(product.image)} alt={product.name} fill sizes="(max-width: 900px) 100vw, 50vw" />
      </div>

      <div className="product-page__content">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="product-page__lead">{product.description}</p>

        <div className="product-page__price">
          <strong>${product.price.toFixed(2)}</strong>
          <small>por caja</small>
        </div>

        <div className="product-specs">
          <span>Marca: {product.brand}</span>
          <span>Formato: {product.size}</span>
          <span>Acabado: {product.finish}</span>
          <span>Stock: {product.stock}</span>
          <span>SKU: {product.sku}</span>
        </div>

        <div className="hero-actions">
          <a className="button button--primary" href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
            Solicitar cotización
          </a>
          <Link className="button button--ghost" href="/productos">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
