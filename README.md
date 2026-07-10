# @nexdom/shared

[![CI](https://github.com/nexdom-healthtech/shared/actions/workflows/ci.yml/badge.svg)](https://github.com/nexdom-healthtech/shared/actions/workflows/ci.yml)
[![CD](https://github.com/nexdom-healthtech/shared/actions/workflows/cd.yml/badge.svg)](https://github.com/nexdom-healthtech/shared/actions/workflows/cd.yml)
[![Dependabot](https://github.com/nexdom-healthtech/shared/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/nexdom-healthtech/shared/actions/workflows/dependabot/dependabot-updates)

Some models, services and utils we need on daily bases.

For more examples and information, check the [docs page](https://nexdom-healthtech.github.io/shared/).

## 💻 Get started

### Install

```bash
vp add @nexdom/shared
# But, if you're not using Vite+ yet...
npm i @nexdom/shared
# Or
pnpm add @nexdom/shared
# Or
yarn add @nexdom/shared
```

### Usage

```ts
import { toKebab } from "@nexdom/shared/utils";

const kebabMessage = toKebab("Hello world");

// Will print "hello-world"
console.log(kebabMessage);
```

## 🧱 Contribute

Help us improve our community.

Report an [issue](https://github.com/nexdom-healthtech/shared/issues) you've found or check our [Contribution Guide](./CONTRIBUTING.md) to learn how to code in our project and open your own PRs to us.

## 📄 License

[MIT License](./LICENSE) © 2026-PRESENT NEXDOM
