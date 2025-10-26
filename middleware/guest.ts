import { useAuthStore } from "~/stores/auth";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware((_to, _from) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    return navigateTo("/");
  }
});
