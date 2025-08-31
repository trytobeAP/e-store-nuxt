<template>
  <div
    v-if="totalPages > 1"
    class="pagination"
  >
    <button
      :disabled="currentPage === 1"
      class="page-btn"
      @click="changePage(currentPage - 1)"
    >
      <ClientOnly>
        <Icon
          name="mdi:chevron-left"
          size="20"
        />
      </ClientOnly>
    </button>

    <button
      v-for="page in pages"
      :key="page"
      class="page-btn"
      :class="{ 'is-active': page === currentPage }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <button
      :disabled="currentPage === totalPages"
      class="page-btn"
      @click="changePage(currentPage + 1)"
    >
      <Icon
        name="mdi:chevron-right"
        size="20"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits(["page-changed"]);

const pages = computed(() => {
  const pageNumbers = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
});

const changePage = (page: number | string) => {
  if (typeof page === "number" && page !== props.currentPage) {
    emit("page-changed", page);
  }
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 86px;
  margin-bottom: 120px;

  @media (max-width: ($breakpoints-l - 1px)) {
    margin-top: 60px;
    margin-bottom: 90px;
  }

  @media (max-width: ($breakpoints-m - 1px)) {
    margin-top: 50px;
    margin-bottom: 76px;
  }

  @media (max-width: ($breakpoints-s - 1px)) {
    margin-top: 45px;
    margin-bottom: 68px;
  }
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  font-size: 16px;
  font-weight: $fw-medium;
  color: theme-color("opposite-color");
  cursor: pointer;
  background-color: theme-color("main-color");
  border: 1px solid theme-color("gray-color");
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: theme-color("opposite-color");
  }

  &.is-active {
    color: theme-color("main-color");
    background-color: theme-color("opposite-color");
    border-color: theme-color("opposite-color");
  }

  &:disabled:not(.is-active) {
    color: theme-color("gray-color");
    cursor: not-allowed;
  }
}
</style>
