import type { VariablesListResponse } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://vpic.nhtsa.dot.gov/api";

const VARIABLES_LIST_ENDPOINT = `${API_BASE_URL}/vehicles/getvehiclevariablelist?format=json`;

export async function getVariablesList(): Promise<VariablesListResponse> {
  const response = await fetch(VARIABLES_LIST_ENDPOINT);
  if (!response.ok) {
    throw new Error("Failed to fetch variables list");
  }
  return response.json();
}
