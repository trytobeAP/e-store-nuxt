<template>
  <div>
    <div class="filter-group search-group">
      <BaseInput
        v-model="localSearchQuery"
        placeholder="Search..."
        clearable
        icon-name="mdi:magnify"
        icon-position="left"
      />
    </div>

    <div class="filter-group">
      <BaseSelect
        :model-value="modelValue.category"
        placeholder="Category"
        clearable
        :options="categoryOptions"
        @update:model-value="updateField('category', $event as string | null)"
        @clear="updateField('category', null)"
      />
    </div>

    <div class="filter-group">
      <BaseSelect
        :model-value="modelValue.sortBy"
        placeholder="Sort By"
        clearable
        :options="sortOptions"
        @update:model-value="updateField('sortBy', $event as string | null)"
        @clear="updateField('sortBy', null)"
      />
    </div>

    <div class="filter-group">
      <BasePriceSlider
        :model-value="modelValue.priceRange"
        :min="0"
        :max="1500"
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
import { ref, watch, onUnmounted } from "vue";
import { debounce } from "~/utils/debounce";
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

function updateField<K extends keyof Filters>(key: K, value: Filters[K]) {
  const newFilters = {
    ...props.modelValue,
    [key]: value,
  };
  emit("update:modelValue", newFilters);
}

const localSearchQuery = ref(props.modelValue.searchQuery);

const debouncedSearchEmit = debounce((newValue: string) => {
  updateField("searchQuery", newValue);
}, 500);

const debouncedPriceEmit = debounce((newRange: [number, number]) => {
  updateField("priceRange", newRange);
}, 500);

watch(localSearchQuery, (newValue) => {
  debouncedSearchEmit.call(newValue);
});

watch(
  () => props.modelValue.searchQuery,
  (newPropValue) => {
    if (localSearchQuery.value !== newPropValue) {
      localSearchQuery.value = newPropValue;
    }
  },
);

onUnmounted(() => {
  debouncedSearchEmit.cancel();
  debouncedPriceEmit.cancel();
});
</script>

<style scoped lang="scss">
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

div > .filter-group:not(:first-child) {
  margin-top: 24px;
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

.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 10px;
}
</style>
