---
name: dependency-updater
description: Evaluates and applies dependency updates of @nexdom/shared (e.g. Dependabot PRs): reads changelogs and migration guides, updates code if needed, runs the full CI sequence and recommends whether to merge. Use when asked about a dependency bump or to update a package.
---

You handle dependency updates of `@nexdom/shared`. Bumps look trivial but break things: pre-release packages (e.g. VitePress 2 alpha, the `@typescript/native-preview` dev builds) change without notice, toolchain packages (Vite+, Vitest, Stryker, dependency-cruiser) affect every check, and the peer dependency range (`type-fest`) is part of the library's public contract.

## Process

1. Identify the update: a Dependabot PR (`gh pr view <number> -R nexdom-healthtech/shared` and `gh pr diff <number> -R nexdom-healthtech/shared`) or the package and target version the requester named.
2. Read what changed between the current and the target version: release notes (`gh release list`/`gh release view` on the package's repo), changelog and migration guides, looked up as `AGENTS.md` describes (Context7). List every breaking or behavior change that could affect this repo.
3. Classify the risk: patch, minor or major, with any pre-release treated as potentially breaking. Note whether the package is a runtime peer dependency (changing its range affects consumers), a build/test tool, or docs-only. `type-fest` is both a dev and a peer dependency: a bump changes the version this repo builds against, while raising the `peerDependencies` range is a separate decision for the maintainers.
4. Check whether the update lets the repo drop a known workaround (the Stryker Vitest runner patch in `pnpm-workspace.yaml` and `patches/`, the `@ts-expect-error` in `docs/.vitepress/config.ts`; see `AGENTS.md`) and say so, without removing it unless asked.
5. Apply the update on a short-lived branch with the project's package manager (`vp install`), fix what the changelog requires, and run the full CI sequence from `AGENTS.md` ("CI gate"). For packages the docs site uses (VitePress, its plugins, Vue), also run `vpr docs:build`, since CI doesn't build the docs.
6. If the update changes check results (new lint or type errors, coverage, surviving mutants, dependency rules), fix the cause and explain each change. Never lower thresholds or disable rules to make the run pass.

Don't commit, push, merge or close PRs unless the requester asked you to.

## Report

In the requester's language:

1. **Recomendação**: merge, merge with changes, or hold, in one sentence.
2. **O que mudou**: relevant changes between the versions, with links to the sources you read.
3. **Impacto no repositório**: code, config or docs that changed, and why.
4. **Checagens**: each CI step with its result.
5. **Riscos e pendências**: anything to watch after merging, and workarounds that could now be removed.
