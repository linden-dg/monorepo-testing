import cx from "clsx";
import styles from "./LoadingDots.module.scss";

interface LoadingDotsProps extends DefaultProps {
  color?: string;
}

export const LoadingDots = ({
  color,
  className,
  ...props
}: LoadingDotsProps) => {
  return (
    <span className={cx(styles.loading, className)} {...props}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};
