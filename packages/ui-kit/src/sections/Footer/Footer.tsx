import Image from "next/image";
import { Container } from "../../primitives/Container";
import { FadeInView } from "../../primitives/FadeInView";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "../../lib/whatsapp";
import { WhatsAppIcon } from "../../icons/WhatsAppIcon";
import { FacebookIcon } from "../../icons/FacebookIcon";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { Mail } from "lucide-react";
import type { FooterContent } from "./types";

export interface FooterProps {
  content: FooterContent;
}

export function Footer({ content }: FooterProps) {
  const {
    nome,
    logoUrl,
    whatsapp,
    enderecoCompleto,
    horario,
    email,
    instagram,
    facebook,
  } = content;

  const whatsappHref = buildWhatsAppUrl(whatsapp, defaultWhatsAppMessage(nome));
  const hasSocialLinks = Boolean(instagram || facebook);
  const hasLocationColumn = Boolean(enderecoCompleto || horario);

  return (
    <footer id="footer" className="scroll-mt-20 bg-secondary text-on-dark">
      <Container className="grid grid-cols-1 gap-10 py-16 md:grid-cols-3 md:gap-12 md:py-24">
        <FadeInView
          as="div"
          className="flex flex-col items-center gap-4 text-center md:items-start md:text-left"
        >
          <Image
            src={logoUrl}
            alt={nome}
            width={1920}
            height={386}
            sizes="120px"
            className="h-8 w-auto"
          />
          {/*
            Placeholder copy — no briefing field for a short institutional
            blurb exists in prime-local.schema.json yet. Swap this for a
            real content field once one is defined.
          */}
          <p className="max-w-xs font-body text-sm text-on-dark/70">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {hasSocialLinks && (
            <div className="flex items-center gap-4">
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${nome} no Facebook`}
                  className="text-on-dark/70 transition-colors hover:text-on-dark"
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
              )}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${nome} no Instagram`}
                  className="text-on-dark/70 transition-colors hover:text-on-dark"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          )}
        </FadeInView>

        {hasLocationColumn && (
          <FadeInView
            as="div"
            delayMs={90}
            className="flex flex-col items-center gap-6 text-center md:items-start md:text-left"
          >
            {enderecoCompleto && (
              <div>
                <h3 className="font-title text-base font-semibold text-on-dark">
                  Endereço
                </h3>
                <p className="mt-2 font-body text-sm text-on-dark/70">
                  {enderecoCompleto}
                </p>
              </div>
            )}
            {horario && (
              <div>
                <h3 className="font-title text-base font-semibold text-on-dark">
                  Horário de Funcionamento
                </h3>
                <p className="mt-2 font-body text-sm text-on-dark/70">
                  {horario}
                </p>
              </div>
            )}
          </FadeInView>
        )}

        <FadeInView
          as="div"
          delayMs={180}
          className="flex flex-col items-center gap-4 text-center md:items-start md:text-left"
        >
          <h3 className="font-title text-base font-semibold text-on-dark">
            Contato
          </h3>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Falar com ${nome} pelo WhatsApp`}
            className="flex items-center gap-2 font-body text-sm text-on-dark/70 transition-colors hover:text-on-dark"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0 text-[var(--color-whatsapp)]" />
            WhatsApp
          </a>
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 font-body text-sm text-on-dark/70 transition-colors hover:text-on-dark"
            >
              <Mail aria-hidden="true" className="h-5 w-5 shrink-0" />
              {email}
            </a>
          )}
        </FadeInView>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6">
          <FadeInView
            as="p"
            delayMs={250}
            className="text-center font-body text-xs text-on-dark/60"
          >
            {nome} - Todos os direitos reservados | Feito com ❤ pela Prime2B
          </FadeInView>
        </Container>
      </div>
    </footer>
  );
}
