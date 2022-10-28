export const deepObjectAccessor = (obj: TObjectAny, keyString: string) => {
  return keyString.split(".").reduce((o, k) => o?.[k], obj);
};

export const deepObjectConstructor = (
  obj: TObjectAny,
  keyString: string,
  nestedValue: unknown = []
) => {
  const parts = keyString.split(".");
  keyString.split(".").reduce((o, k, i) => {
    if (!o?.[k]) {
      o[k] = i < parts.length - 1 ? {} : nestedValue;
    }
    return o?.[k];
  }, obj);
  return obj;
};
