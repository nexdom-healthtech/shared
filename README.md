# @nexdom/shared

[![CI](https://github.com/nexdom-healthtech/shared/actions/workflows/ci.yml/badge.svg)](https://github.com/nexdom-healthtech/shared/actions/workflows/ci.yml)
[![CD](https://github.com/nexdom-healthtech/shared/actions/workflows/cd.yml/badge.svg)](https://github.com/nexdom-healthtech/shared/actions/workflows/cd.yml)
[![Dependabot](https://github.com/nexdom-healthtech/shared/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/nexdom-healthtech/shared/actions/workflows/dependabot/dependabot-updates)

[![Quality Gate Status](https://sonar-qube-public.services-dev.nexdom.tec.br/api/project_badges/measure?project=Shared&metric=alert_status&token=sqb_c9cf5ffef3f078a5b30458c32628c04a3207140a)](https://sonar-qube-public.services-dev.nexdom.tec.br/dashboard?id=Shared)
[![Maintainability Rating](https://sonar-qube-public.services-dev.nexdom.tec.br/api/project_badges/measure?project=Shared&metric=software_quality_maintainability_rating&token=sqb_c9cf5ffef3f078a5b30458c32628c04a3207140a)](https://sonar-qube-public.services-dev.nexdom.tec.br/dashboard?id=Shared)
[![Reliability Rating](https://sonar-qube-public.services-dev.nexdom.tec.br/api/project_badges/measure?project=Shared&metric=software_quality_reliability_rating&token=sqb_c9cf5ffef3f078a5b30458c32628c04a3207140a)](https://sonar-qube-public.services-dev.nexdom.tec.br/dashboard?id=Shared)
[![Security Rating](https://sonar-qube-public.services-dev.nexdom.tec.br/api/project_badges/measure?project=Shared&metric=software_quality_security_rating&token=sqb_c9cf5ffef3f078a5b30458c32628c04a3207140a)](https://sonar-qube-public.services-dev.nexdom.tec.br/dashboard?id=Shared)
[![Lines of Code](https://sonar-qube-public.services-dev.nexdom.tec.br/api/project_badges/measure?project=Shared&metric=ncloc&token=sqb_c9cf5ffef3f078a5b30458c32628c04a3207140a)](https://sonar-qube-public.services-dev.nexdom.tec.br/dashboard?id=Shared)
[![Coverage](https://sonar-qube-public.services-dev.nexdom.tec.br/api/project_badges/measure?project=Shared&metric=coverage&token=sqb_c9cf5ffef3f078a5b30458c32628c04a3207140a)](https://sonar-qube-public.services-dev.nexdom.tec.br/dashboard?id=Shared)
[![Duplicated Lines (%)](https://sonar-qube-public.services-dev.nexdom.tec.br/api/project_badges/measure?project=Shared&metric=duplicated_lines_density&token=sqb_c9cf5ffef3f078a5b30458c32628c04a3207140a)](https://sonar-qube-public.services-dev.nexdom.tec.br/dashboard?id=Shared)
[![Technical Debt](https://sonar-qube-public.services-dev.nexdom.tec.br/api/project_badges/measure?project=Shared&metric=software_quality_maintainability_remediation_effort&token=sqb_c9cf5ffef3f078a5b30458c32628c04a3207140a)](https://sonar-qube-public.services-dev.nexdom.tec.br/dashboard?id=Shared)

[![Docs Website](https://img.shields.io/website?url=https://nexdom-healthtech.github.io/shared/&label=Docs%20Website&logo=github)](https://nexdom-healthtech.github.io/shared)

[![semantic-release: conventionalcommits](https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

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
