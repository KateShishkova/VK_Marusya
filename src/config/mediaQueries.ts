export const MEDIA_QUERIES = {
  "descktop-sm": "(max-width: 1199px)",
  tablet: "(max-width: 1023px)",
  mobile: "(max-width: 767px)",
  "mobile-sm": "(max-width: 479px)",
} as const;

export type MediaQueryKey = keyof typeof MEDIA_QUERIES;
