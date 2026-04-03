import Image from "next/image";
import Link from "next/link";

import { getSiteContent } from "@/lib/site-content";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/quienes-somos", label: "Quienes Somos" },
  { href: "/contacto", label: "Contacto" },
  { href: siteConfig.adminPath, label: "Administrador" }
];

export async function Header() {
  const content = await getSiteContent();

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container top-strip__inner">
          <span>{content.business.topStripText}</span>
          <a href={content.business.whatsappUrl} target="_blank" rel="noreferrer">
            {content.business.topStripLinkLabel}
          </a>
        </div>
      </div>

      <div className="container header-shell">
        <Link href="/" className="brand-mark" aria-label={siteConfig.name}>
          <Image
            src="/uploads/2022/11/logo-pisos-horizontal-small-2.png"
            alt={siteConfig.name}
            width={292}
            height={104}
            priority
          />
        </Link>

        <nav className="main-nav" aria-label="Principal">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          className="button button--primary"
          href={content.business.whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          {content.business.headerButtonLabel}
        </a>
      </div>
    </header>
  );
}
