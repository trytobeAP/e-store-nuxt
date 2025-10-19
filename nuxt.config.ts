import { defineNuxtConfig } from "nuxt/config";

const repositoryName = "e-store-nuxt";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    baseURL:
      process.env.NODE_ENV === "production" ? `/${repositoryName}/` : "/",
    head: {
      title: "SHOPEE",
      charset: "utf-8",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "favicon.ico",
        },
      ],
      script: [
        {
          innerHTML: `
            (function() {
              const theme = localStorage.getItem('theme');
              if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.setAttribute('data-theme', 'dark');
              } else {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            })();
          `,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/scss/_globals" as *;`,
        },
      },
    },
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
  ],
  css: ["~/assets/scss/main.scss", "nouislider/dist/nouislider.css"],
  googleFonts: {
    display: "swap",
    families: {
      "DM Sans": {
        wght: "300..800",
      },
      "Allerta Stencil": {
        wght: "300..800",
      },
    },
  },
  icon: {
    collections: ["mdi", "material-symbols", "majesticons", "ri", "fa6-solid"],
    customCollections: [
      {
        prefix: "local-custom",
        dir: "./assets/icons",
      },
    ],
  },
});
