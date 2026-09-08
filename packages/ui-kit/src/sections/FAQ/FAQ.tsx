"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "../../primitives/Container";
import { FadeInView } from "../../primitives/FadeInView";
import type { FAQContent } from "./types";

export interface FAQProps {
  content: FAQContent;
}

export function FAQ({ content }: FAQProps) {
  const { headline = "Perguntas Frequentes", subtitle, questions } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (questions.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-16 md:py-24">
      <Container>
        <FadeInView
          as="h2"
          className="mx-auto max-w-200 text-center font-title text-4xl font-semibold text-[var(--color-primary)] md:text-5xl"
        >
          {headline}
        </FadeInView>
        {subtitle && (
          <FadeInView
            as="p"
            delayMs={100}
            className="mx-auto mt-4 max-w-150 text-center font-body text-lg text-text"
          >
            {subtitle}
          </FadeInView>
        )}

        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              // Each item is its own primary-colored bar, not the whole
              // section — white text/icon for contrast on that surface.
              <FadeInView
                as="div"
                key={item.question}
                delayMs={index * 90}
                className="overflow-hidden rounded-2xl bg-[var(--color-primary)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-title text-lg font-semibold text-on-dark"
                >
                  {item.question}
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-on-dark transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p className="border-t border-gray-200 bg-white px-6 pb-5 pt-4 font-body text-sm text-text">
                    {item.answer}
                  </p>
                )}
              </FadeInView>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
