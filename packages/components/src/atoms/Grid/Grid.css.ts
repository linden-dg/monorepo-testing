import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export const gridVariants = cva(["grid"], {
  variants: {
    align: {
      start: "content-start",
      center: "content-center",
      end: "content-end",
      between: "content-between",
      around: "content-around",
      evenly: "content-evenly",
      baseline: "content-baseline",
    },
    justify: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    },
    content: {
      start: "place-content-start",
      center: "place-content-center",
      end: "place-content-end",
      between: "place-content-between",
      around: "place-content-around",
      evenly: "place-content-evenly",
      baseline: "place-content-baseline",
      stretch: "place-content-stretch",
    },
  },
  compoundVariants: [],
  defaultVariants: {},
});

export type GridVariantProps = VariantProps<typeof gridVariants>;
