import type { CarouselImage } from "~/types/CarouselImage";
import type { Ref } from "vue";

interface UseCarouselImagesReturn {
  images: Ref<CarouselImage[]>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
  fetchImages: () => Promise<void>;
}

export type { UseCarouselImagesReturn };
