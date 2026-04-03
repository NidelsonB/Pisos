"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { EditableLinkCard } from "@/lib/types";

type HomeHeroSliderProps = {
  slides: EditableLinkCard[];
};

export function HomeHeroSlider({ slides }: HomeHeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const activeSlide = slides[activeIndex];

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={index === activeIndex ? "hero-slide is-active" : "hero-slide"}
          aria-hidden={index === activeIndex ? undefined : true}
        >
          <div className="hero-slide__image">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
            />
          </div>

          <div className="container hero-slide__content">
            <div className="hero-slide__copy">
              <p className="eyebrow">{slide.eyebrow}</p>
              <h1 dangerouslySetInnerHTML={{ __html: slide.title.replace(/\n/g, "<br />") }} />
              {slide.description ? <p className="hero-slide__note">{slide.description}</p> : null}
              <div className="hero-slide__actions">
                {slide.href.startsWith("http") ? (
                  <a className="button button--primary" href={slide.href} target="_blank" rel="noreferrer">
                    {slide.buttonLabel}
                  </a>
                ) : (
                  <Link className="button button--primary" href={slide.href}>
                    {slide.buttonLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="hero-slider__controls">
        <button
          type="button"
          className="hero-slider__arrow"
          aria-label="Anterior"
          onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)}
        >
          ‹
        </button>
        <div className="hero-slider__dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={index === activeIndex ? "hero-slider__dot is-active" : "hero-slider__dot"}
              aria-label={`Ir al slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="hero-slider__arrow"
          aria-label="Siguiente"
          onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
        >
          ›
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
