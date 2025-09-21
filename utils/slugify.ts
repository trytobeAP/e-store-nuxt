import slugify from "slugify";

/**
 * Создает чистый, URL-совместимый "слаг" из строки.
 * @param text Входная строка.
 * @returns {string} Очищенный слаг.
 */
export const useSlugify = (text: string): string => {
  return slugify(text, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
};
