import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useCars } from "../hooks/useCars";
import { useFavorites } from "../hooks/useFavorites";
import {
  ACTIONS,
  filterReducer,
  initialFilterState,
  PAGE_SIZE,
} from "../state/filterReducer";
import { parseStateFromSearchParams, serializeStateToSearchParams } from "../state/urlSync";
import { filterCars } from "../utils/filterCars";
import { sortCars } from "../utils/sortCars";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { CarList } from "../components/CarList";
import { FiltersPanel } from "../components/FiltersPanel";
import { Pagination } from "../components/Pagination";

export function CarListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: cars, loading, error, retry } = useCars();
  const { isFavorite, toggleFavorite, favoriteIds } = useFavorites();

  const [state, dispatch] = useReducer(
    filterReducer,
    searchParams,
    (initialParams) => ({
      ...initialFilterState,
      ...parseStateFromSearchParams(initialParams),
    })
  );


  const lastSerializedRef = useRef(searchParams.toString());
  useEffect(() => {
    const nextParams = serializeStateToSearchParams(state);
    const nextString = nextParams.toString();
    if (nextString !== lastSerializedRef.current) {
      lastSerializedRef.current = nextString;
      setSearchParams(nextParams, { replace: true });
    }
  }, [state, setSearchParams]);

  const filteredAndSorted = useMemo(() => {
    if (!cars) return [];
    const filtered = filterCars(cars, state, favoriteIds);
    return sortCars(filtered, state.sort);
  }, [cars, state, favoriteIds]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));
  const clampedPage = Math.min(Math.max(1, state.page), totalPages);

  useEffect(() => {
    if (clampedPage !== state.page) {
      dispatch({ type: ACTIONS.SET_PAGE, payload: clampedPage });
    }
  }, [clampedPage, state.page]);

  const visibleCars = useMemo(() => {
    const start = (clampedPage - 1) * PAGE_SIZE;
    return filteredAndSorted.slice(start, start + PAGE_SIZE);
  }, [filteredAndSorted, clampedPage]);

  const actions = useMemo(
    () => ({
      setSearch: (value) => dispatch({ type: ACTIONS.SET_SEARCH, payload: value }),
      setTransmission: (value) =>
        dispatch({ type: ACTIONS.SET_TRANSMISSION, payload: value }),
      toggleType: (type) => dispatch({ type: ACTIONS.TOGGLE_TYPE, payload: type }),
      setAvailableOnly: (value) =>
        dispatch({ type: ACTIONS.SET_AVAILABLE_ONLY, payload: value }),
      setPriceRange: (range) => dispatch({ type: ACTIONS.SET_PRICE_RANGE, payload: range }),
      setSeats: (value) => dispatch({ type: ACTIONS.SET_SEATS, payload: value }),
      setFavoritesOnly: (value) =>
        dispatch({ type: ACTIONS.SET_FAVORITES_ONLY, payload: value }),
      setSort: (value) => dispatch({ type: ACTIONS.SET_SORT, payload: value }),
      clearFilters: () => dispatch({ type: ACTIONS.HYDRATE_FROM_URL, payload: initialFilterState }),
    }),
    []
  );

  const handlePageChange = useCallback((page) => {
    dispatch({ type: ACTIONS.SET_PAGE, payload: page });
  }, []);

  return (
    <div className="page page--list">
      <header className="page__header">
        <h1>Car Browser Pro</h1>
        <p className="page__subtitle">İcarə üçün maşın axtar, filtrlə, favoritlə.</p>
      </header>

      <div className="page__body">
        <FiltersPanel filters={state} actions={actions} />

        <main className="results">
          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} onRetry={retry} />}
          {!loading && !error && filteredAndSorted.length === 0 && (
            <EmptyState onClearFilters={actions.clearFilters} />
          )}
          {!loading && !error && filteredAndSorted.length > 0 && (
            <>
              <p className="results__count">
                {filteredAndSorted.length} nəticədən {visibleCars.length} göstərilir
              </p>
              <CarList
                cars={visibleCars}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
              <Pagination
                currentPage={clampedPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
