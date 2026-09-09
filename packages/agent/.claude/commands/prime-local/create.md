# /prime-local:create <cliente>

Gatilho descoberto pelo Claude Code em `.claude/commands/` — a
lógica detalhada não vive aqui, para não duplicar conteúdo. Ao rodar
`/prime-local:create <cliente>`:

1. Confirme que `.prime-local/` existe na raiz deste projeto (criado
   por `npx prime-local-agent init`). Se não existir, avise o
   usuário e pare — peça para rodar o init primeiro.
2. Leia `.prime-local/rules/create-flow.md` — o roteiro completo da
   entrevista e da composição — e siga-o do início ao fim.
3. `create-flow.md` referencia, por sua vez, as demais regras em
   `.prime-local/rules/` (`content-rules.md`, `whatsapp-cta.md`,
   `seo-head.md`, `variants.md`), além de
   `.prime-local/prime-local.schema.json` e
   `.prime-local/ui-kit.manifest.json`. Leia cada um desses arquivos
   conforme `create-flow.md` indicar — eles são a fonte da verdade,
   não repita o conteúdo deles aqui nem em `create-flow.md`.

`<cliente>` é o nome do cliente/negócio para quem o site está sendo
criado.
