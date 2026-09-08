# Variants

Regras para como o agente lida com variantes de layout de uma seção,
registradas no campo `"variants"` de cada entrada de
`../../ui-kit/ui-kit.manifest.json` (array de `{ id, description }`)
e aceitas pela prop opcional `variant` no `*Content` de
`../../ui-kit/src/sections/<Section>/types.ts` de cada seção já
implementada. Não redefina aqui a lista de variantes — consulte o
manifest como fonte da verdade.

## Trocar entre variantes existentes é Strict Compose

Se uma seção já tem mais de uma variante implementada (mais de um
item em `"variants"` no manifest), escolher qual delas usar — na
composição inicial ou num pedido de edição — é **seleção**, não
criação de estrutura nova. Isso é Strict Compose, o modo padrão: não
exige o usuário pedir Extend explicitamente, só que a variante
escolhida já exista no manifest e no componente correspondente do UI
Kit.

Hoje toda seção implementada tem exatamente uma variante — não há
ainda escolha real a fazer. Esta seção do documento descreve o
comportamento para quando uma segunda variante existir.

## Criar uma variante nova é Extend

Implementar uma variante que ainda não existe no manifest (um novo
layout para uma seção que já tem uma ou mais variantes, ou uma
primeira variante para uma seção do manifest ainda sem nenhuma
implementada — ex: Área Atendida, Benefícios, Galeria) é criação de
estrutura nova. Isso só acontece em modo Extend, ativado
explicitamente pelo usuário — nunca inferido de um pedido ambíguo
(ver regra de Strict Compose vs. Extend em `CLAUDE.md`).

Uma variante nova, ao ser criada, deve:

- Seguir os padrões visuais já estabelecidos no UI Kit: tokens de
  tema (nunca cor fixa — ver `../../ui-kit/src/styles/tokens.css`),
  espaçamento vertical consistente com as demais seções
  (`py-16 md:py-24` para seções de conteúdo comuns), tipografia
  (`font-title`/`font-body`), e as regras de CTA de WhatsApp
  (`whatsapp-cta.md`) quando a seção tiver uma.
- Seguir os padrões de código já estabelecidos: um `*Content` em
  `types.ts` por seção, componente em `<Section>.tsx`, barrel
  `index.ts`, animação de entrada via o primitive
  `../../ui-kit/src/primitives/FadeInView`.
- Ser registrada como um novo item em `"variants"` no manifest, com
  `id` e `description` próprios — nunca substituindo ou removendo a(s)
  variante(s) já existente(s) da seção.
- Manter o `*Content` da seção compatível com a(s) variante(s)
  existente(s): campos específicos de uma variante nova entram como
  opcionais, nunca quebrando a assinatura usada pela variante atual.

## Campo `variant` no `*Content`

`variant?: string` aceita o `id` de qualquer item em `"variants"`
daquela seção no manifest. Quando ausente, o componente usa a única
variante implementada hoje (documentado no comentário do próprio
campo, em cada `types.ts`). O tipo é `string` solto, não um union
literal — adicionar uma variante nova nunca deve exigir mudar a
assinatura de `variant` nas seções existentes.
