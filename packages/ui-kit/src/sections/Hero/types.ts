export interface HeroHighlight {
  title: string;
  text: string;
}

export interface HeroContent {
  /** Rendered as the page's H1. */
  headline: string;
  subtitle?: string;
  backgroundImageUrl?: string;
  /** Up to 4 items — rendered as a bar overlapping the Hero's bottom edge. */
  highlights?: HeroHighlight[];
  /** Used only for the default WhatsApp CTA message when mensagemPrincipalWhatsapp is absent. */
  nome: string;
  whatsapp: string;
  mensagemPrincipalWhatsapp?: string;
  /** Label for the WhatsApp CTA rendered below the subtitle. */
  ctaLabel?: string;
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "image-background", the only variant implemented so
   * far. Switching between existing variants is Strict Compose;
   * adding a new one is Extend (see packages/agent/rules/variants.md).
   */
  variant?: string;
}
