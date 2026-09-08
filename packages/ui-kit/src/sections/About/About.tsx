import Image from "next/image";
import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { FadeInView } from "../../primitives/FadeInView";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../../icons/WhatsAppIcon";
import type { AboutContent } from "./types";

export interface AboutProps {
  content: AboutContent;
}

export function About({ content }: AboutProps) {
  const {
    headline,
    subtitle,
    imageUrl,
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
    <section id="sobre" className="scroll-mt-20 bg-white py-16 md:py-24">
      <Container className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16">
        {/* Text first in DOM — mobile stacks it above the image via
            flex-col; desktop reuses the same order to put it on the
            left via flex-row, same alignment pattern as the Hero. */}
        <FadeInView
          as="div"
          className="flex flex-col items-start gap-6 text-left md:flex-1"
        >
          <h2 className="font-title text-4xl font-semibold text-[var(--color-primary)] md:text-5xl">
            {headline}
          </h2>
          <p className="font-body text-lg text-text">{subtitle}</p>

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
        </FadeInView>

        <FadeInView
          as="div"
          delayMs={150}
          className="relative aspect-4/3 w-full overflow-hidden rounded-xl md:flex-1"
        >
          <Image
            src={imageUrl}
            alt={nome}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </FadeInView>
      </Container>
    </section>
  );
}
