export const getRtkErrorMessage = (
  error: unknown,
  defaultMessage = "Произошла ошибка",
): string => {
  if (!error) return defaultMessage;
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null) {
    // RTK Query FetchBaseQueryError
    if ("status" in error && "data" in error) {
      if (typeof error.data === "string") return error.data;
      if (
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data
      ) {
        return String(error.data.message);
      }
    }
    // SerializedError
    if ("message" in error) return String((error as any).message);
  }
  return defaultMessage;
};
