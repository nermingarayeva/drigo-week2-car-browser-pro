import { useCallback, useEffect, useRef, useState } from "react";
import { getCars } from "../api/carsApi";


export function useCars() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);

    getCars()
      .then((cars) => {
        if (!isMountedRef.current) return;
        setData(cars);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMountedRef.current) return;
        setError(err.message || "Naməlum xəta baş verdi.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, retry: load };
}
