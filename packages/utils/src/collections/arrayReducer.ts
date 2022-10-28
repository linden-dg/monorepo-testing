export type KeyAccessor<Datum> = (
  d: Datum,
  i?: number,
  v?: unknown
) => string | number;

export type Reducer<Datum> = (
  d: Datum,
  i: number,
  key?: string | number | symbol,
  map?: TObjectAny
) => unknown;

export const defaultReducer: Reducer<unknown> = (d) => d;
