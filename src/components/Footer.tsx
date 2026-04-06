import Link from "next/link";

import { Lang } from "@/components/LanguageToggle";
import { getSiteContent } from "@/lib/site-content";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const content = await getSiteContent();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{siteConfig.name}</p>
          <p>
            <Lang
              es={content.business.footerDescription}
              en="Direct distributors and importers of flooring, ceramic tile, wall tile, porcelain and stone veneers for residential and commercial projects in El Salvador."
            />
          </p>
        </div>

        <div>
          <p className="footer-title">
            <Lang es="Navegacion" en="Navigation" />
          </p>
          <div className="footer-links">
            <Link href="/"><Lang es="Inicio" en="Home" /></Link>
            <Link href="/productos"><Lang es="Productos" en="Products" /></Link>
            <Link href="/quienes-somos"><Lang es="Quienes Somos" en="About" /></Link>
            <Link href="/contacto"><Lang es="Contacto" en="Contact" /></Link>
            <Link href="/admin"><Lang es="Administrador" en="Admin" /></Link>
          </div>
        </div>

        <div>
          <p className="footer-title">
            <Lang es="Contacto" en="Contact" />
          </p>
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
        <p>
          <Lang
            es={content.footer.copyright}
            en="Pisos Las Delicias, 2026. All rights reserved."
          />
        </p>
      </div>
    </footer>
  );
}
