import { useState, useEffect } from "react";

type UseFetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setState({ data: null, isLoading: true, error: null });
        const result = await fetcher();

        if (!cancelled) {
          setState({ data: result, isLoading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            data: null,
            isLoading: false,
            error: err instanceof Error ? err.message : "Failed to fetch data",
          });
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, deps);

  return state;
}
