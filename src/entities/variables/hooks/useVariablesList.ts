import { useState, useEffect } from "react";
import { getVariablesList } from "../api/api";
import { useVariablesContext } from "../context/storage";
import type { VariablesData } from "../types";

export function useVariablesList() {
  const { data: variables, setData: setVariables } = useVariablesContext();
  const [isLoading, setIsLoading] = useState(variables.ids.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (variables.ids.length > 0) return;

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

        const data: VariablesData = { ids, entities };

        if (!cancelled) {
          setVariables(data);
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

  return {
    variables,
    isLoading,
    error,
  };
}
