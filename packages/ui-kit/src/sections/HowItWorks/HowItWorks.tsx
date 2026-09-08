import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { FadeInView } from "../../primitives/FadeInView";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../../icons/WhatsAppIcon";
import type { HowItWorksContent } from "./types";

export interface HowItWorksProps {
  content: HowItWorksContent;
}

export function HowItWorks({ content }: HowItWorksProps) {
  const {
    heading = "Como Funciona",
    subtitle,
    steps,
    nome,
    whatsapp,
    mensagemPrincipalWhatsapp,
    ctaLabel = "Chame no WhatsApp",
  } = content;

  if (steps.length === 0) {
    return null;
  }

  const whatsappHref = buildWhatsAppUrl(
    whatsapp,
    mensagemPrincipalWhatsapp ?? defaultWhatsAppMessage(nome)
  );

  return (
    <section id="como-funciona" className="scroll-mt-20 bg-gray-50 py-16 md:py-24">
      <Container>
        <FadeInView
          as="h2"
          className="mx-auto max-w-200 text-center font-title text-4xl font-semibold text-[var(--color-primary)] md:text-5xl"
        >
          {heading}
        </FadeInView>
        {subtitle && (
          <FadeInView
            as="p"
            delayMs={100}
            className="mx-auto mt-4 max-w-150 text-center font-body text-lg text-text"
          >
            {subtitle}
          </FadeInView>
        )}

        {/*
          Mobile — left-rail vertical timeline. Each step is a flex row
          (rail column + content column); the rail stretches to match
          the content column's height (default flex align-items:
          stretch), and the connector line fills that height via
          flex-1 — so it reaches exactly to the next circle regardless
          of how long this step's description is, no height math.
        */}
        <ol className="mt-10 flex flex-col md:hidden">
          {steps.map((step, index) => (
            <FadeInView
              as="li"
              key={step.stepNumber}
              delayMs={index * 90}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] font-title text-base font-semibold text-on-dark">
                  {step.stepNumber}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 bg-[var(--color-primary)]" />
                )}
              </div>
              <div className="pb-8 text-left">
                <h3 className="font-title text-lg font-semibold text-secondary">
                  {step.title}
                </h3>
                <p className="mt-1 font-body text-sm text-text">
                  {step.description}
                </p>
              </div>
            </FadeInView>
          ))}
        </ol>

        {/*
          Desktop — horizontal timeline. All 4 circles share one row,
          so a single connecting line at a fixed top offset reliably
          hits every circle's center; each circle's opaque fill
          (painted after the line in DOM order) occludes the line
          passing behind it, giving the connected-dots look with no
          z-index needed.
        */}
        <div className="relative mt-14 hidden md:block">
          <div
            aria-hidden="true"
            className="absolute inset-x-6 top-6 h-px bg-[var(--color-primary)]"
          />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <FadeInView
                as="div"
                key={step.stepNumber}
                delayMs={index * 90}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] font-title text-lg font-semibold text-on-dark">
                  {step.stepNumber}
                </div>
                <h3 className="font-title text-lg font-semibold text-secondary">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-text">
                  {step.description}
                </p>
              </FadeInView>
            ))}
          </div>
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
