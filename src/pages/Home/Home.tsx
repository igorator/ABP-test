import { Link } from "react-router";
import { Section } from "@/shared/components/layout/Section";
import { VinForm } from "./components/VinForm";
import { VinHistory } from "./components/VinHistory";
import { VinDetailsList } from "./components/VinDetailsList";
import { useVinCodes } from "@/entities/vinCodes";
import styles from "./Home.module.css";
import { routes } from "@/shared/config/routes";

export const Home = () => {
  const { codes, getDetailsByCode, details, error, loading } = useVinCodes();

  return (
    <Section>
      <div className={styles.container}>
        <h1 className={styles.title}>VIN Decoder</h1>

        <nav className={styles.nav}>
          <Link to={routes.variables} className={styles.link}>
            Variables
          </Link>
        </nav>

        <VinForm onSubmit={getDetailsByCode} isLoading={loading} />

        {error && <p className={styles.error}>{error}</p>}

        <VinHistory history={codes} onSelect={getDetailsByCode} />

        <VinDetailsList details={details} currentVin={codes[0]} />
      </div>
    </Section>
  );
};
