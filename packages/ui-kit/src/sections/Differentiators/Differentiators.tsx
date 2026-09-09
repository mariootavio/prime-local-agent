import { Award, Clock, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { FadeInView } from "../../primitives/FadeInView";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../../icons/WhatsAppIcon";
import type { DifferentiatorsContent } from "./types";

/**
 * Explicit registry (not lucide-react's dynamic `icons` map) so only
 * the icons actually used here are bundled, and `item.icon` values
 * stay independent of lucide's own export-name casing.
 */
const ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  clock: Clock,
  users: Users,
  award: Award,
};

export interface DifferentiatorsProps {
  content: DifferentiatorsContent;
}

export function Differentiators({ content }: DifferentiatorsProps) {
  const {
    heading = "Nossos Diferenciais",
    subheading,
    items,
    nome,
    whatsapp,
    mensagemPrincipalWhatsapp,
    ctaLabel = "Chame no WhatsApp",
  } = content;

  if (items.length === 0) {
    return null;
  }

  const whatsappHref = buildWhatsAppUrl(
    whatsapp,
    mensagemPrincipalWhatsapp ?? defaultWhatsAppMessage(nome)
  );

  return (
    <section id="diferenciais" className="scroll-mt-20 bg-white py-16 md:py-24">
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

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-8">
          {items.map((item, index) => {
            const Icon = ICONS[item.icon] ?? ICONS.shield;

            return (
              <FadeInView
                as="div"
                key={item.title}
                delayMs={index * 90}
                className="flex flex-col items-center gap-3 rounded-2xl border border-secondary/10 bg-white p-6 text-center shadow-md"
              >
                <Icon
                  aria-hidden="true"
                  className="h-10 w-10 text-[var(--color-primary)]"
                />
                <h3 className="font-title text-lg font-semibold text-[var(--color-primary)]">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="font-body text-sm text-text">
                    {item.description}
                  </p>
                )}
              </FadeInView>
            );
          })}
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
