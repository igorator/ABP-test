import { useState, useEffect, useMemo, type ReactNode } from "react";
import { VariablesContext } from "./context";
import { getVariablesList } from "../api/api";
import { getStorageItem, setStorageItem } from "@/shared/utils/localStorage";
import type { VariablesData } from "../types";

const STORAGE_KEY = "variables_cache";
const EMPTY_DATA: VariablesData = { ids: [], entities: {} };

export function VariablesProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<VariablesData>(() =>
    getStorageItem(STORAGE_KEY, EMPTY_DATA),
  );
  const [isLoading, setIsLoading] = useState(() => data.ids.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data.ids.length === 0) return;
    setStorageItem(STORAGE_KEY, data);
  }, [data]);

  useEffect(() => {
    if (data.ids.length > 0) return;

    let cancelled = false;

    const fetchData = async () => {
      try {
        const response = await getVariablesList();

        const entities: Record<number, (typeof response.Results)[number]> = {};
        const ids: number[] = [];

        for (const item of response.Results) {
          ids.push(item.ID);
          entities[item.ID] = item;
        }

        if (!cancelled) {
          setData({ ids, entities });
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setIsLoading(false);
          setError(
            err instanceof Error ? err.message : "Failed to fetch variables",
          );
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({ data, isLoading, error }),
    [data, isLoading, error],
  );

  return (
    <VariablesContext.Provider value={value}>
      {children}
    </VariablesContext.Provider>
  );
}
