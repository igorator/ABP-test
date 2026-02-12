import clsx from "clsx";
import styles from "./Section.module.css";

type SectionProps = React.ComponentPropsWithoutRef<"section">;

export const Section: React.FC<SectionProps> = ({ children, className, ...props }) => (
  <section className={clsx(styles.section, className)} {...props}>
    {children}
  </section>
);
