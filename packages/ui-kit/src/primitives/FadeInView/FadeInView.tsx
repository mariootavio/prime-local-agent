"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/** Tags used across sections that need a fade-in wrapper without adding nesting. */
type FadeInViewTag = "div" | "span" | "h1" | "h2" | "h3" | "p" | "li";

export interface FadeInViewProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /**
   * Which element to render as — lets FadeInView drop in as a direct
   * replacement for the tag it's wrapping (e.g. `as="h1"` for a
   * heading, `as="li"` for a list item) instead of adding an extra
   * wrapping <div> that could disturb flex/grid layout. Defaults to
   * "div".
   */
  as?: FadeInViewTag;
  /**
   * Extra transition-delay in ms, for staggering siblings in a list
   * (e.g. `index * 90` for a ~90ms stagger between items). Omit for a
   * single, non-staggered reveal.
   */
  delayMs?: number;
}

/**
 * Fades and slides content up the first time it enters the viewport —
 * lightweight scroll-reveal via IntersectionObserver + a CSS
 * transition, no animation library. Disconnects the observer as soon
 * as it fires once, so the effect never replays on scroll back up.
 *
 * prefers-reduced-motion is handled entirely in CSS via Tailwind's
 * motion-reduce: variant (forces the final, visible state with no
 * transition) — not JS — so it can't race the IntersectionObserver
 * and always wins regardless of scroll position.
 */
export function FadeInView({
  as = "div",
  children,
  className,
  delayMs,
  style,
  ...rest
}: FadeInViewProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const mergedStyle: CSSProperties | undefined = delayMs
    ? { ...style, transitionDelay: `${delayMs}ms` }
    : style;

  const classes = [
    "transition duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0",
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = as;

  return (
    <Tag ref={ref as never} className={classes} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}
