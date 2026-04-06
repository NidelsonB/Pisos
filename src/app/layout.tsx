import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageToggle";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const headingFont = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"]
});

const bodyFont = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Pisos Las Delicias | Pisos y Azulejos a su Alcance",
    template: "%s | Pisos Las Delicias"
  },
  description: siteConfig.description,
  keywords: siteConfig.seoKeywords,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/"
  },
  verification: {
    google: "m0b2C6yYF8DY8tUWoJl-nLfTJWDpFiyqn4x6bybWzhM"
  },
  openGraph: {
    title: "Pisos Las Delicias | Pisos y Azulejos a su Alcance",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
    images: [
      {
        url: "/uploads/2024/03/backdrop-pisos.jpg",
        width: 1200,
        height: 630,
        alt: "Pisos Las Delicias en Santa Tecla"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pisos Las Delicias",
    description: siteConfig.description,
    images: ["/uploads/2024/03/backdrop-pisos.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
