import { defineNuxtPlugin, useState } from "#app";
import { watchEffect } from "vue";
import type { ThemeState } from "~/types/ThemeState";

export default defineNuxtPlugin(() => {
  const theme = useState<ThemeState>("theme");

  const themesVariants = ["light", "dark"];

  const savedTheme = localStorage.getItem("theme") as ThemeState | null;
  if (savedTheme && themesVariants.includes(savedTheme)) {
    theme.value = savedTheme;
  }

  watchEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.value);
  });
});
