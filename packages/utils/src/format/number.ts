import { isParsableSafeInteger } from "../type-guards";

export const customNumberFormat = (
  value: TNumberValue,
  { decimalPlaces = 0, significantFigures, type, fallback, ...rest }: IConfig
): string => {
  if (!isParsableSafeInteger(value)) {
    return `${fallback || value}`;
  }

  return Intl.NumberFormat(undefined, {
    ...rest,
    style: !type || type === "number" ? "decimal" : type,
    maximumFractionDigits: decimalPlaces,
    minimumSignificantDigits: significantFigures,
  }).format(Number(value));
};

export const formatNumber = (
  value: TNumberValue,
  decimalPlaces = 0,
  config?: IConfig
) =>
  customNumberFormat(value, {
    ...config,
    decimalPlaces,
    type: "number",
  });

export const formatPercent = (
  value: TNumberValue,
  decimalPlaces = 0,
  config?: IConfig
) =>
  customNumberFormat(value, {
    decimalPlaces,
    ...config,
    type: "percent",
  });

export const numberToFixedLengthString = (
  value: number,
  length = 3,
  config?: IConfig
) =>
  customNumberFormat(value, {
    useGrouping: false,
    minimumIntegerDigits: length,
    maximumFractionDigits: 0,
    ...config,
  });

export const formatUnit = (
  value: TNumberValue,
  unit: TUnit,
  decimalPlaces = 0,
  config?: IConfig
) =>
  customNumberFormat(value, {
    decimalPlaces,
    ...config,
    type: "unit",
    unit,
  });

export const formatChangeInNumber = (
  value: TNumberValue,
  decimalPlaces = 0,
  config?: IConfig
) =>
  customNumberFormat(value, {
    decimalPlaces,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore `exceptZero` is an accepted type, but TS currently thinks it isn't
    signDisplay: "exceptZero",
    ...config,
  });

export const formatFileSize = (size?: number) => {
  if (!size || size === 0) {
    return "0 KB";
  }
  const i = Math.floor(Math.log(size) / Math.log(1024));
  // return `${Number(size / Math.pow(1024, i)).toFixed(2)} ${
  return `${formatNumber(size / Math.pow(1024, i))} ${
    ["B", "kB", "MB", "GB", "TB"][i]
  }`;
};

interface IConfig extends Omit<NumberFormatOptions, "style"> {
  decimalPlaces?: number;
  significantFigures?: number;
  fallback?: string;
  type?: TFormatType;
}

type DistanceOptions = "kilometer" | "meter" | "centimeter" | "millimeter";
type TimeOptions =
  | "year"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | "second"
  | "millisecond"
  | "nanosecond";
type DataOptions = "gigabyte" | "megabyte" | "byte";
type VolumeOptions = "liter" | "milliliter";
type WeightOptions = "kilogram" | "gram";
type TemperatureOptions = "celsius" | "degree";
type SpeedOptions = "kilometer-per-hour" | "meter-per-second";

type TUnit =
  | DistanceOptions
  | TimeOptions
  | DataOptions
  | VolumeOptions
  | WeightOptions
  | TemperatureOptions
  | SpeedOptions;

type TFormatType = "number" | "percent" | "currency" | "unit";

type TNumberValue = number | string;

interface NumberFormatOptions {
  style?: TFormatType;
  unit?: TUnit;
  unitDisplay?: "short" | "long" | "narrow";
  useGrouping?: boolean;

  currency?: string;
  currencyDisplay?: "symbol" | "narrowSymbol" | "code" | "name";
  currencySign?: "standard" | "accounting";

  notation?: "standard" | "scientific" | "engineering" | "compact";
  compactDisplay?: "short" | "long";
  // signDisplay?: "auto" | "never" | "always" | "exceptZero";
  signDisplay?: "auto" | "never" | "always";

  minimumIntegerDigits?: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumSignificantDigits?: number;
  maximumSignificantDigits?: number;

  localeMatcher?: "best fit" | "lookup";
}
