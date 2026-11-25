import { ReactNode } from "react";
import styles from "./Tag.module.scss";

interface TagProps {
  children: ReactNode;
}

// Pillola statica per etichette/skill. Server Component.
export default function Tag({ children }: TagProps) {
  return <span className={styles.tag}>{children}</span>;
}
