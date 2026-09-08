import type { Config } from "tailwindcss";

/**
 * Shared Tailwind preset for Prime Local's ui-kit.
 *
 * Every color/font here resolves through a CSS variable (defined in
 * ./src/styles/tokens.css) instead of a fixed value, so a consuming
 * project can override the variables per client without touching
 * this config. Consumers pull this in as a preset:
 *
 *   import uiKitPreset from "@prime2b/ui-kit/tailwind.config";
 *   export default { presets: [uiKitPreset], ... } satisfies Config;
 */
const config: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        text: "var(--color-text)",
        accent: "var(--color-accent)",
        // Fixed system constants, never overridden per client — see
        // the "Fixed tokens" block in ./src/styles/tokens.css.
        "on-light": "var(--color-text-on-light)",
        "on-dark": "var(--color-text-on-dark)",
      },
      fontFamily: {
        title: ["var(--font-title)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        base: "var(--font-size-base)",
        heading: "var(--font-size-heading)",
      },
    },
  },
};

export default config;
