import { useForm } from "react-hook-form";
import { VIN_VALIDATION_RULES, VIN_MAX_LENGTH } from "./validation";
import styles from "./VinForm.module.css";

type VinFormData = {
  vin: string;
};

type VinFormProps = {
  onSubmit: (vin: string) => void;
  isLoading?: boolean;
};

export const VinForm: React.FC<VinFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VinFormData>();

  const handleFormSubmit = (data: VinFormData) => {
    onSubmit(data.vin.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          {...register("vin", VIN_VALIDATION_RULES)}
          type="text"
          placeholder="Enter VIN code (17 characters)"
          className={`${styles.input} ${errors.vin ? styles.inputError : ""}`}
          maxLength={VIN_MAX_LENGTH}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? "Decoding..." : "Decode VIN"}
        </button>
      </div>
      {errors.vin && (
        <p className={styles.error}>{errors.vin.message}</p>
      )}
    </form>
  );
};
