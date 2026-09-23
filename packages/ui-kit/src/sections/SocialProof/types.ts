/**
 * One real Google review, copied by the client from their Google
 * Maps / Business Profile listing. Never generated, paraphrased or
 * completed by the agent (packages/agent/rules/content-rules.md).
 */
export interface SocialProofReview {
  authorName: string;
  /** 1–5. */
  rating: number;
  text: string;
  /** As shown on Google, e.g. "há 2 semanas". */
  relativeTime?: string;
}

/**
 * The listing's overall Google rating, exactly as Google displays it —
 * never computed from `reviews` (that's only the subset the client
 * chose to publish, not the listing's real average).
 */
export interface SocialProofRatingSummary {
  /** 1–5, rendered with pt-BR formatting ("5,0", "4,8"). */
  average: number;
  /** Total review count on the listing, when the client provides it. */
  totalReviews?: number;
}

export interface SocialProofContent {
  /** Rendered above the carousel, e.g. "O que dizem nossos clientes". */
  heading?: string;
  subheading?: string;
  /** Omit when the client didn't supply the listing's real average. */
  ratingSummary?: SocialProofRatingSummary;
  reviews: SocialProofReview[];
  /** Used only for the default WhatsApp CTA message when mensagemPrincipalWhatsapp is absent. */
  nome: string;
  whatsapp: string;
  mensagemPrincipalWhatsapp?: string;
  ctaLabel?: string;
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "google-reviews-carousel", the only variant
   * implemented so far. Switching between existing variants is Strict
   * Compose; adding a new one is Extend (see
   * packages/agent/rules/variants.md).
   */
  variant?: string;
}
