import Image from "next/image";
import Link from "next/link";

import { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
      </div>

      <div className="product-card__content">
        <p className="product-card__category">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="product-card__meta">
          <span>{product.brand}</span>
          <span>{product.size}</span>
          <span>${product.price.toFixed(2)}/caja</span>
        </div>

        <Link className="button button--secondary" href={`/productos/${product.slug}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
