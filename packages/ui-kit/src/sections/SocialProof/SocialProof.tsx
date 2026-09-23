"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { FadeInView } from "../../primitives/FadeInView";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "../../lib/whatsapp";
import { GoogleIcon } from "../../icons/GoogleIcon";
import { WhatsAppIcon } from "../../icons/WhatsAppIcon";
import type { SocialProofContent } from "./types";

/** Number of --color-avatar-N tokens defined in tokens.css. */
const AVATAR_COLOR_COUNT = 6;

function formatRating(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function StarRating({
  rating,
  className = "h-4 w-4",
}: {
  rating: number;
  className?: string;
}) {
  const filled = Math.round(rating);

  return (
    <div
      role="img"
      aria-label={`${formatRating(rating)} de 5 estrelas`}
      className="flex gap-0.5"
    >
      {Array.from({ length: 5 }, (_, i) => (
        // Google's own star yellow (fixed token), not the client's
        // palette — these mirror Google's rating display.
        <Star
          key={i}
          aria-hidden="true"
          fill="currentColor"
          strokeWidth={0}
          className={`${className} ${i < filled ? "text-[var(--color-rating-star)]" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export interface SocialProofProps {
  content: SocialProofContent;
}

export function SocialProof({ content }: SocialProofProps) {
  const {
    heading = "O que dizem nossos clientes",
    subheading,
    ratingSummary,
    reviews,
    nome,
    whatsapp,
    mensagemPrincipalWhatsapp,
    ctaLabel = "Chame no WhatsApp",
  } = content;

  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollPrev(track.scrollLeft > 1);
    setCanScrollNext(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 1
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateScrollEdges();
    track.addEventListener("scroll", updateScrollEdges, { passive: true });
    window.addEventListener("resize", updateScrollEdges);
    return () => {
      track.removeEventListener("scroll", updateScrollEdges);
      window.removeEventListener("resize", updateScrollEdges);
    };
  }, [updateScrollEdges]);

  /** Advances by exactly one card (card width + track gap). */
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (reviews.length === 0) {
    return null;
  }

  const whatsappHref = buildWhatsAppUrl(
    whatsapp,
    mensagemPrincipalWhatsapp ?? defaultWhatsAppMessage(nome)
  );
  const showArrows = canScrollPrev || canScrollNext;

  return (
    // Same opaque gray as ProductsServices, not a low-alpha token tint —
    // see ProductsServices.tsx for why a transparent overlay here would
    // flip near-black under prefers-color-scheme: dark.
    <section id="avaliacoes" className="scroll-mt-20 bg-gray-50 py-16 md:py-24">
      <Container>
        <FadeInView
          as="h2"
          className="mx-auto max-w-200 text-center font-title text-4xl font-semibold text-[var(--color-primary)] md:text-5xl"
        >
          {heading}
        </FadeInView>
        {subheading && (
          <FadeInView
            as="p"
            delayMs={100}
            className="mx-auto mt-4 max-w-150 text-center font-body text-lg text-text"
          >
            {subheading}
          </FadeInView>
        )}

        <FadeInView
          as="div"
          delayMs={150}
          className="mt-10 flex items-center justify-between gap-4"
        >
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
            <GoogleIcon className="h-7 w-7 shrink-0" />
            {ratingSummary && (
              <>
                <span className="font-title text-2xl font-semibold text-on-light">
                  {formatRating(ratingSummary.average)}
                </span>
                <StarRating
                  rating={ratingSummary.average}
                  className="h-5 w-5"
                />
              </>
            )}
            <span className="font-body text-sm text-text">
              Avaliações do Google
              {ratingSummary?.totalReviews !== undefined &&
                ` · ${ratingSummary.totalReviews} avaliações`}
            </span>
          </div>

          {showArrows && (
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollPrev}
                aria-label="Avaliações anteriores"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/15 bg-white text-secondary transition-opacity hover:border-secondary/30 disabled:cursor-default disabled:opacity-40"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!canScrollNext}
                aria-label="Próximas avaliações"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/15 bg-white text-secondary transition-opacity hover:border-secondary/30 disabled:cursor-default disabled:opacity-40"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          )}
        </FadeInView>

        {/*
          Native horizontal scroll + snap: swipe works on touch with no
          JS, the arrows above just scrollBy one card. Card basis sets
          how many fit per view — ~1 on mobile (with a peek of the
          next), 2 from sm, 3 from lg.
        */}
        <div
          ref={trackRef}
          className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review, index) => (
            <article
              key={`${index}-${review.authorName}`}
              className="flex shrink-0 basis-[85%] snap-start flex-col gap-4 rounded-2xl border border-secondary/10 bg-white p-6 sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
            >
              <div className="flex items-center gap-3">
                {/* Decorative reviewer avatar — fixed neutral palette, never the client's brand color. */}
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-title text-base font-semibold text-on-dark"
                  style={{
                    backgroundColor: `var(--color-avatar-${(index % AVATAR_COLOR_COUNT) + 1})`,
                  }}
                >
                  {review.authorName.trim().charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-body text-sm font-semibold text-secondary">
                    {review.authorName}
                  </p>
                  {review.relativeTime && (
                    <p className="font-body text-xs text-text">
                      {review.relativeTime}
                    </p>
                  )}
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="flex-1 font-body text-sm text-text">
                {review.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          {/* Fixed WhatsApp brand color, never the client's accent token (packages/agent/rules/whatsapp-cta.md). */}
          <Button
            href={whatsappHref}
            variant="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Falar com ${nome} pelo WhatsApp`}
          >
            <WhatsAppIcon className="h-5 w-5" />
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
