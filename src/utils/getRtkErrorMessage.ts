import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getRtkErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
  defaultMessage = "Произошла ошибка",
): string => {
  if (!error) return "Неизвестная ошибка";
  if (typeof error === "string") return error;
  if (typeof error === "object") {
    if ("data" in error && typeof error.data === "object" && error.data) {
      if ("message" in error.data) {
        return (error.data as any).message;
      }
      if ("error" in error.data) {
        return (error.data as any).error;
      }
    }
    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }
  }
  return defaultMessage;
};
