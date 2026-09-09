export interface DifferentiatorItem {
  /** Key into the icon registry in Differentiators.tsx (e.g. "shield", "clock"). */
  icon: string;
  title: string;
  /** Support copy rendered below the title in the card. */
  description?: string;
}

export interface DifferentiatorsContent {
  /** Rendered above the grid, e.g. "Nossos Diferenciais". */
  heading?: string;
  /** Support copy rendered below the heading. */
  subheading?: string;
  items: DifferentiatorItem[];
  /** Used only for the default WhatsApp CTA message when mensagemPrincipalWhatsapp is absent. */
  nome: string;
  whatsapp: string;
  mensagemPrincipalWhatsapp?: string;
  ctaLabel?: string;
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "icon-grid", the only variant implemented so far.
   * Switching between existing variants is Strict Compose; adding a
   * new one is Extend (see packages/agent/rules/variants.md).
   */
  variant?: string;
}
