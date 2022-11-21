import React from "react";
import { Box } from "../Box";
import type { ButtonVariantProps } from "./Button.css";
import { buttonVariants } from "./Button.css";

// TODO: figure out if we should support `a` elements as well
type ButtonElement = "button" | "input";

type Props<E extends ButtonElement> = ButtonVariantProps &
  DefaultProps<E> & {
    as?: E;
    className?: ClassValue;
    submitting?: boolean;
  };

export const Button = <E extends ButtonElement>({
  as,
  children,
  className,
  variant,
  theme,
  rounded,
  uppercase,
  submitting,
  disabled,
  type = "button",
  ...props
}: Props<E>) => {
  return (
    <Box
      as={as ?? "button"}
      className={[
        className,
        buttonVariants({ variant, theme, rounded, uppercase }),
      ]}
      disabled={disabled || submitting}
      type={type}
      {...props}
    >
      {children}
    </Box>
  );
};
export type ButtonProps = Parameters<typeof Button>[0];
