import styles from "./VinHistory.module.css";

type VinHistoryProps = {
  history: string[];
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
        {history.map((vin) => (
          <li key={vin} className={styles.item}>
            <button
              onClick={() => onSelect(vin)}
              className={styles.button}
              type='button'
            >
              <span className={styles.vin}>{vin}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
