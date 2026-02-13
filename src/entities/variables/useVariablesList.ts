import { useState, useEffect } from "react";
import { getVariablesList } from "./api";
import { variablesStorage } from "./storage";
import type { VariablesData } from "./types";

export function useVariablesList() {
  const [state, setState] = useState<{
    variables: VariablesData;
    isLoading: boolean;
    error: string | null;
  }>(() => {
    const cached = variablesStorage.getData();
    return {
      variables: cached,
      isLoading: cached.ids.length === 0,
      error: null,
    };
  });

  useEffect(() => {
    if (state.variables.ids.length > 0) return;

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
        variablesStorage.saveData(data);

        if (!cancelled) {
          setState({ variables: data, isLoading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error:
              err instanceof Error ? err.message : "Failed to fetch variables",
          }));
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    variables: state.variables,
    isLoading: state.isLoading,
    error: state.error,
  };
}
