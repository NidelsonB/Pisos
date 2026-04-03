import type { Metadata } from "next";
import Image from "next/image";

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
          src={content.contact.heroImage}
          alt="Contacto Pisos Las Delicias"
          fill
          sizes="100vw"
        />
        <div className="container page-hero__content">
          <p className="eyebrow">{content.contact.heroEyebrow}</p>
          <h1>{content.contact.heroTitle}</h1>
        </div>
      </section>

      <section className="container page-shell">
        <section className="page-heading">
          <p className="eyebrow">{content.contact.introEyebrow}</p>
          <h1>{content.contact.introTitle}</h1>
          <p>{content.contact.introDescription}</p>
        </section>

        <div className="contact-grid">
          <article className="contact-card">
            <strong>Ubicacion</strong>
            <p>{content.business.address}</p>
            <a href={content.business.mapUrl} target="_blank" rel="noreferrer">
              Ver en Google Maps
            </a>
          </article>

          <article className="contact-card">
            <strong>WhatsApp y telefono</strong>
            <p>Atencion rapida para precios, stock, medidas y opciones recomendadas.</p>
            <a href={content.business.whatsappUrl} target="_blank" rel="noreferrer">
              {content.business.phone} / {content.business.secondaryPhone}
            </a>
          </article>

          <article className="contact-card">
            <strong>Correo</strong>
            <p>Solicitudes de cotizacion y seguimiento comercial.</p>
            <a href={`mailto:${content.business.email}`}>{content.business.email}</a>
          </article>
        </div>
      </section>
    </main>
  );
}
