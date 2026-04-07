import type { MetadataRoute } from "next";

import { getProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/productos",
    "/catalogo",
    "/quienes-somos",
    "/contacto"
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/productos/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly",
    priority: 0.75
  }));

  return [...staticRoutes, ...productRoutes];
}
