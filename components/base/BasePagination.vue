<template>
  <div
    v-if="totalPages > 1"
    class="pagination"
  >
    <button
      v-if="currentPage > 1"
      class="page-btn"
      @click="changePage(currentPage - 1)"
    >
      <Icon
        name="local-custom:arrow-corner-left"
        size="12"
      />
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
      v-if="currentPage < totalPages"
      class="page-btn"
      @click="changePage(currentPage + 1)"
    >
      <Icon
        name="local-custom:arrow-corner-right"
        size="14"
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

const changePage = (page: number) => {
  if (page !== props.currentPage) {
    emit("page-changed", page);
  }
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  gap: 12px;
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
  font-size: 14px;
  font-weight: $fw-regular;
  line-height: 22px;
  color: theme-color("opposite-color");
  cursor: pointer;
  background-color: theme-color("main-color");
  border: 1px solid theme-color("gray-theme-complimentary-color");
  border-radius: 4px;
  transition: all 0.2s ease;

  &:disabled {
    color: theme-color("gray-theme-complimentary-color");
    cursor: not-allowed;

    :deep(svg) {
      fill: theme-color("gray-theme-complimentary-color");
    }
  }

  &:hover:not(:disabled) {
    border-color: theme-color("opposite-color");
  }

  &.is-active {
    color: theme-color("main-color");
    background-color: theme-color("opposite-color");
    border-color: theme-color("opposite-color");

    :deep(svg) {
      fill: theme-color("main-color");
    }
  }
}
</style>
