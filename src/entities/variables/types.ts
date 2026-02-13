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

export type VariablesData = {
  ids: number[];
  entities: Record<number, VariableInfo>;
};
