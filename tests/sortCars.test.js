import { describe, expect, it } from "vitest";
import { sortCars, SORT_OPTIONS } from "../src/utils/sortCars";

const cars = [
  { id: 1, name: "Toyota Corolla", pricePerDay: 35 },
  { id: 2, name: "Hyundai Accent", pricePerDay: 28 },
  { id: 3, name: "BMW 5 Series", pricePerDay: 130 },
];

describe("sortCars", () => {
  it("qiymətə görə aşağıdan yuxarı sıralayır", () => {
    const result = sortCars(cars, SORT_OPTIONS.PRICE_ASC);
    expect(result.map((c) => c.id)).toEqual([2, 1, 3]);
  });

  it("qiymətə görə yuxarıdan aşağı sıralayır", () => {
    const result = sortCars(cars, SORT_OPTIONS.PRICE_DESC);
    expect(result.map((c) => c.id)).toEqual([3, 1, 2]);
  });

  it("ada görə A-dan Z-yə sıralayır", () => {
    const result = sortCars(cars, SORT_OPTIONS.NAME_ASC);
    expect(result.map((c) => c.name)).toEqual([
      "BMW 5 Series",
      "Hyundai Accent",
      "Toyota Corolla",
    ]);
  });

  it("orijinal massivi mutasiya etmir", () => {
    const original = [...cars];
    sortCars(cars, SORT_OPTIONS.PRICE_DESC);
    expect(cars).toEqual(original);
  });

  it("naməlum sort key üçün çökmür, dəyişməz sıra qaytarır", () => {
    const result = sortCars(cars, "unknown-key");
    expect(result.map((c) => c.id)).toEqual([1, 2, 3]);
  });
});
