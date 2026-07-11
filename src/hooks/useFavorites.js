import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "car-browser-pro:favorites";
const SYNC_EVENT = "favorites-changed";

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {

    return [];
  }
}

function writeFavorites(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));

  window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: ids }));
}


export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => readFavorites());

  useEffect(() => {
    function handleSync(event) {
      setFavoriteIds(event.detail);
    }
    window.addEventListener(SYNC_EVENT, handleSync);
    return () => window.removeEventListener(SYNC_EVENT, handleSync);
  }, []);

  const toggleFavorite = useCallback((carId) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId];
      writeFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (carId) => favoriteIds.includes(carId),
    [favoriteIds]
  );

  return { favoriteIds, isFavorite, toggleFavorite };
}
