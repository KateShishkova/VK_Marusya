import { useSearchParams } from "react-router-dom";

const DEFAULT_PAGE = 1;

export function usePageSearchParam(paramName: string = "page") {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = Number(searchParams.get(paramName));
  const page = value > 0 ? value : DEFAULT_PAGE;

  function setPage(nextPage: number, replace: boolean = true) {
    const safePage = nextPage > 0 ? nextPage : DEFAULT_PAGE;
    const params = new URLSearchParams(searchParams);

    if (safePage === DEFAULT_PAGE) {
      params.delete(paramName);
    } else {
      params.set(paramName, String(safePage));
    }

    setSearchParams(params, { replace });
  }

  return { page, setPage };
}
