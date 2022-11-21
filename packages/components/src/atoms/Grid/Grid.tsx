import React from "react";
import { Box } from "../Box";
import type { GridVariantProps } from "./Grid.css";
import { gridVariants } from "./Grid.css";

type GridElement =
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

type Props<E extends GridElement = "div"> = GridVariantProps &
  DefaultProps<E> & {
    as?: E;
    className?: ClassValue;
    children: ReactNodeNoStrings;
  };

export const Grid = <E extends GridElement>({
  as,
  children,
  className,
  justify,
  align,
  content,
  ...props
}: Props<E>) => {
  return (
    <Box
      as={as ?? "div"}
      className={[className, gridVariants({ justify, align, content })]}
      {...props}
    >
      {children}
    </Box>
  );
};
export type GridProps = Parameters<typeof Grid>[0];
