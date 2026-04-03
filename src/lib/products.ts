import { promises as fs } from "fs";
import path from "path";

import { Product, ProductInput } from "@/lib/types";

const dataFile = path.join(process.cwd(), "data", "products.json");

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeKeywords(value: string[] | string) {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function readProductsFile() {
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw) as Product[];
}

async function writeProductsFile(products: Product[]) {
  await fs.writeFile(dataFile, JSON.stringify(products, null, 2), "utf8");
}

export async function getProducts() {
  const products = await readProductsFile();
  return products.sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  return products.filter((product) => product.featured).slice(0, 4);
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export async function getCatalogStats() {
  const products = await getProducts();

  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const categories = [...new Set(products.map((product) => product.category))];
  const brands = [...new Set(products.map((product) => product.brand))];

  return {
    totalProducts: products.length,
    totalStock,
    totalCategories: categories.length,
    totalBrands: brands.length
  };
}

export async function saveProduct(input: ProductInput) {
  const products = await getProducts();
  const slug = normalizeSlug(input.slug || input.name);

  const product: Product = {
    ...input,
    id: input.id ?? crypto.randomUUID(),
    slug,
    keywords: normalizeKeywords(input.keywords),
    gallery: input.gallery?.length ? input.gallery : [input.image],
    updatedAt: new Date().toISOString()
  };

  const existingIndex = products.findIndex((item) => item.id === product.id);

  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.push(product);
  }

  await writeProductsFile(products);

  return product;
}

export async function deleteProduct(id: string) {
  const products = await getProducts();
  const nextProducts = products.filter((product) => product.id !== id);
  await writeProductsFile(nextProducts);
}
