import { getVariablesList } from "@/services/api";
import { useFetch } from "@/hooks/useFetch";
import type { VariableInfo } from "@/types/vin";

export function useVariableDetails(variableId: string | undefined) {
  const { data, isLoading, error } = useFetch(
    async () => {
      if (!variableId) {
        throw new Error("Variable ID is required");
      }

      const response = await getVariablesList();
      const found = response.Results.find((v) => v.ID === Number(variableId));

      if (!found) {
        throw new Error("Variable not found");
      }

      return found;
    },
    [variableId],
  );

  return {
    variable: data as VariableInfo | null,
    isLoading,
    error,
  };
}
