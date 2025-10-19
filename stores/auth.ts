import { computed } from "vue";
import { useCookie } from "#app";
import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/core/useApiFetch";
import type { FormValues } from "~/composables/forms/useForm";

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie<string | null>("auth-token", { default: () => null });

  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: Pick<FormValues, "name" | "password">) {
    const body = {
      username: credentials.name,
      password: credentials.password,
    };

    const { data, error, execute } = useApiFetch<{ token: string }>(
      "/auth/login",
      {
        method: "POST",
        body,
        immediate: false,
        watch: false,
      },
    );

    await execute();

    if (error.value) {
      console.error("Login failed:", error.value);
      throw new Error("Invalid username or password.");
    }

    if (data.value?.token) {
      token.value = data.value.token;
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
