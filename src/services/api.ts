import type { VinDecodeResponse, VariablesListResponse } from "@/types/vin";
import { DECODE_VIN_ENDPOINT, VARIABLES_LIST_ENDPOINT } from "@/config/api";

export async function decodeVin(vin: string): Promise<VinDecodeResponse> {
  const response = await fetch(DECODE_VIN_ENDPOINT(vin));
  if (!response.ok) {
    throw new Error("Failed to decode VIN");
  }
  return response.json();
}

export async function getVariablesList(): Promise<VariablesListResponse> {
  const response = await fetch(VARIABLES_LIST_ENDPOINT);
  if (!response.ok) {
    throw new Error("Failed to fetch variables list");
  }
  return response.json();
}
