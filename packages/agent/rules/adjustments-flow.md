# Fluxo de `/prime-local:ajustes`

Roteiro detalhado da identificação e aplicação de um ajuste
pós-criação. Lido pelo Claude Code a partir do gatilho
`.claude/commands/prime-local/ajustes.md` no projeto-alvo — este
arquivo é a lógica real; o comando é só o disparador, para não
duplicar conteúdo. As regras citadas abaixo (caminhos relativos a
este arquivo, dentro de `.prime-local/rules/`) são a fonte da
verdade; não redefina o conteúdo delas aqui.

- `./content-rules.md`
- `./restyle.md`
- `./variants.md`
- `./whatsapp-cta.md`
- `./seo-head.md`
- `../ui-kit.manifest.json`
- `../prime-local.schema.json`

**Formato: opções sempre que o conjunto de respostas for limitado e
conhecido.** Mesma regra de `./create-flow.md`: toda pergunta com um
conjunto fechado de respostas — binária ou de escolha entre
alternativas — usa o mecanismo de seleção por opções do Claude Code
(ex: a tool `AskUserQuestion`), nunca texto livre corrido. Os passos
1 e 2 abaixo são exatamente esse caso. Só a descrição do ajuste em si
(passo 3) fica em formato aberto — o que exatamente deve mudar não é
uma escolha entre alternativas conhecidas de antemão.

## 1. Tipo de ajuste

Pergunte, em formato de opções, qual das três é a natureza do
ajuste desejado:

- **(a) Só troca de texto/conteúdo** — editar conteúdo já existente
  numa seção já presente, sem mudar sua apresentação visual.
- **(b) Ajuste visual numa seção existente** — mudar como uma seção
  já presente se apresenta (paleta, ênfase, variante escolhida,
  imagem usada), sem criar seção ou variante nova.
- **(c) Criar uma seção nova** — adicionar à composição uma seção que
  ainda não está presente, ou uma variante que ainda não existe para
  uma seção que já está.

O texto de cada opção apresentada ao usuário deve deixar essa
distinção clara o bastante para que a escolha não exija já conhecer
os termos internos (Strict Compose/Restyle/Extend) — esses nomes são
para uso interno do agente, não para aparecer na pergunta.

A resposta define o modo:

| Resposta | Modo           | Regras a consultar                          |
|----------|----------------|----------------------------------------------|
| (a)      | Strict Compose | `./content-rules.md`                          |
| (b)      | Restyle        | `./restyle.md` (que por sua vez indica quando consultar a skill `frontend-design`) |
| (c)      | Extend         | `./variants.md` (idem, skill `frontend-design`) |

## 2. Seção alvo

Determine as seções **atualmente presentes** na composição lendo o
código já gerado do projeto — `app/page.tsx` (ou equivalente,
conforme `./create-flow.md` passo 5.4) — nunca reaplicando o
`whenToUse` do manifest do zero: o que está de fato importado e
renderizado ali é a fonte da verdade sobre o que existe hoje, mesmo
que tenha mudado desde a criação inicial via ajustes anteriores.

Apresente essas seções ao usuário em formato de opções e pergunte
qual é o alvo do ajuste. Para o modo (c) Extend, inclua também uma
opção explícita de "seção nova, ainda não presente" — nesse caso não
há seção existente para selecionar; identifique com o usuário (texto
livre, já que o nome da seção nova não é uma alternativa conhecida
de antemão) qual seção do catálogo de `../ui-kit.manifest.json`
(entre as que ainda não têm variante implementada) ou, se for
realmente algo fora do manifest, confirme que isso é Extend antes de
prosseguir.

## 3. Descrever o ajuste

Pergunte, em texto livre, o que exatamente deve mudar na seção alvo.
Não force isso em opções — o conteúdo específico do pedido não é uma
escolha entre alternativas conhecidas.

## 4. Aplicar

Aplique o ajuste seguindo as regras do modo identificado no passo 1:

- **(a) Strict Compose**: edite o campo correspondente em
  `prime-local.json` (`sections.<Seção>` ou campo de topo) e
  regenere/atualize a seção em `app/page.tsx` a partir do novo dado —
  mesmas regras de `./content-rules.md` de sempre (nunca inventar
  dado, preenchimento estrutural só para subheadline, nunca para
  itens de lista com carga factual).
- **(b) Restyle**: siga `./restyle.md` integralmente, incluindo a
  consulta à skill `frontend-design` antes de decidir o ajuste.
- **(c) Extend**: siga `./variants.md` integralmente (seção "Criar
  uma variante nova é Extend"), incluindo a consulta à skill
  `frontend-design` antes de projetar a estrutura nova.

## 5. Checkpoint final

Mesmo padrão de `./create-flow.md` (passo 6): apresente ao usuário

- um resumo do que mudou (seção alvo, modo aplicado, de → para);
- a URL local do preview — reaproveite o servidor `npm run dev` já
  rodando se ele ainda estiver de pé; se não estiver, suba-o
  novamente antes deste checkpoint;
- toda pendência encontrada durante o ajuste.

Nada é commitado antes dessa aprovação explícita do usuário — o
ajuste fica pronto, rodando localmente, para revisão visual antes de
qualquer commit.
