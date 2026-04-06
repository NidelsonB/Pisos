import { Lang } from "@/components/LanguageToggle";
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
      <span className="whatsapp-float__icon" aria-hidden>
        <svg viewBox="0 0 32 32" role="img">
          <path
            d="M26.6 5.4A14.8 14.8 0 0 0 3.3 23.6L1 31l7.6-2a14.8 14.8 0 0 0 7.1 1.8h.1A14.8 14.8 0 0 0 26.6 5.4Zm-10.8 23a12 12 0 0 1-6.1-1.7l-.4-.2-4.5 1.2 1.2-4.4-.3-.4a12 12 0 1 1 10.1 5.5Zm6.6-9c-.4-.2-2.2-1.1-2.6-1.2-.4-.2-.6-.2-.9.2l-.8 1c-.3.3-.5.3-.9.1a9.7 9.7 0 0 1-2.8-1.7 10.8 10.8 0 0 1-2-2.5c-.2-.4 0-.6.2-.8l.6-.7.4-.7c.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1 .4-.4.4-1.3 1.3-1.3 3.2s1.3 3.8 1.5 4.1c.2.3 2.6 4 6.4 5.6a21.5 21.5 0 0 0 2.1.8c.9.3 1.8.2 2.5.1.8-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="whatsapp-float__text">
        <strong>WhatsApp</strong>
        <small>
          <Lang es="Cotiza aqui" en="Quote here" />
        </small>
      </span>
    </a>
  );
}
