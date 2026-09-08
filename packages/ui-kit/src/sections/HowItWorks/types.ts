export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface HowItWorksContent {
  /** Rendered above the timeline, e.g. "Como Funciona". */
  heading?: string;
  /** Support copy rendered below the heading. */
  subtitle?: string;
  /** Exactly 4 steps. */
  steps: HowItWorksStep[];
  /** Used only for the default WhatsApp CTA message when mensagemPrincipalWhatsapp is absent. */
  nome: string;
  whatsapp: string;
  mensagemPrincipalWhatsapp?: string;
  ctaLabel?: string;
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "numbered-timeline", the only variant implemented so
   * far. Switching between existing variants is Strict Compose;
   * adding a new one is Extend (see packages/agent/rules/variants.md).
   */
  variant?: string;
}
