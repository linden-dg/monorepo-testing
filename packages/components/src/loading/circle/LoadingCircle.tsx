import cx from "clsx";
import styles from "./LoadingCircle.module.scss";

interface Props extends DefaultProps {
  loading?: boolean;
}

export const LoadingCircle = ({ className, loading, ...props }: Props) => (
  <div
    className={cx(styles.loader, className, loading && styles.spinning)}
    {...props}
  ></div>
);
