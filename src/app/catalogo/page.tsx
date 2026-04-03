import { redirect } from "next/navigation";

type CatalogPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CatalogRedirectPage({ searchParams }: CatalogPageProps) {
  const params = (await searchParams) ?? {};
  const selectedCategory = typeof params.categoria === "string" ? params.categoria : "";

  if (selectedCategory) {
    redirect(`/productos?categoria=${encodeURIComponent(selectedCategory)}`);
  }

  redirect("/productos");
}
