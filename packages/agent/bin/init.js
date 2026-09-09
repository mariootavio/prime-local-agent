#!/usr/bin/env node
"use strict";

/**
 * `prime-local-agent init`
 *
 * Installs Prime Local's rules and the @prime2b/ui-kit
 * manifest/schema into the target project (the directory this is run
 * from), inside a single owned reference folder: <target>/.prime-local/.
 *
 * The other files this also writes outside .prime-local/ are:
 *   - the slash command triggers, at
 *     <target>/.claude/commands/prime-local/create.md and
 *     <target>/.claude/commands/prime-local/ajustes.md
 *   - the ai-seo, seo-audit and frontend-design skills, at
 *     <target>/.claude/skills/<name>/ for each
 * `.claude/commands/` and `.claude/skills/` are the directories
 * Claude Code actually scans to discover slash commands and skills
 * respectively — confirmed for skills by grepping the installed
 * `@anthropic-ai/claude-code` CLI binary itself for the literal
 * pattern, which contains ".claude/skills/<name>/SKILL.md" (and a
 * nested-plugin variant) and no ".agents/skills" equivalent
 * anywhere — the same way `.claude/commands/` was confirmed for slash
 * commands. This repo's own `.agents/skills/` + `.claude/skills/`
 * (symlinked into it) setup, from the `skills.sh` installer, is
 * consistent with that: `.agents/skills/` is that tool's own
 * vendor-neutral store, `.claude/skills/` is what Claude Code reads.
 * Real (non-symlink) copies of those three skills' folders ship
 * inside this package at skills/ — see package.json "files" — since a
 * symlink wouldn't survive `npm pack`/`npm install` into an unrelated
 * target project. The command triggers' content just points back at
 * .prime-local/ (see rules/create-flow.md and
 * rules/adjustments-flow.md) rather than duplicating any logic; the
 * skills are copied whole, unmodified.
 *
 * Per CLAUDE.md ("packages/agent — Never modifies the client
 * application's own source code — its writes are scoped to the
 * rules/commands/config it owns, [and it] verifies/installs
 * @prime2b/ui-kit as a dependency"): every write this script makes
 * either lands under .prime-local/, one of the .claude/ paths above,
 * or is the dependency install below. The target project's own
 * package.json is read to check for @prime2b/ui-kit; if missing,
 * it's installed with `npm install` straight from vendor/ui-kit.tgz —
 * the tarball this package ships embedded in itself (built by
 * scripts/build-vendor.js on prepack) — so no registry access and no
 * second manual command are needed. No other project file is ever
 * touched, and if .claude/commands/ or .claude/skills/ already have
 * other commands/skills in them, only the entries this package owns
 * (create.md, ajustes.md, ai-seo/, seo-audit/, frontend-design/) are
 * touched there.
 */

const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const { execSync } = require("child_process");

const AGENT_DIR = path.resolve(__dirname, "..");
const TARGET_DIR = process.cwd();
const INSTALL_DIR = path.join(TARGET_DIR, ".prime-local");

// Mirrors, on both ends, the path Claude Code actually scans for slash
// commands (<project>/.claude/commands/<namespace>/<name>.md) — the
// package's own source is laid out the same way so each copy below is
// a straight one-file copy, no path synthesis.
const CLAUDE_COMMANDS = [
  {
    slashCommand: "/prime-local:create",
    relativePath: path.join(".claude", "commands", "prime-local", "create.md"),
  },
  {
    slashCommand: "/prime-local:ajustes",
    relativePath: path.join(".claude", "commands", "prime-local", "ajustes.md"),
  },
];

// Same idea, for skills: <project>/.claude/skills/<name>/SKILL.md is
// the path Claude Code scans to discover project-level skills (see
// the file-header comment above for how that was confirmed). Each
// name here must have a matching folder shipped at
// packages/agent/skills/<name>/ (see package.json "files").
const SKILL_NAMES = ["ai-seo", "seo-audit", "frontend-design"];

const UI_KIT_PACKAGE_NAME = "@prime2b/ui-kit";
const VENDOR_TARBALL_PATH = path.join(AGENT_DIR, "vendor", "ui-kit.tgz");

/**
 * Locates the installed @prime2b/ui-kit package directory so its
 * ui-kit.manifest.json / prime-local.schema.json can be copied
 * alongside this package's own rules/commands.
 *
 * Tries real module resolution first (works once ui-kit is an actual
 * dependency somewhere Node can see from here — an npm workspaces
 * symlink today, a normal node_modules install once this package is
 * published). Falls back to the monorepo-relative sibling path so
 * this script also works run straight from source, before either
 * package has been installed anywhere.
 */
