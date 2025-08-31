<template>
  <aside>
    <button
      class="mobile-filters-trigger"
      @click="openMobileFilters"
    >
      <ClientOnly>
        <Icon name="majesticons:adjustments-line" />
      </ClientOnly>
      <span>Filters</span>
    </button>

    <div class="filters-panel-desktop">
      <ProductFiltersForm
        :model-value="modelValue"
        :category-options="categoryOptions"
        :sort-options="sortOptions"
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
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Filters): void;
}>();

const sidebar = createSidebarState();

const localFilters = ref<Filters>({ ...props.modelValue });

function onDesktopFiltersUpdate(newFilters: Filters) {
  emit("update:modelValue", newFilters);
}

function onMobileFiltersUpdate(newFilters: Filters) {
  localFilters.value = newFilters;
}

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
  display: none;

  @media (max-width: ($breakpoints-m - 1px)) {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-bottom: 24px;
    font-size: 16px;
    font-weight: $fw-bold;
    color: theme-color("accent-color");
    cursor: pointer;
    background: none;
    border: none;
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
