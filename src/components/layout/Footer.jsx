export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="footer__brand">TWV Viola</div>
          <div className="muted tiny">
            Toilettenwagenvermietung – Anlieferung, Abholung, Endreinigung
          </div>
        </div>

        <div className="footer__links">
          <a href="#kontakt">Kontakt</a>
          <span className="muted">•</span>
          <a href="/impressum" onClick={(e) => e.preventDefault()}>
            Impressum (später)
          </a>
          <span className="muted">•</span>
          <a href="/datenschutz" onClick={(e) => e.preventDefault()}>
            Datenschutz (später)
          </a>
        </div>
      </div>
    </footer>
  );
}
