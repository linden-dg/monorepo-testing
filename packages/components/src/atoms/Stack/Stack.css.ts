import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export const stackVariants = cva(["flex"], {
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      reverse: "flex-wrap-reverse",
    },
    reverse: {
      true: [],
      false: [],
    },
    desktopDirection: {
      horizontal: "lg:flex-row",
      vertical: "lg:flex-col",
    },
  },
  compoundVariants: [
    {
      direction: "horizontal",
      reverse: true,
      class: "flex-row-reverse",
    },
    {
      direction: "vertical",
      reverse: true,
      class: "flex-col-reverse",
    },
    {
      desktopDirection: "horizontal",
      reverse: true,
      class: "lg:flex-row-reverse",
    },
    {
      desktopDirection: "vertical",
      reverse: true,
      class: "lg:flex-col-reverse",
    },
  ],
  defaultVariants: {
    direction: "horizontal",
    align: "start",
    justify: "start",
  },
});

export type StackVariantProps = VariantProps<typeof stackVariants>;
