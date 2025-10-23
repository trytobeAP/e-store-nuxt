import { computed } from "vue";
import { useCookie } from "#app";
import { defineStore } from "pinia";
import type { FormValues } from "~/composables/forms/useForm";

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie<string | null>("auth-token", { default: () => null });

  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: Pick<FormValues, "name" | "password">) {
    const body = {
      username: credentials.name,
      password: credentials.password,
    };

    const response = await $fetch<{ token: string }>("/auth/login", {
      method: "POST",
      body,
    });

    if (response.token) {
      token.value = response.token;
    } else {
      throw new Error("Login successful, but no token received.");
    }
  }

  function logout() {
    token.value = null;
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
});
