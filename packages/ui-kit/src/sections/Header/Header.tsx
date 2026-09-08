"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "../../primitives/Container";
import { MenuIcon } from "../../icons/MenuIcon";
import type { HeaderContent } from "./types";

export interface HeaderProps {
  content: HeaderContent;
}

export function Header({ content }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logoUrl, nome, navItems } = content;

  const hasNavItems = navItems.length > 0;

  return (
    <header
      id="header"
      className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-secondary/30 backdrop-blur-md"
    >
      {/*
        Two top-level flex blocks — logo, nav — with justify-between
        spreading them left/right. No CTA competes for the right edge
        anymore (WhatsAppFloatingButton covers that globally), so nav
        sits flush right on desktop. On mobile the nav block is
        display:none (not just visually hidden in a way that still
        reserves flex space), so it drops out of the flex layout
        entirely and this naturally collapses to a logo/hamburger split.

        h-20 (not py-4 sized to content) fixes the row at a constant
        80px on every breakpoint — the mobile hamburger button (44px)
        and the desktop logo (40px) would otherwise produce two
        slightly different auto heights. Every section's scroll-mt-20
        assumes exactly this height so anchor jumps land right below
        the fixed header instead of partly behind it.
      */}
      <Container className="flex h-20 items-center justify-between gap-6">
        {/*
          logoUrl is a runtime string (per-client asset), not a static
          import, so Next.js can't infer its intrinsic size — width/height
          below are only an aspect-ratio hint. `h-10 w-auto` fixes the
          height to the header band and lets the browser resolve the real
          width from the loaded file, so it never stretches or distorts.
        */}
        <Image
          src={logoUrl}
          alt={nome}
          width={1920}
          height={386}
          priority
          sizes="160px"
          className="h-10 w-auto"
        />

        {hasNavItems && (
          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-8 font-body text-base text-on-dark/80">
              {navItems.map((item) => (
                <li key={item.anchorId}>
                  <a href={`#${item.anchorId}`} className="hover:text-on-dark">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {hasNavItems && (
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="header-mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-on-dark md:hidden"
          >
            <MenuIcon open={isMenuOpen} className="h-6 w-6" />
          </button>
        )}
      </Container>

      {hasNavItems && isMenuOpen && (
        <nav
          id="header-mobile-menu"
          aria-label="Navegação principal"
          className="border-t border-white/10 md:hidden"
        >
          <Container>
            <ul className="flex flex-col gap-1 py-4 font-body text-base text-on-dark/80">
              {navItems.map((item) => (
                <li key={item.anchorId}>
                  <a
                    href={`#${item.anchorId}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-md px-2 py-3 hover:bg-white/5 hover:text-on-dark"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
