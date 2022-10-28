import cx from "clsx";
import React from "react";
import type { ComponentPropsWithoutRef } from "react";
import { LoadingDots } from "../loading/dots/LoadingDots";
import styles from "./Button.module.scss";

export interface TButton extends ComponentPropsWithoutRef<"button"> {
  /** Alternative color variations */
  theme?: ThemeVariants;

  /** Should the corners of the button should be rounded */
  rounded?: boolean;

  /** Should the button be filled in (default) or outlined (ghost) or empty or lightFilled */
  variant?: FillVariants;

  /** Disable button and show submitting loader  */
  submitting?: boolean;
}

export const Button = ({
  theme,
  className,
  variant,
  rounded,
  submitting = false,
  disabled = false,
  children,
  type = "button",
  ...rest
}: TButton) => (
  <button
    className={cx(
      styles.button,
      theme && styles[theme],
      variant && styles[variant],
      rounded && styles.rounded,
      submitting && styles.submitting,
      className
    )}
    type={type}
    disabled={disabled || submitting}
    {...rest}
  >
    {children}
    {submitting && <LoadingDots className={styles.loader} />}
  </button>
);
