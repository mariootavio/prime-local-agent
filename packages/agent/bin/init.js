#!/usr/bin/env node
"use strict";

/**
 * `prime-local-agent init`
 *
 * Installs Prime Local's rules/commands and the @prime2b/ui-kit
 * manifest/schema into the target project (the directory this is run
 * from), inside a single owned folder: <target>/.prime-local/.
 *
 * Per CLAUDE.md ("packages/agent — Never modifies the client
 * application's own source code — its writes are scoped to the
 * rules/commands/config it owns"): every write this script makes
 * lands under .prime-local/. The target project's own package.json
 * is only ever read (to check for @prime2b/ui-kit), never written —
 * missing the dependency is reported, not auto-installed.
 */

const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");

const AGENT_DIR = path.resolve(__dirname, "..");
const TARGET_DIR = process.cwd();
const INSTALL_DIR = path.join(TARGET_DIR, ".prime-local");

const UI_KIT_PACKAGE_NAME = "@prime2b/ui-kit";

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

function copyIfExists(srcPath, destPath, summary, label) {
  if (!srcPath || !fs.existsSync(srcPath)) {
    summary.skipped.push(`${label} (não encontrado${srcPath ? ` em ${srcPath}` : ""})`);
    return;
  }
  fse.copySync(srcPath, destPath);
  summary.copied.push(label);
}

function printUsage() {
  console.log("Uso: prime-local-agent init");
  console.log();
  console.log(
    "Instala as rules/commands do Prime Local e a config do UI Kit"
  );
  console.log(
    "(ui-kit.manifest.json, prime-local.schema.json) dentro de"
  );
  console.log(
    "<projeto-alvo>/.prime-local/. Não modifica nenhum outro arquivo"
  );
  console.log("do projeto.");
}

function runInit() {
  console.log(`Prime Local Agent — inicializando em ${TARGET_DIR}`);
  console.log();

  const summary = { copied: [], skipped: [] };

  fse.ensureDirSync(INSTALL_DIR);

  copyIfExists(
    path.join(AGENT_DIR, "rules"),
    path.join(INSTALL_DIR, "rules"),
    summary,
    "rules/"
  );
  copyIfExists(
    path.join(AGENT_DIR, "commands"),
    path.join(INSTALL_DIR, "commands"),
    summary,
    "commands/"
  );

  const uiKitDir = resolveUiKitDir();
  copyIfExists(
    uiKitDir && path.join(uiKitDir, "prime-local.schema.json"),
    path.join(INSTALL_DIR, "prime-local.schema.json"),
    summary,
    "prime-local.schema.json"
  );
  copyIfExists(
    uiKitDir && path.join(uiKitDir, "ui-kit.manifest.json"),
    path.join(INSTALL_DIR, "ui-kit.manifest.json"),
    summary,
    "ui-kit.manifest.json"
  );

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
  if (depCheck.found) {
    console.log(
      `✓ ${UI_KIT_PACKAGE_NAME} já está listado nas dependências deste projeto.`
    );
  } else if (depCheck.reason === "no-package-json") {
    console.warn(`Aviso: nenhum package.json encontrado em ${TARGET_DIR}.`);
    console.warn(`Rode "npm init" e depois:  npm install ${UI_KIT_PACKAGE_NAME}`);
  } else if (depCheck.reason === "invalid-package-json") {
    console.warn(
      `Aviso: não foi possível ler o package.json em ${TARGET_DIR} (JSON inválido).`
    );
    console.warn(`Verifique manualmente se ${UI_KIT_PACKAGE_NAME} está instalado.`);
  } else {
    console.warn(`Aviso: ${UI_KIT_PACKAGE_NAME} não está nas dependências deste projeto.`);
    console.warn(`Instale com:  npm install ${UI_KIT_PACKAGE_NAME}`);
  }

  console.log();
  console.log("Resumo da instalação:");
  console.log(`  Destino: ${path.relative(TARGET_DIR, INSTALL_DIR) || "."}${path.sep}`);
  for (const item of summary.copied) {
    console.log(`  ✓ copiado: ${item}`);
  }
  for (const item of summary.skipped) {
    console.log(`  ✗ não copiado: ${item}`);
  }
  console.log();
  console.log("Nenhum outro arquivo do projeto foi modificado.");
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
