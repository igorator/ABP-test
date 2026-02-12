import type { HistoryItem } from "@/types/vin";

const STORAGE_KEY = "vin_history";

export const storage = {
  getHistory(): HistoryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveHistory(history: HistoryItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  },
};
