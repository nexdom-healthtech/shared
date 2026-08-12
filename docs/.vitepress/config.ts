import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";

const pkg = require("../../package.json");
const releaseYear = 2026;
const currentYear = new Date().getFullYear();
const currentYearText = currentYear > releaseYear ? `-${currentYear}` : "";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "pt-BR",
  title: "shared | NEXDOM",
  base: "/shared/",
  head: [["link", { rel: "icon", href: "/shared/favicon.svg" }]],
  description: "Alguns models, services e utils para compartilharmos.",
  lastUpdated: true,
  cleanUrls: true,
  sitemap: {
    hostname: "https://nexdom-healthtech.github.io/pkg-template/",
  },
  markdown: {
    container: {
      infoLabel: "INFORMAÇÃO",
      noteLabel: "INFORMAÇÃO",
      tipLabel: "DICA",
      warningLabel: "AVISO",
      dangerLabel: "ATENÇÃO",
      detailsLabel: "DETALHES",
      importantLabel: "IMPORTANTE",
      cautionLabel: "ATENÇÃO",
    },
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.svg",
    siteTitle: "shared",
    darkModeSwitchLabel: "Tema Escuro",
    darkModeSwitchTitle: "Mudar para Modo Escuro",
    lightModeSwitchTitle: "Mudar para Modo Claro",
    returnToTopLabel: "Retornar ao topo",
    outline: { label: "Nesta página" },
    docFooter: { prev: "Anterior", next: "Próximo" },
    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "Buscar" },
          modal: {
            noResultsText: "Nenhum resultado encontrado para",
            resetButtonTitle: "Limpar",
            displayDetails: "Exibir detalhes",
            footer: { navigateText: "Navegar", selectText: "Selecionar", closeText: "Fechar" },
          },
        },
      },
    },
    lastUpdated: { text: "Atualizado em" },
    editLink: {
      text: "Edite esta página no GitHub",
      pattern: "https://github.com/nexdom-healthtech/shared/edit/main/docs/:path",
    },
    notFound: {
      title: "PÁGINA NÃO ENCONTRADA",
      linkText: "Me leve para casa",
      quote: "Mas se você não mudar de direção e continuar procurando, pode acabar onde está indo.",
    },
    nav: [
      { text: "Guia", link: "/guide/", activeMatch: "/guide/" },
      { text: "API", link: "/api/", activeMatch: "/api/" },
      {
        text: `v${pkg.version}`,
        items: [
          {
            text: "Releases",
            link: "https://github.com/nexdom-healthtech/shared/releases",
          },
          {
            text: "Contribuindo",
            link: "https://github.com/nexdom-healthtech/shared/blob/main/CONTRIBUTING.md",
          },
        ],
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Introdução",
          items: [
            { text: "O que é shared?", link: "/guide/" },
            { text: "Iniciando", link: "/guide/getting-started" },
            { text: "Guia para atualização", link: "/guide/upgrade-guide" },
          ],
        },
        {
          text: "Serviços",
          items: [{ text: "Requisições", link: "/guide/services/request" }],
        },
        {
          text: "Utilitários",
          items: [
            { text: "Formatação", link: "/guide/utils/formatting" },
            {
              text: "Manipulação",
              items: [
                { text: "Cookies", link: "/guide/utils/handling/cookies" },
                { text: "Data e Hora", link: "/guide/utils/handling/date-time" },
                { text: "Eventos", link: "/guide/utils/handling/events" },
              ],
            },
          ],
        },
      ],
      "/api/": [
        {
          text: "Modelos",
          collapsed: false,
          items: [
            { text: "Erros", link: "/api/models/errors" },
            { text: "Tipos", link: "/api/models/types" },
          ],
        },
        {
          text: "Serviços",
          items: [{ text: "Requisições", link: "/api/services/request" }],
        },
        {
          text: "Utilitários",
          collapsed: false,
          items: [
            { text: "Cookies", link: "/api/utils/cookies" },
            { text: "Data e hora", link: "/api/utils/date-time" },
            { text: "Eventos", link: "/api/utils/events" },
            { text: "Números", link: "/api/utils/numbers" },
            { text: "Texto", link: "/api/utils/text" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/nexdom-healthtech/shared" }],
    footer: {
      message: "Lançado sob licença MIT",
      copyright: `Direitos reservados © ${releaseYear}${currentYearText} NEXDOM HealthTech`,
    },
  },
});
