import { Link } from "react-router";
import { Section } from "@/shared/components/layout/Section";
import { VinForm } from "./components/VinForm";
import { VinHistory } from "./components/VinHistory";
import { ResultsList } from "./components/ResultsList";
import { useVinHistory } from "@/pages/Home/hooks/useVinHistory";
import { useDecodeVin } from "./hooks/useDecodeVin";
import styles from "./Home.module.css";
import { routes } from "@/config/routes";

export const Home = () => {
  const { history, addToHistory, getFromHistory } = useVinHistory();
  const { results, vin, isLoading, error, decode } = useDecodeVin();

  const handleDecodeVin = async (vinCode: string) => {
    const result = await decode(vinCode);
    if (result.success) {
      addToHistory(vinCode, result.results);
    }
  };

  const handleSelectFromHistory = (vinCode: string) => {
    const historyItem = getFromHistory(vinCode);
    if (historyItem) {
      decode(vinCode);
    }
  };

  return (
    <Section>
      <div className={styles.container}>
        <h1 className={styles.title}>VIN Decoder</h1>

        <nav className={styles.nav}>
          <Link to={routes.variables} className={styles.link}>
            Variables
          </Link>
        </nav>

        <VinForm onSubmit={handleDecodeVin} isLoading={isLoading} />

        {error && <p className={styles.error}>{error}</p>}

        <VinHistory history={history} onSelect={handleSelectFromHistory} />

        <ResultsList results={results} vin={vin} />
      </div>
    </Section>
  );
};
