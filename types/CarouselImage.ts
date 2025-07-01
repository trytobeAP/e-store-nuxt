interface CarouselImage {
  id: number | string;
  src: string;
  alt?: string;
  name?: string; 
  price?: number; 
  productLink?: string; 
}

export type { CarouselImage }