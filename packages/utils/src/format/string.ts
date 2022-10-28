import type {
  CamelCase,
  KebabCase,
  PascalCase,
  SnakeCase,
  ScreamingSnakeCase,
} from "type-fest";

export const kebabCase = <K extends string>(str: K) => cleanCase(str);

export const camelCase = <K extends string>(str: K) =>
  cleanCase(str).replace(/[-]+(\w|$)/g, (_, p1) =>
    p1.toUpperCase()
  ) as CamelCase<K>;

export const pascalCase = <K extends string>(str: K) => {
  const temp = camelCase(str);
  return (temp.charAt(0).toUpperCase() + temp.slice(1)) as PascalCase<K>;
};

export const snakeCase = <K extends string>(str: K) =>
  cleanCase(str).replace(/-/g, "_") as SnakeCase<K>;

export const screamingSnakeCase = <K extends string>(str: K) =>
  cleanCase(str).replace(/-/g, "_").toUpperCase() as ScreamingSnakeCase<K>;

const cleanCase = <K extends string>(str: K) =>
  str
    // convert non-alphanumeric characters to dash (possibly too aggressive)
    .replace(/[^a-zA-Z0-9:]/g, "-") // alternative // str = str.replace(/[_\s.'-,]/g,'-')
    // add dash in front of capitals
    .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
    // remove duplicate dashes
    .replace(/([-])\1+/g, "-")
    // remove dash from front and end of str
    .replace(/^[-]/, "")
    .replace(/[-]$/, "")
    // lowercase string
    .toLowerCase() as KebabCase<K>;

export const cleanOrderedLabel = (label: string | number): string => {
  const s = `${label}`;
  const parts = s.split("@");
  if (parts.length === 1) {
    return s;
  }
  parts.shift();
  return parts.join("@");
};
