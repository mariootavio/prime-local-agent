# /prime-local create <cliente>

Instruções para o Claude Code seguir ao rodar `/prime-local create
<cliente>` num projeto onde `prime-local-agent init` já rodou (este
arquivo e os demais artefatos estão em `.prime-local/`, na raiz do
projeto). Isto **não é código** — é o roteiro da entrevista inicial e
da composição que a segue. As regras citadas abaixo (caminhos
relativos a este arquivo) são a fonte da verdade; não redefina o
conteúdo delas aqui.

- `../rules/content-rules.md`
- `../rules/whatsapp-cta.md`
- `../rules/seo-head.md`
- `../rules/variants.md`
- `../ui-kit.manifest.json`
- `../prime-local.schema.json`

## 1. Entrevista

Peça ao usuário, **nesta ordem**:

1. **Logo** (arquivo de imagem).
2. **Redes sociais** — Instagram e Facebook (URL ou @).
3. **Link do Google Maps** da localização do negócio.
4. **Documento de briefing** (PDF ou texto) — já deve trazer o
   conteúdo escrito das seções (headlines, descrições, diferenciais
   etc.), não apenas dados brutos.

### Cores

Depois do briefing, pergunte ao usuário se ele quer:

- fornecer a cor **primária** e a cor **secundária** manualmente
  (hex), ou
- deixá-las serem **extraídas automaticamente a partir da logo**.

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

## 2. Preencher `prime-local.json`

Leia o briefing e preencha `prime-local.json` seguindo
`../prime-local.schema.json`, em duas partes:

- **Campos de topo** (fatos): `nome`, `segmento`, `cidade`,
  `whatsapp`, `cores`, `logoUrl`, `instagram`, `facebook`,
  `googleMaps` e demais campos do schema que o briefing/entrevista
  sustentarem. Vêm diretamente do que o usuário forneceu — nunca
  inferidos ou complementados (`../rules/content-rules.md`, "Nunca
  inventar dados").
- **Objeto `sections`**: o conteúdo já escrito no briefing, mapeado
  1:1 para os componentes do UI Kit que vão consumi-lo (mesma forma
  do `*Content` de cada seção em
  `packages/ui-kit/src/sections/<Section>/types.ts` na origem do UI
  Kit). Para qualquer slot de seção sem conteúdo correspondente no
  briefing, aplique a regra de **preenchimento estrutural** de
  `../rules/content-rules.md` — texto de transição genérico permitido
  apenas quando não fizer nenhuma alegação factual sobre o negócio;
  o conteúdo que o cliente já escreveu nunca é alterado ou reescrito.

  > `prime-local.schema.json` hoje define apenas os campos de topo
  > (fatos) — não tem ainda uma definição formal para `sections`, e
  > seu `additionalProperties: false` na raiz rejeitaria essa chave
  > como está. Preencha `sections` mesmo assim seguindo o
  > mapeamento acima; sinalize no checkpoint final (passo 5) que o
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
`../rules/variants.md` e a regra de Strict Compose vs. Extend do
projeto).

## 5. Composição, CTAs e SEO

Ao montar a página:

- Siga `../rules/whatsapp-cta.md` para todo CTA/link de WhatsApp.
- Siga `../rules/seo-head.md` para title, meta tags e JSON-LD.
- Modo padrão é **Strict Compose**: componha só com o que já existe
  no UI Kit. Extend só se explicitamente pedido pelo usuário.

## 6. Checkpoint final

Antes de considerar a criação concluída, apresente ao usuário:

- Um resumo do que foi gerado (seções incluídas, variante de cada
  uma, origem das cores).
- Toda pendência encontrada — dado ausente preenchido com
  placeholder, avaliações reais não obtidas para Prova Social, a
  observação de schema do passo 2, etc.

Nada é commitado antes dessa aprovação explícita do usuário.
