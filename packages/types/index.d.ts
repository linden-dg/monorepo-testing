// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type TObjectAny = Record<string, any>;

declare module "*.module.scss";

declare type ThemeVariants =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "grey";

type FillVariants = "filled" | "outline" | "empty" | "lightFilled";

declare type DefaultProps<E extends React.ElementType = "div"> =
  React.ComponentPropsWithoutRef<E>;
