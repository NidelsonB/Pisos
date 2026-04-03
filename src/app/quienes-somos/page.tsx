import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Quienes Somos",
  description:
    "Conoce la historia de Pisos Las Delicias, distribuidores e importadores directos de pisos, azulejos y ceramica en Santa Tecla, La Libertad.",
  alternates: {
    canonical: "/quienes-somos"
  }
};

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <main>
      <section className="page-hero">
        <Image
          src={content.about.heroImage}
          alt="Quienes somos Pisos Las Delicias"
          fill
          sizes="100vw"
        />
        <div className="container page-hero__content">
          <p className="eyebrow">{content.about.heroEyebrow}</p>
          <h1>{content.about.heroTitle}</h1>
        </div>
      </section>

      <section className="container story-band page-shell">
        <div className="story-band__media story-band__media--tall">
          <Image
            src={content.about.storyImage}
            alt="Showroom y productos de Pisos Las Delicias"
            fill
            sizes="(max-width: 980px) 100vw, 35vw"
          />
        </div>
        <div className="story-band__content">
          <p className="eyebrow">{content.about.storySubtitle}</p>
          <h2>{content.about.storyTitle}</h2>
          {content.about.storyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="container section info-band">
        <div>
          <p className="eyebrow">{content.about.valuesEyebrow}</p>
          <h2>{content.about.valuesTitle}</h2>
        </div>
        <div className="info-band__grid">
          {content.about.values.map((value) => (
            <article key={value.id}>
              <strong>{value.title}</strong>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container cta-panel">
          <div>
            <p className="eyebrow">Cotizacion rapida</p>
            <h2>Hablemos de su proyecto.</h2>
            <p>Atencion directa para pisos, azulejos, fachaletas, duelas y porcelanato.</p>
          </div>
          <div className="cta-panel__actions">
            <Link className="button button--primary" href="/productos">
              Ver productos
            </Link>
            <Link className="button button--ghost-light" href="/contacto">
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
