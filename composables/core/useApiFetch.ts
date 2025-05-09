import type { UseFetchOptions } from "#app";
import { defu } from "defu";
import { unref } from "vue";
import type { MaybeRef, Ref } from "vue";

export function useApiFetch<T>(
  url: MaybeRef<string | undefined | null>,
  options: UseFetchOptions<T> = {}
) {
  const config = useRuntimeConfig();
  const defaultApiBaseFromConfig = config.public.apiBase ?? "/";

  const {
    baseURL: incomingBaseURL,
    key: incomingKey,
    ...otherOptions
  } = options;

  const defaults: Omit<UseFetchOptions<T>, "baseURL" | "key"> = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const mergedOtherOptions = defu(otherOptions, defaults);

  const finalBaseURL = (unref(incomingBaseURL) ??
    defaultApiBaseFromConfig) as string;

  const finalFetchOptions: UseFetchOptions<T> = {
    ...mergedOtherOptions,
    baseURL: finalBaseURL,
    ...(incomingKey !== undefined && { key: incomingKey }),
  };

  return useFetch(url as Ref<string>, finalFetchOptions);
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}
