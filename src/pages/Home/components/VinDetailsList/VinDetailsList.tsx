import type { VinResult } from "@/entities/vinCodes";
import styles from "./VinDetailsList.module.css";

type VinDetailsListProps = {
  details: VinResult[];
  currentVin?: string | null;
};

export const VinDetailsList: React.FC<VinDetailsListProps> = ({
  details,
  currentVin,
}) => {
  if (details.length === 0) {
    return null;
  }

  return (
    <div className={styles.results}>
      <h2 className={styles.title}>
        Details {currentVin && <span className={styles.vin}>({currentVin})</span>}
      </h2>
      <ul className={styles.list}>
        {details.map((item) => (
          <li key={item.VariableId} className={styles.item}>
            <span className={styles.variable}>{item.Variable}</span>
            <span className={styles.value}>{item.Value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
