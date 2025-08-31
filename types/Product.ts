interface ProductRating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ProductRating;

  onSale?: boolean;
  inStock?: boolean;
}

export type { Product };
