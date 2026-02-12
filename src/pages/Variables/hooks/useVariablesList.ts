import { getVariablesList } from "@/services/api";
import { useFetch } from "@/hooks/useFetch";
import type { VariableInfo } from "@/types/vin";

export function useVariablesList() {
  const { data, isLoading, error } = useFetch(async () => {
    const response = await getVariablesList();
    return response.Results;
  }, []);

  return {
    variables: data as VariableInfo[] | null,
    isLoading,
    error,
  };
}
