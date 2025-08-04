import { ref } from "vue";
import type { CarouselImage } from "~/types/CarouselImage";
import type { UseCarouselImagesReturn } from "~/types/UseCarouselImageReturn";

const cdnImageSources = [
  "https://ir.ozone.ru/s3/multimedia-1-o/wc1000/7552734000.jpg",
  "https://ir.ozone.ru/s3/multimedia-1-i/wc1000/7565087718.jpg",
  "https://ir.ozone.ru/s3/multimedia-1-c/wc1000/7290435108.jpg",
  "https://ir.ozone.ru/s3/multimedia-1-2/wc1000/7552922510.jpg",
  "https://ir.ozone.ru/s3/multimedia-1-e/wc1000/7339784306.jpg",
  "https://ir.ozone.ru/s3/multimedia-1-2/wc1000/7322313638.jpg",
  "https://ir.ozone.ru/s3/multimedia-1-m/wc1000/7324005874.jpg",
  "https://ir.ozone.ru/s3/multimedia-1-s/wc1000/7560944200.jpg",
  "https://ir.ozone.ru/s3/multimedia-1-w/wc1000/7149990416.jpg",
  "https://ir.ozone.ru/s3/multimedia-1-a/wc1000/7158501370.jpg",
];

const categoryName = "watch";

export default function useCarouselImages(): UseCarouselImagesReturn {
  const images = ref<CarouselImage[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchImages = async () => {
    isLoading.value = true;
    error.value = null;
    const fetched: CarouselImage[] = [];

    try {
      cdnImageSources.forEach((imageUrl, index) => {
        const i = index + 1;
        const itemName = `${categoryName} Item ${i}`;
        const itemPrice = Math.floor(Math.random() * (1000 - 50 + 1)) + 500;
        const itemSlug = `${categoryName}-${i}`;

        fetched.push({
          id: itemSlug,
          src: imageUrl,
          alt: `Image of ${itemName}`,
          name: itemName,
          price: itemPrice,
          productLink: `/products/${itemSlug}`,
        });
      });

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
