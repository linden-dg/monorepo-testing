import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export const boxVariants = cva([], {
  variants: {},
});

export type BoxVariantProps = VariantProps<typeof boxVariants>;
