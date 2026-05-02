# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Build / Tooling

- Updated `packageManager` to `npm@11.13.0`.
- Added Marketplace and Downloads badges to `README.md`.
- Added `playwright-report` to cspell ignore paths.
- Merged CLAUDE.md project context into AGENTS.md Section 10; CLAUDE.md is now a symlink to AGENTS.md.
- Synced GitHub Actions workflows with business-text: upgraded action pins (create-github-app-token v3.1.1,
  setup-node v6.4.0, changed-files v47.0.6, github-script v9.0.0, vitest-coverage-report-action v2.11.2),
  added coverage-detail job, concurrency block to coverage and pr-files workflows, fixed base-branch
  node-version-file, src/CHANGELOG.md support in publish workflow, .dockerignore in pr-files config.

### Code Quality

- Suppressed i18next/Locize marketing banner in Jest output (`jest-setup.js`).
- Replaced `@volkovlabs/eslint-config` with inline ESLint rules (`eslint-plugin-simple-import-sort`,
  naming conventions, `no-console`, `no-deprecated`) matching the business-forms/business-text pattern.
- Removed two unused `eslint-disable react-hooks/set-state-in-effect` comments (`DrawerTable.tsx`,
  `useContentSizes.ts`) that were orphaned after the `@volkovlabs/eslint-config` replacement.

### E2E / Docker

- Fixed E2E test "Should add new empty variable panel": use `e2e-empty.json` provisioned empty dashboard
  to avoid Grafana 13.x panel-editing flow incompatibility.
- Updated `playwright.config.ts`: added `forbidOnly`, CI-only retries (2), typed config with `PluginOptions`.
  Kept `workers: 1` — all tests share one Grafana instance and parallel execution causes state interference.
- Fixed `test/Dockerfile`: replaced invalid `--omit=prod` with `--prefer-offline`, added BuildKit npm cache
  mount, and removed redundant browser install step to match `business-table`.

### Dependencies

- Re-pinned `@grafana/tsconfig` to `2.0.1` (exact); 2.1.0 changed `moduleResolution` to `bundler`,
  incompatible with the scaffolded ts-node `commonjs` override and breaking `npm run build`.
- React 19 compatibility: applied `externalize-jsx-runtime` via `@grafana/create-plugin`, confirmed
  `grafanaDependency >=12.3.0`, removed deprecated `@types/testing-library__jest-dom`.
- Updated: `@grafana/i18n`, `@grafana/plugin-e2e`, `@swc/core`, `@swc/helpers`, `@tanstack/react-virtual`,
  `@types/node`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-plugin-react-hooks`,
  `prettier`, `sass`, `terser-webpack-plugin`, `webpack`.
