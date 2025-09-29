<template>
  <div class="filters-form-wrapper">
    <div class="filter-group search-group">
      <BaseInput
        v-model="localSearchQuery"
        placeholder="Search..."
        variant="line"
        clearable
        icon-name="local-custom:search"
        :iconColor="computedInputIconColor"
        icon-position="left"
      />
    </div>

    <div class="filter-group category-group">
      <BaseSelect
        :model-value="modelValue.category"
        placeholder="Category"
        clearable
        :options="categoryOptions"
        @update:model-value="updateField('category', $event as string | null)"
        @clear="updateField('category', null)"
      />
    </div>

    <div class="filter-group sort-by-group">
      <BaseSelect
        :model-value="modelValue.sortBy"
        placeholder="Sort By"
        clearable
        :options="sortOptions"
        @update:model-value="updateField('sortBy', $event as string | null)"
        @clear="updateField('sortBy', null)"
      />
    </div>

    <div class="filter-group price-slider-group">
      <BasePriceSlider
        :model-value="modelValue.priceRange"
        :min="0"
        :max="maxPrice"
        @update:model-value="debouncedPriceEmit.call($event)"
      />
    </div>

    <div class="filter-group toggle-group">
      <BaseToggle
        :model-value="modelValue.onSale"
        @update:model-value="updateField('onSale', $event as boolean)"
      >
        On sale
      </BaseToggle>
      <BaseToggle
        :model-value="modelValue.inStock"
        @update:model-value="updateField('inStock', $event as boolean)"
      >
        In stock
      </BaseToggle>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from "vue";
import { debounce } from "~/utils/debounce";
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

const localSearchQuery = ref(props.modelValue.searchQuery);

const computedInputIconColor = computed(() => "var(--color-opposite-color)");

function updateField<K extends keyof Filters>(key: K, value: Filters[K]) {
  const newFilters = {
    ...props.modelValue,
    [key]: value,
  };
  emit("update:modelValue", newFilters);
}

const debouncedSearchEmit = debounce((query: string) => {
  updateField("searchQuery", query);
}, 500);

watch(localSearchQuery, (newQuery) => {
  debouncedSearchEmit.call(newQuery);
});

const debouncedPriceEmit = debounce((newRange: [number, number]) => {
  updateField("priceRange", newRange);
}, 500);

watch(
  () => props.modelValue.searchQuery,
  (newValue) => {
    if (newValue !== localSearchQuery.value) {
      localSearchQuery.value = newValue;
    }
  },
);

onUnmounted(() => {
  debouncedSearchEmit.cancel();
  debouncedPriceEmit.cancel();
});
</script>

<style scoped lang="scss">
.filters-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 42px;
  padding-top: 10px;
}

.search-group {
  position: relative;

  .search-icon {
    position: absolute;
    top: 50%;
    right: 12px;
    color: theme-color("gray-dark-color");
    pointer-events: none;
    transform: translateY(-50%);
  }
}
</style>
