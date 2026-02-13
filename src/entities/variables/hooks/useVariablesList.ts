import { useVariablesContext } from "../context/useVariablesContext";

export function useVariablesList() {
  const { data: variables, isLoading, error } = useVariablesContext();

  return {
    variables,
    isLoading,
    error,
  };
}
