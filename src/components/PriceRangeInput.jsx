import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";


export function PriceRangeInput({ minPrice, maxPrice, onCommit }) {
  const [localMin, setLocalMin] = useState(minPrice ?? "");
  const [localMax, setLocalMax] = useState(maxPrice ?? "");

  const debouncedMin = useDebounce(localMin, 300);
  const debouncedMax = useDebounce(localMax, 300);

  
  useEffect(() => {
    setLocalMin(minPrice ?? "");
  }, [minPrice]);
  useEffect(() => {
    setLocalMax(maxPrice ?? "");
  }, [maxPrice]);

  useEffect(() => {
    const parsedMin = debouncedMin === "" ? null : Number(debouncedMin);
    const parsedMax = debouncedMax === "" ? null : Number(debouncedMax);
    onCommit({
      minPrice: Number.isFinite(parsedMin) ? parsedMin : null,
      maxPrice: Number.isFinite(parsedMax) ? parsedMax : null,
    });
    
  }, [debouncedMin, debouncedMax]);

  return (
    <div className="price-range">
      <label className="field">
        <span>Min qiymət</span>
        <input
          type="number"
          min="0"
          placeholder="0"
          value={localMin}
          onChange={(e) => setLocalMin(e.target.value)}
        />
      </label>
      <span className="price-range__separator">—</span>
      <label className="field">
        <span>Maks qiymət</span>
        <input
          type="number"
          min="0"
          placeholder="150"
          value={localMax}
          onChange={(e) => setLocalMax(e.target.value)}
        />
      </label>
    </div>
  );
}
