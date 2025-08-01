import { useState, watchEffect } from "#imports";

export const useTheme = () => {
  const theme = useState<"light" | "dark">("theme", () => "light");

  const setTheme = (newTheme: "light" | "dark") => {
    if (process.client) {
      localStorage.setItem("theme", newTheme);
    }
    theme.value = newTheme;
  };

  const toggleTheme = () => {
    const newTheme = theme.value === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  watchEffect(() => {
    if (process.client) {
      document.body.setAttribute("data-theme", theme.value);
    }
  });

  if (process.client) {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme && ["light", "dark"].includes(savedTheme)) {
      theme.value = savedTheme;
    }
  }

  return {
    theme,
    toggleTheme,
  };
};
