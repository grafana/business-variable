# AGENTS.md — Business Variable Panel Plugin

Grafana panel plugin (TypeScript + React) for dynamic
dashboard variable control. Built with
`@grafana/create-plugin` scaffolding, Webpack, Jest,
and Playwright.

## Build / Lint / Test Commands

```bash
# Install dependencies (Node >=24, npm 11.9.0)
npm install

# Build for production
npm run build

# Development with watch mode
npm run dev

# Type checking (no emit)
npm run typecheck

# Lint (ESLint with caching)
npm run lint

# Lint + fix + format with Prettier
npm run lint:fix

# Run all tests in watch mode (only changed files)
npm test

# Run all tests in CI mode
npm run test:ci

# Run a single test file
npx jest src/path/to/file.test.ts

# Run a single test by name pattern
npx jest --testNamePattern="should handle click"

# Run tests matching a file pattern
npx jest --testPathPattern="ButtonView"

# Run E2E tests (Playwright)
npm run test:e2e

# Start local dev environment (Docker)
npm start
```

## Project Structure

```text
src/
├── module.ts              # Plugin entry point
├── migration.ts           # Options migration
├── types/                 # Types, enums, interfaces
│   └── index.ts           # Barrel exports
├── constants/             # Constants and test IDs
│   ├── panel.ts           # Panel config options
│   ├── variable.ts        # Variable constants
│   └── tests.ts           # TEST_IDS selectors
├── hooks/                 # React hooks
│   └── index.ts           # Barrel exports
├── utils/                 # Pure utility functions
│   └── index.ts           # Barrel exports
├── components/            # React components
│   ├── index.ts           # Barrel exports
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.styles.ts
│       ├── ComponentName.test.tsx
│       └── index.ts
└── __mocks__/             # Global jest mocks
```

## Code Style Guidelines

### Formatting (Prettier)

- Print width: 120
- Single quotes, ES5 trailing commas, semicolons
- 2-space indentation, no tabs
- Double quotes in JSX

### Import Ordering

Imports are auto-sorted by `eslint-plugin-simple-import-sort`
and enforced as errors. Groups in this order:

1. External packages (`@grafana/*`, `@emotion/*`,
   `react`, etc.)
2. Internal absolute imports (`../../hooks`,
   `../../types`, etc.)
3. Relative imports (`./ComponentName.styles`)

Always import from barrel `index.ts` files when available:

```typescript
import { useRuntimeVariables, useStatus } from '../../hooks';
import { PanelOptions, DisplayMode } from '../../types';
import { selectVariableValues } from '../../utils';
```

### Naming Conventions (enforced by ESLint)

| Element            | Convention         | Example                |
| ------------------ | ------------------ | ---------------------- |
| Variables, funcs   | `strictCamelCase`  | `getVariablesMap`      |
| Components (TSX)   | `StrictPascalCase` | `ButtonView`           |
| Types, interfaces  | `StrictPascalCase` | `PanelOptions`         |
| Enums              | `StrictPascalCase` | `DisplayMode`          |
| Enum members       | `UPPER_CASE`       | `DisplayMode.TABLE`    |
| Constants (global) | `UPPER_CASE`       | `ALL_VALUE_PARAMETER`  |
| Type parameters    | `T` or `K` prefix  | `TValue`, `KKey`       |
| Files: components  | `PascalCase.tsx`   | `ButtonView.tsx`       |
| Files: hooks       | `camelCase.ts`     | `useAutoSave.ts`       |
| Files: utils       | `kebab-case.ts`    | `event-utils.ts`       |
| Files: tests       | `*.test.ts(x)`     | `ButtonView.test.tsx`  |
| Files: styles      | `*.styles.ts`      | `ButtonView.styles.ts` |

### TypeScript Patterns

- Use `enum` for fixed option sets (not union types):

  ```typescript
  export enum DisplayMode {
    MINIMIZE = 'minimize',
    TABLE = 'table',
  }
  ```

- Use `interface` for object shapes; `type` for
  unions/intersections
- Every exported interface/type property needs a
  JSDoc `@type`:

  ```typescript
  interface Props {
    /** Options @type {PanelOptions} */
    options: PanelOptions;
  }
  ```

- Avoid `any` — it triggers a warning. Use `unknown`
  or proper generics instead
- `@typescript-eslint/no-empty-object-type` is disabled

### Component Patterns

- Functional components only, typed as `React.FC<Props>`
- Props interface defined in the same file, above the
  component
- Destructure props in the function signature
- Use `useStyles2(getStyles)` for Emotion CSS-in-JS styling
- Styles in a separate `*.styles.ts` file exporting
  `getStyles(theme: GrafanaTheme2)`
- Wrap callbacks in `useCallback` with explicit dependency
  arrays
- All testable elements must use
  `data-testid={TEST_IDS.section.element}`
