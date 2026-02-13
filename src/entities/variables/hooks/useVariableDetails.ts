import { useVariablesContext } from "../context/useVariablesContext";

export function useVariableDetails(variableId: string | undefined) {
  const { data: variables, isLoading, error } = useVariablesContext();

  const variable = variableId
    ? (variables.entities[Number(variableId)] ?? null)
    : null;

  return {
    variable,
    isLoading,
    error: variable ? null : isLoading ? null : error ?? "Variable not found",
  };
}
