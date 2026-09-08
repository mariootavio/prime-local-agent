import { FadeInView } from "../../primitives/FadeInView";
import type { LocationContactContent } from "./types";

export interface LocationContactProps {
  content: LocationContactContent;
}

/**
 * Partial implementation — map embed only. `enderecoCompleto`,
 * `telefone`, `whatsapp` and `horario` are already reserved on
 * LocationContactContent for a future pass that adds the rest of
 * this section (contact details alongside the map) — intentionally
 * unused here for now.
 */
export function LocationContact({ content }: LocationContactProps) {
  const { googleMaps } = content;

  if (!googleMaps) {
    return null;
  }

  return (
    // Explicit opaque background (not just the iframe) so this section
    // can safely take part in the -mt-px anti-seam trick used between
    // every other pair of opaque sections (see apps/playground/app/page.tsx).
    <section id="contato" className="scroll-mt-20 bg-white">
      <FadeInView as="div">
        <iframe
          src={googleMaps}
          title="Mapa de localização"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[400px] w-full border-0"
        />
      </FadeInView>
    </section>
  );
}
