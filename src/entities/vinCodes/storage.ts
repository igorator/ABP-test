import type { VinCodesData } from "./types";

const STORAGE_KEY = "vin_history";

const EMPTY_DATA: VinCodesData = { codes: [], entities: {} };

export const vinCodesStorage = {
  getData(): VinCodesData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return EMPTY_DATA;

      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return EMPTY_DATA;

      return parsed as VinCodesData;
    } catch {
      return EMPTY_DATA;
    }
  },

  saveData(data: VinCodesData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  },
};
