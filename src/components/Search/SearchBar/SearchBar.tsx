import clsx from "clsx";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FC,
} from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetMoviesInfiniteQuery } from "@api/movieApi";
import { CustomInput } from "@components/UI/CustomInput";
import { Dropdown } from "@components/UI/Dropdown";
import { ListView } from "@components/UI/ListView";
import { API_CONFIG } from "@config/api";
import { getRtkErrorMessage } from "@utils/getRtkErrorMessage";

import { SearchList } from "../SearchList";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  kind?: "default" | "popup";
  onResetSearch?: () => void;
  isOpen?: boolean;
}

export const SearchBar: FC<SearchBarProps> = ({
  kind = "default",
  onResetSearch,
  isOpen,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const hasSearchValue = normalizedSearchValue !== "";

  // Search
  useEffect(() => {
    if (!hasSearchValue) {
      const timer = setTimeout(() => setDebouncedSearchValue(""), 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setDebouncedSearchValue(normalizedSearchValue);
    }, API_CONFIG.SEARCH_TIMEOUT);

    return () => clearTimeout(timer);
  }, [hasSearchValue, normalizedSearchValue]);

  const isDebouncing =
    hasSearchValue && debouncedSearchValue !== normalizedSearchValue;
  const isDropdownVisible =
    dropdownOpen && (isDebouncing || !!debouncedSearchValue);

  const searchQueryArg = debouncedSearchValue
    ? { count: API_CONFIG.SEARCH_MOVIES_LIMIT, title: debouncedSearchValue }
    : skipToken;

  const { data, isFetching, isError, error, refetch } =
    useGetMoviesInfiniteQuery(searchQueryArg);

  const searchedMovies = useMemo(() => data?.pages.flat() ?? [], [data]);

  // Open Dropdown when input changes and value is not empty
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setDropdownOpen(value.trim() !== "");
  };

  // Open Dropdown on focus if value is not empty
  const handleInputFocus = () => {
    if (hasSearchValue) setDropdownOpen(true);
  };

  const handleReset = useCallback(() => {
    if (onResetSearch) {
      onResetSearch();
    } else {
      setSearchValue("");
      setDebouncedSearchValue("");
      setDropdownOpen(false);
    }
  }, [onResetSearch]);

  const finalClassName = clsx(
    styles.search,
    kind !== "default" && styles[`search--${kind}`],
  );

  return (
    <div ref={wrapperRef} className={finalClassName}>
      <form className={styles.search__form} onReset={handleReset}>
        <CustomInput
          ref={inputRef}
          className={styles.search__input}
          name="search"
          type="search"
          placeholder="Поиск"
          iconName="search"
          paddingSize="small"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </form>
      <Dropdown
        className={styles.search__dropdown}
        open={isDropdownVisible}
        onClose={() => setDropdownOpen(false)}
        boundaryRef={wrapperRef}
      >
        <ListView
          list={searchedMovies}
          isLoading={isDebouncing || isFetching}
          error={isError ? getRtkErrorMessage(error) : undefined}
          onRetry={refetch}
          emptyText="Ничего не найдено"
          renderList={(list) => (
            <SearchList list={list} onSelectMovie={handleReset} />
          )}
        />
      </Dropdown>
    </div>
  );
};
