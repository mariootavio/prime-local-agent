import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { FadeInView } from "../../primitives/FadeInView";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "../../lib/whatsapp";
import { CheckIcon } from "../../icons/CheckIcon";
import { WhatsAppIcon } from "../../icons/WhatsAppIcon";
import type { HeroContent } from "./types";

export interface HeroProps {
  content: HeroContent;
}

export function Hero({ content }: HeroProps) {
  const {
    headline,
    subtitle,
    backgroundImageUrl,
    highlights = [],
    nome,
    whatsapp,
    mensagemPrincipalWhatsapp,
    ctaLabel = "Chame no WhatsApp",
  } = content;
  const visibleHighlights = highlights.slice(0, 4);

  const whatsappHref = buildWhatsAppUrl(
    whatsapp,
    mensagemPrincipalWhatsapp ?? defaultWhatsAppMessage(nome)
  );

  return (
    <section
      id="inicio"
      className="relative isolate flex scroll-mt-20 flex-col overflow-hidden bg-white text-secondary md:h-[750px] md:justify-center md:bg-secondary md:text-on-dark"
    >
      {/*
        Full-bleed CSS background photo — desktop only. On mobile the
        same photo instead renders as an in-flow 4:3 <img> further down
        (see below), so it never doubles as a section background there.
      */}
      {backgroundImageUrl && (
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-cover bg-center md:block"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      {/*
        Dark-left-to-transparent-right overlay for text legibility without
        hiding the image on the right. Fixed neutral black, not a client
        brand token — a tinted overlay would fight the background photo.
        Desktop only — mobile has no photo behind the text to darken.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.85) 0%, transparent 70%)",
        }}
      />

      <Container className="relative z-10 flex flex-col items-center pt-24 pb-6 text-center md:items-start md:pt-16 md:pb-16 md:text-left">
        <FadeInView
          as="h1"
          className="max-w-2xl font-title text-3xl font-semibold leading-tight md:text-heading"
        >
          {headline}
        </FadeInView>
        {subtitle && (
          <FadeInView
            as="p"
            delayMs={100}
            className="mt-6 max-w-xl font-body text-lg text-secondary/80 md:mt-3 md:text-on-dark/85"
          >
            {subtitle}
          </FadeInView>
        )}

        {/*
          Mobile-only compact checklist — title only, no description
          (the full title+description card stays desktop-only further
          below). Sits between subtitle and CTA per the mobile order;
          irrelevant at md+ where the overlapping card below takes over.
        */}
        {visibleHighlights.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-3 md:hidden">
            {visibleHighlights.map((item, index) => (
              <FadeInView
                as="div"
                key={item.title}
                delayMs={index * 90}
                className="flex items-center gap-2"
              >
                <CheckIcon className="h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                <span className="font-title text-base font-semibold">
                  {item.title}
                </span>
              </FadeInView>
            ))}
          </div>
        )}

        {/* Fixed WhatsApp brand color, never the client's accent token (packages/agent/rules/whatsapp-cta.md). */}
        <Button
          href={whatsappHref}
          variant="whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Falar com ${nome} pelo WhatsApp`}
          className="mt-6 w-full md:w-auto"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {ctaLabel}
        </Button>
      </Container>

      {/*
        Mobile only — the desktop full-bleed photo rendered as a normal
        block element after the CTA instead of overlapping anything.
        mb-8 gives it the same breathing room below (before the gray
        Services section) as the page already has above the Hero.
      */}
      {backgroundImageUrl && (
        <div className="relative z-10 mb-8 md:hidden">
          <Container>
            <img
              src={backgroundImageUrl}
              alt={nome}
              className="aspect-[4/3] w-full rounded-xl object-cover shadow-md"
            />
          </Container>
        </div>
      )}

      {/*
        Desktop only — the mobile checklist above replaces this
        overlapping title+description card on smaller screens.
      */}
      {visibleHighlights.length > 0 && (
        <div className="z-10 hidden md:absolute md:inset-x-0 md:bottom-8 md:block">
          <Container>
            <div className="grid grid-cols-2 gap-8 rounded-2xl bg-black/20 p-8 shadow-xl backdrop-blur-md lg:grid-cols-4 lg:gap-12 lg:p-10">
              {visibleHighlights.map((item, index) => (
                <FadeInView
                  as="div"
                  key={item.title}
                  delayMs={index * 90}
                  className="flex flex-col gap-1"
                >
                  <span className="font-title text-lg font-semibold text-on-dark">
                    {item.title}
                  </span>
                  <span className="font-body text-sm text-on-dark/80">
                    {item.text}
                  </span>
                </FadeInView>
              ))}
            </div>
          </Container>
        </div>
      )}
    </section>
  );
}
