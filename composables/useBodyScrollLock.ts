import { watch } from "vue";
import type { Ref } from "vue";

export const useBodyScrollLock = (isLocked: Ref<boolean>) => {
  watch(isLocked, (newValue) => {
    if (import.meta.client) {
      if (newValue) {
        document.body.classList.add("body-no-scroll");
      } else {
        document.body.classList.remove("body-no-scroll");
      }
    }
  });
};
