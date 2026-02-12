import type { HistoryItem } from "@/types/vin";
import styles from "./VinHistory.module.css";

type VinHistoryProps = {
  history: HistoryItem[];
  onSelect: (vin: string) => void;
};

export const VinHistory: React.FC<VinHistoryProps> = ({
  history,
  onSelect,
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className={styles.history}>
      <h2 className={styles.title}>History</h2>
      <ul className={styles.list}>
        {history.map((item) => (
          <li key={item.timestamp} className={styles.item}>
            <button
              onClick={() => onSelect(item.vin)}
              className={styles.button}
              type='button'
            >
              <span className={styles.vin}>{item.vin}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
