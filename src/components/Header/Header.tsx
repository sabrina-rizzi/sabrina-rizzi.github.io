import Link from "next/link";
import NavLink from "@/components/NavLink/NavLink";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { navItems } from "@/data/navigation";
import MobileMenu from "./MobileMenu";
import styles from "./Header.module.scss";

// Header del sito: Server Component. Le uniche parti interattive
// (ThemeToggle e MobileMenu) sono Client Component "incastonati" qui dentro:
// così al browser arriva solo il JavaScript strettamente necessario.

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Marchio PROVVISORIO ("sr"): verrà sostituito dal mark del logo. */}
        <Link href="/" className={styles.brand} aria-label="Sabrina Rizzi — home">
          <span aria-hidden="true">
            s<span className={styles.brandAccent}>r</span>
          </span>
        </Link>

        {/* Navigazione desktop: visibile da md in su. Solo tre pagine,
            quindi restano sempre in vista: chi arriva capisce subito che
            il sito ha più pagine. Il numero è decorativo (aria-hidden). */}
        <nav className={styles.nav} aria-label="Navigazione principale">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>
                  <span className={styles.navNumber} aria-hidden="true">
                    {item.number}
                  </span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          {/* Menu mobile: visibile solo sotto md */}
          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}
