import { FadeInView } from "../../primitives/FadeInView";
import { buildGoogleMapsEmbedUrl } from "../../lib/maps";
import type { LocationContactContent } from "./types";

export interface LocationContactProps {
  content: LocationContactContent;
}

/**
 * Partial implementation — map embed only. `telefone`, `whatsapp` and
 * `horario` are already reserved on LocationContactContent for a
 * future pass that adds contact details alongside the map —
 * intentionally unused here for now.
 *
 * The embed URL is always derived from the client's real
 * `enderecoCompleto` (see ../../lib/maps.ts) — never a fixed address
 * or a pasted embed. No address, no map: the section renders nothing
 * rather than pointing at a placeholder location.
 */
export function LocationContact({ content }: LocationContactProps) {
  const { enderecoCompleto } = content;

  if (!enderecoCompleto) {
    return null;
  }

  return (
    // Explicit opaque background (not just the iframe) so this section
    // can safely take part in the -mt-px anti-seam trick used between
    // every other pair of opaque sections (see apps/playground/app/page.tsx).
    <section id="contato" className="scroll-mt-20 bg-white">
      <FadeInView as="div">
        <iframe
          src={buildGoogleMapsEmbedUrl(enderecoCompleto)}
          title={`Mapa de localização: ${enderecoCompleto}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[400px] w-full border-0"
        />
      </FadeInView>
    </section>
  );
}
