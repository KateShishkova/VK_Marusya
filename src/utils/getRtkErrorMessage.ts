import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isFetchBaseQueryError = (
  error: unknown,
): error is FetchBaseQueryError => {
  return isRecord(error) && "status" in error;
};

const isSerializedError = (error: unknown): error is SerializedError => {
  return isRecord(error) && "message" in error;
};

const getMessageFromData = (data: unknown): string | null => {
  if (typeof data === "string") {
    return data;
  }

  if (!isRecord(data)) {
    return null;
  }

  if (typeof data.message === "string") {
    return data.message;
  }

  if (typeof data.error === "string") {
    return data.error;
  }

  return null;
};

export const getRtkErrorMessage = (
  error: unknown,
  defaultMessage = "Произошла ошибка",
): string => {
  if (!error) {
    return defaultMessage;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (isFetchBaseQueryError(error)) {
    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }

    if ("data" in error) {
      const message = getMessageFromData(error.data);
      if (message) {
        return message;
      }
    }
  }

  if (isSerializedError(error) && typeof error.message === "string") {
    return error.message;
  }

  return defaultMessage;
};