- Each component gets its own directory with `index.ts`
  barrel export

### JSDoc Comments

All exported symbols (functions, components, constants,
interfaces, enums) must have a JSDoc block comment.
Internal sections within functions also use block comments:

```typescript
/**
 * Button View
 */
export const ButtonView: React.FC<Props> = ({ ... }) => {
  /**
   * Styles and Theme
   */
  const styles = useStyles2(getStyles);
```

### Testing Patterns

- Jest + `@testing-library/react` +
  `@volkovlabs/jest-selectors`
- Test files co-located next to source:
  `Component.test.tsx`
- Use centralized `TEST_IDS` from
  `src/constants/tests.ts` for all `data-testid` selectors
- Use `getJestSelectors(TEST_IDS.componentName)` for
  type-safe selector access
- Mock external modules with `jest.mock()` at top of
  file with JSDoc label:

  ```typescript
  /** Mock @grafana/runtime */
  jest.mock('@grafana/runtime', () => ({ ... }));
  ```

- Define a `getComponent` factory returning a rendered
  component with sensible defaults
- Use `describe()` blocks for grouping; `it()` or
  `test()` for individual cases
- Test names start with "Should":
  `it('Should apply only first value', ...)`
- Assert with `screen.getByTestId(TEST_IDS.xxx.yyy)`
- Use `beforeEach` to clear mocks between tests
- Use `act()` + `render()` for components with async
  side effects
- Hook tests use `renderHook()` from
  `@testing-library/react`
- Timezone forced to UTC in jest config
  (`process.env.TZ = 'UTC'`)

### Error Handling

- Use **try/catch** in async effects; store errors in
  state
- Display user-facing errors via Grafana
  `<Alert severity="error">` component
- Format:
  `error instanceof Error ? error.message : \`${error}\``
- Effects that subscribe must return cleanup functions
  calling `unsubscribe()`
- No `console.log` or `console.error` — `no-console`
  is enforced as an error
- No `debugger` statements — `no-debugger` is enforced
  as an error

### Markdown Lint

Run `npx markdownlint-cli` on any `.md` file you create
or modify (including `AGENTS.md`, `README.md`,
`CHANGELOG.md`) and fix all reported issues before
committing.

### Spell Check

Run `npx cspell@6.13.3 -c cspell.config.json` on any
file you create or modify and fix all reported issues
before committing. Add new words to `cspell.config.json`
if they are legitimate.

### ESLint

Flat config (ESLint 9) extending
`@grafana/eslint-config/flat.js`,
`@volkovlabs/eslint-config`, and
`eslint-config-prettier`. Key rules:

- `@typescript-eslint/no-empty-object-type: off`
- `@typescript-eslint/no-deprecated: warn` — avoid
  deprecated APIs
- Unused variables are errors (except rest siblings)
- Test files, mocks, config files, and server dirs
  are excluded from linting

### CI/CD

- **CI** (`.github/workflows/push.yml`): Runs on push
  to `main` and all PRs. Uses
  `grafana/plugin-ci-workflows`.
- **CD** (`.github/workflows/publish.yml`): Manual
  dispatch to dev/ops/prod environments.
- The `.config/` directory is **scaffolded by Grafana**
  — do not edit files in it.

## Critical Rules

- **Prefer subagents** for research, code exploration,
  and multi-step work. Launch multiple agents in
  parallel when tasks are independent.
- **Never modify anything inside `.config/`** — managed
  by Grafana plugin tooling.
- **Never change `id` or `type`** in `src/plugin.json`.
  Changes to `plugin.json` require a Grafana server
  restart.
- Use webpack from `.config/` for builds; do not add a
  custom bundler.
- Use `@grafana/plugin-e2e` for E2E tests.
- Grafana API docs:
  <https://grafana.com/developers/plugin-tools/llms.txt>
- **Always run markdownlint and cspell** before
  committing (see Markdown Lint and Spell Check
  sections above).
- **Always update `CHANGELOG.md`** when committing any
  change that modifies code, documentation, dependencies,
  or configuration. Include the changelog update in the
  same commit.
- **NEVER commit unless the user explicitly asks.**
- **NEVER push unless the user explicitly asks.** Never
  chain `git commit && git push` in one command.

## Changelog Policy

**Always update `CHANGELOG.md` when making changes.**
Every commit that modifies code, documentation,
dependencies, or configuration must have a corresponding
entry in the changelog under the current unreleased
version section. Add entries as part of the same commit
or as a follow-up commit before pushing.

## Branching Policy

- **Never commit directly to `main`**. Always create a
  new branch for changes.
- Use descriptive branch names (e.g.,
  `feat/add-feature`, `fix/bug-description`).
- When pushing new commits to a PR, always update the
  PR summary to reflect all changes.
- **Always create pull requests as drafts**
  (`gh pr create --draft`).
