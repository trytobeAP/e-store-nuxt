import type { SelectOption } from "~/types/SelectOption";

/**
 * Преобразует значение из query в безопасное число или возвращает fallback.
 * @param value Значение из route.query.
 * @param fallback Значение по умолчанию, если value не является валидным числом.
 */
export function validateNumberQuery(value: unknown, fallback: number): number {
  if (typeof value === "string") {
    const num = Number(value);
    if (!isNaN(num) && isFinite(num)) {
      return num;
    }
  }
  return fallback;
}

/**
 * Проверяет, что значение из query является одной из валидных опций.
 * @param value Значение из route.query.
 * @param validOptions Массив валидных опций (например, для категорий или сортировки).
 * @param fallback Значение по умолчанию.
 */
export function validateOptionQuery(
  value: unknown,
  validOptions: SelectOption[],
  fallback: string | null,
): string | null {
  if (typeof value === "string") {
    const isValid = validOptions.some((option) => option.value === value);
    if (isValid) {
      return value;
    }
  }
  return fallback;
}

/**
 * Преобразует значение из query в безопасную строку или возвращает fallback.
 * Декодирует URI-компонент.
 * @param value Значение из route.query.
 * @param fallback Значение по умолчанию.
 */
export function validateStringQuery(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim() !== "") {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      console.error("Failed to decode URI component:", value, e);
      return fallback;
    }
  }
  return fallback;
}

/**
 * Проверяет, что значение из query является строкой "true".
 * @param value Значение из route.query.
 */
export function validateBooleanQuery(value: unknown): boolean {
  return value === "true";
}
