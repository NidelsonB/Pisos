import Link from "next/link";

import { getSiteContent } from "@/lib/site-content";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const content = await getSiteContent();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{siteConfig.name}</p>
          <p>{content.business.footerDescription}</p>
        </div>

        <div>
          <p className="footer-title">Navegacion</p>
          <div className="footer-links">
            <Link href="/">Inicio</Link>
            <Link href="/productos">Productos</Link>
            <Link href="/quienes-somos">Quienes Somos</Link>
            <Link href="/contacto">Contacto</Link>
            <Link href="/admin">Administrador</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">Contacto</p>
          <div className="footer-links">
            <a href={content.business.whatsappUrl} target="_blank" rel="noreferrer">
              {content.business.phone} / {content.business.secondaryPhone}
            </a>
            <a href={`mailto:${content.business.email}`}>{content.business.email}</a>
            <span>{content.business.address}</span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>{content.footer.copyright}</p>
      </div>
    </footer>
  );
}
