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

declare type DefaultProps<E extends React.ElementType = "div"> = Omit<
  React.ComponentPropsWithoutRef<E>,
  "className"
> & {
  className?: ClassValue;
};

declare type ReactNodeNoStrings =
  | React.ReactElement
  | React.ReactNode[]
  | boolean
  | null
  | undefined;

declare type ClassValue = string | null | undefined | ClassValue[];
declare type HTMLProps = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  "as" | "className" | "color" | "height" | "width"
>;
