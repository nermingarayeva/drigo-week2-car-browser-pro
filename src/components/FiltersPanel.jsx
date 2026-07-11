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
        <span>Axtarış</span>
        <input
          type="text"
          placeholder="Maşın adı..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </label>

      <label className="field">
        <span>Sürətlər qutusu</span>
        <select
          value={filters.transmission}
          onChange={(e) => actions.setTransmission(e.target.value)}
        >
          <option value="all">Hamısı</option>
          <option value="Automatic">Avtomat</option>
          <option value="Manual">Mexaniki</option>
        </select>
      </label>

      <fieldset className="field field--group">
        <legend>Növ (bir neçəsini seç)</legend>
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
        <span>Oturacaq sayı</span>
        <select
          value={filters.seats}
          onChange={(e) =>
            actions.setSeats(e.target.value === "all" ? "all" : Number(e.target.value))
          }
        >
          <option value="all">Hamısı</option>
          {SEAT_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} nəfərlik
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
        Yalnız mövcud olanlar
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={filters.favoritesOnly}
          onChange={(e) => actions.setFavoritesOnly(e.target.checked)}
        />
        Yalnız favoritlər
      </label>

      <SortSelect value={filters.sort} onChange={actions.setSort} />

      <button type="button" className="btn btn--ghost" onClick={actions.clearFilters}>
        Filtrləri sıfırla
      </button>
    </aside>
  );
}
