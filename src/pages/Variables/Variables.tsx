import { Link } from "react-router";
import { PageWrapper } from "@/shared/components/layout/PageWrapper";
import { useVariablesList } from "@/entities/variables";
import styles from "./Variables.module.css";
import { routes } from "@/shared/config/routes";

export const Variables = () => {
  const { variables, isLoading, error } = useVariablesList();

  return (
    <PageWrapper>
      <nav className={styles.nav}>
        <Link to={routes.home} className={styles.back}>
          ← Back
        </Link>
      </nav>

      <h1 className={styles.title}>Variables</h1>

      {isLoading && <p className={styles.loading}>Loading...</p>}

      {error && <p className={styles.error}>{error}</p>}

      {!isLoading && !error && variables.ids.length > 0 && (
        <ul className={styles.list}>
          {variables.ids.map((id) => {
            const variable = variables.entities[id];
            return (
              <li key={id} className={styles.item}>
                <Link to={`${routes.variables}/${id}`} className={styles.link}>
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
            );
          })}
        </ul>
      )}
    </PageWrapper>
  );
};
