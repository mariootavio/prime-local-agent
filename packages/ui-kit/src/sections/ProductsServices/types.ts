export interface ProductsServiceItem {
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
}

export interface ProductsServicesContent {
  /** Rendered above the grid, e.g. "Nossos Serviços". */
  heading?: string;
  /** Support copy rendered below the heading. */
  subheading?: string;
  items: ProductsServiceItem[];
  whatsapp: string;
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "image-cards-grid", the only variant implemented so
   * far. Switching between existing variants is Strict Compose;
   * adding a new one is Extend (see packages/agent/rules/variants.md).
   */
  variant?: string;
}
