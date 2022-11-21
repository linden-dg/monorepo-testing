import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

export const headingVariants = cva(["font-bold"], {
  variants: {
    level: {
      /* eslint-disable @typescript-eslint/naming-convention */
      "1": ["text-5xl"],
      "2": ["text-4xl"],
      "3": ["text-3xl"],
      "4": ["text-2xl"],
      "5": ["text-xl"],
      "6": ["text-lg"],
      /* eslint-enable */
    },
  },
});

export const defaultHeadings = {
  /* eslint-disable @typescript-eslint/naming-convention */
  "1": { ele: "h1", color: "text-primary-600" },
  "2": { ele: "h2", color: "text-primary-500" },
  "3": { ele: "h3", color: "text-info-500" },
  "4": { ele: "h4", color: "text-info-400" },
  "5": { ele: "h5", color: "text-gray-600" },
  "6": { ele: "h6", color: "text-gray-500" },

  /* eslint-enable */
} as const;

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
