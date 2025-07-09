const STORAGE_KEY = "newsletterEmailsArray";

/**
 * Извлекает список emal'ов из localStorage.
 * Возвращает пустой массив, если данные отсутствуют на клиенте.
 */
const getStoredEmails = (): string[] => {
  if (!import.meta.client) return [];

  try {
    const existingEmailsJson = localStorage.getItem(STORAGE_KEY);
    if (existingEmailsJson) {
      const emails = JSON.parse(existingEmailsJson);
      if (Array.isArray(emails)) {
        return emails;
      } else {
        console.warn("Stored newsletter data was not an array, resetting.");
        localStorage.removeItem(STORAGE_KEY);
        return [];
      }
    }
  } catch (error) {
    console.error("Error accessing or parsing newsletter emails:", error);
  }
  return [];
};

/**
 * Пытается добавить email адрес в список рассылки в localStorage.
 * Выполняет проверку дубликатов без учета регистра.
 *
 * @param emailToAdd email который хотим добавить
 * @returns 'success' | 'duplicate' | 'error' в зависимости от результата
 */
export const addEmailToNewsletter = (
  emailToAdd: string,
): "success" | "duplicate" | "error" => {
  if (!import.meta.client) {
    console.warn(
      "Attempted newsletter subscription outside of client environment.",
    );
    return "error";
  }
  if (!emailToAdd) {
    console.warn("Attempted to add an empty email.");
    return "error";
  }

  try {
    const emails = getStoredEmails();
    const normalizedEmail = emailToAdd.toLowerCase().trim();

    if (
      emails.some(
        (storedEmail) => storedEmail.toLowerCase() === normalizedEmail,
      )
    ) {
      return "duplicate";
    }

    emails.push(emailToAdd.trim());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
    return "success";
  } catch (storageError) {
    console.error(
      "Error interacting with localStorage during add:",
      storageError,
    );
    return "error";
  }
};
