import ContactForm from "../forms/ContactForm";
import "../../css/contact.css";

export default function ContactTeaser() {
  return (
    <section id="kontakt" className="section contactSection">
      <div className="container">
        <h2 data-reveal="up">Kontakt / Anfrage</h2>
        <p className="muted" data-reveal="up" data-delay="100">
          Sende Daten, Ort und Anlass – wir melden uns mit einem Angebot.
        </p>

        <div className="card card--padded contactHint" data-reveal="up" data-delay="200">
          <div className="card__title">Hinweis</div>
          <div className="card__body">
            Preise sind abhängig von
            Aufwand/Entfernung/Mietdauer.
          </div>
        </div>

        <div className="card card--padded contactFormCard" data-reveal="fade" data-delay="100">
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
