import { redirect } from "next/navigation";

import { AdminDashboardClient } from "@/app/admin/dashboard/AdminDashboardClient";
import { isAdminAuthenticated, isGitHubPagesBuild } from "@/lib/auth";
import { getProducts } from "@/lib/products";
import { getSiteContent } from "@/lib/site-content";

export default async function AdminDashboardPage() {
  const [products, siteContent] = await Promise.all([getProducts(), getSiteContent()]);

  if (isGitHubPagesBuild()) {
    return (
      <main className="container page-shell">
        <section className="page-heading">
          <p className="eyebrow">Panel administrador</p>
          <h1>Editor local del sitio en GitHub Pages.</h1>
          <p>
            GitHub Pages no ejecuta servidor, por eso los cambios se guardan solo en este
            navegador. Para publicar cambios para todos, hay que actualizar los archivos del
            repositorio o usar un despliegue con servidor.
          </p>
        </section>

        <AdminDashboardClient initialProducts={products} initialContent={siteContent} staticMode />
      </main>
    );
  }

  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin");
  }

  return (
    <main className="container page-shell">
      <section className="page-heading">
        <p className="eyebrow">Panel administrador</p>
        <h1>Control de catalogo, inventario e imagenes.</h1>
        <p>
          Este panel vive dentro del mismo sitio y esta pensado para que el negocio pueda crecer
          sin depender de cambios manuales en codigo para cada producto nuevo o para cada banner.
        </p>
      </section>

      <AdminDashboardClient initialProducts={products} initialContent={siteContent} />
    </main>
  );
}
