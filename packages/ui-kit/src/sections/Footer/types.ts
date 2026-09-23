/**
 * Every field is copied verbatim from the client's prime-local.json
 * during composition — the component has no fixed fallback for any of
 * them. An absent optional field simply isn't rendered.
 */
export interface FooterContent {
  nome: string;
  logoUrl: string;
  whatsapp: string;
  /** Short institutional blurb under the logo. Omitted when absent. */
  aboutText?: string;
  enderecoCompleto?: string;
  horario?: string;
  telefone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "three-column", the only variant implemented so far.
   * Switching between existing variants is Strict Compose; adding a
   * new one is Extend (see packages/agent/rules/variants.md).
   */
  variant?: string;
}
