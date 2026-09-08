import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import type { ThemeColorToken } from "../../theme/tokens";

/**
 * Buttons only fill with tokens meant for surfaces/CTAs, not "text"
 * (that token is for body copy color, not a fill). "whatsapp" is not a
 * client brand token — see --color-whatsapp in src/styles/tokens.css —
 * it's WhatsApp's own fixed brand color, never the client's accent
 * (packages/agent/rules/whatsapp-cta.md).
 */
export type ButtonVariant =
  | Extract<ThemeColorToken, "primary" | "secondary" | "accent">
  | "whatsapp";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-dark hover:opacity-90",
  secondary: "bg-secondary text-on-dark hover:opacity-90",
  accent: "bg-accent text-on-dark hover:opacity-90",
  whatsapp: "bg-[var(--color-whatsapp)] text-on-dark hover:opacity-90",
};

/**
 * Horizontal padding stays constant across sizes (32px, per the global
 * pill standard) — only vertical padding shrinks for "compact", the
 * variant used inside tighter contexts like ProductsServices cards.
 */
export type ButtonSize = "default" | "compact";

const SIZE_CLASSES: Record<ButtonSize, string> = {
  default: "px-8 py-4",
  compact: "px-8 py-3",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full font-body text-base font-medium transition-opacity";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
  };

type ButtonAsAnchor = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    BASE_CLASSES,
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
