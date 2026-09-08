export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQContent {
  /** Rendered above the accordion, e.g. "Perguntas Frequentes". */
  headline?: string;
  subtitle?: string;
  questions: FAQQuestion[];
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "accordion", the only variant implemented so far.
   * Switching between existing variants is Strict Compose; adding a
   * new one is Extend (see packages/agent/rules/variants.md).
   */
  variant?: string;
}
