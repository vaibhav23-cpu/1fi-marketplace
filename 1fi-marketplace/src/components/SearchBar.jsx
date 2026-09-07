import {
  Search,
  X,
} from "lucide-react";

import styles from "./SearchBar.module.css";

function SearchBar({
  activeTab,
  searchTerm,
  setSearchTerm,
}) {
  const getPlaceholder = () => {
    if (activeTab === "marketplace") {
      return "Search products...";
    }

    if (activeTab === "nearby-stores") {
      return "Search nearby stores...";
    }

    return "Search online stores...";
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchBar}>
        <Search
          className={styles.searchIcon}
          size={18}
          strokeWidth={1.8}
        />

        <input
          type="text"
          value={searchTerm}
          placeholder={getPlaceholder()}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          aria-label={getPlaceholder()}
        />

        {searchTerm && (
          <button
            type="button"
            className={
              styles.searchClearButton
            }
            onClick={() =>
              setSearchTerm("")
            }
            aria-label="Clear search"
          >
            <X
              size={15}
              strokeWidth={2}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;