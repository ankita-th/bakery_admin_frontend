import React, { Fragment, useState } from "react";
import { searchIcon } from "../../assets/Icons/Svg";

const FilterSection = ({
  filterFields,
  handleFilterChange,
  className = "filterInput",
  children,
}) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="filtersSection">
      {filterFields?.map(
        ({ type, filterName, defaultOption, options, placeholder }, idx) => (
          <div className="selection-pre">
            <Fragment key={idx}>
              <div className="filters">
                {type === "select" && (
                  <select
                    className={className}
                    onChange={(e) =>
                      handleFilterChange(filterName, e.target.value)
                    }
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
              </div>
              {type === "search" && (
                <>
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
                </>
              )}
            </Fragment>
          </div>
        )
      )}
      <div className="filter-buttons">{children}</div>
    </div>
  );
};

export default FilterSection;
