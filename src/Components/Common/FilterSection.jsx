import React, { Fragment, useState } from "react";
import { searchIcon } from "../../assets/Icons/Svg";

const FilterSection = ({
  filterFields,
  handleFilterChange,
  className = "filterInput",
  children
}) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="filtersSection">
      {filterFields?.map(
        ({ type, filterName, defaultOption, options, placeholder }, idx) => (
          <Fragment key={idx}>
            {type === "select" && (
              <select
                className={className}
                onChange={(e) => handleFilterChange(filterName, e.target.value)}
              >
                <option value="" selected hidden disabled>
                  {defaultOption}
                </option>
                {options?.map(({ value, label }, idx) => (
                  <option key={idx} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            )}

            {type === "search" && (
              <div className="search">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="search-input"
                  placeholder={placeholder}
                />
                <div
                  className="searchIcon"
                  onClick={() => handleFilterChange(filterName, searchInput)}
                >
                  {searchIcon}
                </div>
              </div>
            )}
          </Fragment>
        )
      )}
      {children}
    </div>
  );
};

export default FilterSection;
