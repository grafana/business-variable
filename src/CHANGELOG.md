# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Project Updates

- Updated CI/CD workflows.
- Updated development scripts and tooling.
- Synced GitHub Actions workflows with business-text: upgraded action pins (create-github-app-token v3.1.1,
  setup-node v6.4.0, changed-files v47.0.6, github-script v9.0.0, vitest-coverage-report-action v2.11.2),
  added coverage-detail job, concurrency block to coverage and pr-files workflows, fixed base-branch
  node-version-file, src/CHANGELOG.md support in publish workflow, .dockerignore in pr-files config.
- Merged CLAUDE.md project context into AGENTS.md Section 10; CLAUDE.md is now a symlink to AGENTS.md.
