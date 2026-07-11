export const PAGE_SIZE = 6;

export const initialFilterState = {
  search: "",
  transmission: "all", 
  types: [], 
  availableOnly: false,
  minPrice: null,
  maxPrice: null,
  seats: "all",
  favoritesOnly: false,
  sort: "price-asc",
  page: 1,
};

export const ACTIONS = {
  SET_SEARCH: "SET_SEARCH",
  SET_TRANSMISSION: "SET_TRANSMISSION",
  TOGGLE_TYPE: "TOGGLE_TYPE",
  SET_AVAILABLE_ONLY: "SET_AVAILABLE_ONLY",
  SET_PRICE_RANGE: "SET_PRICE_RANGE",
  SET_SEATS: "SET_SEATS",
  SET_FAVORITES_ONLY: "SET_FAVORITES_ONLY",
  SET_SORT: "SET_SORT",
  SET_PAGE: "SET_PAGE",
  HYDRATE_FROM_URL: "HYDRATE_FROM_URL", 
};


export function filterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SEARCH:
      return { ...state, search: action.payload, page: 1 };

    case ACTIONS.SET_TRANSMISSION:
      return { ...state, transmission: action.payload, page: 1 };

    case ACTIONS.TOGGLE_TYPE: {
      const type = action.payload;
      const alreadySelected = state.types.includes(type);
      const nextTypes = alreadySelected
        ? state.types.filter((t) => t !== type)
        : [...state.types, type];
      return { ...state, types: nextTypes, page: 1 };
    }

    case ACTIONS.SET_AVAILABLE_ONLY:
      return { ...state, availableOnly: action.payload, page: 1 };

    case ACTIONS.SET_PRICE_RANGE:
      return {
        ...state,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
        page: 1,
      };

    case ACTIONS.SET_SEATS:
      return { ...state, seats: action.payload, page: 1 };

    case ACTIONS.SET_FAVORITES_ONLY:
      return { ...state, favoritesOnly: action.payload, page: 1 };

    case ACTIONS.SET_SORT:
      return { ...state, sort: action.payload, page: 1 };

    case ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };

    case ACTIONS.HYDRATE_FROM_URL:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
