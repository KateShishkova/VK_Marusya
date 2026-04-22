import { useEffect, useState } from "react";
import { MEDIA_QUERIES, type MediaQueryKey } from "@config/mediaQueries";

export const useMediaQuery = (queryKey: MediaQueryKey): boolean => {
  const query = MEDIA_QUERIES[queryKey];

  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window != "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    const timeoutId = setTimeout(() => {
      setMatches(mediaQueryList.matches);
    }, 0);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
      clearTimeout(timeoutId);
    };
  }, [query]);

  return matches;
};
