import { useVinCodesContext } from "../context/useVinCodesContext";

export function useVinCodes() {
  const { data, isLoading, error, getDetailsByCode } = useVinCodesContext();

  const latestVin = data.codes[0];
  const details = latestVin
    ? (data.entities[latestVin] ?? []).filter((item) => item.Value)
    : [];

  return {
    codes: data.codes,
    getDetailsByCode,
    details,
    error,
    loading: isLoading,
  };
}
