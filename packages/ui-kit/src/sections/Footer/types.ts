export interface FooterContent {
  nome: string;
  logoUrl: string;
  whatsapp: string;
  /**
   * Short institutional blurb rendered under the logo. When absent,
   * a generic structural placeholder is used instead (see
   * packages/agent/rules/content-rules.md) — never Lorem Ipsum or an
   * invented factual claim about the business.
   */
  aboutText?: string;
  enderecoCompleto?: string;
  horario?: string;
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
