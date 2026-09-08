import { Star } from "lucide-react";
import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { FadeInView } from "../../primitives/FadeInView";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../../icons/WhatsAppIcon";
import type { SocialProofContent } from "./types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      aria-label={`${rating} de 5 estrelas`}
      className="flex gap-0.5 text-[var(--color-primary)]"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className="h-4 w-4"
          fill={i < rating ? "currentColor" : "none"}
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
    reviews,
    nome,
    whatsapp,
    mensagemPrincipalWhatsapp,
    ctaLabel = "Chame no WhatsApp",
  } = content;

  if (reviews.length === 0) {
    return null;
  }

  const whatsappHref = buildWhatsAppUrl(
    whatsapp,
    mensagemPrincipalWhatsapp ?? defaultWhatsAppMessage(nome)
  );

  return (
    // Opaque gray, not a low-alpha token tint — see ProductsServices.tsx
    // for why a transparent overlay here would flip near-black under
    // prefers-color-scheme: dark.
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

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <FadeInView
              as="div"
              key={review.authorName}
              delayMs={index * 90}
              className="flex flex-col gap-3 rounded-2xl border border-secondary/10 bg-white p-6 shadow-md"
            >
              <StarRating rating={review.rating} />
              <p className="flex-1 font-body text-sm text-text">
                {review.text}
              </p>
              <div className="flex items-center justify-between font-body text-sm">
                <span className="font-semibold text-secondary">
                  {review.authorName}
                </span>
                {review.relativeTime && (
                  <span className="text-text">{review.relativeTime}</span>
                )}
              </div>
            </FadeInView>
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
