import Image from "next/image";
import Link from "next/link";

import { Lang, LanguageSwitch } from "@/components/LanguageToggle";
import { getSiteContent } from "@/lib/site-content";
import { withBasePath } from "@/lib/paths";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Inicio", labelEn: "Home" },
  { href: "/productos", label: "Productos", labelEn: "Products" },
  { href: "/quienes-somos", label: "Quienes Somos", labelEn: "About" },
  { href: "/contacto", label: "Contacto", labelEn: "Contact" },
  { href: siteConfig.adminPath, label: "Administrador", labelEn: "Admin" }
];

export async function Header() {
  const content = await getSiteContent();

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container top-strip__inner">
          <span>
            <Lang
              es={content.business.topStripText}
              en="More than 30 years serving our customers."
            />
          </span>
          <a href={content.business.whatsappUrl} target="_blank" rel="noreferrer">
            <Lang es={content.business.topStripLinkLabel} en="Shop here" />
          </a>
        </div>
      </div>

      <div className="container header-shell">
        <Link href="/" className="brand-mark" aria-label={siteConfig.name}>
          <Image
            src={withBasePath("/uploads/2022/11/logo-pisos-horizontal-small-2.png")}
            alt={siteConfig.name}
            width={292}
            height={104}
            priority
          />
        </Link>

        <nav className="main-nav" aria-label="Principal">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Lang es={link.label} en={link.labelEn} />
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSwitch />
          <a
            className="button button--primary"
            href={content.business.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            {content.business.headerButtonLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
