import { describe, expect, it } from "vitest";
import { filterCars } from "../src/utils/filterCars";
import { initialFilterState } from "../src/state/filterReducer";

const cars = [
  { id: 1, name: "Toyota Corolla", type: "Sedan", transmission: "Automatic", seats: 5, pricePerDay: 35, available: true },
  { id: 2, name: "Hyundai Accent", type: "Economy", transmission: "Manual", seats: 5, pricePerDay: 28, available: true },
  { id: 3, name: "Kia Sportage", type: "SUV", transmission: "Automatic", seats: 5, pricePerDay: 55, available: false },
  { id: 6, name: "Toyota Land Cruiser", type: "SUV", transmission: "Automatic", seats: 7, pricePerDay: 150, available: false },
];

describe("filterCars", () => {
  it("dəyişiklik olmadıqda bütün maşınları qaytarır", () => {
    const result = filterCars(cars, initialFilterState);
    expect(result).toHaveLength(4);
  });

  it("search filtri ad üzrə case-insensitive işləyir", () => {
    const result = filterCars(cars, { ...initialFilterState, search: "toyota" });
    expect(result.map((c) => c.id)).toEqual([1, 6]);
  });

  it("bir neçə filtri EYNI ANDA (AND məntiqi) tətbiq edir", () => {
    
    const result = filterCars(cars, {
      ...initialFilterState,
      types: ["SUV"],
      availableOnly: true,
    });
    expect(result).toHaveLength(0);
  });

  it("price range min və max-ı birlikdə tətbiq edir", () => {
    const result = filterCars(cars, {
      ...initialFilterState,
      minPrice: 30,
      maxPrice: 60,
    });
    expect(result.map((c) => c.id).sort()).toEqual([1, 3]);
  });

  it("seats filtri dəqiq bərabərliyi yoxlayır", () => {
    const result = filterCars(cars, { ...initialFilterState, seats: 7 });
    expect(result.map((c) => c.id)).toEqual([6]);
  });

  it("favoritesOnly aktiv olanda yalnız favorit id-ləri saxlayır", () => {
    const result = filterCars(
      cars,
      { ...initialFilterState, favoritesOnly: true },
      [2, 6]
    );
    expect(result.map((c) => c.id).sort()).toEqual([2, 6]);
  });
});
