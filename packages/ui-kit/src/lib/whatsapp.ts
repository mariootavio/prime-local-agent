/**
 * Builds a wa.me link per packages/agent/rules/whatsapp-cta.md:
 * https://wa.me/55[DDD+NÚMERO]?text=[MENSAGEM] — digits only in the
 * number (no spaces, parentheses or dashes), prefixed with 55.
 */
export function buildWhatsAppUrl(whatsapp: string, message: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  const number = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Generic fallback for CTAs with no mensagemPrincipalWhatsapp — only
 * used when that field isn't filled in prime-local.json.
 */
export function defaultWhatsAppMessage(nome: string): string {
  return `Olá! Vim pelo site da ${nome} e gostaria de mais informações.`;
}
