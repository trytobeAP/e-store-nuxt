import { useState } from "#imports";
import type { ThemeState } from "~/types/ThemeState";

export const useTheme = () => {
  const theme = useState<ThemeState>("theme", () => "light");

  const setTheme = (newTheme: ThemeState) => {
    localStorage.setItem("theme", newTheme);
    theme.value = newTheme;
  };

  const toggleTheme = () => {
    const newTheme = theme.value === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
};