function resolveUiKitDir() {
  try {
    const pkgJsonPath = require.resolve(`${UI_KIT_PACKAGE_NAME}/package.json`, {
      paths: [TARGET_DIR, AGENT_DIR],
    });
    return path.dirname(pkgJsonPath);
  } catch {
    const fallback = path.resolve(AGENT_DIR, "..", "ui-kit");
    return fs.existsSync(fallback) ? fallback : null;
  }
}

/**
 * Read-only check — never writes to the target's package.json.
 */
function checkUiKitDependency() {
  const targetPkgJsonPath = path.join(TARGET_DIR, "package.json");
  if (!fs.existsSync(targetPkgJsonPath)) {
    return { found: false, reason: "no-package-json" };
  }

  let targetPkgJson;
  try {
    targetPkgJson = JSON.parse(fs.readFileSync(targetPkgJsonPath, "utf8"));
  } catch {
    return { found: false, reason: "invalid-package-json" };
  }

  const depFields = ["dependencies", "devDependencies", "peerDependencies"];
  const found = depFields.some(
    (field) =>
      targetPkgJson[field] && UI_KIT_PACKAGE_NAME in targetPkgJson[field]
  );

  return { found, reason: found ? "ok" : "missing" };
}

/**
 * Installs @prime2b/ui-kit into the target project straight from the
 * tarball vendored inside this package (vendor/ui-kit.tgz, resolved
 * via __dirname/AGENT_DIR so it works regardless of where this
 * package itself was installed) — no registry lookup, no interactive
 * prompt, no separate manual `npm install` step for the user.
 */
function installUiKitFromVendor() {
  if (!fs.existsSync(VENDOR_TARBALL_PATH)) {
    return { installed: false, reason: "vendor-missing" };
  }

  try {
    execSync(`npm install "${VENDOR_TARBALL_PATH}"`, {
      cwd: TARGET_DIR,
      stdio: "inherit",
    });
    return { installed: true };
  } catch {
    return { installed: false, reason: "install-failed" };
  }
}

/**
 * Copies srcPath -> destPath (file or directory) and records the
 * result in summary, keyed by destPath's path relative to TARGET_DIR
 * — that relative path IS the label, so the printed summary is
 * self-describing even though destinations now span two different
 * roots (.prime-local/ and .claude/commands/prime-local/).
 *
 * Only ever creates/overwrites destPath itself — for a single-file
 * destPath (the command trigger) this never touches sibling files,
 * satisfying "don't overwrite other commands already in
 * .claude/commands/".
 */
function copyIfExists(srcPath, destPath, summary) {
  const relDest = path.relative(TARGET_DIR, destPath);
  if (!srcPath || !fs.existsSync(srcPath)) {
    summary.skipped.push(
      `${relDest} (não encontrado${srcPath ? ` em ${srcPath}` : ""})`
    );
    return false;
  }
  fse.ensureDirSync(path.dirname(destPath));
  fse.copySync(srcPath, destPath);
  summary.copied.push(relDest);
  return true;
}

function printUsage() {
  console.log("Uso: prime-local-agent init");
  console.log();
  console.log("Instala, no projeto-alvo:");
  console.log(
    "  - .prime-local/  — rules, prime-local.schema.json e"
  );
  console.log("    ui-kit.manifest.json (base de referência);");
  console.log(
    "  - .claude/commands/prime-local/create.md e ajustes.md — os"
  );
  console.log(
    "    gatilhos de /prime-local:create e /prime-local:ajustes;"
  );
  console.log(
    "  - .claude/skills/ai-seo/ e .claude/skills/seo-audit/ — para"
  );
  console.log(
    "    auditoria de SEO sob demanda; .claude/skills/frontend-design/"
  );
  console.log(
    "    — para decisões de Extend/Restyle (nunca Strict Compose)."
  );
  console.log(
    `Também instala automaticamente ${UI_KIT_PACKAGE_NAME} (a partir do`
  );
  console.log("pacote embutido) quando ele ainda não é dependência do projeto.");
  console.log("Não modifica nenhum outro arquivo do projeto.");
}

