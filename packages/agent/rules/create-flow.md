# Fluxo de `/prime-local:create <cliente>`

Roteiro detalhado da entrevista inicial e da composição que a segue.
Lido pelo Claude Code a partir do gatilho
`.claude/commands/prime-local/create.md` no projeto-alvo — este
arquivo é a lógica real; o comando é só o disparador, para não
duplicar conteúdo. As regras citadas abaixo (caminhos relativos a
este arquivo, dentro de `.prime-local/rules/`) são a fonte da
verdade; não redefina o conteúdo delas aqui.

- `./content-rules.md`
- `./whatsapp-cta.md`
- `./seo-head.md`
- `./variants.md`
- `../ui-kit.manifest.json`
- `../prime-local.schema.json`

## 1. Entrevista

**Regra obrigatória: uma pergunta por vez.** Faça **uma única**
pergunta, aguarde a resposta do usuário nessa mesma conversa, e só
então avance para a próxima. **Nunca** apresente duas ou mais das 6
perguntas abaixo na mesma mensagem — mesmo que pareçam relacionadas
entre si (ex: cores e redes sociais, ou Maps e imagens). Cada uma é
um turno de conversa separado, com resposta do usuário antes de
prosseguir para a seguinte.

**Formato: opções sempre que o conjunto de respostas for limitado e
conhecido.** Qualquer pergunta com um conjunto fechado de respostas
possíveis — binária (sim/não) ou de escolha entre alternativas
específicas — usa o mecanismo de seleção por opções do Claude Code
(ex: a tool `AskUserQuestion`), nunca uma pergunta de texto livre
corrido esperando que o usuário digite a resposta certa. Isso vale
para a Pergunta 2 (cores) abaixo e para o passo de mapeamento de
imagens da Pergunta 5. Só ficam em formato aberto (texto livre ou
anexo de arquivo) as perguntas cuja resposta não é uma escolha entre
alternativas conhecidas: Pergunta 1 (logo), Pergunta 3 (redes
sociais), Pergunta 4 (Google Maps) e Pergunta 6 (briefing) — a
Pergunta 5 (imagens) também é anexo de arquivo em si, mesmo com seu
sub-passo de mapeamento em opções. A mesma regra de formato vale para
`./adjustments-flow.md`.

Ordem fixa, sem pular nem antecipar:

### Pergunta 1 — Logo

Peça o arquivo da logo. Aguarde o envio antes de prosseguir para a
Pergunta 2 — ela depende da logo já estar em mãos.

Assim que o arquivo for anexado, identifique e registre seu caminho
local real (o anexo em si, não uma descrição dele) — é essa
referência que o passo 5.3 usa para copiar o arquivo para `public/`
e apontar `logoUrl` para o caminho público real. A logo aparecer
copiada em `public/` e referenciada em `logoUrl` ao final da
composição não é uma pendência opcional: se o arquivo foi recebido
aqui e isso não acontecer, é erro crítico a corrigir antes do
checkpoint (passo 6) — nunca um item da lista de pendências.

### Pergunta 2 — Cores

Só faça esta pergunta depois de a logo (Pergunta 1) já ter sido
recebida — a opção de extração automática depende dela; nunca
pergunte sobre cores antes disso.

Pergunte, em formato de opções (não texto livre — ver regra de
formato acima), se o usuário quer:

- fornecer a cor **primária** e a cor **secundária** manualmente
  (hex), ou
- deixá-las serem **extraídas automaticamente a partir da logo** já
  enviada na Pergunta 1.

Registre a escolha em `cores.colorSource` (`"manual"` ou `"logo"`)
em `prime-local.json`. `cores.accent`, quando o usuário não fornecer
um valor próprio, usa o mesmo valor de `cores.primary` como fallback
— não pergunte por ele separadamente a menos que o usuário quera
customizá-lo.

**Nunca pergunte sobre cor de texto.** Texto fixo sobre fundo
claro/escuro não é um dado de cliente — é sempre
`--color-text-on-light` ou `--color-text-on-dark`, tokens fixos do
sistema (`packages/ui-kit/src/styles/tokens.css` na origem do UI
Kit). `cores.text`, quando o schema aceitar, é opcional e não deve
ser solicitado ao usuário nesta entrevista.

### Pergunta 3 — Redes sociais

Pergunte Instagram e Facebook (URL ou @).

### Pergunta 4 — Google Maps

