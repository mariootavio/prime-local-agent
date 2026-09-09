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

## Placeholder de imagem ausente nunca é um arquivo gerado

Quando falta a foto/imagem de um slot (`imageUrl`,
`backgroundImageUrl` etc. — ver `*Content` da seção em
`packages/ui-kit/src/sections/<Section>/types.ts`), o agente **nunca**
fabrica um arquivo de imagem (SVG/PNG gerado, com ou sem texto
"(imagem pendente)" desenhado dentro dele) para preencher o campo.
Um arquivo de imagem inventado é, na prática, um dado inventado — a
mesma proibição da regra acima, só que em forma visual — e carrega um
risco concreto e já observado: um arquivo placeholder genérico
("imagem pendente", sem contexto de qual seção/item ele representa)
tende a ser reaproveitado sem querer em mais de um slot sem imagem
real (ex: o mesmo arquivo acabando referenciado tanto no
`backgroundImageUrl` do Hero quanto no `imageUrl` de um card de
Serviços), fazendo o mesmo texto de placeholder aparecer em duas
seções diferentes da página.

O comportamento correto é **deixar o campo ausente** (`undefined`,
nunca uma string vazia ou um caminho de arquivo fabricado) sempre que
o campo for opcional no `*Content` da seção — o próprio componente
renderiza seu placeholder textual internamente, contido dentro da
seção certa, sem depender de nenhum arquivo. Se o campo for
obrigatório e a seção for uma das obrigatórias do manifest (Header,
Hero, Footer — ver "Campo ausente em seção obrigatória" abaixo), use
um placeholder **textual**, nunca uma imagem gerada.

## Preenchimento estrutural obrigatório (subheadlines)

Quando o `*Content` de uma seção define um slot de subheadline (ex:
`subtitle` no Hero, `subheading` em Serviços e Diferenciais,
`subtitle` em Como Funciona — ver `types.ts` de cada seção em
`packages/ui-kit/src/sections/<Section>/`) e o briefing do cliente
não trouxe conteúdo correspondente, o agente **deve** gerar um texto
de transição genérico para aquele slot, **desde que** esse texto não
faça nenhuma alegação factual sobre o negócio (sem números, sem
diferenciais, sem promessas). Isso vale para **todas** as seções que
tiverem esse slot, sem exceção — deixar uma subheadline vazia quando
o componente suporta uma não é uma opção. Isso é diferente de
invenção de dado, que continua proibida pela regra acima. O conteúdo
já fornecido pelo cliente nunca é alterado ou reescrito — permanece
exatamente como veio, na posição correspondente do template.

### Limite: nunca em itens de lista com carga factual

Preenchimento estrutural existe apenas para texto de apoio/transição
(subheadlines). Ele **nunca** se aplica a itens de uma lista com
carga factual própria — diferenciais, destaques numéricos (ex:
`Hero.highlights`), avaliações, estatísticas, ou qualquer array cujo
conteúdo diz algo específico sobre o negócio. Um componente que
suporta até N itens (ex: `Hero.highlights`, até 4) e recebe menos do
que N itens reais do briefing deve renderizar **apenas** os itens
reais disponíveis — nunca inventar itens adicionais, genéricos ou
não, só para "completar" a lista até N. Um Hero com 2 highlights
reais renderiza 2, não 4; o slot vazio dos outros 2 simplesmente não
existe na página. Isso não é dado ausente em seção obrigatória (a
regra abaixo) — é a mesma regra de "Nunca inventar dados" do topo
deste arquivo, aplicada a itens de lista.

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
