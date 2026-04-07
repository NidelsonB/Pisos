import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { HomeHeroSlider } from "@/components/HomeHeroSlider";
import { Lang } from "@/components/LanguageToggle";
import { ProductCard } from "@/components/ProductCard";
import { withBasePath } from "@/lib/paths";
import { getFeaturedProducts } from "@/lib/products";
import { getSiteContent } from "@/lib/site-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pisos y azulejos en El Salvador",
  description:
    "Venta de pisos, azulejos, porcelanato y ceramica en El Salvador. Cotiza por WhatsApp con asesoria para proyectos residenciales y comerciales.",
  alternates: {
    canonical: "/"
  }
};

const categoryCopy: Record<string, { eyebrowEn: string; titleEn: string }> = {
  "cat-azulejos": { eyebrowEn: "Explore our", titleEn: "Wall tiles" },
  "cat-ceramicas": { eyebrowEn: "Explore our", titleEn: "Ceramic tile" },
  "cat-duelas": { eyebrowEn: "Explore our", titleEn: "Wood-look planks" },
  "cat-fachaletas": { eyebrowEn: "Explore our", titleEn: "Stone veneers" },
  "cat-porcelanato": { eyebrowEn: "Explore our", titleEn: "Porcelain tile" },
  "cat-uniblock": { eyebrowEn: "Explore our", titleEn: "UNIBLOCK" }
};

