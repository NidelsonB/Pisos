import { Suspense } from "react";

import { CatalogRedirectClient } from "@/app/catalogo/CatalogRedirectClient";

export default function CatalogRedirectPage() {
  return (
    <Suspense fallback={null}>
      <CatalogRedirectClient />
    </Suspense>
  );
}
