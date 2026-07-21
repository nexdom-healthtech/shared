# @nexdom/shared

After clone this project, **open it inside its devContainer** using [VSCode](https://code.visualstudio.com/download).

Then, follow the next instructions according to your needs.

_Don't forget to commit your changes using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) messages._

## Development

Before you start coding, we have something to tell you about this project's [Architecture](#architecture) and [Scripts](#scripts).

### Architecture

This projects has the following main folders inside `src`:

- Models:
  - It contains several models (vanilla classes), that offers basic methods related to its concerns.
  - Those are exported from `src/models/index.ts` to `src/index.ts`.
  - _This directory still just a thought._
- Services:
  - It contains resources related to HTTP requests.
  - Those are exported from `src/services/index.ts` to `src/index.ts`.
  - _This directory still just a thought._
- Utils:
  - It contains several utilities that are exported from `src/utils/index.ts` to `src/index.ts`.

So, summarizing, it should look something like this:

```
src/
├── models/
├── services/
└── utils/
```

### Scripts

The following scripts will help you on your daily basis.

All code that's going to be published in the library is inside the `src` folder. Also, it's written in English, so let's try to keep it standardized.

- Install dependencies:

```bash
vp install
```

- Check environment missing parts:

> [!Tip]
> This might be useful if you got some error due to a missing command/shims or wrong dependency version.

```bash
vp env doctor
```

- Create shims you might need, like `vpr` and `vpx`:

```bash
vp env setup
```

- Run checks (Lint, formmater and type-check):

```bash
vpr check
# Or
vp run check
```

- Run the unit tests:

```bash
vpr test
# Or
vp run test
```

- Run architecture checks:

```bash
vpr depcruise
# Or
vp run depcruise
```

- Help with Vite+ resources:

```bash
vp --help
```

## Documentation

The success of this projects also depends on the quality of its documentation.

To help you dealing with that, we have a `docs` folder, which is used to generate documentation pages based on markdown files (thanks to `Vitepress`).

> [!Tip]
> Unlike the `src`, `docs` it written in English, but aimed for Brazilian users, mostly, so it's content should be written in Portuguese.

But, that's not everything. Since the best documentation is the one you don't have to open, we ask you to use [JSDoc](https://jsdoc.app/about-getting-started) on the methods you intend to expose from the API. That can be easily accomplished by just typing `/**` and `enter` at the row before your `method` or `attribute`.

JSDoc handles markdown pretty well, so you can easily provide rich format documentations, like code examples, right inside your comments.

Tho check how your markdown pages are going, just...

- Run docs page:

```bash
vpr docs
# Or
vp run docs
```

## Opening Pull Requests

This projects has 3 major branches that you must know:

- _main_ - where the last published version relies
- _beta_ - where _pre-release_ code, ready to be tested, relies
- _alpha_ - where _pre-release_ code relies when it's not ready for testing yet

Any changes on this project must target one of these branches through a pull request, causing the original branch to be deleted after merge.

So, to contribute on this project, all you have to do is open a new branch from the branch you'll be targeting your PR later, and that only depends if your changes will be: ready for production (_main_), ready to be tested (_beta_) or not ready for tests yet (_alpha_).

As soon as we merge your PR, the changes will be published as a new _alpha_, _beta_ or _main_ version (which will also update the published docs).

Note that, at some point, we'll ended up using _alpha_ to update _beta_ and _beta_ to update _main_ and then both branches (_beta_ and _alpha_) will be deleted. When it happens, all you gotta do to work on them again is open a new _beta_ branch from _main_ or _alpha_ from _beta_.

## Publishing

We already handle publication through GitHub Actions.

You just need to know that, PRs targeting the branch _beta_ and _alpha_ won't update the published documentations, since they aren't ready for production yet, still, they'll be published as _beta_ or _alpha_ versions on NPM.

Once a new _beta_ is ready for production, open a PR to merge it with _main_ and, after merged, it's all done.

The builds we published are the following:

- For the library (NPM):

```bash
vpr build
# Or
vp run build
```

- For the docs (GitHub Pages):

```bash
vpr docs:build
# Or
vp run docs:build
```
