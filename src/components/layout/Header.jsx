import { useEffect, useState } from "react";
import { scrollToId } from "../../utils/scrollToId";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => scrollToId(id, 92);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <button
          className={styles.logo}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Zur Startseite"
        >
          TWV Viola
        </button>

        <div className={styles.cta}>
          <button className="btn btn--primary" onClick={() => go("kontakt")}>
            Anfrage
          </button>
        </div>
      </div>
    </header>
  );
}
