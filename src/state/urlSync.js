import { initialFilterState } from "./filterReducer";

const VALID_TRANSMISSIONS = ["all", "Automatic", "Manual"];
const VALID_SORTS = ["price-asc", "price-desc", "name-asc", "name-desc"];
const KNOWN_TYPES = ["Sedan", "Economy", "SUV", "Luxury"];

function parseIntOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

export function parseStateFromSearchParams(params) {
  const search = params.get("search") || "";

  const transmissionRaw = params.get("transmission") || "all";
  const transmission = VALID_TRANSMISSIONS.includes(transmissionRaw)
    ? transmissionRaw
    : "all";

  const typesRaw = params.get("types");
  const types = typesRaw
    ? typesRaw.split(",").filter((t) => KNOWN_TYPES.includes(t))
    : [];

  const availableOnly = params.get("available") === "1";
  const favoritesOnly = params.get("favorites") === "1";

  let minPrice = parseIntOrNull(params.get("minPrice"));
  let maxPrice = parseIntOrNull(params.get("maxPrice"));

  if (minPrice !== null && minPrice < 0) minPrice = null;
  if (maxPrice !== null && maxPrice < 0) maxPrice = null;
  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  const seatsRaw = params.get("seats") || "all";
  const seatsNum = Number(seatsRaw);
  const seats =
    seatsRaw === "all" || !Number.isFinite(seatsNum) || seatsNum <= 0
      ? "all"
      : seatsNum;

  const sortRaw = params.get("sort") || initialFilterState.sort;
  const sort = VALID_SORTS.includes(sortRaw) ? sortRaw : initialFilterState.sort;

  const pageRaw = parseIntOrNull(params.get("page"));
  const page = pageRaw !== null && pageRaw >= 1 ? Math.floor(pageRaw) : 1;

  return {
    search,
    transmission,
    types,
    availableOnly,
    minPrice,
    maxPrice,
    seats,
    favoritesOnly,
    sort,
    page,
  };
}


export function serializeStateToSearchParams(state) {
  const params = new URLSearchParams();

  if (state.search) params.set("search", state.search);
  if (state.transmission !== "all") params.set("transmission", state.transmission);
  if (state.types.length > 0) params.set("types", state.types.join(","));
  if (state.availableOnly) params.set("available", "1");
  if (state.favoritesOnly) params.set("favorites", "1");
  if (state.minPrice !== null) params.set("minPrice", String(state.minPrice));
  if (state.maxPrice !== null) params.set("maxPrice", String(state.maxPrice));
  if (state.seats !== "all") params.set("seats", String(state.seats));
  if (state.sort !== initialFilterState.sort) params.set("sort", state.sort);
  if (state.page !== 1) params.set("page", String(state.page));

  return params;
}
