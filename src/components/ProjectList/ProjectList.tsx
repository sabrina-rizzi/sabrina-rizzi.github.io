import Image from "next/image";
import Button from "@/components/Button/Button";
import type { Project } from "@/data/projects";
import styles from "./ProjectList.module.scss";

// "Righe-scheda" dei progetti. Server Component: l'hover è tutto in CSS.
// Stessa famiglia grafica delle righe del Percorso (IndexList), ma con una
// "scheda tecnica" in più: Tipo e Stack, più i link esterni.

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <ol className={styles.list}>
      {projects.map((project, i) => (
        // id: bersaglio dei link dalla home (/progetti#fare-share)
        <li key={project.id} id={project.id} className={styles.row}>
          <span className={styles.number} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className={styles.head}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.year}>{project.year}</p>
          </div>

          {/* Miniatura: la schermata della demo. sizes dice al browser
              quanto sarà larga, così scarica la versione giusta. */}
          <Image
            className={styles.image}
            src={project.image}
            alt={`Schermata di ${project.title}`}
            sizes="(min-width: 768px) 30vw, 85vw"
            placeholder="blur"
          />

          <div className={styles.body}>
            <p className={styles.description}>{project.description}</p>

            {/* dl: coppie etichetta / valore, come i dati dell'hero. */}
            <dl className={styles.specs}>
              <div className={styles.spec}>
                <dt className={styles.specTerm}>Tipo</dt>
                <dd className={styles.specDetail}>{project.type}</dd>
              </div>
              <div className={styles.spec}>
                <dt className={styles.specTerm}>Stack</dt>
                {/* join: unisce le voci della lista con un punto in mezzo. */}
                <dd className={styles.specDetail}>
                  {project.stack.join(" · ")}
                </dd>
              </div>
            </dl>

            {/* ariaLabel: "Demo" da solo non dice DI COSA; lo screen reader
                legge "Demo di Fare Share". */}
            <div className={styles.links}>
              {project.links.map((link) => (
                <Button
                  key={link.href}
                  variant="inline"
                  href={link.href}
                  external
                  ariaLabel={`${link.label} di ${project.title} (si apre in una nuova scheda)`}
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
