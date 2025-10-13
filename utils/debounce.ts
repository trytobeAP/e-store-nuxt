interface DebouncedFunction<T extends unknown[]> {
  call: (...args: T) => void;
  cancel: () => void;
}

/**
 * Создает debounce-версию переданной функции. Не использует `any`.
 * @param func - Функция, выполнение которой нужно отложить.
 * @param delay - Задержка в миллисекундах.
 * @returns Объект с методами `call` для вызова и `cancel` для отмены.
 */
export function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  delay: number,
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const call = (...args: T): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  const cancel = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return {
    call,
    cancel,
  };
}
