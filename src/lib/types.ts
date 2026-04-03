export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
  size: string;
  finish: string;
  featured: boolean;
  image: string;
  gallery: string[];
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  location: string;
  updatedAt: string;
};

export type ProductInput = Omit<Product, "id" | "slug" | "updatedAt"> & {
  id?: string;
  slug?: string;
  updatedAt?: string;
};

export type EditableLinkCard = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
  buttonLabel: string;
};

export type EditableCategoryCard = {
  id: string;
  eyebrow: string;
  title: string;
  image: string;
  href: string;
};

export type EditableValueCard = {
  id: string;
  title: string;
  description: string;
};

export type BusinessContent = {
  topStripText: string;
  topStripLinkLabel: string;
  headerButtonLabel: string;
  footerDescription: string;
  phone: string;
  secondaryPhone: string;
  whatsappUrl: string;
  email: string;
  address: string;
  mapUrl: string;
};

export type HomeContent = {
  heroPromos: EditableLinkCard[];
  categoryCards: EditableCategoryCard[];
  introTitle: string;
  introDescription: string;
  storyEyebrow: string;
  storyTitle: string;
  storySubtitle: string;
  storyParagraphs: string[];
  storyGalleryImages: string[];
  socialHeading: string;
};

export type CtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type AboutContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroImage: string;
  storyTitle: string;
  storySubtitle: string;
  storyParagraphs: string[];
  storyImage: string;
  valuesEyebrow: string;
  valuesTitle: string;
  values: EditableValueCard[];
};

export type ContactContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroImage: string;
  introEyebrow: string;
  introTitle: string;
  introDescription: string;
};

export type FooterContent = {
  copyright: string;
};

export type SiteContent = {
  business: BusinessContent;
  home: HomeContent;
  cta: CtaContent;
  about: AboutContent;
  contact: ContactContent;
  footer: FooterContent;
};
