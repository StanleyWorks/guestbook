import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  nitro: {
    experimental: {
      database: true,
    },
  },

  runtimeConfig: {
    multiplayerBackendKey: "",
    public: {
      multiplayerBrowserKey: "",
    },
  },

  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Guestbook",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#2563eb" },
        { name: "color-scheme", content: "light" },
      ],
    },
  },
});