function runInit() {
  console.log(`Prime Local Agent — inicializando em ${TARGET_DIR}`);
  console.log();

  const summary = { copied: [], skipped: [] };

  copyIfExists(
    path.join(AGENT_DIR, "rules"),
    path.join(INSTALL_DIR, "rules"),
    summary
  );

  const uiKitDir = resolveUiKitDir();
  copyIfExists(
    uiKitDir && path.join(uiKitDir, "prime-local.schema.json"),
    path.join(INSTALL_DIR, "prime-local.schema.json"),
    summary
  );
  copyIfExists(
    uiKitDir && path.join(uiKitDir, "ui-kit.manifest.json"),
    path.join(INSTALL_DIR, "ui-kit.manifest.json"),
    summary
  );

  // The slash command triggers — writes outside .prime-local/. Each a
  // single-file copy, so any other commands already sitting in
  // .claude/commands/ (or a prime-local/ subfolder with commands of
  // its own) are left untouched.
  const installedCommands = CLAUDE_COMMANDS.filter(({ relativePath }) =>
    copyIfExists(
      path.join(AGENT_DIR, relativePath),
      path.join(TARGET_DIR, relativePath),
      summary
    )
  );

  // The bundled skills — each a whole-folder copy into
  // .claude/skills/<name>/, so any other skills already installed
  // there (by skills.sh or otherwise) are left untouched.
  for (const skillName of SKILL_NAMES) {
    copyIfExists(
      path.join(AGENT_DIR, "skills", skillName),
      path.join(TARGET_DIR, ".claude", "skills", skillName),
      summary
    );
  }

  if (!uiKitDir) {
    console.warn(
      `Aviso: não foi possível localizar o pacote ${UI_KIT_PACKAGE_NAME} para copiar seu manifest/schema.`
    );
    console.warn(
      `Instale-o (veja abaixo) e rode "prime-local-agent init" novamente.`
    );
  }

  const depCheck = checkUiKitDependency();
  console.log();
  let installResult = null;
  if (depCheck.found) {
    console.log(
      `✓ ${UI_KIT_PACKAGE_NAME} já está listado nas dependências deste projeto.`
    );
  } else if (depCheck.reason === "invalid-package-json") {
    console.warn(
      `Aviso: não foi possível ler o package.json em ${TARGET_DIR} (JSON inválido).`
    );
    console.warn(`Verifique manualmente se ${UI_KIT_PACKAGE_NAME} está instalado.`);
  } else {
    console.log(
      `${UI_KIT_PACKAGE_NAME} não está nas dependências deste projeto — instalando automaticamente...`
    );
    installResult = installUiKitFromVendor();
    if (installResult.installed) {
      console.log(
        `✓ ${UI_KIT_PACKAGE_NAME} instalado a partir do pacote embutido em vendor/ui-kit.tgz.`
      );
    } else if (installResult.reason === "vendor-missing") {
      console.warn(
        `Aviso: pacote embutido de ${UI_KIT_PACKAGE_NAME} não encontrado (${VENDOR_TARBALL_PATH}).`
      );
      console.warn(`Instale manualmente com:  npm install ${UI_KIT_PACKAGE_NAME}`);
    } else {
      console.warn(`Aviso: falha ao instalar ${UI_KIT_PACKAGE_NAME} automaticamente.`);
      console.warn(`Instale manualmente com:  npm install ${UI_KIT_PACKAGE_NAME}`);
    }
  }

  console.log();
  console.log("Resumo da instalação:");
  for (const item of summary.copied) {
    console.log(`  ✓ copiado: ${item}`);
  }
  for (const item of summary.skipped) {
    console.log(`  ✗ não copiado: ${item}`);
  }
  if (installResult) {
    console.log(
      installResult.installed
        ? `  ✓ dependência instalada: ${UI_KIT_PACKAGE_NAME} (a partir de vendor/ui-kit.tgz)`
        : `  ✗ dependência não instalada: ${UI_KIT_PACKAGE_NAME}`
    );
  }
  console.log();
  for (const { slashCommand } of installedCommands) {
    console.log(`Comando disponível: ${slashCommand}`);
  }
  if (installResult && installResult.installed) {
    console.log(
      `Nenhum outro arquivo do projeto foi modificado — a única exceção é a instalação automática de ${UI_KIT_PACKAGE_NAME} acima (package.json/package-lock.json/node_modules).`
    );
  } else {
    console.log("Nenhum outro arquivo do projeto foi modificado.");
  }
}

function main() {
  const command = process.argv[2];

  if (command !== "init") {
    printUsage();
    process.exit(command ? 1 : 0);
  }

  runInit();
}

main();
