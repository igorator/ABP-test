import type { VinResult } from "@/types/vin";
import styles from "./ResultsList.module.css";

type ResultsListProps = {
  results: VinResult[];
  vin?: string;
};

export const ResultsList: React.FC<ResultsListProps> = ({ results, vin }) => {
  const filledResults = results.filter((item) => item.Value);

  if (filledResults.length === 0) {
    return null;
  }

  return (
    <div className={styles.results}>
      <h2 className={styles.title}>
        Results {vin && <span className={styles.vin}>({vin})</span>}
      </h2>
      <ul className={styles.list}>
        {filledResults.map((item) => (
          <li key={item.VariableId} className={styles.item}>
            <span className={styles.variable}>{item.Variable}</span>
            <span className={styles.value}>{item.Value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
