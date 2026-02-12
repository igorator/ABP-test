import { useState, useCallback } from "react";
import { storage } from "@/utils/storage";
import type { HistoryItem, VinResult } from "@/types/vin";
import { MAX_HISTORY_ITEMS } from "@/config/app";

export function useVinHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() =>
    storage.getHistory(),
  );

  const addToHistory = useCallback(
    (vin: string, results: VinResult[]) => {
      const newHistoryItem: HistoryItem = {
        vin,
        timestamp: Date.now(),
        results,
      };

      const newHistory = [
        newHistoryItem,
        ...history.filter((item) => item.vin !== vin),
      ].slice(0, MAX_HISTORY_ITEMS);

      setHistory(newHistory);
      storage.saveHistory(newHistory);
    },
    [history],
  );

  const getFromHistory = useCallback(
    (vin: string): HistoryItem | undefined => {
      return history.find((item) => item.vin === vin);
    },
    [history],
  );

  return {
    history,
    addToHistory,
    getFromHistory,
  };
}
