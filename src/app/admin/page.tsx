import Link from "next/link";
import { redirect } from "next/navigation";

import { isAdminAuthenticated, isGitHubPagesBuild } from "@/lib/auth";
import { siteConfig } from "@/lib/site";

export default async function AdminLoginPage() {
  if (isGitHubPagesBuild()) {
    return (
      <main className="admin-auth">
        <section className="admin-auth__card">
          <p className="eyebrow">Administrador web</p>
          <h1>Administrador en GitHub Pages</h1>
          <p>
            Esta version corre en GitHub Pages, asi que el panel funciona como editor local en el
            navegador. Puedes revisar y preparar cambios, pero para publicarlos globalmente se
            necesita un servidor o actualizar los archivos del repositorio.
          </p>
          <Link className="button button--primary" href="/admin/dashboard">
            Abrir administrador
          </Link>
        </section>
      </main>
    );
  }

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