Pergunte o link do Google Maps da localização do negócio.

### Pergunta 5 — Imagens gerais do site

Pergunte por imagens gerais do negócio — fotos do ambiente, da
equipe, de produtos etc. — para uso em seções como Galeria e Sobre
Nós (`imagens` em `prime-local.json`). Deixe claro ao usuário que
esta pergunta é **opcional**.

**Mapeamento explícito, obrigatório antes de prosseguir para a
Pergunta 6.** Nomes de arquivo de imagem recebidos em uma entrevista
real costumam ser genéricos (`IMG_0001.jpg`, `foto.jpg`,
`WhatsApp Image 2024...jpeg`) e a ordem de envio não é confiável —
**nunca** infira a qual seção ou item cada imagem se destina pelo
nome do arquivo ou pela posição em que chegou. Assim que os arquivos
forem recebidos (e antes de seguir para a Pergunta 6):

1. Apresente ao usuário a lista das imagens recebidas — nome do
   arquivo e, quando o canal de conversa suportar, uma miniatura de
   contexto de cada uma.
2. Pergunte explicitamente, em formato de opções por imagem (não
   texto livre — ver regra de formato no início da Entrevista, acima
   — as alternativas são as seções/itens já sustentados pelo que se
   sabe do negócio até aqui, um conjunto fechado e conhecido), a qual
   seção/item de conteúdo cada imagem se destina (ex: "imagem 1 =
   fundo do Hero, imagem 2 = card Buffet e Gastronomia, imagem 3 =
   card Feiras...").
3. Registre esse mapeamento (arquivo recebido → seção/item de
   destino) — é isso que o passo 5.3 usa para copiar cada arquivo
   para o caminho `public/` certo e escrever o campo de imagem certo
   dentro de `sections` em `prime-local.json`, em vez de só despejar
   tudo na lista genérica `imagens`.

Se o cliente não tiver imagens próprias: o agente **nunca** inventa,
gera ou busca imagens de banco externo para substituí-las. Registre
a ausência como pendência a reportar no checkpoint final (passo 6),
mesma regra de dado ausente de `./content-rules.md`. Onde uma seção
depende dessas imagens via `whenToUse` (ex: Galeria), a ausência
simplesmente exclui a seção da composição (passo 3, abaixo); onde a
seção entra na composição por outros dados mas usaria uma imagem que
não veio (ex: a foto ao lado do texto em Sobre Nós), **deixe o campo
de imagem ausente** (`imageUrl`/`backgroundImageUrl` omitido em
`sections`, nunca uma string vazia) — é o componente do UI Kit que
renderiza o placeholder `"(imagem pendente)"` internamente quando o
campo falta. **Nunca gere um arquivo de imagem** (SVG/PNG) para
representar essa ausência — ver `./content-rules.md`, "Placeholder de
imagem ausente nunca é um arquivo gerado", inclusive o risco real de
o mesmo arquivo fabricado acabar reaproveitado em mais de uma seção.

**O placeholder `"(imagem pendente)"` só é usado quando o usuário
disser explicitamente que não tem aquela imagem.** Imagem que foi de
fato enviada mas ainda não tem seção/item definido nunca vira
`"(imagem pendente)"` por omissão — volte e complete o passo de
mapeamento acima (item 2) antes de considerar essa pergunta
encerrada.

### Pergunta 6 — Briefing

Peça o documento de briefing (PDF ou texto) — já deve trazer o
conteúdo escrito das seções (headlines, descrições, diferenciais
etc.), não apenas dados brutos.

Esta é a última das 6 perguntas. Depois de receber a resposta, siga
direto para os passos 2–6 abaixo (leitura do briefing, preenchimento
do `prime-local.json`, seleção de seções, variantes, composição e
checkpoint) — **sem nenhuma pausa ou pergunta intermediária** além
das 6 acima.

## 2. Preencher `prime-local.json`

Leia o briefing e preencha `prime-local.json` seguindo
`../prime-local.schema.json`, em duas partes:

- **Campos de topo** (fatos): `nome`, `segmento`, `cidade`,
  `whatsapp`, `cores`, `logoUrl`, `instagram`, `facebook`,
  `googleMaps` e demais campos do schema que o briefing/entrevista
  sustentarem. Vêm diretamente do que o usuário forneceu — nunca
  inferidos ou complementados (`./content-rules.md`, "Nunca
  inventar dados").
- **Objeto `sections`**: o conteúdo já escrito no briefing, mapeado
  1:1 para os componentes do UI Kit que vão consumi-lo (mesma forma
  do `*Content` de cada seção em
  `packages/ui-kit/src/sections/<Section>/types.ts` na origem do UI
  Kit). Para um slot de **subheadline** sem conteúdo correspondente
  no briefing, aplique a regra de **preenchimento estrutural
  obrigatório** de `./content-rules.md` — texto de transição genérico
  gerado sempre que o slot existir, desde que não faça nenhuma
  alegação factual sobre o negócio. Para um **item de lista** com
  carga factual (diferenciais, `Hero.highlights` etc.) sem contagem
  suficiente de itens reais no briefing, vale o limite oposto do mesmo
  arquivo: renderize só os itens reais, nunca complete a lista com
  itens inventados. Em ambos os casos, o conteúdo que o cliente já
  escreveu nunca é alterado ou reescrito.

  > `prime-local.schema.json` hoje define apenas os campos de topo
  > (fatos) — não tem ainda uma definição formal para `sections`, e
  > seu `additionalProperties: false` na raiz rejeitaria essa chave
  > como está. Preencha `sections` mesmo assim seguindo o
  > mapeamento acima; sinalize no checkpoint final (passo 6) que o
  > schema precisa de uma atualização compatível numa próxima
  > passada, em vez de tentar contornar isso silenciosamente.

## 3. Selecionar as seções

Consulte `../ui-kit.manifest.json`:

- **Header, Hero e Footer** sempre entram na composição
  (`required: true`).
- As demais seções só entram se o briefing sustentar o `whenToUse`
  daquela seção — nunca inclua uma seção "porque existe".

## 4. Variantes

Para cada seção selecionada, veja `"variants"` dela em
`../ui-kit.manifest.json`. Use a variante marcada como padrão (hoje,
a única variante implementada de cada seção) a menos que o briefing
ou o usuário indiquem preferência explícita por outra já existente.
Trocar entre variantes já existentes é seleção (Strict Compose);
nunca crie uma variante nova nesta etapa (isso é Extend — ver
`./variants.md` e a regra de Strict Compose vs. Extend do projeto).

## 5. Composição real do projeto

Modo padrão é **Strict Compose**: componha só com o que já existe no
UI Kit. Extend só se explicitamente pedido pelo usuário. Os passos
abaixo escrevem de fato os arquivos do projeto-alvo — diferente do
resto deste fluxo (que só lê/preenche `prime-local.json`), a partir
daqui o agente passa a gerar código da aplicação do cliente.

### 5.1 Scaffold Next.js

Verifique se já existe um projeto Next.js no diretório atual — o
mesmo em que `/prime-local:create` está rodando (presença de
`next.config.*` e/ou `next` em `dependencies`/`devDependencies` do
`package.json` local). Se existir, não mexa no scaffold — só siga
para 5.2.

Se não existir, crie um scaffold básico (App Router, TypeScript,
Tailwind) **neste mesmo diretório** — o projeto do cliente é este
diretório, nunca uma subpasta nova (`npx create-next-app@latest .`,
com as flags equivalentes a App Router + TypeScript + Tailwind +
sem `src/`, de forma não-interativa). Este diretório já contém
`.prime-local/`, `.claude/` e `prime-local.json` (criados pelo `init`
e pela entrevista) antes do scaffold rodar — se a ferramenta de
scaffold recusar um diretório não vazio, mova esses itens para fora
temporariamente, rode o scaffold, e devolva-os exatamente como
estavam; nunca delete ou sobrescreva conteúdo já existente no
diretório que não seja gerado por este próprio passo.

### 5.2 Dependência do UI Kit

Confirme que `@prime2b/ui-kit` está em `dependencies` do
`package.json` deste projeto. Isso já deveria ter sido feito por
`npx prime-local-agent init` (via `packages/agent/bin/init.js`,
instalando automaticamente a partir do tarball embutido no pacote do
agent). Se por algum motivo ainda estiver ausente, rode
`prime-local-agent init` novamente antes de prosseguir — não
prossiga a composição sem essa dependência resolvida.

### 5.3 Copiar assets recebidos para `public/`

Use os caminhos locais reais identificados na Pergunta 1 (logo) e o
mapeamento arquivo→seção/item registrado na Pergunta 5 (imagens) —
nunca nomes ou posições genéricas — para copiar cada arquivo para
`public/`:

- **Logo:** `public/logo.<extensão original>` (ex: `public/logo.png`).
  Atualize `logoUrl` em `prime-local.json` para o caminho público
  real (ex: `/logo.png`). Confirme o resultado: se a Pergunta 1
  recebeu um arquivo e, chegando aqui, `public/logo.<ext>` não existe
  ou `logoUrl` ainda não aponta para ele, **pare e corrija antes de
  seguir** — isso é erro crítico (ver Pergunta 1), não algo para
  listar como pendência no checkpoint.
- **Cada imagem mapeada:** `public/images/<nome-descritivo>.<extensão
  original>`, com o nome descritivo derivado da seção/item de destino
  definido na Pergunta 5 (ex: `public/images/servico-buffet.jpg` para
  a imagem mapeada ao card "Buffet e Gastronomia"), nunca do nome
  original do arquivo enviado. Escreva o caminho público resultante
  (ex: `/images/servico-buffet.jpg`) diretamente no campo de imagem
  daquela seção/item dentro de `sections` em `prime-local.json` (a
  mesma forma do `*Content` da seção — ex: o `imageUrl` do item
  correspondente em `ProductsServices`, ou o `imageUrl` de `About`) —
  não apenas no array genérico `imagens` do topo. O array `imagens`
  do topo continua existindo como inventário geral do schema, mas não
  substitui a escrita no campo específico da seção.

Nenhum desses campos fica apontando para um arquivo temporário da
conversa ou para um placeholder de entrevista quando o arquivo
correspondente foi de fato recebido — só para o caminho final servido
pelo Next.js.

### 5.4 Página principal

Gere `app/page.tsx` (ou equivalente) importando e renderizando cada
seção de `@prime2b/ui-kit/sections/<Section>`, na mesma ordem em que
aparecem em `../ui-kit.manifest.json`, incluindo **apenas** as
seções decididas no passo 3 — nunca todas as seções do manifest, nem
uma ordem diferente da do manifest. Cada seção recebe `content`
montado a partir dos campos de topo de `prime-local.json` e da
entrada correspondente em `sections` (passo 2). O menu do Header usa
**todas** as seções incluídas com `showInNav: true` (regra "Menu do
Header" de `./content-rules.md`) — nunca um subconjunto fixo como o
usado no mock de desenvolvimento do playground.

### 5.5 SEO e head

Aplique `./seo-head.md` em `app/layout.tsx` (ou equivalente): tags
básicas (`title`, meta description, canonical, Open Graph, Twitter
Card, favicon) via a API de metadata do Next.js, e o JSON-LD
(`LocalBusiness`/subtipo, `Organization`, `WebSite`, `WebPage`, e
`FAQPage`/`AggregateRating`+`Review` só quando as condições daquele
arquivo forem satisfeitas) num `<script type="application/ld+json">`
no head. Usar somente campos confirmados de `prime-local.json`, como
já descrito naquele arquivo.

### 5.6 Botão flutuante de WhatsApp

Aplique `./whatsapp-cta.md` ao `WhatsAppFloatingButton`: monte-o uma
única vez em `app/layout.tsx` (elemento global, fora do fluxo de
seções condicionais), alimentado por `whatsapp`, `nome` e
`mensagemPrincipalWhatsapp` de `prime-local.json`.

### 5.7 Rodar e expor o preview local

Rode `npm run dev` neste projeto. Confirme que o servidor subiu (sem
travar em erro de build) e informe ao usuário a URL local para
visualizar o resultado (tipicamente `http://localhost:3000`, ou a
porta que o Next.js realmente usar caso a 3000 esteja ocupada) — essa
URL faz parte do checkpoint final do passo 6, junto com o resumo de
pendências.

## 6. Checkpoint final

Antes de considerar a criação concluída, apresente ao usuário:

- Um resumo do que foi gerado (seções incluídas, variante de cada
  uma, origem das cores).
- A URL local do preview rodando (passo 5.7), para revisão visual.
- Toda pendência encontrada — dado ausente preenchido com
  placeholder, avaliações reais não obtidas para Prova Social, a
  observação de schema do passo 2, etc.

Nada é commitado antes dessa aprovação explícita do usuário — a
composição fica pronta, rodando localmente, para revisão visual no
preview acima antes de qualquer commit.
