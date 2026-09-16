# AGENTS.md

Instructions for AI coding agents (Claude, Copilot, etc.) working with `@nexdom/shared`, either as a
**consumer** of the library in another project, or as a **contributor** inside this repository.

Jump to the section that matches your situation:

- [Using this library](#using-this-library) — you're working in a project that depends on `@nexdom/shared`.
- [Contributing to this library](#contributing-to-this-library) — you're making changes inside this repo.

---

## Using this library

`@nexdom/shared` is a TypeScript-first, ESM-only package with models, HTTP service helpers and utils
shared across NEXDOM projects. Full narrative docs (in Portuguese) live at
https://nexdom-healthtech.github.io/shared/.

### Install

```bash
vp add @nexdom/shared
# Or, if the project isn't using Vite+ yet:
npm i @nexdom/shared
pnpm add @nexdom/shared
yarn add @nexdom/shared
```

`type-fest` (`^5.8.0`) is a peer dependency — make sure it's installed alongside `@nexdom/shared`.

### Entry points

The package exposes four subpaths. Prefer importing from the specific subpath you need instead of the
root barrel, to keep bundles lean:

```ts
import { toKebab } from "@nexdom/shared/utils";
import { SharedApiError } from "@nexdom/shared/models";
import { http } from "@nexdom/shared/services";
// Root barrel re-exports everything as namespaces:
import { utils, models, services } from "@nexdom/shared";
```

### Public API surface

Only what's re-exported from each module's `index.ts` is public. Some sibling files (e.g. `enums.ts`,
internal `types.ts`) exist purely as implementation details and are **not** exported — don't rely on
importing from deep paths like `@nexdom/shared/services/enums`; they aren't part of the published `dist`.

**`@nexdom/shared/models`**

- `SharedError` — base error class, extends native `Error`.
- `SharedApiError<T>` — extends `SharedError`, adds `status?: number` and `body?: T` for failed HTTP
  responses.
- `ConstructorParams<T>` (type) — excludes class methods from a type, useful for typing constructor
  parameters from a class shape.

**`@nexdom/shared/services`**

- `http` — static class with `get`, `post`, `put`, `patch`, `delete` (all generic `<T>`, accepting
  `{ body?, headers? }`). Resolves with the parsed JSON body (typed as `PartialDeep<T>`) or throws a
  `SharedApiError` if the response isn't OK or the request fails.

**`@nexdom/shared/utils`**

| File             | Exports                                                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text.ts`        | `toKebab`, `toCamel`, `toTitle`, `toSentence`, `shrinkText`, `toInitials`                                                                                 |
| `event.ts`       | `emitCustomEvent`, `listenEvent`, `removeListener` (thin wrappers over `window` events)                                                                   |
| `date-time/`     | `currentDateTime`, `formatDateTime`, `toDate`, `isValidDateTime`, `navigatePeriod`, `toPeriodInterval`, `formatPeriodInterval`, and the `TimePeriod` type |
| `number.ts`      | `toNumber`, `padStart`                                                                                                                                    |
| `cookie.ts`      | `getCookie`, `setCookie`, `deleteCookie` — async, backed by the browser [Cookie Store API](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore)  |
| `validations.ts` | `isEmpty`, `isPhone` (pt-BR phone format), `isEmail`, `isUrl`                                                                                             |

### Usage examples

```ts
// utils
import { toKebab } from "@nexdom/shared/utils";
console.log(toKebab("Hello world")); // "hello-world"
```

```ts
// models — catching a typed API error
import { SharedApiError } from "@nexdom/shared/models";
import { http } from "@nexdom/shared/services";

interface User {
  id: string;
  name: string;
}

try {
  const user = await http.get<User>("https://api.example.com/users/1");
} catch (error) {
  if (error instanceof SharedApiError) {
    console.error(error.status, error.body);
  }
  throw error;
}
```

For anything not covered here, check the [API reference](https://nexdom-healthtech.github.io/shared/api/)
before assuming a member exists — don't guess at exports.

---

## Contributing to this library

### Setup

Open the repo inside its devcontainer with VS Code — most tooling (Vite+, formatter, SonarLint) is
preconfigured there. Then:

```bash
vp install       # install dependencies
vp env doctor     # diagnose missing commands/shims/wrong dependency versions
vp env setup      # create shims like `vpr` and `vpx`
```

### Architecture

```
src/
├── models/    # vanilla classes with concern-specific methods
├── services/  # HTTP request resources
└── utils/     # standalone utility functions
```

Each folder re-exports its public surface through its own `index.ts`, which is in turn re-exported (as a
namespace) from `src/index.ts`. When adding a new export, wire it through the folder's `index.ts` — files
like `enums.ts` or internal `types.ts` that aren't re-exported are implementation details and should stay
that way unless there's a deliberate reason to publish them.

Path aliases (see `vite.config.ts` / `tsconfig.json`): `@` → `src`, `@mocks` → `mocks`. Prefer
non-relative imports (`js/ts.preferences.importModuleSpecifier: "non-relative"`).

Architecture rules are enforced by dependency-cruiser (`.dependency-cruiser.cjs`, extends
`recommended-strict`): no orphan modules, no dependency-type duplication, and non-test code must not
import from `*.test.ts` files. Run `vpr depcruise` to check; `vpr depcruise:graph` / `depcruise:graph:no-tests`
render a visual graph.

### Coding conventions

- All code under `src` is written in **English**.
- Every exported method/property intended for the public API needs a **JSDoc comment** (`/** */`),
  including `@param`/`@returns` where relevant — JSDoc supports Markdown, so code examples belong there.
  This is how the docs site and editor hovers get their content; treat missing JSDoc on a new export as
  incomplete work.
- Formatting and linting run through `oxc` (see `.vscode/settings.json`, `oxc.fmt.configPath`), with
  format-on-save and `source.fixAll.oxc` enabled. `vite.config.ts`'s `staged["*"]` runs `vp check --fix`
  on commit.
- Lint runs with `typeAware`/`typeCheck` enabled — don't silence type errors, fix them.

### Testing

- Unit tests: Vitest, colocated in `__tests__` folders next to the code they cover (see
  `src/utils/__tests__/text.test.ts` for the expected `describe`/`it` style — one `describe` per
  function, cases for the happy path, edge cases like empty strings, and any documented trimming/whitespace
  behavior).
- Coverage threshold is **100%** (`vite.config.ts` → `test.coverage.thresholds`) — new code must be fully
  covered, no exceptions baked into config.
- HTTP interactions are mocked with MSW (`mocks/server.ts`, `mocks/ping/`); global test setup lives in
  `src/__tests__/setup.ts` (fake timers, silenced console, MSW server lifecycle).
- Mutation testing via Stryker (`stryker.config.json`) is set to **100/100/100** thresholds
  (`high`/`low`/`break`) — a passing test suite alone isn't sufficient; mutants must actually be killed.
  This is the strictest bar in the pipeline and the most likely one to fail silently in local runs if
  skipped.

### Docs

`docs/` is a Vitepress site. Its content (guide/API prose) is written in **Portuguese**, targeting
Brazilian users, even though the underlying JSDoc/source is in English. When adding a new public export,
check whether it needs a corresponding entry in `docs/api/**` and/or `docs/guide/**`.

### Commands cheat-sheet

| Command                      | Purpose                             |
| ---------------------------- | ----------------------------------- |
| `vpr check` / `vp run check` | Lint, format-check, type-check      |
| `vpr test` / `vp run test`   | Unit tests                          |
| `vp test --coverage`         | Unit tests with coverage report     |
| `vpr test:mutations`         | Mutation tests (Stryker)            |
| `vpr depcruise`              | Architecture/dependency rules check |
| `vpr docs`                   | Run the docs site locally           |
| `vpr build`                  | Build the library for publishing    |

### Before finishing a task

Run what's relevant to the change before considering it done — these mirror CI (`.github/workflows/ci.yml`):

1. `vpr check`
2. `vpr depcruise` (if you touched imports/module boundaries)
3. `vp test --coverage` (must stay at 100%)
4. `vpr test:mutations` (for non-trivial logic changes — slow, but required by CI)

### Commits & branching

- Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  (enforced by commitlint in CI, `@commitlint/config-conventional`).
- This project uses trunk-based development with `main` as the trunk, plus `beta` and `alpha` for
  pre-release work. `main`, `beta` and `alpha` are all protected against direct pushes — everything goes
  through a PR. See [CONTRIBUTING.md](./CONTRIBUTING.md#opening-a-pull-request) for the full decision
  tree on which branch to target and the branch flow diagrams.
- Short-lived branches are named after their intention (e.g. `fix-some-method-behavior`) and deleted once
  merged.

### CI gate

Every PR runs: commitlint validation, `vp check`, `vpr depcruise`, unit tests with coverage, mutation
tests, and SonarQube static analysis. All must pass before merge.