export default async function Home() {
  const [featuredProducts, content] = await Promise.all([
    getFeaturedProducts(),
    getSiteContent()
  ]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    image: `${siteConfig.url}/uploads/2024/03/backdrop-pisos.jpg`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Santa Tecla",
      addressRegion: "La Libertad",
      addressCountry: "SV"
    },
    telephone: content.business.phone,
    url: siteConfig.url,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude
    },
    sameAs: [content.business.whatsappUrl],
    areaServed: [
      { "@type": "Country", name: "El Salvador" },
      { "@type": "City", name: "Santa Tecla" },
      { "@type": "City", name: "San Salvador" }
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Pisos" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Azulejos" } },
      { "@type": "Offer", itemOffered: { "@type": "Product", name: "Porcelanato" } }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Venden pisos y azulejos para todo El Salvador?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Atendemos clientes de Santa Tecla, San Salvador y proyectos en todo El Salvador con asesoria personalizada."
        }
      },
      {
        "@type": "Question",
        name: "Puedo cotizar por WhatsApp?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Puedes compartir medidas, fotos o referencias y te enviamos una cotizacion rapida."
        }
      },
      {
        "@type": "Question",
        name: "Que tipos de revestimiento tienen disponibles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Contamos con pisos, porcelanato, ceramica, azulejos, duelas y fachaletas para vivienda y comercio."
        }
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HomeHeroSlider slides={content.home.heroPromos} />

      <section className="container section">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">
              <Lang es="Colecciones seleccionadas" en="Curated collections" />
            </p>
            <h2>
              <Lang
                es="Superficies con presencia para hogares y proyectos comerciales."
                en="Statement surfaces for homes and commercial projects."
              />
            </h2>
          </div>
          <p>
            <Lang
              es="Un catalogo moderno con pisos, azulejos, porcelanato y acabados que elevan cada ambiente sin perder funcionalidad."
              en="A modern catalog of flooring, wall tile, porcelain and finishes that elevate every room while staying practical."
            />
          </p>
        </div>

        <div className="category-grid">
          {content.home.categoryCards.map((item) => {
            const translated = categoryCopy[item.id];

            return (
              <Link key={item.id} href={item.href} className="category-card">
                <div className="category-card__image">
                  <Image src={withBasePath(item.image)} alt={item.title} fill sizes="(max-width: 768px) 100vw, 30vw" />
                </div>
                <div className="category-card__content">
                  <p>
                    <Lang es={item.eyebrow} en={translated?.eyebrowEn ?? "Explore"} />
                  </p>
                  <strong>
                    <Lang es={item.title} en={translated?.titleEn ?? item.title} />
                  </strong>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="modern-proof-grid">
          <article>
            <strong>
              <Lang es="+30 anos" en="30+ years" />
            </strong>
            <p>
              <Lang
                es="Experiencia real en venta de pisos y revestimientos en El Salvador."
                en="Real experience in flooring and surface finishes across El Salvador."
              />
            </p>
          </article>
          <article>
            <strong>
              <Lang es="Asesoria experta" en="Expert guidance" />
            </strong>
            <p>
              <Lang
                es="Te guiamos por estilo, uso, trafico y presupuesto para comprar mejor."
                en="We guide you by style, use, foot traffic and budget so you can buy with confidence."
              />
            </p>
          </article>
          <article>
            <strong>
              <Lang es="Cotizacion rapida" en="Fast quotes" />
            </strong>
            <p>
              <Lang
                es="Respuesta agil por WhatsApp para no detener tu proyecto."
                en="Quick WhatsApp support so your project keeps moving."
              />
            </p>
          </article>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container cta-panel">
          <div>
            <p className="eyebrow">
              <Lang es={content.cta.eyebrow} en="Quote online" />
            </p>
            <h2>
              <Lang es={content.cta.title} en="Need help choosing the right surface?" />
            </h2>
            <p>
              <Lang
                es={content.cta.description}
                en="Our team can help you compare formats, finishes and options for construction or remodeling projects."
              />
            </p>
          </div>

          <div className="cta-panel__actions">
            <a
              className="button button--primary"
              href={content.cta.primaryHref}
              target={content.cta.primaryHref.startsWith("http") ? "_blank" : undefined}
              rel={content.cta.primaryHref.startsWith("http") ? "noreferrer" : undefined}
            >
              <Lang es={content.cta.primaryLabel} en="Quote online now" />
            </a>
            <Link className="button button--ghost-light" href={content.cta.secondaryHref}>
              <Lang es={content.cta.secondaryLabel} en="Contact us" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">
              <Lang es="Catalogo destacado" en="Featured catalog" />
            </p>
            <h2>
              <Lang
                es="Productos listos para cotizacion inmediata."
                en="Products ready for a quick quote."
              />
            </h2>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container section story-band story-band--gallery">
        <div className="story-band__content">
          <p className="eyebrow">
            <Lang es={content.home.storyEyebrow} en="Our story" />
          </p>
          <h2>
            <Lang
              es={content.home.storyTitle}
              en="More than 30 years helping customers choose better surfaces."
            />
          </h2>
          <p className="story-band__subtitle">
            <Lang es={content.home.storySubtitle} en="Careful service, clear advice and fair prices." />
          </p>
          <p>
            <Lang
              es="En Pisos Las Delicias combinamos experiencia, asesoria y variedad para ayudarte a escoger el producto correcto para cada espacio."
              en="At Pisos Las Delicias, we combine experience, guidance and variety to help you choose the right product for every space."
            />
          </p>
          <p>
            <Lang
              es="Nuestro showroom y catalogo acercan opciones actuales para remodelaciones, obra nueva y negocios."
              en="Our showroom and catalog bring current options closer for remodeling, new construction and businesses."
            />
          </p>

          <div className="hero-actions story-band__actions">
            <Link className="button button--secondary" href="/quienes-somos">
              <Lang es="Conocer mas" en="Learn more" />
            </Link>
          </div>
        </div>

        <div className="story-gallery">
          {content.home.storyGalleryImages.map((image, index) => (
            <div key={image} className={`story-gallery__item story-gallery__item--${index + 1}`}>
              <Image
                src={withBasePath(image)}
                alt={`Galeria Pisos Las Delicias ${index + 1}`}
                fill
                sizes="(max-width: 980px) 100vw, 26vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="seo-band">
          <p className="eyebrow">
            <Lang es="Cobertura nacional" en="National coverage" />
          </p>
          <h3>
            <Lang
              es="Tu aliado para venta de pisos y azulejos en El Salvador."
              en="Your partner for flooring and tile in El Salvador."
            />
          </h3>
          <p>
            <Lang
              es="Atendemos proyectos residenciales y comerciales con asesoria experta, precios de importador y acompaniamiento desde la eleccion del producto hasta la cotizacion."
              en="We support residential and commercial projects with expert guidance, importer pricing and support from product selection to quote."
            />
          </p>
          <ul>
            <li>
              <Lang
                es="Cotizacion inmediata por WhatsApp para acelerar tu compra."
                en="Immediate WhatsApp quotes to speed up your purchase."
              />
            </li>
            <li>
              <Lang
                es="Variedad de estilos modernos en porcelanato, ceramica y azulejos decorativos."
                en="A variety of modern styles in porcelain, ceramic and decorative tile."
              />
            </li>
            <li>
              <Lang
                es="Atencion personalizada para remodelaciones, obra nueva y negocios."
                en="Personalized service for remodeling, new construction and businesses."
              />
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
