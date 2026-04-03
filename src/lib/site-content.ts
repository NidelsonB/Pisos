import { promises as fs } from "fs";
import path from "path";

import { SiteContent } from "@/lib/types";

const dataFile = path.join(process.cwd(), "data", "site-content.json");

export const defaultSiteContent: SiteContent = {
  business: {
    topStripText: "Mas de 30 anos sirviendo a nuestros clientes.",
    topStripLinkLabel: "Compra aqui",
    headerButtonLabel: "Tel. 2228-1163",
    footerDescription:
      "Distribuidores e importadores directos de pisos, ceramica, azulejos, porcelanato y fachaletas para proyectos residenciales y comerciales en El Salvador.",
    phone: "+503 2228-1163",
    secondaryPhone: "+503 7853-0998",
    whatsappUrl: "https://wa.me/message/UGVGEEI6U62LD1",
    email: "cotizador@pisoslasdelicias.com",
    address:
      "4a calle poniente y 18 avenida sur # 2-14, Santa Tecla, La Libertad, frente a Estadio Las Delicias",
    mapUrl:
      "https://www.google.com/maps/place/Pisos+Las+Delicias/@13.6725899,-89.298318,15z/data=!4m6!3m5!1s0x8f632fd501eaca0b:0x122f08b04e42e5ff!8m2!3d13.6725899!4d-89.298318!16s%2Fg%2F11ss4l2gxl?entry=ttu"
  },
  home: {
    heroPromos: [],
    categoryCards: [],
    introTitle: "NUESTROS PRODUCTOS",
    introDescription:
      "Somos distribuidores e importadores directos de pisos y ceramica de calidad.",
    storyEyebrow: "Nuestra historia",
    storyTitle: "Sirviendo durante mas de 30 anos a nuestros clientes",
    storySubtitle: "Con esmero, transparencia y buenos precios.",
    storyParagraphs: [],
    storyGalleryImages: [],
    socialHeading: "SIGUENOS EN"
  },
  cta: {
    eyebrow: "COTIZA EN LINEA",
    title: "Dudas sobre que necesitas?",
    description: "",
    primaryLabel: "COTIZA EN LINEA YA",
    primaryHref: "https://wa.me/message/UGVGEEI6U62LD1",
    secondaryLabel: "Ver contacto",
    secondaryHref: "/contacto"
  },
  about: {
    heroEyebrow: "Quienes somos",
    heroTitle: "",
    heroImage: "",
    storyTitle: "",
    storySubtitle: "Nuestra historia",
    storyParagraphs: [],
    storyImage: "",
    valuesEyebrow: "Nuestros valores",
    valuesTitle: "",
    values: []
  },
  contact: {
    heroEyebrow: "Contacto",
    heroTitle: "",
    heroImage: "",
    introEyebrow: "Atencion comercial",
    introTitle: "",
    introDescription: ""
  },
  footer: {
    copyright: ""
  }
};

function withDefaults(content: Partial<SiteContent>): SiteContent {
  return {
    business: { ...defaultSiteContent.business, ...content.business },
    home: {
      ...defaultSiteContent.home,
      ...content.home,
      heroPromos: content.home?.heroPromos ?? defaultSiteContent.home.heroPromos,
      categoryCards: content.home?.categoryCards ?? defaultSiteContent.home.categoryCards,
      storyParagraphs:
        content.home?.storyParagraphs ?? defaultSiteContent.home.storyParagraphs,
      storyGalleryImages:
        content.home?.storyGalleryImages ?? defaultSiteContent.home.storyGalleryImages
    },
    cta: { ...defaultSiteContent.cta, ...content.cta },
    about: {
      ...defaultSiteContent.about,
      ...content.about,
      storyParagraphs:
        content.about?.storyParagraphs ?? defaultSiteContent.about.storyParagraphs,
      values: content.about?.values ?? defaultSiteContent.about.values
    },
    contact: { ...defaultSiteContent.contact, ...content.contact },
    footer: { ...defaultSiteContent.footer, ...content.footer }
  };
}

export async function getSiteContent() {
  const raw = await fs.readFile(dataFile, "utf8");
  return withDefaults(JSON.parse(raw) as Partial<SiteContent>);
}

export async function saveSiteContent(content: SiteContent) {
  const hydrated = withDefaults(content);
  await fs.writeFile(dataFile, JSON.stringify(hydrated, null, 2), "utf8");
  return hydrated;
}
