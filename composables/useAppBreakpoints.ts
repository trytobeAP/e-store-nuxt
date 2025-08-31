import { useBreakpoints } from "@vueuse/core";

function getCssVarPx(name: string): number {
  if (process.client) {
    try {
      const value = getComputedStyle(document.documentElement).getPropertyValue(
        name,
      );
      return value ? parseInt(value, 10) : 0;
    } catch (error) {
      console.error(`Could not parse CSS variable ${name}`, error);
      return 0;
    }
  }
  return 0;
}

export function useAppBreakpoints() {
  const breakpoints = useBreakpoints({
    xl: getCssVarPx("--breakpoint-xl"),
    l: getCssVarPx("--breakpoint-l"),
    m: getCssVarPx("--breakpoint-m"),
    s: getCssVarPx("--breakpoint-s"),
  });

  return {
    breakpoints,
    isMobile: breakpoints.smallerOrEqual("m"),
    isDesktop: breakpoints.greater("m"),
  };
}
