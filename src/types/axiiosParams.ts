export interface IAxiosParamsFilter {
  action: "filter";
  params: {
    price?: number;
    product?: string;
    brand?: string;
  };
}

interface IAxiosParamsGetIds {
  action: "get_ids";
  params?: {
    offset?: number;
    limit?: number;
  };
}

interface IAxiosParamsGetItems {
  action: "get_items";
  params: {
    ids: string[];
  };
}

interface IAxiosParamsGetFields {
  action: "get_fields";
  params: {
    field: string;
    offset?: number;
    limit?: number;
  };
}

export type AxiosParams =
  | IAxiosParamsFilter
  | IAxiosParamsGetIds
  | IAxiosParamsGetItems
  | IAxiosParamsGetFields;
