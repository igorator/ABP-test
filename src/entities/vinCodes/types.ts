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

export type VinCodesData = {
  codes: string[];
  entities: Record<string, VinResult[]>;
};
