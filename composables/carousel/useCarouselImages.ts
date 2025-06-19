import { ref } from "vue";
import type { CarouselImage } from "~/types/CarouselImage";
import type { ImageSourceConfig } from "~/types/ImageSourceConfig";
import type { UseCarouselImagesReturn } from "~/types/UseCarouselImageReturn";

export default function useCarouselImages(
  config: ImageSourceConfig
): UseCarouselImagesReturn {
  const images = ref<CarouselImage[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchImages = async () => {
    isLoading.value = true;
    error.value = null;
    const fetched: CarouselImage[] = [];

    try {
      for (let i = 1; i <= config.totalImages; i++) {
        const itemName = `${config.category} Item ${i}`;
        const itemPrice = Math.floor(Math.random() * (1000 - 50 + 1)) + 500;
        const itemSlug = `${config.category}-${i}`;

        fetched.push({
          id: itemSlug,
          src: `${config.baseUrl}${config.category}.png?id=${i}&${config.params}`,
          alt: `Image of ${itemName}`,
          name: itemName,
          price: itemPrice,
          productLink: `/products/${itemSlug}`,
        });
      }
      images.value = fetched;
    } catch (e: unknown) {
      console.error("Error preparing carousel images:", e);
      error.value =
        "Failed to load carousel images. Details: " +
        (e instanceof Error ? e.message : String(e));
    } finally {
      isLoading.value = false;
    }
  };

  return {
    images,
    isLoading,
    error,
    fetchImages,
  };
}
