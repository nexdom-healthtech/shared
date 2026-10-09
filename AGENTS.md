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
| `text.ts`        | `toKebab`, `toCamel`, `toTitle`, `toSentence`, `shrinkText`, `toInitials`, `mask`, `unmask`                                                               |
| `event.ts`       | `emitCustomEvent`, `listenEvent`, `removeListener` (thin wrappers over `window` events)                                                                   |
| `date-time/`     | `currentDateTime`, `formatDateTime`, `toDate`, `isValidDateTime`, `navigatePeriod`, `toPeriodInterval`, `formatPeriodInterval`, and the `TimePeriod` type |
| `number.ts`      | `toNumber`, `padStart`, `toPositiveNumber`                                                                                                                |
| `cookie.ts`      | `getCookie`, `setCookie`, `deleteCookie` — async, backed by the browser [Cookie Store API](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore)  |
| `validations.ts` | `isEmpty`, `isPhone` (pt-BR phone format), `isEmail`, `isUrl`                                                                                             |
| `comparison.ts`  | `isDeepEqual` (deep comparison of plain objects, arrays and dates, as a form would)                                                                       |

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

On Windows, prefer VS Code's "Dev Containers: Clone Repository in Container Volume" over opening a folder
cloned on the host:

- A host clone with `core.autocrlf=true` checks files out with CRLF, and `vp check` then reports
  formatting issues on every file. `.gitattributes` enforces LF, but clones made before it was added need
  `git rm -rq --cached . && git reset --hard` to be re-normalized (commit or stash local changes first,
  since `reset --hard` discards them).
- A host folder bind-mounted into the container is much slower, which hurts the slowest checks (mutation
  tests) the most.

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
import from `*.test.ts` files. It also only allows `models`, `services` and `utils` as folders under
`src` (`models-services-and-utils-only`) and requires runtime dependencies to be `peerDependencies`
(`use-peer-deps`). Run `vpr depcruise` to check; `vpr depcruise:graph` / `depcruise:graph:no-tests`
render a visual graph.

### Adding a new export

Use the closest existing export as the reference (e.g. `isDeepEqual` in `src/utils/comparison.ts` for a
util), and deliver all of the following in the same PR:

1. The source in the right module (`src/models`, `src/services` or `src/utils`), with JSDoc, and its unit
   tests in the sibling `__tests__/` folder. HTTP behavior is tested against MSW handlers in `mocks/`.
2. The export in the module's `index.ts`, following its existing lines (`export *` for utils, named
   default exports for models and services).
3. An API reference page in Portuguese at `docs/api/<module>/<topic>.md` (or a new section in the existing
   page of that topic), following the existing pages: a `##` section per export with "Tipo" (the
   signature), "Detalhes" and "Exemplo" (stating the result of each example that returns a value as `// resultado: ...`). Add a guide page
   under `docs/guide/` when the feature benefits from narrative or interactive examples (guide pages
   import the library from `dist`, as `docs/guide/utils/validating.md` does).
4. Every new page registered in the sidebar at `docs/.vitepress/config.ts` and listed in `docs/api/index.md`
   and in the use cases of `docs/guide/index.md`.
