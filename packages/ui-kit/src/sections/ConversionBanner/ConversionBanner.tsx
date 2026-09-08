import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { FadeInView } from "../../primitives/FadeInView";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../../icons/WhatsAppIcon";
import type { ConversionBannerContent } from "./types";

export interface ConversionBannerProps {
  content: ConversionBannerContent;
}

export function ConversionBanner({ content }: ConversionBannerProps) {
  const {
    headline,
    subtitle,
    nome,
    whatsapp,
    mensagemPrincipalWhatsapp,
    ctaLabel = "Chame no WhatsApp",
  } = content;

  const whatsappHref = buildWhatsAppUrl(
    whatsapp,
    mensagemPrincipalWhatsapp ?? defaultWhatsAppMessage(nome)
  );

  return (
    // Solid brand surface, per contract (never a fixed color). Text is
    // white — there's no dedicated "text over a colored surface" token
    // yet (only primary/secondary/text/accent), so white is the safe
    // default; revisit if a client's primary ever turns out too light
    // for white text to read on.
    <section
      id="banner-conversao"
      className="scroll-mt-20 bg-[var(--color-primary)] py-20 md:py-28"
    >
      <Container className="flex flex-col items-center gap-6 text-center">
        <FadeInView
          as="h2"
          className="mx-auto max-w-200 text-center font-title text-3xl font-semibold text-on-dark md:text-5xl"
        >
          {headline}
        </FadeInView>
        {subtitle && (
          <FadeInView
            as="p"
            delayMs={100}
            className="mx-auto max-w-150 text-center font-body text-lg text-on-dark/85"
          >
            {subtitle}
          </FadeInView>
        )}
        {/* Fixed WhatsApp brand color, never the client's accent token (packages/agent/rules/whatsapp-cta.md). */}
        <Button
          href={whatsappHref}
          variant="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Falar com ${nome} pelo WhatsApp`}
          className="mt-2"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {ctaLabel}
        </Button>
      </Container>
    </section>
  );
}
