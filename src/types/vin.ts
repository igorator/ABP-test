export type VinResult = {
  Value: string | null;
  ValueId: string | null;
  Variable: string;
  VariableId: number;
};

export type VinDecodeResponse = {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VinResult[];
};

export type VariableInfo = {
  ID: number;
  Name: string;
  Description: string;
  DataType: string;
  GroupName: string;
};

export type VariablesListResponse = {
  Count: number;
  Message: string;
  Results: VariableInfo[];
};

export type HistoryItem = {
  vin: string;
  timestamp: number;
  results: VinResult[];
};
