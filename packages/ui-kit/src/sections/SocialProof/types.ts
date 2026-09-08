export interface SocialProofReview {
  authorName: string;
  /** 1–5. */
  rating: number;
  text: string;
  relativeTime?: string;
}

export interface SocialProofContent {
  /** Rendered above the grid, e.g. "O que dizem nossos clientes". */
  heading?: string;
  subheading?: string;
  reviews: SocialProofReview[];
  /** Used only for the default WhatsApp CTA message when mensagemPrincipalWhatsapp is absent. */
  nome: string;
  whatsapp: string;
  mensagemPrincipalWhatsapp?: string;
  ctaLabel?: string;
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "review-cards-grid", the only variant implemented so
   * far. Switching between existing variants is Strict Compose;
   * adding a new one is Extend (see packages/agent/rules/variants.md).
   */
  variant?: string;
}
