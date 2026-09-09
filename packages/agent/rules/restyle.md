# Restyle

Regras para o modo **Restyle**: ajuste visual significativo numa
seção já presente na composição do cliente, sob pedido explícito
(na criação inicial ou, mais comumente, via `/prime-local:ajustes` —
ver `./adjustments-flow.md`). Referenciado como modo em `README.md`
("Modos de operação do agente") e em `CLAUDE.md` ("Core rule: Strict
Compose vs. Extend") como o terceiro modo, ao lado de Strict Compose
e Extend.

## O que Restyle NÃO é

Este arquivo existe para dar a Restyle uma definição operacional
real, distinta dos outros dois modos:

- **Não é Strict Compose.** Trocar entre variantes já existentes de
  uma seção, ou apenas preencher/atualizar conteúdo, é seleção — isso
  já é Strict Compose (`./variants.md`, "Trocar entre variantes
  existentes é Strict Compose") e não precisa de pedido explícito nem
  deste arquivo.
- **Não é Extend.** Restyle nunca cria uma seção nova, um componente
  novo, nem uma entrada nova em `"variants"` de
  `../ui-kit.manifest.json`. Criar estrutura nova continua sendo
  Extend, mesmo quando motivado por uma necessidade visual
  (`./variants.md`, "Criar uma variante nova é Extend"). Se, ao
  investigar um pedido de Restyle, ficar claro que nenhuma combinação
  dos parâmetros já expostos pela seção entrega o resultado pedido,
  isso não é mais Restyle — pare e explique ao usuário que o pedido
  exige Extend (uma variante nova), aguardando confirmação explícita
  antes de criar qualquer estrutura.
- **Nunca edita o código-fonte do UI Kit.** `packages/ui-kit` é uma
  biblioteca compartilhada entre todos os clientes — editar o `.tsx`
  ou CSS de uma seção ali afetaria todo cliente que usa aquele
  componente, não só o atual. Restyle atua inteiramente através da
  superfície já exposta pelo componente ao projeto-alvo: os campos do
  `*Content` daquela seção (`packages/ui-kit/src/sections/<Section>/types.ts`),
  o campo `variant`, e a paleta de marca (`cores` em
  `prime-local.json`).

## O que Restyle é

Reconsiderar, com critério de design real — não com o padrão
automático de composição —, os parâmetros que a seção **já** expõe:

- **`cores`** (`primary`, `secondary`, `accent`, `colorSource`) em
  `prime-local.json`: recalibrar deliberadamente a paleta do cliente
  dentro do que o schema aceita, quando a combinação atual (ex:
  extraída automaticamente da logo, sem curadoria) está lendo como
  genérica para aquele negócio específico.
- **`variant`**: reavaliar qual variante já implementada serve melhor
  à identidade do cliente — mecanicamente isso é Strict Compose
  (`./variants.md`), mas dentro de um pedido de Restyle essa escolha é
  feita com o mesmo rigor de design das demais, não por padrão.
- **Demais campos do `*Content` da seção** que já afetam apresentação
  visual sem exigir código novo: quais `highlights`/itens reais
  destacar e em que ordem, qual imagem usar (dentre as já mapeadas —
  `./create-flow.md`, Pergunta 5), rótulos de CTA, etc. — sempre
  dentro dos limites de `./content-rules.md` (nunca inventar dado
  para preencher um Restyle).

## Consultar a skill `frontend-design`

Todo Restyle consulta a skill `frontend-design` antes de decidir o
ajuste — é o processo de design (fundamentar no negócio real, evitar
os defaults genéricos de IA listados na skill e em
`./content-rules.md` "Evitar cara de IA", revisar contra o brief,
criticar o resultado) que diferencia Restyle de simplesmente trocar
uma variante por hábito. **Nunca** consultar `frontend-design` durante
Strict Compose padrão — ali a composição é só seleção entre o que já
existe, sem decisão de design nova a tomar (ver `./variants.md` e
`./adjustments-flow.md`).

## Checkpoint

Restyle termina no mesmo padrão de checkpoint de `./create-flow.md`
(passo 6): resumo do que mudou (de → para, por campo/token
ajustado), preview local rodando para revisão visual, nada commitado
antes da aprovação explícita do usuário.
