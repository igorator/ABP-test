import { useState, useEffect } from "react";
import { getVariablesList } from "./api";
import { variablesStorage } from "./storage";
import type { VariableInfo, VariablesData } from "./types";

export function useVariableDetails(variableId: string | undefined) {
  const [state, setState] = useState<{
    variable: VariableInfo | null;
    isLoading: boolean;
    error: string | null;
  }>(() => {
    if (!variableId) return { variable: null, isLoading: false, error: null };

    const cached = variablesStorage.getData();
    const found = cached.entities[Number(variableId)];

    return {
      variable: found ?? null,
      isLoading: !found,
      error: null,
    };
  });

  useEffect(() => {
    if (!variableId || state.variable) return;

    let cancelled = false;

    const fetchData = async () => {
      try {
        const response = await getVariablesList();

        const entities: Record<number, VariableInfo> = {};
        const ids: number[] = [];

        for (const item of response.Results) {
          ids.push(item.ID);
          entities[item.ID] = item;
        }

        const data: VariablesData = { ids, entities };
        variablesStorage.saveData(data);

        const found = entities[Number(variableId)];

        if (!cancelled) {
          setState({
            variable: found ?? null,
            isLoading: false,
            error: found ? null : "Variable not found",
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            variable: null,
            isLoading: false,
            error:
              err instanceof Error ? err.message : "Failed to fetch data",
          });
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [variableId, state.variable]);

  return {
    variable: state.variable,
    isLoading: state.isLoading,
    error: state.error,
  };
}
