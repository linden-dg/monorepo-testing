import {
  isCallableFunction,
  isNonEmptyString,
  isPlainObject,
  isValidObjectKey,
} from "../type-guards";
import { defaultReducer } from "./arrayReducer";
import type { KeyAccessor, Reducer } from "./arrayReducer";
import { deepObjectAccessor, deepObjectConstructor } from "./objectAccessors";

type CollectionDatum = unknown;
type ObjectKey = string | number | symbol;

export const keyBy = <Datum extends CollectionDatum>(
  collection: Datum[] | Record<string, Datum> = [],
  key?: keyof Datum | KeyAccessor<Datum>,
  reducerFunction?: string | Reducer<Datum>
) =>
  Array.isArray(collection)
    ? mapReduce(collection, key, reducerFunction)
    : mapReduce(Object.values(collection), key, reducerFunction);

export const mapReduce = <Datum extends CollectionDatum>(
  collection: Datum[] = [],
  keyAccessor?: ObjectKey | KeyAccessor<Datum>,
  reducer: ObjectKey | Reducer<Datum> = defaultReducer
) =>
  collection.reduce((map, datum, i) => {
    const key = isCallableFunction(keyAccessor)
      ? keyAccessor(datum, i)
      : isPlainObject(datum) && isNonEmptyString(keyAccessor)
      ? datum[keyAccessor]
      : datum;

    if (!isValidObjectKey(key)) {
      // if key isn't a valid object key then it can't be added to the map
      return map;
    }
    const val = isCallableFunction(reducer)
      ? reducer(datum, i, key, map)
      : isPlainObject(datum) && isNonEmptyString(reducer)
      ? datum[reducer]
      : datum;

    return {
      ...map,
      [key]: val,
    };
  }, {});

export const nest = <Datum extends CollectionDatum>(
  collection: Datum[],
  keys: (keyof Datum | ((d: Datum, i?: number) => string))[],
  reducer:
    | string
    | ((d: Datum, i: number) => unknown | keyof Datum) = defaultReducer,
  undefinedKey = "__undefined__"
) =>
  collection.reduce((r: Record<string, unknown>, d, i) => {
    const nestedKey = keys
      .map(
        (k) =>
          (k ? (isValidObjectKey(k) ? d[k] : k(d, i)) : undefinedKey) ||
          undefinedKey
      )
      .join(".");
    const newRecord = deepObjectConstructor(r, nestedKey);
    const list = deepObjectAccessor(newRecord, nestedKey);
    list.push(
      isCallableFunction(reducer)
        ? reducer(d, i)
        : isPlainObject(d)
        ? d[reducer]
        : d
    );
    return newRecord;
  }, {});
