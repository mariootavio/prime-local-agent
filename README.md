# Prime Local

Sistema que compõe sites one-page de SEO/GEO local para clientes da
Prime2B, combinando um UI Kit componentizado (theme-aware) com um CLI
orquestrador de IA.

## Arquitetura

```
packages/
  ui-kit/     @prime2b/ui-kit            — biblioteca de componentes React (Next.js + Tailwind), theme-aware por contrato.
  agent/      @prime2b/prime-local-agent — CLI orquestrador: instala rules/commands num projeto de cliente e conduz a composição via Claude Code.
apps/
  playground/                            — sandbox Next.js para desenvolver e validar visualmente os componentes do ui-kit; não é entregável de cliente.
```

## Como instalar em um projeto de cliente

```bash
npm install git+https://github.com/mariootavio/prime-local-agent.git#TAG:packages/agent
npx prime-local-agent init
```

`TAG` é um placeholder — use uma tag/commit real do repositório
(ex: `v0.1.0`). `init` instala as rules/commands do Prime Local e o
manifest/schema do UI Kit em `.prime-local/` na raiz do projeto, sem
tocar em nenhum outro arquivo; se `@prime2b/ui-kit` ainda não estiver
nas dependências do projeto, o comando avisa e sugere como instalar
(não instala sozinho).

## Modos de operação do agente

- **Strict Compose (padrão)** — compõe a página usando só o que já
  existe no UI Kit; nunca cria seção ou componente novo. É o modo
  ativo em toda criação e edição, a menos que Extend seja pedido
  explicitamente (ver `CLAUDE.md`, "Core rule: Strict Compose vs.
  Extend").
- **Extend** — cria uma seção/componente novo. Só ativa sob pedido
  explícito do usuário, nunca inferido de uma instrução ambígua
  (mesma referência acima). Trocar entre variantes já existentes de
  uma seção continua sendo Strict Compose — só criar uma variante
  nova é Extend (`packages/agent/rules/variants.md`).
- **Restyle** — ajuste visual pontual, sob pedido explícito.
  *(Placeholder: este modo ainda não tem um arquivo de regras em
  `packages/agent/rules/` — precisa ser escrito antes desta seção
  poder descrever o comportamento real.)*

## Catálogo de seções

Fonte: `packages/ui-kit/ui-kit.manifest.json` (14 seções) e o estado
atual de `packages/ui-kit/src/sections/`.

| Seção                  | anchorId          | Obrigatória | Status |
|-------------------------|-------------------|:-----------:|--------|
| Header                  | `header`          | Sim         | Implementada |
| Hero                     | `inicio`          | Sim         | Implementada |
| Produtos ou Serviços     | `servicos`        | Não         | Implementada |
| Banner de Conversão      | `banner-conversao`| Não         | Implementada |
| Área Atendida            | `area-atendida`   | Não         | Pendente |
| Diferenciais             | `diferenciais`    | Não         | Implementada |
| Benefícios               | `beneficios`      | Não         | Pendente |
| Como Funciona            | `como-funciona`   | Não         | Implementada |
| Sobre a Empresa          | `sobre`           | Não         | Implementada |
| Galeria                  | `galeria`         | Não         | Pendente |
| Prova Social             | `avaliacoes`      | Não         | Implementada |
| FAQ                      | `faq`             | Não         | Implementada |
| Localização e Contato    | `contato`         | Não         | Implementada (parcial — só o embed do mapa; bloco de endereço/contato ao lado ainda não) |
| Footer                   | `footer`          | Sim         | Implementada |

## Regras centrais

- **Nunca inventar dado** — nenhum número, avaliação, diferencial,
  endereço, horário etc. entra na composição sem estar em
  `prime-local.json` (`packages/agent/rules/content-rules.md`).
- **Site single-page com navegação por âncora** — cada seção
  incluída na composição vira um item de âncora no menu do Header,
  construído a partir de `anchorId`/`navLabel` do manifest
  (`packages/agent/rules/content-rules.md`, seção "Menu do Header").
- **Tokens de tema, zero cor hardcoded** — todo componente consome
  variáveis CSS (`--color-primary`/`secondary`/`text`/`accent`, mais
  os tokens fixos `--color-whatsapp` e
  `--color-text-on-light`/`--color-text-on-dark`) — nunca um valor de
  cor fixo direto no componente (`packages/ui-kit/src/styles/tokens.css`).
- **CTA de WhatsApp com regras próprias** — link, cor (sempre
  `--color-whatsapp`, nunca o `accent` do cliente), ícone e mensagem
  contextual seguem `packages/agent/rules/whatsapp-cta.md`.

## Desenvolvimento local

```bash
npm install
cd apps/playground
npm run dev
```

Abra `http://localhost:3000`.
