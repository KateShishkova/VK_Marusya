import { matchPath } from "react-router-dom";
import {
  BASE_TITLE,
  PAGE_TITLES,
  type PageTitleContext,
} from "@config/pageTitles";

export const getPageTitle = (
  pathname: string,
  context: PageTitleContext = {},
) => {
  const pageTitleConfig = Object.entries(PAGE_TITLES).find(([pattern]) =>
    matchPath({ path: pattern, end: true }, pathname),
  )?.[1];

  if (typeof pageTitleConfig === "function") {
    return pageTitleConfig(context);
  }

  if (typeof pageTitleConfig === "string") {
    return pageTitleConfig;
  }

  return BASE_TITLE;
};
