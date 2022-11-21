import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import styles from "./Button.module.scss";

export const buttonVariants = cva([styles.button], {
  variants: {
    theme: {
      primary: [],
      // secondary: [],
      // accent: [],
      success: [],
      info: [],
      warning: [],
      danger: [],
      default: [],
    },
    variant: {
      filled: ["text-white"],
      outline: ["border-2"],
      empty: [],
      lightFilled: [],
    },
    rounded: {
      true: [styles.rounded],
      // false: [],
    },
    uppercase: {
      true: ["uppercase", "font-bold", "tracking-wide"],
      false: ["font-semibold"],
    },
  },
  compoundVariants: [
    // Filled styles
    {
      theme: "primary",
      variant: "filled",
      class: ["bg-primary-500", "hover:bg-primary-600"],
    },
    // {
    //   theme: "secondary",
    //   variant: "filled",
    //   class: ["bg-secondary-600", "hover:bg-secondary-500"],
    // },
    // {
    //   theme: "accent",
    //   variant: "filled",
    //   class: ["bg-accent-600", "hover:bg-accent-500"],
    // },
    {
      theme: "success",
      variant: "filled",
      class: ["bg-success-500", "hover:bg-success-600"],
    },
    {
      theme: "info",
      variant: "filled",
      class: ["bg-info-500", "hover:bg-info-600"],
    },
    {
      theme: "warning",
      variant: "filled",
      class: ["bg-warning-500", "hover:bg-warning-600"],
    },
    {
      theme: "danger",
      variant: "filled",
      class: ["bg-danger-500", "hover:bg-danger-600"],
    },
    {
      theme: "default",
      variant: "filled",
      class: [
        "bg-slate-600",
        "hover:bg-slate-500",
        "dark:bg-slate-300",
        "dark:text-slate-800",
      ],
    },

    // Outline styles
    {
      theme: "primary",
      variant: "outline",
      class: [
        "text-primary-600",
        "border-primary-600",
        "hover:bg-primary-100",
        "focus:bg-primary-100",
      ],
    },
    // {
    //   theme: "secondary",
    //   variant: "outline",
    //   class: ["text-secondary-600"],
    // },
    // {
    //   theme: "accent",
    //   variant: "outline",
    //   class: ["text-accent-600"],
    // },
    {
      theme: "success",
      variant: "outline",
      class: [
        "text-success-600",
        "border-success-600",
        "hover:bg-success-100",
        "focus:bg-success-100",
      ],
    },
    {
      theme: "info",
      variant: "outline",
      class: [
        "text-info-600",
        "border-info-600",
        "hover:bg-info-100",
        "focus:bg-info-100",
      ],
    },
    {
      theme: "warning",
      variant: "outline",
      class: [
        "text-warning-600",
        "border-warning-600",
        "hover:bg-warning-100",
        "focus:bg-warning-100",
      ],
    },
    {
      theme: "danger",
      variant: "outline",
      class: [
        "text-danger-600",
        "border-danger-600",
        "hover:bg-danger-100",
        "focus:bg-danger-100",
      ],
    },
    {
      theme: "default",
      variant: "outline",
      class: [
        "text-slate-600",
        "border-slate-600",
        "hover:bg-slate-100",
        "focus:bg-slate-100",
      ],
    },
    // LightFilled styles
    {
      theme: "primary",
      variant: "lightFilled",
      class: [
        "bg-primary-200",
        "text-primary-800",
        "hover:bg-primary-300",
        "focus:bg-primary-300",
      ],
    },
    // {
    //   theme: "secondary",
    //   variant: "outline",
    //   class: ["text-secondary-600"],
    // },
    // {
    //   theme: "accent",
    //   variant: "outline",
    //   class: ["text-accent-600"],
    // },
    {
      theme: "success",
      variant: "lightFilled",
      class: [
        "bg-success-200",
        "text-success-800",
        "hover:bg-success-300",
        "focus:bg-success-300",
      ],
    },
    {
      theme: "info",
      variant: "lightFilled",
      class: [
        "bg-info-200",
        "text-info-800",
        "hover:bg-info-300",
        "focus:bg-info-300",
      ],
    },
    {
      theme: "warning",
      variant: "lightFilled",
      class: [
        "bg-warning-200",
        "text-warning-800",
        "hover:bg-warning-300",
        "focus:bg-warning-300",
      ],
    },
    {
      theme: "danger",
      variant: "lightFilled",
      class: [
        "bg-danger-200",
        "text-danger-800",
        "hover:bg-danger-300",
        "focus:bg-danger-300",
      ],
    },
    {
      theme: "default",
      variant: "lightFilled",
      class: [
        "bg-slate-200",
        "text-slate-700",
        "hover:bg-slate-300",
        "focus:bg-slate-300",
      ],
    },

    // Empty styles
    {
      theme: "primary",
      variant: "empty",
      class: [
        "text-primary-600",
        "hover:bg-primary-100",
        "focus:bg-primary-100",
      ],
    },
    // {
    //   theme: "secondary",
    //   variant: "outline",
    //   class: ["text-secondary-600"],
    // },
    // {
    //   theme: "accent",
    //   variant: "outline",
    //   class: ["text-accent-600"],
    // },
    {
      theme: "success",
      variant: "empty",
      class: [
        "text-success-800",
        "hover:bg-success-100",
        "focus:bg-success-100",
      ],
    },
    {
      theme: "info",
      variant: "empty",
      class: ["text-info-800", "hover:bg-info-100", "focus:bg-info-100"],
    },
    {
      theme: "warning",
      variant: "empty",
      class: [
        "text-warning-800",
        "hover:bg-warning-100",
        "focus:bg-warning-100",
      ],
    },
    {
      theme: "danger",
      variant: "empty",
      class: ["text-danger-800", "hover:bg-danger-100", "focus:bg-danger-100"],
    },
    {
      theme: "default",
      variant: "empty",
      class: ["text-slate-700", "hover:bg-slate-100", "focus:bg-slate-100"],
    },
  ],
  defaultVariants: {
    theme: "default",
    variant: "filled",
    rounded: false,
    uppercase: false,
  },
});

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
