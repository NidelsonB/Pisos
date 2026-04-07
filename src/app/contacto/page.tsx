import type { Metadata } from "next";
import Image from "next/image";

import { Lang } from "@/components/LanguageToggle";
import { withBasePath } from "@/lib/paths";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contacto y Cotizaciones",
  description:
    "Solicita cotizaciones de pisos, azulejos y porcelanato en Santa Tecla, La Libertad. Atencion por WhatsApp, telefono, correo y asesoria comercial.",
  alternates: {
    canonical: "/contacto"
  }
};

export default async function ContactPage() {
  const content = await getSiteContent();

  return (
    <main>
      <section className="page-hero">
        <Image
          src={withBasePath(content.contact.heroImage)}
          alt="Contacto Pisos Las Delicias"
          fill
          sizes="100vw"
        />
        <div className="container page-hero__content">
          <p className="eyebrow">
            <Lang es={content.contact.heroEyebrow} en="Contact" />
          </p>
          <h1>
            <Lang
              es={content.contact.heroTitle}
              en="Contact us for your next remodeling project."
            />
          </h1>
        </div>
      </section>

      <section className="container page-shell">
        <section className="page-heading">
          <p className="eyebrow">
            <Lang es={content.contact.introEyebrow} en="Commercial support" />
          </p>
          <h1>
            <Lang es={content.contact.introTitle} en="It will be our pleasure to help you." />
          </h1>
          <p>
            <Lang
              es={content.contact.introDescription}
              en="We are ready to help with pricing, location, available inventory and guidance for projects in Santa Tecla and across El Salvador."
            />
          </p>
        </section>

        <div className="contact-grid">
          <article className="contact-card">
            <strong>
              <Lang es="Ubicacion" en="Location" />
            </strong>
            <p>{content.business.address}</p>
            <a href={content.business.mapUrl} target="_blank" rel="noreferrer">
              <Lang es="Ver en Google Maps" en="View on Google Maps" />
            </a>
          </article>

          <article className="contact-card">
            <strong>
              <Lang es="WhatsApp y telefono" en="WhatsApp and phone" />
            </strong>
            <p>
              <Lang
                es="Atencion rapida para precios, stock, medidas y opciones recomendadas."
                en="Fast support for prices, stock, sizes and recommended options."
              />
            </p>
            <a href={content.business.whatsappUrl} target="_blank" rel="noreferrer">
              {content.business.phone} / {content.business.secondaryPhone}
            </a>
          </article>

          <article className="contact-card">
            <strong>
              <Lang es="Correo" en="Email" />
            </strong>
            <p>
              <Lang
                es="Solicitudes de cotizacion y seguimiento comercial."
                en="Quote requests and commercial follow-up."
              />
            </p>
            <a href={`mailto:${content.business.email}`}>{content.business.email}</a>
          </article>
        </div>
      </section>
    </main>
  );
}
