import ContactForm from "../forms/ContactForm";

export default function ContactTeaser() {
  return (
    <section id="kontakt" className="section contactSection">
      <div className="container">
        <h2>Kontakt / Anfrage</h2>
        <p className="muted">
          Sende Datum, Ort und Anlass – wir melden uns mit einem Angebot.
        </p>

        <div className="card card--padded contactHint">
          <div className="card__title">Hinweis</div>
          <div className="card__body">
            Vor Ort wird ein Stromanschluss benötigt. Preise sind abhängig von
            Aufwand/Entfernung/Mietdauer.
          </div>
        </div>

        <div className="card card--padded">
          <ContactForm />
          <p className="tiny muted" style={{ marginTop: 10 }}>
            Mit dem Absenden stimmst du der Verarbeitung deiner Daten gemäß
            Datenschutz zu.
          </p>
        </div>
      </div>
    </section>
  );
}
