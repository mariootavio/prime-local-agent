# WhatsApp CTA rules

Regras para qualquer chamada para ação de WhatsApp gerada pelo agente
ao compor uma página. O campo `whatsapp` e o campo opcional
`mensagemPrincipalWhatsapp` vêm de `prime-local.json`, validado contra
`../../ui-kit/prime-local.schema.json`.

## Link

Todo CTA de WhatsApp usa o número do campo `whatsapp`, no formato:

```
https://wa.me/55[DDD+NÚMERO]?text=[MENSAGEM]
```

O número não deve conter espaços, parênteses ou traços — apenas
dígitos, com o prefixo `55`. A mensagem vai em `text`, URL-encoded.

## Mensagem por seção

Usar `mensagemPrincipalWhatsapp` quando definida. Quando ausente,
gerar uma mensagem curta e específica ao contexto da seção em que o
CTA aparece (ex: menção ao produto ou serviço daquele bloco) —
nunca repetir a mesma mensagem genérica em todos os CTAs da página.

## Cor

A cor de qualquer botão/CTA de WhatsApp é sempre `--color-whatsapp`
(`#25D366`, definido em `../../ui-kit/src/styles/tokens.css`) — a cor
oficial da marca WhatsApp. Essa cor é fixa e **nunca** é substituída
pelo `accent` (ou qualquer outro token) da paleta do cliente definida
em `cores` (`prime-local.json`): ela não faz parte da identidade
visual do cliente, então não muda quando a paleta muda. No primitive
`Button` de `../../ui-kit/src/primitives/Button/`, isso corresponde
à variante `"whatsapp"`.

## Ícone

Sempre o ícone oficial preenchido (filled) do WhatsApp. Nunca a
versão contornada (outline), um emoji, ou um ícone genérico de chat
ou telefone.

## Botão flutuante

Implementado pelo primitive `WhatsAppFloatingButton` em
`../../ui-kit/src/primitives/WhatsAppFloatingButton/`.

**É um elemento global, não uma seção.** Diferente das entradas de
`ui-kit.manifest.json`, ele não passa pela lógica de seleção
condicional por briefing (`whenToUse`) — é sempre renderizado em toda
página, independente de quais seções o agente escolheu compor. Ele
usa `whatsapp` e `nome` (ambos obrigatórios em
`prime-local.schema.json`), então nunca falta dado para exibi-lo.

Fixo no canto inferior direito, com espaçamento seguro da borda da
tela (respeitando `env(safe-area-inset-*)` em dispositivos com notch).
`aria-label` no formato `"Falar com [nome] pelo WhatsApp"`. Sem
animação pulsante contínua. Área de toque confortável para mobile
(mínimo ~44×44px). Nunca sobrepor outros elementos interativos da
página (ex: outros botões fixos, banners de cookies).

## Atributos do link

Todo link de WhatsApp abre em nova aba (`target="_blank"`) com
`rel="noopener noreferrer"`.
