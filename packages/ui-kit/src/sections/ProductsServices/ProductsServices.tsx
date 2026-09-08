import Image from "next/image";
import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { FadeInView } from "../../primitives/FadeInView";
import { buildWhatsAppUrl } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../../icons/WhatsAppIcon";
import type { ProductsServicesContent } from "./types";

export interface ProductsServicesProps {
  content: ProductsServicesContent;
}

export function ProductsServices({ content }: ProductsServicesProps) {
  const { heading = "Nossos Serviços", subheading, items, whatsapp } = content;

  if (items.length === 0) {
    return null;
  }

  return (
    // Opaque gray, not a low-alpha token tint (e.g. bg-secondary/5) — a
    // transparent background composites with the page body behind it,
    // which flips near-black under prefers-color-scheme: dark, making
    // the section read as solid black regardless of this class.
    <section id="servicos" className="scroll-mt-20 bg-gray-50 py-16 md:py-24">
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

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {items.map((item, index) => {
            // Contextualized per card — never the same generic message
            // repeated across every CTA on the page (whatsapp-cta.md).
            const whatsappHref = buildWhatsAppUrl(
              whatsapp,
              `Olá, gostaria de saber mais sobre ${item.title}`
            );

            return (
              <FadeInView
                as="div"
                key={item.title}
                delayMs={index * 90}
                className="flex flex-col overflow-hidden rounded-2xl border border-secondary/10 bg-white shadow-md"
              >
                <div className="relative aspect-4/3 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col items-center p-6 text-center">
                  <h3 className="font-title text-xl font-semibold text-[var(--color-primary)] md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 font-body text-sm text-text">
                    {item.subtitle}
                  </p>

                  {/* Fixed WhatsApp brand color, never the client's accent token (packages/agent/rules/whatsapp-cta.md). */}
                  <Button
                    href={whatsappHref}
                    variant="whatsapp"
                    size="compact"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Falar sobre ${item.title} pelo WhatsApp`}
                    className="mt-6 w-full"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {item.ctaLabel ?? "Chame no WhatsApp"}
                  </Button>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
