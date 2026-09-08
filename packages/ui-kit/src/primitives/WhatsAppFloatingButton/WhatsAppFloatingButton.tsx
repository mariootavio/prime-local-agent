import { WhatsAppIcon } from "../../icons/WhatsAppIcon";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "../../lib/whatsapp";

export interface WhatsAppFloatingButtonProps {
  whatsapp: string;
  nome: string;
  mensagemPrincipalWhatsapp?: string;
}

/**
 * Global element per packages/agent/rules/whatsapp-cta.md: always
 * rendered on every page, independent of which sections the agent
 * selects — not part of ui-kit.manifest.json's section catalog, so it
 * isn't subject to the sections' conditional whenToUse selection.
 */
export function WhatsAppFloatingButton({
  whatsapp,
  nome,
  mensagemPrincipalWhatsapp,
}: WhatsAppFloatingButtonProps) {
  const href = buildWhatsAppUrl(
    whatsapp,
    mensagemPrincipalWhatsapp ?? defaultWhatsAppMessage(nome)
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com ${nome} pelo WhatsApp`}
      className="fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-whatsapp)] text-on-dark shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-whatsapp)]"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
        right: "max(1.5rem, env(safe-area-inset-right))",
      }}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
