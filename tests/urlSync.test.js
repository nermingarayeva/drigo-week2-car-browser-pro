import { describe, expect, it } from "vitest";
import { parseStateFromSearchParams, serializeStateToSearchParams } from "../src/state/urlSync";
import { initialFilterState } from "../src/state/filterReducer";

describe("parseStateFromSearchParams", () => {
  it("boş URL üçün default state qaytarır", () => {
    const state = parseStateFromSearchParams(new URLSearchParams(""));
    expect(state.page).toBe(1);
    expect(state.transmission).toBe("all");
    expect(state.types).toEqual([]);
  });

  it("naməlum type dəyərini süzür, çökmür", () => {
    const state = parseStateFromSearchParams(new URLSearchParams("types=SUV,Spaceship"));
    expect(state.types).toEqual(["SUV"]);
  });

  it("rəqəm olmayan page-i 1-ə salır", () => {
    const state = parseStateFromSearchParams(new URLSearchParams("page=abc"));
    expect(state.page).toBe(1);
  });

  it("min > max olduqda dəyərləri yer dəyişdirir", () => {
    const state = parseStateFromSearchParams(new URLSearchParams("minPrice=100&maxPrice=20"));
    expect(state.minPrice).toBe(20);
    expect(state.maxPrice).toBe(100);
  });

  it("serialize edilmiş default state boş qalır (təmiz URL)", () => {
    const params = serializeStateToSearchParams(initialFilterState);
    expect(params.toString()).toBe("");
  });
});
