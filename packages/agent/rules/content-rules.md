# Content rules

Regras de conteúdo para o agente ao interpretar um briefing e compor
uma página com `packages/ui-kit/ui-kit.manifest.json` e
`packages/ui-kit/prime-local.schema.json` (caminhos relativos:
`../../ui-kit/ui-kit.manifest.json` e `../../ui-kit/prime-local.schema.json`).
Não redefina aqui a lista de campos ou seções — consulte esses dois
arquivos como fonte da verdade.

## Nunca inventar dados

Nunca preencher números, estatísticas, preços, descontos, avaliações,
depoimentos, certificações, premiações, tempo de mercado, prazos,
garantias, resultados, endereço, telefone, horário ou história da
empresa que não estejam presentes em `prime-local.json` (validado
contra `prime-local.schema.json`). Se o dado não está lá, ele não
existe para efeito de composição.

## Preenchimento estrutural permitido

Quando o template de uma seção possui um slot que o briefing do
cliente não preencheu (ex: uma subheadline de apoio em uma seção que
só trouxe o heading principal), o agente **pode** gerar um texto de
transição genérico para aquele slot, **desde que** esse texto não
faça nenhuma alegação factual sobre o negócio (sem números, sem
diferenciais, sem promessas). Isso é diferente de invenção de dado,
que continua proibida pela regra acima. O conteúdo já fornecido pelo
cliente nunca é alterado ou reescrito — permanece exatamente como
veio, na posição correspondente do template.

## Síntese de conteúdo sem campo próprio no schema

Algumas seções do manifest (Benefícios, Como Funciona, Sobre a
Empresa, FAQ) não têm um campo dedicado no schema — o conteúdo delas
é sintetizado pelo agente. Essa síntese deve se basear
**exclusivamente** nos campos já preenchidos (`produtos`, `servicos`,
`diferenciaisConfirmados`, `nome`, `segmento`). Nunca complementar com
informação genérica de mercado, clichês do segmento, ou suposição
sobre como o negócio opera. Se os campos disponíveis não sustentam
uma seção com substância, siga `whenToUse` da seção em
`ui-kit.manifest.json` e não a inclua.

## Campo ausente em seção obrigatória

Header, Hero e Footer (as únicas seções com `required: true` em
`ui-kit.manifest.json`) sempre entram na composição, mesmo que falte
algum campo que normalmente as alimentaria. Nesse caso: usar um
placeholder textual visível no lugar do dado ausente (nunca inventar
o valor) e registrar a pendência ao final da composição, para
correção humana no checkpoint de aprovação.

## Menu do Header

O menu do Header exibe **todas** as seções com `showInNav: true` em
`ui-kit.manifest.json` que o agente efetivamente incluiu na
composição daquele cliente — nunca um subconjunto fixo. Se a
composição incluiu 7 seções com `showInNav: true`, o menu tem 7
itens; se incluiu 3, tem 3. `label` vem de `navLabel` e o link de
`#` + `anchorId`, ambos do manifest — nunca reescritos ou
abreviados pelo agente.

A lista de apenas 4 itens (`inicio`, `servicos`, `diferenciais`,
`contato`) usada no mock de `apps/playground/app/mock/prime-local.mock.ts`
é exclusiva do ambiente de desenvolvimento do playground (que ainda
não renderiza as demais seções com `showInNav: true`) — não é o
comportamento a reproduzir numa composição real.

## Evitar "cara de IA"

Evitar os padrões visuais e textuais que denunciam geração
automática:

- excesso de gradientes
- cards idênticos repetidos em todas as seções
- excesso de ícones dentro de círculos
- textos todos centralizados
- frases genéricas ("excelência que faz a diferença", "sua melhor
  escolha", "soluções completas para você")
- emojis
- títulos vagos

## Copywriting

Português do Brasil, natural, direto, comercial. Sem exageros, sem
jargão desnecessário, sem repetição excessiva do nome da empresa, da
cidade ou da palavra-chave principal (`palavraChavePrincipal`) — a
repetição forçada de keyword é tão perceptível quanto útil é
indesejada aqui.
