declare interface TObjectAny {
  [key: string]: any;
}

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

declare interface DefaultProps {
  /** css class name  */
  className?: string;
  /** CSS override styles */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
