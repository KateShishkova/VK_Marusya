import { useState, type ChangeEvent } from "react";
import styles from "./SearchBar.module.scss";
import { CustomInput } from "@components/UI/CustomInput";
import { Dropdown } from "@components/UI/Dropdown";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Open Dropdown when input changes and value is not empty
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setDropdownOpen(e.target.value.trim() !== "");
  };

  // Open Dropdown on focus if value is not empty
  const handleInputFocus = () => {
    if (searchValue.trim() !== "") setDropdownOpen(true);
  };

  const handleReset = () => {
    setSearchValue("");
    setDropdownOpen(false);
  };

  return (
    <div className={styles.search}>
      <form className={styles.search__form} onReset={handleReset}>
        <CustomInput
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
        open={dropdownOpen}
        onClose={() => setDropdownOpen(false)}
      >
        {searchValue}
      </Dropdown>
    </div>
  );
};
