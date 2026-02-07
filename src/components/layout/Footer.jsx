import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>TWV Viola</div>

        <div className={styles.links}>
          <a href="#kontakt">Kontakt</a>
          <a href="#datenschutz">Datenschutz</a>
          <a href="#impressum">Impressum</a>
        </div>
      </div>
    </footer>
  );
}
