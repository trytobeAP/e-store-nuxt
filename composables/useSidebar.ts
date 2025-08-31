import { ref, watch } from "vue";
import { useAppBreakpoints } from "~/composables/useAppBreakpoints";

export const createSidebarState = () => {
  const isOpen = ref(false);
  const { isDesktop } = useAppBreakpoints();

  const open = () => (isOpen.value = true);
  const close = () => (isOpen.value = false);
  const toggle = () => (isOpen.value = !isOpen.value);

  watch(isOpen, (isNowOpen) => {
    if (process.client) {
      document.body.classList.toggle("body-no-scroll", isNowOpen);
    }
  });

  watch(isDesktop, (isNowDesktop) => {
    if (isNowDesktop && isOpen.value) {
      close();
    }
  });

  return { isOpen, open, close, toggle };
};
