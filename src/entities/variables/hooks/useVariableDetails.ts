import { useState, useEffect } from "react";
import { getVariablesList } from "../api/api";
import { useVariablesContext } from "../context/storage";
import type { VariableInfo, VariablesData } from "../types";

export function useVariableDetails(variableId: string | undefined) {
  const { data: variables, setData: setVariables } = useVariablesContext();

  const found = variableId
    ? (variables.entities[Number(variableId)] ?? null)
    : null;

  const [isLoading, setIsLoading] = useState(!found && !!variableId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!variableId || found) return;

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

        if (!cancelled) {
          setVariables(data);
          const variable = entities[Number(variableId)];
          setIsLoading(false);
          setError(variable ? null : "Variable not found");
        }
      } catch (err) {
        if (!cancelled) {
          setIsLoading(false);
          setError(
            err instanceof Error ? err.message : "Failed to fetch data",
          );
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [variableId, found, setVariables]);

  return {
    variable: found,
    isLoading,
    error,
  };
}
