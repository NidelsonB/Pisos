import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Lang } from "@/components/LanguageToggle";
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
          <p className="eyebrow">
            <Lang es={content.about.heroEyebrow} en="About us" />
          </p>
          <h1>
            <Lang
              es={content.about.heroTitle}
              en="We are direct distributors and importers of quality flooring and ceramic tile."
            />
          </h1>
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
          <p className="eyebrow">
            <Lang es={content.about.storySubtitle} en="Our story" />
          </p>
          <h2>
            <Lang
              es={content.about.storyTitle}
              en="For more than 30 years, we have served customers with care, transparency and fair prices."
            />
          </h2>
          <p>
            <Lang
              es="Pisos Las Delicias nace para poner a su disposicion productos de calidad a un precio razonable."
              en="Pisos Las Delicias was created to offer quality products at reasonable prices."
            />
          </p>
          <p>
            <Lang
              es="Hemos establecido alianzas comerciales con marcas prestigiosas para ofrecer una amplia gama de opciones."
              en="We have built partnerships with trusted brands to offer a broad range of options."
            />
          </p>
        </div>
      </section>

      <section className="container section info-band">
        <div>
          <p className="eyebrow">
            <Lang es={content.about.valuesEyebrow} en="Our values" />
          </p>
          <h2>
            <Lang es={content.about.valuesTitle} en="We are your allies in every decision." />
          </h2>
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
            <p className="eyebrow">
              <Lang es="Cotizacion rapida" en="Fast quotes" />
            </p>
            <h2>
              <Lang es="Hablemos de su proyecto." en="Let us talk about your project." />
            </h2>
            <p>
              <Lang
                es="Atencion directa para pisos, azulejos, fachaletas, duelas y porcelanato."
                en="Direct service for flooring, wall tile, veneers, planks and porcelain tile."
              />
            </p>
          </div>
          <div className="cta-panel__actions">
            <Link className="button button--primary" href="/productos">
              <Lang es="Ver productos" en="View products" />
            </Link>
            <Link className="button button--ghost-light" href="/contacto">
              <Lang es="Contacto" en="Contact" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
