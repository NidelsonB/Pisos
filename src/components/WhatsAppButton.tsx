import { getSiteContent } from "@/lib/site-content";
import { siteConfig } from "@/lib/site";

export async function WhatsAppButton() {
  const content = await getSiteContent();

  return (
    <a
      className="whatsapp-float"
      href={content.business.whatsappUrl || siteConfig.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
    >
      WhatsApp
    </a>
  );
}
