import { SORT_OPTIONS } from "../utils/sortCars";

const LABELS = {
  [SORT_OPTIONS.PRICE_ASC]: "Qiymət: Aşağıdan yuxarı",
  [SORT_OPTIONS.PRICE_DESC]: "Qiymət: Yuxarıdan aşağı",
  [SORT_OPTIONS.NAME_ASC]: "Ad: A → Z",
  [SORT_OPTIONS.NAME_DESC]: "Ad: Z → A",
};

export function SortSelect({ value, onChange }) {
  return (
    <label className="field">
      <span>Sırala</span>
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
