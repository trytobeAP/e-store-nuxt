import { defineNuxtConfig } from "nuxt/config";

const repositoryName = "e-store-nuxt";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    baseURL:
      process.env.NODE_ENV === "production" ? `/${repositoryName}/` : "/",
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "SHOPEE",
      charset: "utf-8",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Your premier destination for the latest fashion and electronics. Shop the latest trends at SHOPEE.",
        },
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
    public: {},
    apiBase: process.env.NUXT_PUBLIC_API_BASE || "https://fakestoreapi.com",
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
    "@pinia/nuxt",
  ],
  fonts: {
    families: [
      {
        name: "DM Sans",
        provider: "google",
        weights: [300, 400, 500, 600, 700, 800],
        styles: ["normal", "italic"],
      },
      {
        name: "Allerta Stencil",
        provider: "google",
        weights: [400],
        styles: ["normal"],
      },
    ],
  },
  imports: {
    autoImport: true,
  },
  css: ["~/assets/scss/main.scss", "nouislider/dist/nouislider.css"],
  icon: {
    collections: ["mdi", "material-symbols", "majesticons", "ri", "fa6-solid"],
    // serverBundle: "auto",
    customCollections: [
      {
        prefix: "local-custom",
        dir: "./assets/icons",
      },
    ],
  },
});
