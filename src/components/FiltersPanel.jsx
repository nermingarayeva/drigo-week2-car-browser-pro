import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { PriceRangeInput } from "./PriceRangeInput";
import { SortSelect } from "./SortSelect";

const TYPES = ["Sedan", "Economy", "SUV", "Luxury"];
const SEAT_OPTIONS = [4, 5, 7];

export function FiltersPanel({ filters, actions }) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      actions.setSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <aside className="filters-panel">
      <label className="field">
        <span>Search</span>
        <input
          type="text"
          placeholder="Car name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </label>

      <label className="field">
        <span>Transmission</span>
        <select
          value={filters.transmission}
          onChange={(e) => actions.setTransmission(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Mechanical</option>
        </select>
      </label>

      <fieldset className="field field--group">
        <legend>Type (select a few)</legend>
        {TYPES.map((type) => (
          <label key={type} className="checkbox-row">
            <input
              type="checkbox"
              checked={filters.types.includes(type)}
              onChange={() => actions.toggleType(type)}
            />
            {type}
          </label>
        ))}
      </fieldset>

      <label className="field">
        <span>Number of seats</span>
        <select
          value={filters.seats}
          onChange={(e) =>
            actions.setSeats(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
        >
          <option value="all">All</option>
          {SEAT_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} person (capacity/size)
            </option>
          ))}
        </select>
      </label>

      <PriceRangeInput
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onCommit={actions.setPriceRange}
      />

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={filters.availableOnly}
          onChange={(e) => actions.setAvailableOnly(e.target.checked)}
        />
        Only available ones{" "}
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={filters.favoritesOnly}
          onChange={(e) => actions.setFavoritesOnly(e.target.checked)}
        />
        Favorites only{" "}
      </label>

      <SortSelect value={filters.sort} onChange={actions.setSort} />

      <button
        type="button"
        className="btn btn--ghost"
        onClick={actions.clearFilters}
      >
        Reset filters{" "}
      </button>
    </aside>
  );
}
