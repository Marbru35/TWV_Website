import { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const [panel, setPanel] = useState(null);

  const footerRef = useRef(null);
  const panelTopRef = useRef(null);

  const isOpen = panel !== null;

  const toggle = (next) => setPanel((curr) => (curr === next ? null : next));

  useEffect(() => {
    if (!isOpen) return;

    if (panel === "datenschutz") {
      footerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

      const t = window.setTimeout(() => {
        panelTopRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 120);

      return () => window.clearTimeout(t);
    }

    if (panel === "impressum") {
      footerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });

      const t = window.setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 180);

      return () => window.clearTimeout(t);
    }
  }, [isOpen, panel]);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <div className={styles.left}>
            <span className={styles.brand}>TWV Viola</span>
            <span className={styles.meta}>
              © {new Date().getFullYear()} Robin Viola
            </span>
          </div>

          <div className={styles.right}>
            <button
              type="button"
              className={styles.linkButton}
              aria-expanded={panel === "impressum"}
              aria-controls="footer-panel"
              onClick={() => toggle("impressum")}
            >
              Impressum
              <span
                className={`${styles.chev} ${
                  panel === "impressum" ? styles.chevOpen : ""
                }`}
              >
                ▾
              </span>
            </button>

            <button
              type="button"
              className={styles.linkButton}
              aria-expanded={panel === "datenschutz"}
              aria-controls="footer-panel"
              onClick={() => toggle("datenschutz")}
            >
              Datenschutz
              <span
                className={`${styles.chev} ${
                  panel === "datenschutz" ? styles.chevOpen : ""
                }`}
              >
                ▾
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="footer-panel"
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
      >
        <div className={styles.panelInner}>
          <div className={styles.content}>
            <div ref={panelTopRef} />

            <div className={styles.head}>
              <h3 className={styles.title}>
                {panel === "datenschutz" ? "Datenschutzerklärung" : "Impressum"}
              </h3>
              <button
                type="button"
                className={styles.close}
                onClick={() => setPanel(null)}
                aria-label="Panel schließen"
              >
                ✕
              </button>
            </div>

            {panel === "impressum" && (
              <>
                <div className={styles.grid}>
                  <div>
                    <strong>Angaben gemäß § 5 TMG</strong>
                    TWV Viola
                    <br />
                    Inhaber: Robin Viola
                    <br />
                    Nikolausstraße 5
                    <br />
                    51688 Wipperfürth
                    <br />
                    Deutschland
                  </div>

                  <div>
                    <strong>Kontakt</strong>
                    Telefon: +49 172 5401895
                    <br />
                    E-Mail: twv-viola@web.de
                  </div>

                  <div>
                    <strong>Umsatzsteuer-ID</strong>
                    USt-IdNr.: DE342914024
                  </div>

                  <div>
                    <strong>Verantwortlich für den Inhalt</strong>
                    Robin Viola
                    <br />
                    Anschrift wie links
                  </div>
                </div>

                <p className={styles.disclaimer}>
                  Haftung für Inhalte: Trotz sorgfältiger inhaltlicher Kontrolle
                  übernehmen wir keine Haftung für die Inhalte externer Links.
                  Für den Inhalt der verlinkten Seiten sind ausschließlich deren
                  Betreiber verantwortlich.
                </p>
              </>
            )}

            {panel === "datenschutz" && (
              <div className={styles.legal}>
                <p className={styles.lead}>
                  Diese Datenschutzerklärung informiert über Art, Umfang und Zweck
                  der Verarbeitung personenbezogener Daten beim Besuch dieser Website
                  sowie bei Kontaktaufnahme über das Kontaktformular.
                </p>

                <h4>1. Verantwortlicher</h4>
                <p>
                  Robin Viola (TWV Viola)
                  <br />
                  Nikolausstraße 5, 51688 Wipperfürth, Deutschland
                  <br />
                  Telefon: +49 172 5401895
                  <br />
                  E-Mail: twv-viola@web.de
                </p>

                <h4>2. Hosting über Microsoft Azure (statische Website)</h4>
                <p>
                  Diese Website wird als statische Website über Microsoft Azure betrieben
                  (z. B. „Azure Static Web Apps“ bzw. „Azure Static Website“). Beim Aufruf
                  der Website werden technisch erforderliche Daten verarbeitet, um Inhalte
                  auszuliefern und die Sicherheit/Stabilität zu gewährleisten. Dazu können
                  insbesondere gehören: IP-Adresse, Datum/Uhrzeit des Zugriffs, angeforderte
                  Ressource/URL, Referrer-URL, Browser-/Geräteinformationen sowie Statuscodes.
                </p>
                <p>
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
                  sicherem und stabilem Betrieb der Website).
                </p>

                <h4>3. Server-Logfiles</h4>
                <p>
                  Protokolldaten (Server-Logfiles) fallen typischerweise beim Hosting an.
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen erfolgt nicht
                  durch uns. Die Speicherdauer richtet sich nach den Einstellungen/Standard-
                  prozessen des Hosting-Anbieters und ist in der Regel zeitlich begrenzt.
                </p>
                <p>
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Sicherheit, Fehleranalyse,
                  Missbrauchs- und Angriffsabwehr).
                </p>

                <h4>4. Kontaktformular (Azure Functions) & E-Mail-Versand</h4>
                <p>
                  Wenn du uns über das Kontaktformular schreibst, werden die von dir eingegebenen
                  Daten (z. B. Name, E-Mail-Adresse, Telefonnummer, Anlass/Ort/Datum, Nachricht)
                  verarbeitet, um deine Anfrage zu bearbeiten und zu beantworten. Die Übermittlung
                  erfolgt an eine von uns betriebene API (Azure Functions). Die Informationen werden
                  anschließend ausschließlich an unsere eigene E-Mail-Adresse des Gewerbes weitergeleitet,
                  damit wir die Anfrage bearbeiten können.
                </p>
                <p>
                  Wir speichern die Kontaktformular-Daten nicht in einer Datenbank auf der Website.
                  Die Daten liegen nach dem Absenden im Wesentlichen in der übermittelten E-Mail und
                  in den Postfächern/IT-Systemen, die zur Bearbeitung erforderlich sind.
                </p>
                <p>
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen/Vertrag,
                  Kommunikation zur Anfrage und Angebotserstellung) und – soweit einschlägig –
                  Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation).
                </p>

                <h4>5. Speicherdauer & Löschung</h4>
                <p>
                  Personenbezogene Daten aus Anfragen verarbeiten wir nur so lange, wie dies zur
                  Bearbeitung der Anfrage und ggf. zur Durchführung des Auftrags erforderlich ist.
                  Nach Abschluss der Bearbeitung bzw. nach Durchführung des Auftrags werden die Daten
                  gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten (z. B. handels- oder
                  steuerrechtliche Pflichten für abrechnungsrelevante Unterlagen) entgegenstehen.
                </p>

                <h4>6. Empfänger / Kategorien von Empfängern</h4>
                <p>
                  Zur Bereitstellung und zum Betrieb dieser Website sowie zur Bearbeitung von Anfragen
                  können folgende Empfänger beteiligt sein:
                </p>
                <ul>
                  <li>
                    Microsoft Azure als Hosting-/Plattformanbieter (statische Website, Azure Functions)
                  </li>
                  <li>
                    E-Mail-Dienst/Provider, über den die Kontaktformular-Nachricht technisch zugestellt
                    wird (Empfänger ist ausschließlich unsere eigene E-Mail-Adresse)
                  </li>
                </ul>

                <h4>7. Drittlandübermittlung</h4>
                <p>
                  Eine Übermittlung in Drittländer (außerhalb EU/EWR) findet nur statt, wenn Dienstleister
                  oder deren Unterauftragnehmer Daten außerhalb der EU/EWR verarbeiten. In diesen Fällen
                  erfolgt die Verarbeitung nur im Rahmen der gesetzlichen Vorgaben (z. B. geeignete Garantien,
                  soweit erforderlich).
                </p>

                <h4>8. Datensicherheit</h4>
                <p>
                  Wir treffen angemessene technische und organisatorische Maßnahmen, um deine Daten zu
                  schützen. Die Übertragung von Website-Inhalten erfolgt üblicherweise verschlüsselt
                  (HTTPS/TLS). Der E-Mail-Versand erfolgt in der Regel ebenfalls transportverschlüsselt
                  (TLS), abhängig von den beteiligten Mailservern.
                </p>

                <h4>9. Cookies / Tracking</h4>
                <p>
                  Diese Website nutzt nach aktuellem Stand kein Tracking, keine Profilbildung und keine
                  Werbe-Cookies. Sofern technisch notwendige Cookies durch Hosting/Plattform-Komponenten
                  gesetzt werden sollten, dienen sie ausschließlich dem technischen Betrieb.
                </p>

                <h4>10. Deine Rechte</h4>
                <ul>
                  <li>Auskunft (Art. 15 DSGVO)</li>
                  <li>Berichtigung (Art. 16 DSGVO)</li>
                  <li>Löschung (Art. 17 DSGVO)</li>
                  <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>
                    Widerspruch (Art. 21 DSGVO), soweit die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO
                    beruht
                  </li>
                  <li>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO), sofern erteilt</li>
                </ul>

                <h4>11. Beschwerderecht</h4>
                <p>
                  Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren (Art. 77 DSGVO).
                </p>

                <h4>12. Stand</h4>
                <p>
                  Stand: {new Date().toLocaleDateString("de-DE")}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}