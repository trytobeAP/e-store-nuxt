interface Filters {
  searchQuery: string;
  category: string | null;
  sortBy: string | null;
  priceRange: [number, number];
  onSale: boolean;
  inStock: boolean;
}

export type { Filters };
