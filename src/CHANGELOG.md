# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.2.0] - 2026-05-21

### Build / Tooling

- Updated `packageManager` to `npm@11.13.0`.
- Added Marketplace and Downloads badges to `README.md`.
- Added `playwright-report` to cspell ignore paths.
- Synced GitHub Actions workflows with business-text: upgraded action pins, added coverage-detail job,
  concurrency blocks, `src/CHANGELOG.md` support in publish workflow.
- Migrated publish workflow from auto-stamping changelog to pre-flight changelog validation.
- Bumped `vitest-coverage-report-action` to v2.12.0.

### Code Quality

- Suppressed i18next/Locize marketing banner in Jest output (`jest-setup.js`).
- Replaced `@volkovlabs/eslint-config` with inline ESLint rules.
- Removed two orphaned `eslint-disable react-hooks/set-state-in-effect` comments.

### E2E / Docker

- Fixed add-panel E2E test for Grafana 13.x using an empty provisioned dashboard.
- Standardized `playwright.config.ts`: `forbidOnly`, CI-only retries, typed with `PluginOptions`,
  `workers: 1` (tests share one Grafana instance — parallel execution causes state interference).
- Fixed `test/Dockerfile`: replaced invalid `--omit=prod` with `--prefer-offline`, added BuildKit
  npm cache mount, removed redundant browser install step.

### Dependencies

- Re-pinned `@grafana/tsconfig` to `2.0.1`; 2.1.0 changed `moduleResolution` to `bundler`,
  breaking `npm run build` via the scaffolded ts-node config.
- React 19 compatibility: applied `externalize-jsx-runtime`, confirmed `grafanaDependency >=12.3.0`,
  removed deprecated `@types/testing-library__jest-dom`.
- Updated: `@grafana/i18n`, `@grafana/plugin-e2e`, `@swc/core`, `@swc/helpers`,
  `@tanstack/react-virtual`, `@types/node`, `@typescript-eslint/*`, `eslint-plugin-react-hooks`,
  `prettier`, `sass`, `terser-webpack-plugin`, `webpack`.
