export interface AboutContent {
  headline: string;
  subtitle: string;
  /**
   * Optional — absent when the client didn't provide (or map, see
   * packages/agent/rules/create-flow.md) an image for this section.
   * Never a placeholder string crammed into this field: the component
   * itself renders the "(imagem pendente)" placeholder when absent.
   */
  imageUrl?: string;
  /** Used only for the default WhatsApp CTA message when mensagemPrincipalWhatsapp is absent. */
  nome: string;
  whatsapp: string;
  mensagemPrincipalWhatsapp?: string;
  ctaLabel?: string;
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "text-image-split", the only variant implemented so
   * far. Switching between existing variants is Strict Compose;
   * adding a new one is Extend (see packages/agent/rules/variants.md).
   */
  variant?: string;
}
