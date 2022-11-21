import * as React from "react";
import { Box } from "../Box";
import type { HeadingVariantProps } from "./Heading.css";
import { defaultHeadings, headingVariants } from "./Heading.css";

type HeadingElement =
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "legend";

type Props<E extends HeadingElement> = HeadingVariantProps &
  DefaultProps<E> & {
    as?: E;
    color?: ClassValue;
  };
export const Heading = <E extends HeadingElement>({
  as,
  level = "2",
  className,
  color,
  ...props
}: Props<E>) => {
  const hLevel = defaultHeadings[level ?? "2"];
  return (
    <Box
      as={as ?? hLevel.ele}
      className={[headingVariants({ level }), color || hLevel.color, className]}
      {...props}
    />
  );
};

export type HeadingProps = Parameters<typeof Heading>[0];
