import { useCallback } from "react";

interface PageRequestStateItem {
  hasData: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
}

interface UsePageRequestStateOptions {
  errorMessage?: string;
}

export const usePageRequestState = (
  requests: PageRequestStateItem[],
  options?: UsePageRequestStateOptions,
) => {
  const hasPageData = requests.some((request) => request.hasData);

  const isPageLoading =
    !hasPageData && requests.some((request) => request.isFetching);

  const pageError =
    !hasPageData && requests.every((request) => request.isError)
      ? (options?.errorMessage ?? "Не удалось загрузить страницу.")
      : undefined;

  const retryAll = useCallback(() => {
    requests.forEach((request) => request.refetch());
  }, [requests]);

  return {
    hasPageData,
    isPageLoading,
    pageError,
    retryAll,
  };
};
