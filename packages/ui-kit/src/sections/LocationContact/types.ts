export interface LocationContactContent {
  cidade: string;
  estado?: string;
  /**
   * Source of the map embed — LocationContact builds the Google Maps
   * embed URL from this (encodeURIComponent + output=embed). Must be
   * the client's real address from prime-local.json.
   */
  enderecoCompleto?: string;
  /**
   * The client's Google Maps link as given in the interview. Not used
   * to render the embed (share links like maps.app.goo.gl can't be
   * iframed) — kept for reference/structured data only.
   */
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
