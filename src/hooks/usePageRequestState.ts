import { useCallback } from "react";

interface IPageRequestItem {
  hasData: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
}

interface IUsePageRequestStateOptions {
  errorMessage?: string;
}

export const usePageRequestState = (
  requests: IPageRequestItem[],
  options?: IUsePageRequestStateOptions,
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
