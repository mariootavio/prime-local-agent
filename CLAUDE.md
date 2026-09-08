# Prime Local — CLAUDE.md

Monorepo (npm workspaces: `packages/*`, `apps/*`) for **Prime Local**, a
system that builds client websites by composing a shared, theme-aware
component library through an orchestrating CLI agent.

This file documents the **intended architecture and workflow**. Most of
what's described below — the CLI commands, the interview flow, the
composition engine — is **not implemented yet**. Treat this as the
blueprint to build toward, not a description of working code. Check
actual directory contents before assuming something exists.

## Workspace layout

```
packages/
  ui-kit/     @prime2b/ui-kit        — React component library (Next.js + Tailwind)
  agent/      @prime2b/prime-local-agent — CLI orchestrator
apps/
  playground/                        — Next.js sandbox for viewing ui-kit components
```

### packages/ui-kit — `@prime2b/ui-kit`

- Published internally as an npm package; consumed by client projects
  and by `apps/playground`.
- Built with Next.js + Tailwind.
- **Theme-aware by contract**: no component may hardcode colors.
  Every component consumes brand tokens (primary, secondary, neutral,
  etc.) supplied per project/client, so the same component set can
  render each client's own visual identity.
- **Visual origin**: components are being rebuilt from an existing
  Elementor template. The correct process is to extract visual tokens
  (color, spacing, typography) from that template and rebuild each
  section as a new, proper component — **never copy Elementor's
  generated markup directly**. Elementor markup is structurally unfit
  for a maintainable component library.

### packages/agent — `@prime2b/prime-local-agent`

- CLI orchestrator, invoked in a client project via
  `npx prime-local-agent init`.
- Injects Prime Local's rules/commands into the target project and
  verifies/installs `@prime2b/ui-kit` as a dependency.
- **Never modifies the client application's own source code** — its
  writes are scoped to the rules/commands/config it owns.
- Detailed step logic will live in:
  - `packages/agent/rules/` — behavior rules per mode/step
  - `packages/agent/prompts/` — interview and generation prompts
  (these don't exist yet — this doc describes the plan for them)

### apps/playground

- Next.js app used to visually develop and sanity-check `ui-kit`
  components as they're built. Not a client deliverable.

## Core rule: Strict Compose vs. Extend

The agent operates in one of two modes when generating or editing a
client page:

- **Strict Compose (default)** — the agent may only edit content and
  compose the page using components that **already exist** in the UI
  Kit. No new components or sections may be created.
- **Extend** — the agent may create a new section/component. This mode
  only activates when the user **explicitly** requests it — either
  during the initial interview or in a later edit instruction. It is
  never inferred implicitly from ambiguous phrasing.

This mode decision applies both at initial creation and at every
subsequent edit request.

## Command / pipeline model

Modeled on Opensquad's squad pipeline: staged steps with explicit
human-approval checkpoints before anything is committed.

1. **`npx prime-local-agent init`**
   Installs Prime Local's rules and commands into a client project
   (empty or existing), without touching the client app's source code.
   Verifies/installs `@prime2b/ui-kit` as a dependency.

2. **`/prime-local create <cliente>`**
   Triggers the initial interview: Logo, Briefing, Referência Visual,
   Imagens. Produces `prime-local.json` for the client and stores the
   received assets.

3. **Composition step (internal, runs after the interview)**
   The agent reads `prime-local.json` + the UI Kit manifest and
   assembles the page, defaulting to Strict Compose mode.

4. **Approval checkpoint**
   Before any commit, the agent presents the generated result and
   waits for explicit user approval — same checkpoint pattern as
   Opensquad.

5. **`/prime-local edit "<instrução>"`**
   Post-creation adjustment flow. Reapplies the same mode logic:
   Strict by default, Extend only when the instruction explicitly
   calls for new structure.

## Skills instaladas (skills.sh)

- seo-audit (coreyhaines31/marketingskills) — auditoria técnica e
  on-page de SEO tradicional.
- ai-seo (coreyhaines31/marketingskills) — otimização para citação
  por buscadores de IA (ChatGPT, Perplexity, Google AI Overviews,
  Claude, Gemini) — AEO/GEO/LLMO.

Escopo: estas são ferramentas de DIAGNÓSTICO e uso manual — acionadas
quando o usuário pedir explicitamente uma auditoria ou otimização de
SEO/GEO em um site (próprio ou de cliente). Elas NÃO fazem parte do
pipeline automático de composição do Prime Local Agent
(/prime-local create → composição → checkpoint de aprovação). A
geração de meta tags e JSON-LD durante a composição continua regida
exclusivamente por packages/agent/rules/seo-head.md, que é
determinístico/mecânico, não analítico.

Uso típico: auditar o site atual de um cliente antes de propor o
Prime Local (argumento de venda), ou auditar o site final gerado como
uma camada extra de QA, complementar ao checklist de
content-rules.md.

## Notes for future sessions

- If asked to implement any of the above, confirm current state first
  (`packages/agent`, `packages/ui-kit` are empty scaffolds as of this
  writing) rather than assuming prior progress.
- Rule/prompt details for each pipeline step belong in
  `packages/agent/rules/` and `packages/agent/prompts/` respectively —
  don't inline step-specific logic elsewhere once those exist.
- Elementor-sourced markup should never land in `ui-kit` verbatim; flag
  it if seen in a PR or diff.
