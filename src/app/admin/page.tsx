import { redirect } from "next/navigation";

import { isAdminAuthenticated } from "@/lib/auth";
import { siteConfig } from "@/lib/site";

export default async function AdminLoginPage() {
  const authenticated = await isAdminAuthenticated();

  if (authenticated) {
    redirect("/admin/dashboard");
  }

  return (
    <main className="admin-auth">
      <section className="admin-auth__card">
        <p className="eyebrow">Administrador web</p>
        <h1>Acceso al panel del sitio</h1>
        <p>
          Desde aqui puedes controlar banners, productos, precios, imagenes, categorias destacadas
          y el contenido visible en la pagina publica.
        </p>

        <form className="admin-form" method="post" action="/api/admin/login">
          <label>
            Usuario
            <input name="username" type="text" placeholder="admin" required />
          </label>

          <label>
            Contrasena
            <input name="password" type="password" placeholder="********" required />
          </label>

          <button className="button button--primary" type="submit">
            Ingresar
          </button>
        </form>

        <p className="admin-note">
          Credenciales por defecto para esta base inicial: <strong>{siteConfig.defaultAdminUser}</strong> /{" "}
          <strong>{siteConfig.defaultAdminPassword}</strong>. Cambialas con las variables de entorno{" "}
          <code>ADMIN_USERNAME</code>, <code>ADMIN_PASSWORD</code> y <code>ADMIN_SESSION_TOKEN</code>.
        </p>
      </section>
    </main>
  );
}
