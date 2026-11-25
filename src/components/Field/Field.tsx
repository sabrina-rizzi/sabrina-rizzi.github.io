import styles from "./Field.module.scss";

// Campo di un modulo: etichetta + casella (una riga, oppure area di testo
// con "multiline"). Server Component: il browser gestisce da solo scrittura
// e validazione, non serve JavaScript nostro.

interface FieldProps {
  label: string;
  name: string; // nome con cui il valore viene inviato
  type?: "text" | "email";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string; // suggerimenti del browser (es. "name", "email")
  multiline?: boolean; // true = <textarea>
}

export default function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
  multiline,
}: FieldProps) {
  // Il legame etichetta-casella: htmlFor (label) = id (casella).
  // Cliccare l'etichetta porta il cursore nella casella, e gli screen
  // reader leggono l'etichetta quando la casella riceve il focus.
  const id = `field-${name}`;

  // Proprietà comuni alle due varianti, scritte una volta sola.
  const shared = { id, name, required, placeholder, className: styles.input };

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {!required && <span className={styles.optional}> (facoltativo)</span>}
      </label>

      {multiline ? (
        <textarea {...shared} rows={5} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}
    </div>
  );
}
