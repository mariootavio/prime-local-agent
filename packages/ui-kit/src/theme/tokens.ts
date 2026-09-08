/**
 * Semantic names for the CSS variables defined in ../styles/tokens.css.
 * Section prop types reference this instead of hex values, so color
 * always resolves through the theme (see CLAUDE.md: "Theme-aware by
 * contract") rather than being hardcoded per section.
 */
export type ThemeColorToken = "primary" | "secondary" | "text" | "accent";
