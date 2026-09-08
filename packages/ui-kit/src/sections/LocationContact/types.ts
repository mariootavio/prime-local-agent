export interface LocationContactContent {
  cidade: string;
  estado?: string;
  enderecoCompleto?: string;
  googleMaps?: string;
  telefone?: string;
  whatsapp?: string;
  horario?: string;
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "map-embed", the only variant implemented so far.
   * Switching between existing variants is Strict Compose; adding a
   * new one is Extend (see packages/agent/rules/variants.md).
   */
  variant?: string;
}
