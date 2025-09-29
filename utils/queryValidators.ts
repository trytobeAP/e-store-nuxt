import type { SelectOption } from "~/types/SelectOption";

export function validateNumberQuery(value: unknown, fallback: number): number {
  if (typeof value === "string") {
    const num = Number(value);
    if (!isNaN(num) && isFinite(num)) {
      return num;
    }
  }
  return fallback;
}

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

export function validateBooleanQuery(value: unknown): boolean {
  return value === "true";
}
