"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Dictionary } from "@/lib/content/dictionary";

export interface HeroCarouselSlide {
  src: string;
  alt: string;
  label: string;
}

type HeroCarouselDict = Pick<
  Dictionary["home"]["hero"],
  | "carouselLabel"
  | "previousSlide"
  | "nextSlide"
  | "pauseSlideshow"
  | "playSlideshow"
  | "goToSlide"
>;

const AUTOPLAY_MS = 5500;

const controlClass =
  "flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white " +
  "backdrop-blur-md transition-colors duration-200 hover:bg-white/25";

export function HeroCarousel({
  slides,
  dict,
}: {
  slides: HeroCarouselSlide[];
  dict: HeroCarouselDict;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!playing || hovering || slides.length < 2) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, hovering, slides.length, index]);

  function goTo(i: number) {
    setIndex((i + slides.length) % slides.length);
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={dict.carouselLabel}
      className="group relative aspect-square w-full overflow-hidden rounded-3xl bg-ink shadow-frame ring-1 ring-inset ring-ink/10"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setHovering(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goTo(index - 1);
        if (e.key === "ArrowRight") goTo(index + 1);
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            priority={i === 0}
            className={`object-cover ${i === index ? "animate-ken-burns" : ""}`}
          />
        </div>
      ))}

      {/* Scrim: anchors the label and keeps contrast steady across four photos. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
      />

      <p className="absolute bottom-6 left-6 flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-eyebrow text-white">
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-signal-bright"
        />
        {slides[index]?.label}
      </p>

      <div className="sr-only" aria-live="polite">
        {slides[index]?.label}
      </div>

      <div className="absolute inset-x-0 bottom-5 flex items-center justify-end gap-2 px-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? dict.pauseSlideshow : dict.playSlideshow}
          className={controlClass}
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
        </button>
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label={dict.previousSlide}
          className={controlClass}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label={dict.nextSlide}
          className={controlClass}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute right-6 top-6 flex gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${dict.goToSlide} ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index
                ? "w-7 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
