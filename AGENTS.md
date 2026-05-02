# AGENTS.md — Business Variable Panel Plugin

Drop-in operating instructions for coding agents. Read this file before every task.

**Working code only. Finish the job. Plausibility is not correctness.**

This file follows the [AGENTS.md](https://agents.md) open standard (Linux Foundation / Agentic AI Foundation).
Claude Code, Codex, Cursor, Windsurf, Copilot, Aider, Devin, Amp read it natively. For tools that look
elsewhere, symlink:

```bash
ln -s AGENTS.md CLAUDE.md
ln -s AGENTS.md GEMINI.md
```

---

## 0. Non-negotiables

These rules override everything else in this file when in conflict:

1. **No flattery, no filler.** Skip openers like "Great question", "You're absolutely right", "Excellent idea",
   "I'd be happy to". Start with the answer or the action.
2. **Disagree when you disagree.** If the user's premise is wrong, say so before doing the work. Agreeing
   with false premises to be polite is the single worst failure mode in coding agents.
3. **Never fabricate.** Not file paths, not commit hashes, not API names, not test results, not library
   functions. If you don't know, read the file, run the command, or say "I don't know, let me check."
4. **Stop when confused.** If the task has two plausible interpretations, ask. Do not pick silently and proceed.
5. **Touch only what you must.** Every changed line must trace directly to the user's request. No drive-by
   refactors, reformatting, or "while I was in there" cleanups.

---

## 1. Before writing code

**Goal: understand the problem and the codebase before producing a diff.**

- State your plan in one or two sentences before editing. For anything non-trivial, produce a numbered list
  of steps with a verification check for each.
- Read the files you will touch. Read the files that call the files you will touch. Claude Code: use
  subagents for exploration so the main context stays clean.
- Match existing patterns in the codebase. If the project uses pattern X, use pattern X, even if you'd do
  it differently in a greenfield repo.
- Surface assumptions out loud: "I'm assuming you want X, Y, Z. If that's wrong, say so." Do not bury
  assumptions inside the implementation.
- If two approaches exist, present both with tradeoffs. Do not pick one silently. Exception: trivial tasks
  (typo, rename, log line) where the diff fits in one sentence.

---

## 2. Writing code: simplicity first

**Goal: the minimum code that solves the stated problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code. No configurability, flexibility, or hooks that were not requested.
- No error handling for impossible scenarios. Handle the failures that can actually happen.
- If the solution runs 200 lines and could be 50, rewrite it before showing it.
- If you find yourself adding "for future extensibility", stop. Future extensibility is a future decision.
- Bias toward deleting code over adding code. Shipping less is almost always better.

The test: would a senior engineer reading the diff call this overcomplicated? If yes, simplify.

---

## 3. Surgical changes

**Goal: clean, reviewable diffs. Change only what the request requires.**

- Do not "improve" adjacent code, comments, formatting, or imports that are not part of the task.
- Do not refactor code that works just because you are in the file.
- Do not delete pre-existing dead code unless asked. If you notice it, mention it in the summary.
- Do clean up orphans created by your own changes (unused imports, variables, functions your edit made obsolete).
- Match the project's existing style exactly: indentation, quotes, naming, file layout.

The test: every changed line traces directly to the user's request. If a line fails that test, revert it.

---

## 4. Goal-driven execution

**Goal: define success as something you can verify, then loop until verified.**

Rewrite vague asks into verifiable goals before starting:

- "Add validation" becomes "Write tests for invalid inputs (empty, malformed, oversized), then make them pass."
- "Fix the bug" becomes "Write a failing test that reproduces the reported symptom, then make it pass."
- "Refactor X" becomes "Ensure the existing test suite passes before and after, and no public API changes."
- "Make it faster" becomes "Benchmark the current hot path, identify the bottleneck with profiling, change it,
  show the benchmark is faster."

For every task:

1. State the success criteria before writing code.
2. Write the verification (test, script, benchmark, screenshot diff) where practical.
3. Run the verification. Read the output. Do not claim success without checking.
4. If the verification fails, fix the cause, not the test.

---

## 5. Tool use and verification

- Prefer running the code to guessing about the code. If a test suite exists, run it. If a linter exists,
  run it. If a type checker exists, run it.
- Never report "done" based on a plausible-looking diff alone. Plausibility is not correctness.
- When debugging, address root causes, not symptoms. Suppressing the error is not fixing the error.
- For UI changes, verify visually: screenshot before, screenshot after, describe the diff.
- Use CLI tools (gh, aws, gcloud, kubectl) when they exist. They are more context-efficient than reading
  docs or hitting APIs unauthenticated.
- When reading logs, errors, or stack traces, read the whole thing. Half-read traces produce wrong fixes.

---

## 6. Session hygiene

- Context is the constraint. Long sessions with accumulated failed attempts perform worse than fresh
  sessions with a better prompt.
- After two failed corrections on the same issue, stop. Summarize what you learned and ask the user to
  reset the session with a sharper prompt.
- Use subagents (Claude Code: "use subagents to investigate X") for exploration tasks that would otherwise
  pollute the main context with dozens of file reads.
- When committing, write descriptive commit messages (subject under 72 chars, body explains the why). No
  "update file" or "fix bug" commits. No "Co-Authored-By: Claude" attribution unless the project
  explicitly wants it.

---

## 7. Communication style

- Direct, not diplomatic. "This won't scale because X" beats "That's an interesting approach, but have you
  considered...".
- Concise by default. Two or three short paragraphs unless the user asks for depth. No padding, no
  restating the question, no ceremonial closings.
- When a question has a clear answer, give it. When it does not, say so and give your best read on the tradeoffs.
- Celebrate only what matters: shipping, solving genuinely hard problems, metrics that moved. Not feature
  ideas, not scope creep, not "wouldn't it be cool if".
- No excessive bullet points, no unprompted headers, no emoji. Prose is usually clearer than structure for short answers.

---

## 8. When to ask, when to proceed

**Ask before proceeding when:**

- The request has two plausible interpretations and the choice materially affects the output.
- The change touches something you've been told is load-bearing, versioned, or has a migration path.
- You need a credential, a secret, or a production resource you don't have access to.
- The user's stated goal and the literal request appear to conflict.

**Proceed without asking when:**

- The task is trivial and reversible (typo, rename a local variable, add a log line).
- The ambiguity can be resolved by reading the code or running a command.
- The user has already answered the question once in this session.

---

## 9. Self-improvement loop

**This file is living. Keep it short by keeping it honest.**

After every session where the agent did something wrong:

1. Ask: was the mistake because this file lacks a rule, or because the agent ignored a rule?
2. If lacking: add the rule under "Project Learnings" below, written as concretely as possible
   ("Always use X for Y" not "be careful with Y").
3. If ignored: the rule may be too long, too vague, or buried. Tighten it or move it up.
4. Every few weeks, prune. For each line, ask: "Would removing this cause the agent to make a mistake?" If
   no, delete. Bloated AGENTS.md files get ignored wholesale.

Boris Cherny (creator of Claude Code) keeps his team's file around 100 lines. Under 300 is a good ceiling.
Over 500 and you are fighting your own config.

---

## 10. Project context

Grafana panel plugin (TypeScript + React) for dynamic dashboard variable control. Built with
`@grafana/create-plugin` scaffolding, Webpack, Jest, and Playwright.

### Stack

- Language and version: TypeScript + React
- Framework(s): Grafana panel plugin (`@grafana/create-plugin`), Webpack, Jest, Playwright
- Package manager: npm 11.9.0
- Runtime / deployment target: Node >=24; Grafana dashboard panel

### Commands

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

# Markdown lint and spell check (run before every commit)
npm run markdownlint
npm run spellcheck
```

Prefer single-file or single-test runs during iteration. Full suites are for the final verification pass.

### Layout

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

- Source lives in: `src/`
- Tests live in: co-located with source (`ComponentName.test.tsx`)
- Do not modify: `.config/` (Grafana scaffolding — managed by Grafana plugin tooling)

### Conventions specific to this repo

#### Formatting (Prettier)

- Print width: 120
- Single quotes, ES5 trailing commas, semicolons
- 2-space indentation, no tabs
- Double quotes in JSX

#### Import Ordering

Imports are auto-sorted by `eslint-plugin-simple-import-sort` and enforced as errors. Groups in this order:

1. External packages (`@grafana/*`, `@emotion/*`, `react`, etc.)
2. Internal absolute imports (`../../hooks`, `../../types`, etc.)
3. Relative imports (`./ComponentName.styles`)

Always import from barrel `index.ts` files when available:

```typescript
import { useRuntimeVariables, useStatus } from '../../hooks';
import { PanelOptions, DisplayMode } from '../../types';
import { selectVariableValues } from '../../utils';
```

#### Naming Conventions (enforced by ESLint)

| Element | Convention | Example |
| --- | --- | --- |
| Variables, funcs | `strictCamelCase` | `getVariablesMap` |
| Components (TSX) | `StrictPascalCase` | `ButtonView` |
| Types, interfaces | `StrictPascalCase` | `PanelOptions` |
| Enums | `StrictPascalCase` | `DisplayMode` |
| Enum members | `UPPER_CASE` | `DisplayMode.TABLE` |
| Constants (global) | `UPPER_CASE` | `ALL_VALUE_PARAMETER` |
| Type parameters | `T` or `K` prefix | `TValue`, `KKey` |
| Files: components | `PascalCase.tsx` | `ButtonView.tsx` |
| Files: hooks | `camelCase.ts` | `useAutoSave.ts` |
| Files: utils | `kebab-case.ts` | `event-utils.ts` |
| Files: tests | `*.test.ts(x)` | `ButtonView.test.tsx` |
| Files: styles | `*.styles.ts` | `ButtonView.styles.ts` |

#### TypeScript Patterns

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
- `@typescript-eslint/no-empty-object-type` is disabled

#### Component Patterns

- Functional components only, typed as `React.FC<Props>`
- Props interface defined in the same file, above the component
- Destructure props in the function signature
- Use `useStyles2(getStyles)` for Emotion CSS-in-JS styling
- Styles in a separate `*.styles.ts` file exporting `getStyles(theme: GrafanaTheme2)`
- Wrap callbacks in `useCallback` with explicit dependency arrays
- All testable elements must use `data-testid={TEST_IDS.section.element}`
- Each component gets its own directory with `index.ts` barrel export

#### JSDoc Comments

All exported symbols (functions, components, constants, interfaces, enums) must have a JSDoc block comment.
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

#### Testing Patterns

- Jest + `@testing-library/react` + `@volkovlabs/jest-selectors`
- Test files co-located next to source: `Component.test.tsx`
- Use centralized `TEST_IDS` from `src/constants/tests.ts` for all `data-testid` selectors
- Use `getJestSelectors(TEST_IDS.componentName)` for type-safe selector access
- Mock external modules with `jest.mock()` at top of file with JSDoc label:

  ```typescript
  /** Mock @grafana/runtime */
  jest.mock('@grafana/runtime', () => ({ ... }));
  ```

- Define a `getComponent` factory returning a rendered component with sensible defaults
- Use `describe()` blocks for grouping; `it()` or `test()` for individual cases
- Test names start with "Should": `it('Should apply only first value', ...)`
- Assert with `screen.getByTestId(TEST_IDS.xxx.yyy)`
- Use `beforeEach` to clear mocks between tests
- Use `act()` + `render()` for components with async side effects
- Hook tests use `renderHook()` from `@testing-library/react`
- Timezone forced to UTC in jest config (`process.env.TZ = 'UTC'`)

#### Error Handling

- Use **try/catch** in async effects; store errors in state
- Display user-facing errors via Grafana `<Alert severity="error">` component
- Format: `error instanceof Error ? error.message : \`${error}\``
- Effects that subscribe must return cleanup functions calling `unsubscribe()`
- No `console.log` or `console.error` — `no-console` is enforced as an error
- No `debugger` statements — `no-debugger` is enforced as an error

#### Markdown Lint

Run `npm run markdownlint` on any `.md` file you create or modify (including `AGENTS.md`, `README.md`,
`CHANGELOG.md`) and fix all reported issues before committing.

#### Spell Check

Run `npm run spellcheck` before committing. Fix any issues and add new words to `cspell.config.json`
if they are legitimate.

#### ESLint

Flat config (ESLint 9) extending `@grafana/eslint-config/flat.js` and `eslint-config-prettier`,
with inline rules for import sorting and naming conventions. Key rules:

- `@typescript-eslint/no-empty-object-type: off`
- `@typescript-eslint/no-deprecated: warn` — avoid deprecated APIs
- Unused variables are errors (except rest siblings)
- Test files, mocks, config files, and server dirs are excluded from linting

#### CI/CD

- **CI** (`.github/workflows/push.yml`): Runs on push to `main` and all PRs. Uses
  `grafana/plugin-ci-workflows`.
- **CD** (`.github/workflows/publish.yml`): Manual dispatch to dev/ops/prod environments.
- The `.config/` directory is **scaffolded by Grafana** — do not edit files in it.

### Forbidden

- Edit anything inside `.config/`
- Change `id` or `type` in `src/plugin.json` (requires a Grafana server restart)
- Use a custom bundler (use webpack from `.config/`)
- Use `console.log`, `console.error`, or `debugger` in source
- Use `any` in TypeScript (use `unknown` or proper generics)
- Commit directly to `main`
- Commit without the user's explicit instruction
- Push without the user's explicit instruction
- Chain `git commit && git push` in one command
- Never add AI attribution (e.g., "Generated with Claude Code") to PR summaries, commit messages, or
  any other project artifacts
- Add AI attribution (e.g., "Generated with Claude Code") to PR summaries, commit messages, or any
  project artifact

### Policies

**Changelog:** This project maintains two changelog files:

- `CHANGELOG.md` — end-user facing. Features, bug fixes, breaking changes, Grafana compatibility.
- `src/CHANGELOG.md` — developer facing. Dependencies, CI/CD, build tooling, ESLint, Docker, test
  infrastructure. Subsections in order: `### Build / Tooling`, `### Code Quality`, `### E2E / Docker`,
  `### Dependencies`.

Every commit that modifies code, documentation, dependencies, or configuration must have a corresponding
entry in the appropriate file(s) under `## [Unreleased]`. Include it in the same commit or as a
follow-up commit before pushing.

**Typecheck:** Always run `npm run typecheck` when `src/` files are changed and fix any type errors
before committing.

**Branching:** Never commit directly to `main`. Use descriptive branch names (`feat/add-feature`,
`fix/bug-description`). Always open PRs as drafts (`gh pr create --draft`).

**After pushing, always update the PR summary** if a PR exists for the current branch. Treat push and
PR update as an atomic pair — never stop between them. Use `gh pr edit` to update the title and body
with well-formatted text reflecting all changes across the entire branch. Wrap PR summary lines at 120
characters — use the full width, do not wrap shorter than necessary.

**E2E:** Use `@grafana/plugin-e2e` for E2E tests. Grafana API docs:
<https://grafana.com/developers/plugin-tools/llms.txt>

---

## 11. Project Learnings

**Accumulated corrections. This section is for the agent to maintain, not just the human.**

When the user corrects your approach, append a one-line rule here before ending the session. Write it
concretely ("Always use X for Y"), never abstractly ("be careful with Y"). If an existing line already
covers the correction, tighten it instead of adding a new one. Remove lines when the underlying issue goes
away (model upgrades, refactors, process changes).

- Always keep `workers: 1` in `playwright.config.ts` — all E2E tests share one Grafana instance and
  parallel execution causes state interference (`locator.click: Test ended` in CI).

---

## 12. How this file was built

This boilerplate synthesizes:

- Sean Donahoe's IJFW ("It Just F\*cking Works") principles: one install, working code, no ceremony.
- Andrej Karpathy's observations on LLM coding pitfalls (the four principles: think-first, simplicity,
  surgical changes, goal-driven execution).
- Boris Cherny's public Claude Code workflow (reactive pruning, keep it ~100 lines, only rules that fix
  real mistakes).
- Anthropic's official Claude Code best practices (explore-plan-code-commit, verification loops, context
  as the scarce resource).
- Community anti-sycophancy patterns (explicit banned phrases, direct-not-diplomatic).
- The AGENTS.md open standard (cross-tool portability via symlinks).

Read once. Edit sections 10 and 11 for your project. Prune the rest over time. This file gets better the
more you use it.
