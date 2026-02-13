import { Link, useParams } from "react-router";
import { Section } from "@/shared/components/layout/Section";
import { useVariableDetails } from "@/entities/variables";
import { parseHtmlToReact } from "@/utils/parseHtmlToReact";
import styles from "./VariableDetails.module.css";
import { routes } from "@/shared/config/routes";

export const VariableDetails = () => {
  const { variableId } = useParams<{ variableId: string }>();
  const { variable, isLoading, error } = useVariableDetails(variableId);

  return (
    <Section>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to={routes.variables} className={styles.back}>
            ← Back
          </Link>
        </nav>

        {isLoading && <p className={styles.loading}>Loading...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!isLoading && !error && variable && (
          <>
            <h1 className={styles.title}>{variable.Name}</h1>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Data Type:</span>
                <span className={styles.metaValue}>{variable.DataType}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Group:</span>
                <span className={styles.metaValue}>{variable.GroupName}</span>
              </div>
              <div className={styles.description}>
                {parseHtmlToReact(variable.Description)}
              </div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
};
