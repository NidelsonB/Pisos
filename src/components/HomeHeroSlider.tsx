"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/LanguageToggle";
import { withBasePath } from "@/lib/paths";
import { EditableLinkCard } from "@/lib/types";

type HomeHeroSliderProps = {
  slides: EditableLinkCard[];
};

const slideTranslations: Record<
  string,
  { eyebrow: string; title: string; description: string; buttonLabel: string }
> = {
  "promo-pisos": {
    eyebrow: "Flooring",
    title: "New floor?\nFind it here.",
    description: "",
    buttonLabel: "Contact us"
  },
  "promo-azulejos": {
    eyebrow: "Wall tiles",
    title: "Upgrade your kitchen\nwith our products",
    description: "Manufacturer warranty",
    buttonLabel: "View catalog"
  },
  "promo-cotiza": {
    eyebrow: "Quote online",
    title: "Need help?\nQuote online today",
    description: "Get a price in minutes.",
    buttonLabel: "Quote online"
  }
};

export function HomeHeroSlider({ slides }: HomeHeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 40000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) {
    return null;
  }

  const getSlideCopy = (slide: EditableLinkCard) => {
    if (language !== "en") {
      return slide;
    }

    return {
      ...slide,
      ...slideTranslations[slide.id]
    };
  };

  const activeSlide = getSlideCopy(slides[activeIndex]);

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => {
        const copy = getSlideCopy(slide);

        return (
          <div
            key={slide.id}
            className={index === activeIndex ? "hero-slide is-active" : "hero-slide"}
            aria-hidden={index === activeIndex ? undefined : true}
          >
            <div className="hero-slide__image">
              <Image
                src={withBasePath(slide.image)}
                alt={copy.title}
                fill
                priority={index === 0}
                sizes="100vw"
              />
            </div>

            <div className="container hero-slide__content">
              <div className="hero-slide__copy">
                <p className="eyebrow">{copy.eyebrow}</p>
                <h1 dangerouslySetInnerHTML={{ __html: copy.title.replace(/\n/g, "<br />") }} />
                {copy.description ? <p className="hero-slide__note">{copy.description}</p> : null}
                <div className="hero-slide__actions">
                  {slide.href.startsWith("http") ? (
                    <a className="button button--primary" href={slide.href} target="_blank" rel="noreferrer">
                      {copy.buttonLabel}
                    </a>
                  ) : (
                    <Link className="button button--primary" href={slide.href}>
                      {copy.buttonLabel}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="hero-slider__controls">
        <button
          type="button"
          className="hero-slider__arrow"
          aria-label={language === "en" ? "Previous" : "Anterior"}
          onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)}
        >
          {"<"}
        </button>
        <div className="hero-slider__dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={index === activeIndex ? "hero-slider__dot is-active" : "hero-slider__dot"}
              aria-label={`${language === "en" ? "Go to slide" : "Ir al slide"} ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="hero-slider__arrow"
          aria-label={language === "en" ? "Next" : "Siguiente"}
          onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
        >
          {">"}
        </button>
      </div>

      <div className="hero-slider__floating-cta">
        {activeSlide.href.startsWith("http") ? (
          <a href={activeSlide.href} target="_blank" rel="noreferrer">
            {activeSlide.buttonLabel}
          </a>
        ) : (
          <Link href={activeSlide.href}>{activeSlide.buttonLabel}</Link>
        )}
      </div>
    </section>
  );
}
