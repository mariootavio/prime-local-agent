import type { HTMLAttributes, ReactNode } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Centers content and caps its width at --container-max-width (see
 * src/styles/tokens.css). Sections wrap their inner content in this
 * instead of applying width/padding ad hoc, so the content grid stays
 * consistent across the page.
 */
export function Container({ className, children, ...rest }: ContainerProps) {
  const classes = [
    "mx-auto w-full max-w-[var(--container-max-width)] px-4 sm:px-6 lg:px-8",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
