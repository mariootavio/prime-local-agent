# /prime-local:ajustes

Gatilho descoberto pelo Claude Code em `.claude/commands/` — a
lógica detalhada não vive aqui, para não duplicar conteúdo. Ao rodar
`/prime-local:ajustes`:

1. Confirme que `.prime-local/` existe na raiz deste projeto (criado
   por `npx prime-local-agent init`) e que já existe uma composição
   prévia para ajustar (`prime-local.json` na raiz do projeto). Se
   qualquer um dos dois faltar, avise o usuário e pare — peça para
   rodar `npx prime-local-agent init` e/ou `/prime-local:create`
   primeiro.
2. Leia `.prime-local/rules/adjustments-flow.md` — o roteiro completo
   de identificação e aplicação do ajuste — e siga-o do início ao
   fim.
3. `adjustments-flow.md` referencia, por sua vez, as demais regras em
   `.prime-local/rules/` (`content-rules.md`, `restyle.md`,
   `variants.md`, `whatsapp-cta.md`, `seo-head.md`), além de
   `.prime-local/prime-local.schema.json` e
   `.prime-local/ui-kit.manifest.json`. Leia cada um desses arquivos
   conforme `adjustments-flow.md` indicar — eles são a fonte da
   verdade, não repita o conteúdo deles aqui nem em
   `adjustments-flow.md`.

Diferente de `/prime-local:create <cliente>`, este comando não recebe
argumento — ele opera sobre a composição já existente no projeto
atual.
