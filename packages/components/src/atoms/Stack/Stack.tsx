import React from "react";
import { Box } from "../Box";
import type { StackVariantProps } from "./Stack.css";
import { stackVariants } from "./Stack.css";

type StackElement =
  | "a"
  | "article"
  | "div"
  | "form"
  | "header"
  | "label"
  | "li"
  | "main"
  | "section"
  | "span";

type Props<E extends StackElement> = StackVariantProps &
  DefaultProps<E> & {
    as?: E;
    className?: ClassValue;
    children: ReactNodeNoStrings;
  };

export const Stack = <E extends StackElement>({
  as,
  children,
  className,
  wrap,
  justify,
  align,
  direction,
  reverse,
  ...props
}: Props<E>) => {
  return (
    <Box
      as={as ?? "div"}
      className={[
        className,
        stackVariants({ wrap, justify, align, direction, reverse }),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};
export type StackProps = Parameters<typeof Stack>[0];
