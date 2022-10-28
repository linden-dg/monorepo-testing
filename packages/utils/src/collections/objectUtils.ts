import type { LastArrayElement } from "type-fest";
import { isPlainObject } from "../type-guards";
import { defaultReducer } from "./arrayReducer";
import type { Reducer } from "./arrayReducer";

export const flattenDeepObject = <Datum>(
  obj: Record<string, Datum>,
  parentKey?: string,
  reducerFunction: Reducer<Datum> = defaultReducer
): Record<string, unknown> => {
  return Object.keys(obj).reduce((f, k, i) => {
    const item = obj[k];
    const key = parentKey ? `${parentKey}.${k}` : k;
    if (isPlainObject(item)) {
      return {
        ...f,
        ...flattenDeepObject(item, key),
      };
    }
    return { ...f, [key]: reducerFunction(item, i, k, f) };
  }, {} as Record<string, unknown>);
};

export const removeUndefinedFromObject = <Datum extends TObjectAny>(
  obj: Datum
): Partial<Datum> => {
  if (isPlainObject(obj)) {
    const clean = { ...obj };
    let k: keyof typeof clean;
    for (k in clean) {
      if (clean[k] === undefined) {
        delete clean[k];
      }
    }
    return clean;
  }
  return obj;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLastItem = <A extends readonly any[]>(
  arr: A
): LastArrayElement<A> => arr[arr.length - 1];
