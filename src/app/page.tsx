import Image from "next/image";
import Link from "next/link";

import { HomeHeroSlider } from "@/components/HomeHeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";
import { getSiteContent } from "@/lib/site-content";
import { siteConfig } from "@/lib/site";

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
    sameAs: [content.business.whatsappUrl]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <HomeHeroSlider slides={content.home.heroPromos} />

      <section className="container section">
        <div className="section-heading">
          <p className="eyebrow">{content.home.introTitle}</p>
          <h2>{content.home.introDescription}</h2>
        </div>

        <div className="category-grid">
          {content.home.categoryCards.map((item) => (
            <Link key={item.id} href={item.href} className="category-card">
              <div className="category-card__image">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 30vw" />
              </div>
              <div className="category-card__content">
                <p>{item.eyebrow}</p>
                <strong>{item.title}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container cta-panel">
          <div>
            <p className="eyebrow">{content.cta.eyebrow}</p>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.description}</p>
          </div>

          <div className="cta-panel__actions">
            <a
              className="button button--primary"
              href={content.cta.primaryHref}
              target={content.cta.primaryHref.startsWith("http") ? "_blank" : undefined}
              rel={content.cta.primaryHref.startsWith("http") ? "noreferrer" : undefined}
            >
              {content.cta.primaryLabel}
            </a>
            <Link className="button button--ghost-light" href={content.cta.secondaryHref}>
              {content.cta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Catalogo destacado</p>
            <h2>Productos listos para cotizacion inmediata.</h2>
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
          <p className="eyebrow">{content.home.storyEyebrow}</p>
          <h2>{content.home.storyTitle}</h2>
          <p className="story-band__subtitle">{content.home.storySubtitle}</p>
          {content.home.storyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="hero-actions story-band__actions">
            <Link className="button button--secondary" href="/quienes-somos">
              Conocer mas
            </Link>
          </div>
        </div>

        <div className="story-gallery">
          {content.home.storyGalleryImages.map((image, index) => (
            <div key={image} className={`story-gallery__item story-gallery__item--${index + 1}`}>
              <Image
                src={image}
                alt={`Galeria Pisos Las Delicias ${index + 1}`}
                fill
                sizes="(max-width: 980px) 100vw, 26vw"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
