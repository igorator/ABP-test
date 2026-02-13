import clsx from "clsx";
import styles from "./PageWrapper.module.css";

type PageWrapperProps = React.ComponentPropsWithoutRef<"main">;

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className, ...props }) => (
  <main className={clsx(styles.wrapper, className)} {...props}>
    {children}
  </main>
);
