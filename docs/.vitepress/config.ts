import { defineConfig } from "vitepress";

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
          ],
        },
        {
          text: "Utilitários",
          items: [
            { text: "Formatação", link: "/guide/formatting" },
            {
              text: "Manipulação",
              items: [
                { text: "Data e Hora", link: "/guide/handling/date-time" },
                { text: "Eventos", link: "/guide/handling/events" },
              ],
            },
          ],
        },
      ],
      "/api/": [
        {
          text: "Modelos",
          collapsed: false,
          items: [{ text: "Erros", link: "/api/models/errors" }],
        },
        {
          text: "Utilitários",
          collapsed: false,
          items: [
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
