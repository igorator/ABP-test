import { Link } from "react-router";
import { Section } from "@/shared/components/layout/Section";
import { useVariablesList } from "./hooks/useVariablesList";
import styles from "./Variables.module.css";
import { routes } from "@/config/routes";

export const Variables = () => {
  const { variables, isLoading, error } = useVariablesList();

  return (
    <Section>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to={routes.home} className={styles.back}>
            ← Back
          </Link>
        </nav>

        <h1 className={styles.title}>Variables</h1>

        {isLoading && <p className={styles.loading}>Loading...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!isLoading && !error && variables && (
          <ul className={styles.list}>
            {variables.map((variable) => (
              <li key={variable.ID} className={styles.item}>
                <Link to={`${routes.variables}/${variable.ID}`} className={styles.link}>
                  <h2 className={styles.name}>{variable.Name}</h2>
                  <div className={styles.meta}>
                    <span className={styles.dataType}>
                      Type: {variable.DataType}
                    </span>
                    <span className={styles.groupName}>
                      Group: {variable.GroupName}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
};
