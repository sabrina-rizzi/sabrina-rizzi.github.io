import { ReactNode } from "react";
import styles from "./Card.module.scss";

// Card riusabile (esperienze, eventi, preview). Se c'è href diventa un link
// cliccabile che si solleva all'hover. Server Component (hover solo in CSS).

interface CardProps {
  title: string;
  description?: string;
  meta?: string; // riga piccola in alto (data, categoria...)
  href?: string;
  children?: ReactNode; // es. tag nel footer
}

export default function Card({
  title,
  description,
  meta,
  href,
  children,
}: CardProps) {
  const className = `${styles.card} ${href ? styles.clickable : ""}`;

  const content = (
    <>
      {meta && <p className={styles.meta}>{meta}</p>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
      {children && <div className={styles.footer}>{children}</div>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
