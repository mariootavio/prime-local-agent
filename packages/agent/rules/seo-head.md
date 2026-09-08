# SEO & head rules

Regras para o que o agente insere no `<head>` da página composta.
Todos os campos citados vêm de `prime-local.json`, validado contra
`../../ui-kit/prime-local.schema.json`. A presença ou ausência de
seções (ex: FAQ) segue a composição feita a partir de
`../../ui-kit/ui-kit.manifest.json`.

## Tags básicas

- `title`: campo `title`; se ausente, gerar a partir de `nome` +
  `segmento` + `cidade`.
- meta description: campo `metaDescription`.
- `canonical`: URL da página.
- Open Graph básico (`og:title`, `og:description`, `og:image`,
  `og:type`, `og:url`), reaproveitando `title`/`metaDescription` e uma
  imagem de `imagens` quando disponível.
- Twitter Card básico (`twitter:card`, `twitter:title`,
  `twitter:description`, `twitter:image`), mesma base de dados do OG.
- favicon gerado a partir de `logoUrl`.

## JSON-LD

Inserir os seguintes tipos, usando **somente** campos confirmados em
`prime-local.json` — nunca propriedade vazia, nunca valor inferido
sem base em dado real (uma propriedade sem dado correspondente
simplesmente não entra no JSON-LD, não é preenchida com placeholder):

- `LocalBusiness` (ou o subtipo mais específico do `@type` quando o
  `segmento` permitir identificá-lo com segurança, ex: `Restaurant`,
  `Dentist`; caso contrário, `LocalBusiness` genérico)
- `Organization`
- `WebSite`
- `WebPage`

### FAQPage

Incluir JSON-LD `FAQPage` **apenas** se a seção FAQ estiver presente
na composição (ou seja, apenas quando o agente decidiu incluí-la
seguindo o `whenToUse` de FAQ em `ui-kit.manifest.json`). Sem seção
FAQ na página, sem `FAQPage` no JSON-LD — o structured data nunca
descreve conteúdo que não está de fato na página.

### AggregateRating e Review

Nunca incluir `AggregateRating` ou `Review` no JSON-LD sem avaliações
reais vinculadas a `googleBusinessProfile`. Isso vale mesmo se a
seção Prova Social não estiver na composição — este bloco de
structured data segue a mesma condição de dado real que governa
aquela seção, independente de ela estar visível na página.
