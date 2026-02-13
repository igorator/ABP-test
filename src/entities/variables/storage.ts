import type { VariablesData } from "./types";

const STORAGE_KEY = "variables_cache";

const EMPTY_DATA: VariablesData = { ids: [], entities: {} };

export const variablesStorage = {
  getData(): VariablesData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return EMPTY_DATA;

      return JSON.parse(raw) as VariablesData;
    } catch {
      return EMPTY_DATA;
    }
  },

  saveData(data: VariablesData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save variables:", error);
    }
  },
};
