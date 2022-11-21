import { cx } from "class-variance-authority";
import * as React from "react";
import type { BoxVariantProps } from "./Box.css";
import { boxVariants } from "./Box.css";

interface Props extends HTMLProps, BoxVariantProps {
  as?: React.ElementType;
  className?: ClassValue;
}
export const Box = React.forwardRef<HTMLElement, Props>(
  ({ as = "div", className, ...props }: Props, ref) => {
    return React.createElement(as, {
      className: cx(className, boxVariants(props)),
      ...props,
      ref,
    });
  }
);

Box.displayName = "Box";

export type BoxProps = Parameters<typeof Box>[0];
