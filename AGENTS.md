# AGENTS.md — Business Variable Panel Plugin

Grafana panel plugin (TypeScript + React) for dynamic dashboard variable control.
Built with `@grafana/create-plugin` scaffolding, Webpack, Jest, and Playwright.

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

1. External packages (`@grafana/*`, `@emotion/*`, `react`, etc.)
2. Internal absolute imports (`../../hooks`, `../../types`, etc.)
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

- Use `interface` for object shapes; `type` for unions/intersections
- Every exported interface/type property needs a JSDoc `@type`:

  ```typescript
  interface Props {
    /** Options @type {PanelOptions} */
    options: PanelOptions;
  }
  ```

- Avoid `any` — it triggers a warning. Use `unknown` or proper generics instead
- `@typescript-eslint/no-empty-object-type` is disabled in this project

### Component Patterns

- Functional components only, typed as `React.FC<Props>`
- Props interface defined in the same file, above the component
- Destructure props in the function signature
- Use `useStyles2(getStyles)` for Emotion CSS-in-JS styling
- Styles in a separate `*.styles.ts` file exporting
  `getStyles(theme: GrafanaTheme2)`
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

- Jest + `@testing-library/react` + `@volkovlabs/jest-selectors`
- Test files co-located next to source: `Component.test.tsx`
- Use centralized `TEST_IDS` from `src/constants/tests.ts`
  for all `data-testid` selectors
- Use `getJestSelectors(TEST_IDS.componentName)` for
  type-safe selector access
- Mock external modules with `jest.mock()` at top of file
  with JSDoc label:

  ```typescript
  /** Mock @grafana/runtime */
  jest.mock('@grafana/runtime', () => ({ ... }));
  ```

- Use `describe()` blocks for grouping; `it()` or `test()` for individual cases
- Test names start with "Should": `it('Should apply only first value', ...)`
- Use `beforeEach` to clear mocks between tests
- Hook tests use `renderHook()` from `@testing-library/react`
- Timezone forced to UTC in jest config (`process.env.TZ = 'UTC'`)

### Error Handling

- Display user-facing errors via Grafana `<Alert>` component
- No `console.log` or `console.error` — `no-console` is enforced as an error
- No `debugger` statements

### Additional Rules

- `no-console` and `no-debugger` are errors
- `@typescript-eslint/no-deprecated` is a warning — avoid using deprecated APIs
- Unused variables are errors (except rest siblings)
- Do not edit files in `.config/` — they are scaffolded by `@grafana/create-plugin`
