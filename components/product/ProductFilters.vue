<template>
  <aside>
    <button
      class="mobile-filters-trigger"
      @click="openMobileFilters"
    >
      <Icon name="local-custom:filter" />
      <span>Filters</span>
    </button>

    <div class="filters-panel-desktop">
      <ProductFiltersForm
        :model-value="modelValue"
        :category-options="categoryOptions"
        :sort-options="sortOptions"
        :max-price="maxPrice"
        @update:model-value="onDesktopFiltersUpdate"
      />
    </div>

    <BaseSidebar
      direction="left"
      title="Filters"
      :is-open="sidebar.isOpen.value"
      @close="applyAndClose"
    >
      <ProductFiltersForm
        class="mobile-panel-content"
        :model-value="localFilters"
        :category-options="categoryOptions"
        :sort-options="sortOptions"
        :max-price="maxPrice"
        @update:model-value="onMobileFiltersUpdate"
      />
    </BaseSidebar>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { createSidebarState } from "~/composables/useSidebar";
import type { Filters } from "~/types/Filters";
import type { SelectOption } from "~/types/SelectOption";

const props = defineProps<{
  modelValue: Filters;
  categoryOptions: SelectOption[];
  sortOptions: SelectOption[];
  maxPrice: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Filters): void;
}>();

const sidebar = createSidebarState();

const localFilters = ref<Filters>({ ...props.modelValue });

const onDesktopFiltersUpdate = (newFilters: Filters) => {
  emit("update:modelValue", newFilters);
};

const onMobileFiltersUpdate = (newFilters: Filters) => {
  localFilters.value = newFilters;
};

const openMobileFilters = () => {
  localFilters.value = { ...props.modelValue };
  sidebar.open();
};

const applyAndClose = () => {
  emit("update:modelValue", localFilters.value);
  sidebar.close();
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (!sidebar.isOpen.value) {
      localFilters.value = { ...newVal };
    }
  },
  { deep: true },
);
</script>

<style scoped lang="scss">
.mobile-filters-trigger {
  display: flex;
  gap: 8px;
  align-items: center;
  padding-left: 0;
  margin-bottom: 16px;
  font-family: "DM Sans", sans-serif;
  font-size: 12px;
  font-weight: $fw-regular;
  line-height: 20px;
  color: theme-color("accent-color");
  cursor: pointer;
  background: none;
  border: none;

  @media (min-width: ($breakpoints-m)) {
    display: none;
  }

  @media (max-width: ($breakpoints-m - 1px)) {
    font-size: 20px;
  }

  @media (max-width: ($breakpoints-s - 1px)) {
    font-size: 12px;
  }
}

.filters-panel-desktop {
  @media (max-width: ($breakpoints-m - 1px)) {
    display: none;
  }
}

:deep(.sidebar-panel) {
  .mobile-panel-content {
    flex-grow: 1;
    overflow-y: auto;
  }

  .panel-footer {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    padding-top: 24px;
    margin-top: auto;
  }
}
</style>
