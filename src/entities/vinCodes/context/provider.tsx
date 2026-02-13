import { useState, useCallback, useEffect, useMemo, type ReactNode } from "react";
import { VinCodesContext } from "./context";
import { decodeVin } from "../api/api";
import { getStorageItem, setStorageItem } from "@/shared/utils/localStorage";
import type { VinCodesData, VinResult } from "../types";

const STORAGE_KEY = "vin_history";
const EMPTY_DATA: VinCodesData = { codes: [], entities: {} };
const MAX_HISTORY_ITEMS = 3;

export function VinCodesProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<VinCodesData>(() =>
    getStorageItem(STORAGE_KEY, EMPTY_DATA),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStorageItem(STORAGE_KEY, data);
  }, [data]);

  const addCode = useCallback((vin: string, results: VinResult[]) => {
    setData((prev) => {
      const codes = [...prev.codes.filter((code) => code !== vin)];
      const entities = { ...prev.entities };

      codes.unshift(vin);
      entities[vin] = results;

      if (codes.length > MAX_HISTORY_ITEMS) {
        const removedCode = codes.pop()!;
        delete entities[removedCode];
      }

      return { codes, entities };
    });
  }, []);

  const moveToTop = useCallback((vin: string) => {
    setData((prev) => {
      const codes = [vin, ...prev.codes.filter((code) => code !== vin)];
      return { codes, entities: prev.entities };
    });
  }, []);

  const getDetailsByCode = useCallback(
    async (vin: string) => {
      if (data.entities[vin]) {
        moveToTop(vin);
        setError(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await decodeVin(vin);

        addCode(vin, response.Results);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to decode VIN";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [data.entities, addCode, moveToTop],
  );

  const value = useMemo(
    () => ({ data, isLoading, error, getDetailsByCode }),
    [data, isLoading, error, getDetailsByCode],
  );

  return (
    <VinCodesContext.Provider value={value}>
      {children}
    </VinCodesContext.Provider>
  );
}
