#!/usr/bin/env node
"use strict";

/**
 * Runs on "prepack" — packs the sibling @prime2b/ui-kit package with
 * `npm pack` and drops the tarball at vendor/ui-kit.tgz, so it ships
 * embedded inside this package (see package.json "files") and
 * bin/init.js can `npm install` it into a target project with no
 * network/registry access needed.
 */

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const AGENT_DIR = path.resolve(__dirname, "..");
const UI_KIT_DIR = path.resolve(AGENT_DIR, "..", "ui-kit");
const VENDOR_DIR = path.join(AGENT_DIR, "vendor");
const VENDOR_TARBALL = path.join(VENDOR_DIR, "ui-kit.tgz");

if (!fs.existsSync(UI_KIT_DIR)) {
  console.error(`build-vendor: ${UI_KIT_DIR} não encontrado.`);
  process.exit(1);
}

fs.mkdirSync(VENDOR_DIR, { recursive: true });

// This script is itself invoked as the "prepack" lifecycle hook of an
// outer `npm pack`/`npm publish` — when that outer call is a
// `--dry-run`, npm propagates npm_config_dry_run=true to this child
// process's env, and since it's a plain env var (not a CLI flag),
// npm would inherit it into the nested `npm pack` below too and skip
// writing the tarball. Force it off so the vendor tarball always gets
// actually written, dry-run or not.
const output = execSync(
  `npm pack "${UI_KIT_DIR}" --json --no-dry-run --pack-destination "${VENDOR_DIR}"`,
  {
    cwd: AGENT_DIR,
    encoding: "utf8",
    env: { ...process.env, npm_config_dry_run: "false" },
  }
);

const [{ filename }] = JSON.parse(output);
const packedPath = path.join(VENDOR_DIR, filename);

fs.rmSync(VENDOR_TARBALL, { force: true });
fs.renameSync(packedPath, VENDOR_TARBALL);

console.log(`vendor/ui-kit.tgz atualizado a partir de ${UI_KIT_DIR} (era ${filename}).`);
