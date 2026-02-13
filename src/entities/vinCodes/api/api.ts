import type { VinDecodeResponse } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://vpic.nhtsa.dot.gov/api";

const DECODE_VIN_ENDPOINT = (vin: string) =>
  `${API_BASE_URL}/vehicles/decodevin/${vin}?format=json`;

export async function decodeVin(vin: string): Promise<VinDecodeResponse> {
  const response = await fetch(DECODE_VIN_ENDPOINT(vin));
  if (!response.ok) {
    throw new Error("Failed to decode VIN");
  }

  const data: VinDecodeResponse = await response.json();

  if (/error/i.test(data.Message)) {
    throw new Error(data.Message);
  }

  return data;
}
