<template>
  <BaseSidebar
    direction="right"
    :is-open="isOpen"
    show-logo
    title-link="/"
    @close="$emit('close')"
  >
    <template #headerActions>
      <NuxtLink
        class="action-link-wrapper"
        to="/cart"
        @click="$emit('close')"
      >
        <BaseButton
          variant="plain"
          aria-label="Go to cart"
        >
          <Icon
            name="local-custom:cart"
            size="26"
          />
        </BaseButton>
      </NuxtLink>
    </template>

    <div class="sidebar-search">
      <BaseInput
        v-model="searchQuery"
        placeholder="Search"
        icon-name="material-symbols:search"
        icon-position="right"
        clearable
      />
    </div>

    <nav class="sidebar-nav">
      <UtilsNavigationItem
        v-for="item in filteredPrimaryNavItems"
        :key="item.linkSlug"
        :link="`/${item.linkSlug}`"
        class="sidebar-link"
        @click="$emit('close')"
      >
        {{ item.content }}
      </UtilsNavigationItem>

      <BaseDivider
        v-if="filteredPrimaryNavItems.length > 0"
        class="sidebar-divider"
      />

      <button
        v-if="!authAction.isLink"
        class="sidebar-link"
        @click="handleAuthActionClick"
      >
        <Icon
          :name="authAction.icon"
          size="24"
        />
        <span>{{ authAction.text }}</span>
      </button>

      <UtilsNavigationItem
        v-else
        :link="authAction.link!"
        class="sidebar-link"
        @click="handleAuthActionClick"
      >
        <Icon
          :name="authAction.icon"
          size="24"
        />
        <span>{{ authAction.text }}</span>
      </UtilsNavigationItem>
    </nav>
  </BaseSidebar>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import type { TextNavItem } from "~/types/NavItems";

defineProps<{ isOpen: boolean }>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const router = useRouter();
const authStore = useAuthStore();

const authAction = computed(() => {
  if (authStore.isAuthenticated) {
    return {
      isLink: false,
      text: "Log Out",
      icon: "local-custom:logout",
    };
  } else {
    return {
      isLink: true,
      text: "Log In",
      icon: "local-custom:account",
      link: "/account",
    };
  }
});

const handleAuthActionClick = () => {
  if (authAction.value.isLink) {
    emit("close");
  } else {
    authStore.logout();
    router.push("/account");
    emit("close");
  }
};

const searchQuery = ref("");
const initialPrimaryNavItems = [
  "shop",
  "blog",
  "our story",
  "contact",
  "terms of use",
  "shipping and returns",
];

const primaryNavItems: TextNavItem[] = initialPrimaryNavItems.map((item) => ({
  content: item
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  linkSlug: item.split(" ").join("-"),
}));

const filteredPrimaryNavItems = computed(() => {
  if (!searchQuery.value) {
    return primaryNavItems;
  }
  const query = searchQuery.value.toLowerCase().trim();
  return primaryNavItems.filter((item) =>
    item.content.toLowerCase().includes(query),
  );
});
</script>

<style scoped lang="scss">
.action-link-wrapper {
  display: flex;
  align-items: center;
  line-height: 1;
}

.sidebar-search {
  margin-bottom: 24px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-link {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 0;
  font-family: "DM Sans", sans-serif;
  font-size: 18px;
  font-weight: $fw-medium;
  color: theme-color("link-color");
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
}

.sidebar-divider {
  margin: 16px 0;
}
</style>
