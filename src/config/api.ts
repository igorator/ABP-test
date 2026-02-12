const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://vpic.nhtsa.dot.gov/api";

export const DECODE_VIN_ENDPOINT = (vin: string) =>
  `${API_BASE_URL}/vehicles/decodevin/${vin}?format=json`;

export const VARIABLES_LIST_ENDPOINT = `${API_BASE_URL}/vehicles/getvehiclevariablelist?format=json`;
