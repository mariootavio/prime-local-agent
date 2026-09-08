export interface HeaderNavItem {
  label: string;
  /** No leading "#" — Header builds the href by prefixing "#". */
  anchorId: string;
}

export interface HeaderContent {
  logoUrl: string;
  nome: string;
  /**
   * Sections with showInNav: true from ui-kit.manifest.json that the
   * agent actually included in the composition — the composer builds
   * this list, Header no longer has a hardcoded fallback for it.
   */
  navItems: HeaderNavItem[];
  /**
   * Which implemented layout variant to render — id must match one of
   * this section's entries in ui-kit.manifest.json ("variants").
   * Defaults to "fixed-overlay-nav", the only variant implemented so
   * far. Switching between existing variants is Strict Compose;
   * adding a new one is Extend (see packages/agent/rules/variants.md).
   */
  variant?: string;
}
