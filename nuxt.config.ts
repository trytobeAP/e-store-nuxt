import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
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
  ],
  css: ["~/assets/scss/main.scss"],
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
    mode: "svg",
  },
});
