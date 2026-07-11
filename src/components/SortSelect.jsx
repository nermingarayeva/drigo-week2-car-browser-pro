import { SORT_OPTIONS } from "../utils/sortCars";

const LABELS = {
  [SORT_OPTIONS.PRICE_ASC]: "Price: Low to high",
  [SORT_OPTIONS.PRICE_DESC]: "Price: High to low",
  [SORT_OPTIONS.NAME_ASC]: "Name: A → Z",
  [SORT_OPTIONS.NAME_DESC]: "Name: Z → A",
};

export function SortSelect({ value, onChange }) {
  return (
    <label className="field">
      <span>Sort</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {Object.values(SORT_OPTIONS).map((key) => (
          <option key={key} value={key}>
            {LABELS[key]}
          </option>
        ))}
      </select>
    </label>
  );
}