5. The export in the [public API surface](#public-api-surface) of this file.
6. The full CI sequence (see [CI gate](#ci-gate)) passing locally, plus `vpr docs:build` (see [Docs](#docs)).

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
- Known workarounds: `patches/@stryker-mutator__vitest-runner.patch` (registered in `pnpm-workspace.yaml`,
  which says when to remove it) fixes a Stryker/Vitest 5 regression, and the `@ts-expect-error` in
  `docs/.vitepress/config.ts` works around a TypeScript stack depth error. Don't build on top of them
  without checking whether they're still needed.

### Public API design

The public API is hard to change once released: other NEXDOM projects depend on it (e.g.
`@nexdom/uimed-vue`, as a peer dependency), and every export, parameter or option is something consumers
can misuse and maintainers must keep. Keep it minimal:

- Only add what the issue asks for. Anything beyond it (an extra function, parameter, option, overload or
  exported type) is a separate decision the maintainers must approve explicitly, not a default.
- Behaviors meant to be consistent across the library aren't per-call options. For example, failures
  surface as `SharedError`/`SharedApiError`, and text utils return an empty string for an empty string.
- Reuse existing contracts before creating new ones: the `{ body?, headers? }` options of `http`, the
  format tokens of the date-time utils, trailing optional parameters with defaults (as in `toNumber`).
- Helpers, enums and types stay internal unless the API needs them; exporting one is an API addition too.
  A new entry point (`package.json` `exports` and `pack.entry` in `vite.config.ts`) needs explicit approval.
- Renaming or removing an export, or changing a signature, default or result, is a breaking change: mark
  the commit with `!` and `BREAKING CHANGE:`, and add an entry to `docs/guide/upgrade-guide.md`.

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
  skipped. Stryker starts one test runner per CPU core (minus one); on machines with limited memory, run
  `vpx stryker run --concurrency 4` instead of `vpr test:mutations`.
- Keep temporary files (scripts, specs, configs) outside the repo, e.g. in the system's temp folder.
  Vitest only excludes `node_modules` and `.git` by default, so a temporary spec in a gitignored folder
  such as `reports/` still runs, and fails, with the unit tests.
- Never run Stryker at the same time as another test command: Vitest would also collect the copies of the
  tests Stryker makes under `.stryker-tmp/`. For the same reason, delete `.stryker-tmp/` when a failed or
  interrupted Stryker run leaves it behind (Stryker only cleans it after a successful run).

#### Focused runs while iterating

While working on a single file, scope each step to it (`text` below is an example) and run the full
sequence only before finishing:

```bash
# Unit tests of one file, with coverage limited to the source it covers. Without
# `--coverage.include`, files that are only imported count as uncovered and fail the 100% threshold
vp test src/utils/__tests__/text.test.ts --coverage --coverage.include="src/utils/text.ts"

# Mutation tests of specific files. List several files in a single comma-separated `--mutate`
# (repeating the flag keeps only the last one)
vpx stryker run --mutate "src/utils/text.ts"
```

### Docs

`docs/` is a Vitepress site. Its content (guide/API prose) is written in **Portuguese**, targeting
Brazilian users, even though the underlying JSDoc/source is in English. When adding a new public export,
follow the checklist in [Adding a new export](#adding-a-new-export).

CI doesn't build the docs: only CD does, after the merge (`vpr docs:build` on pushes to `main`, `beta` and
`alpha`). Run `vpr docs:build` yourself whenever you change `docs/`, or a broken page only shows up after
merging. `vpr docs` and `vpr docs:build` build the library first, since the docs import it from `dist`.

### Commands cheat-sheet

| Command                      | Purpose                             |
| ---------------------------- | ----------------------------------- |
| `vpr check` / `vp run check` | Lint, format-check, type-check      |
| `vpr test` / `vp run test`   | Unit tests                          |
| `vp test --coverage`         | Unit tests with coverage report     |
| `vpr test:mutations`         | Mutation tests (Stryker)            |
| `vpr depcruise`              | Architecture/dependency rules check |
| `vpr docs`                   | Run the docs site locally           |
| `vpr docs:build`             | Build the docs site, as CD does     |
| `vpr build`                  | Build the library for publishing    |

### Before finishing a task

Run what's relevant to the change before considering it done — these mirror CI (`.github/workflows/ci.yml`):

1. `vpr check`
2. `vpr depcruise` (if you touched imports/module boundaries)
3. `vp test --coverage` (must stay at 100%)
4. `vpr test:mutations` (for non-trivial logic changes — slow, but required by CI)
5. `vpr docs:build` (if you touched `docs/` — CI doesn't build the docs)

Also check new code against the rules under [Static analysis](#static-analysis-sonarqube), since
SonarQube only runs in CI.

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

Every PR runs, in order: commitlint validation, `vp check`, `vpr depcruise`, `vp test --coverage`,
`vpr test:mutations`, and SonarQube static analysis. All must pass before merge.

### Static analysis (SonarQube)

The company's SonarQube runs only in CI, as its last step. `sonar.qualitygate.wait=true` in
`sonar-project.properties` makes the step fail when the quality gate fails, so treat any new issue or
unreviewed security hotspot in `src/` as a failure. Don't run the `sonar` task locally: it needs
`SONAR_TOKEN` and publishes the analysis to the company's server.

Write code that avoids the rules that have already failed code here or in `@nexdom/uimed-vue`, which
uses the same server: use `globalThis` instead of `window`
(S7764); `.at(-1)` instead of `[array.length - 1]` (S7755); `replaceAll` instead of `replace` with a
global regular expression (S7781); object spread instead of `Object.assign({}, ...)` (S6661);
`String.raw` instead of escaped backslashes in strings (S7780); concise regular expressions, such as `\d`
instead of `[0-9]` (S6353) and no single-character classes like `[9]` (S6397); no regular expressions
with super-linear backtracking, such as two overlapping quantifiers (S5852); no redundant non-null or
type assertions, which don't change the type (S4325); no deprecated APIs (S1874); and move inner functions that don't
use anything from the outer function out of it (S7721).

Only if CI's SonarQube step fails and its dashboard doesn't show why, reproduce the analysis with a local
SonarQube Community in the server's version (`sonarqube:26.3.0.120487-community`) and `vpx @sonar/scan`
pointed at it (`-Dsonar.host.url=http://localhost:9000 -Dsonar.token=<local token>`), after
`CI=true vp test --coverage` (coverage only writes the `lcov` report Sonar reads when `CI` is set). The
goal is 0 issues and no new security hotspots in the files the PR changed.

### Library documentation and dependencies

The stack is newer than most AI models' training data (TypeScript 6, Vite+ 1, Vitest 5, VitePress 2
alpha, Stryker 10, dependency-cruiser 18, MSW 2, type-fest 5), so don't rely on memory for library APIs.

- Before using an API this repo doesn't use yet, or implementing something from scratch, look it up in the
  version declared in `package.json`. The project's `.mcp.json` provides the `context7` server for that,
  with these library IDs: TypeScript `/microsoft/typescript`, Vite+ `/websites/viteplus_dev`, Vitest
  `/vitest-dev/vitest`, VitePress `/vuejs/vitepress`, Vue (docs pages) `/websites/vuejs`, Stryker
  `/stryker-mutator/stryker-js`, dependency-cruiser `/sverweij/dependency-cruiser`, MSW `/mswjs/msw`,
  type-fest `/sindresorhus/type-fest`, happy-dom `/capricorn86/happy-dom`, and MDN `/mdn/content` for
  Web APIs (e.g. the Cookie Store API).
- Queries to Context7 leave your machine: describe what you need in generic terms and never include source
  code or business rules.
- Before adding a dependency, check whether the platform or the current dependencies already cover the
  need. If not, confirm with the requester, check the package's docs, maintenance and license, and declare
  runtime dependencies as `peerDependencies` (enforced by dependency-cruiser's `use-peer-deps` rule).

### AI agents

Besides this file, the repo ships Claude Code subagents in `.claude/agents/`:

- `issue-planner`: turns an issue into an API proposal plus open questions, before any code is written.
- `issue-implementer`: implements an issue end to end (source, tests, docs).
- `code-reviewer`: reviews a branch or PR against these conventions, without changing code.
- `dependency-updater`: evaluates and applies dependency updates, such as Dependabot PRs.

Issues and PRs live in `nexdom-healthtech/shared`. Pass `-R nexdom-healthtech/shared` to `gh`, since
clones from forks have issues disabled, and read issues with
`gh issue view <number> -R nexdom-healthtech/shared --json title,body,comments` (`--comments` prints
nothing in non-interactive shells).

To resolve an issue, run `/resolve-issue <number>` (`.claude/skills/resolve-issue/`). It chains planner,
implementer and reviewer, asks you about open questions and waits for your approval of the public API
before any code is written.
