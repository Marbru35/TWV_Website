import { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  // null | "impressum" | "datenschutz"
  const [panel, setPanel] = useState(null);

  const footerRef = useRef(null);
  const panelTopRef = useRef(null);

  const isOpen = panel !== null;

  const toggle = (next) => setPanel((curr) => (curr === next ? null : next));

  useEffect(() => {
    if (!isOpen) return;

    // ✅ Datenschutz: NICHT ans Seitenende, sondern zum Panel-Anfang (Titelbereich)
    if (panel === "datenschutz") {
      // erst Footer in View holen (damit Panel überhaupt im DOM/Viewport-Kontext ist)
      footerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

      // dann nach kurzer Zeit exakt auf Panel-Start
      const t = window.setTimeout(() => {
        panelTopRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 120);

      return () => window.clearTimeout(t);
    }

    // ✅ Impressum: wie gewünscht ganz nach unten scrollen
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
      {/* Top-Zeile */}
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

      {/* Gemeinsames Panel */}
      <div
        id="footer-panel"
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
      >
        <div className={styles.panelInner}>
          <div className={styles.content}>
            {/* ✅ Das ist der exakte "Startpunkt" für Datenschutz-Scroll */}
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
                    Anschrift wie oben
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
                  der Verarbeitung personenbezogener Daten beim Besuch dieser Website.
                </p>

                <h4>1. Verantwortlicher</h4>
                <p>
                  Robin Viola (TWV Viola)<br />
                  Nikolausstraße 5, 51688 Wipperfürth, Deutschland<br />
                  Telefon: +49 172 5401895<br />
                  E-Mail: twv-viola@web.de
                </p>

                <h4>2. Hosting</h4>
                <p>
                  Diese Website wird bei einem Hosting-Anbieter betrieben. Beim Aufruf der Website
                  verarbeitet der Hosting-Anbieter personenbezogene Daten (z. B. IP-Adresse, Zeitpunkt,
                  angeforderte Datei), um die Website bereitzustellen und zu sichern.
                </p>
                <p className={styles.note}>
                  Hinweis: Trage hier deinen Hosting-Anbieter inkl. Anschrift ein (z. B. IONOS, netcup, Vercel, etc.).
                  Falls du einen Auftragsverarbeitungsvertrag (AVV) hast, ist das der übliche DSGVO-Weg.
                </p>

                <h4>3. Server-Logfiles</h4>
                <p>
                  Bei jedem Zugriff werden durch den Server bzw. Hosting-Anbieter Logdaten verarbeitet
                  (z. B. IP-Adresse, Datum/Uhrzeit, Referrer-URL, Browser, Betriebssystem).
                  Zweck: technische Bereitstellung, Fehleranalyse und Schutz vor Missbrauch/Angriffen.
                </p>
                <p>
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem Betrieb).
                  Speicherdauer: i. d. R. zeitlich begrenzt gemäß Hosting-Konfiguration.
                </p>

                <h4>4. Kontaktaufnahme</h4>
                <p>
                  Wenn du per E-Mail oder Telefon Kontakt aufnimmst, verarbeiten wir die von dir mitgeteilten Daten
                  (z. B. Name, Kontaktdaten, Inhalt der Anfrage), um die Anfrage zu bearbeiten.
                </p>
                <p>
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche/vertragliche Kommunikation)
                  oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Beantwortung).
                  Speicherdauer: solange erforderlich zur Bearbeitung und im Rahmen gesetzlicher Pflichten.
                </p>

                <h4>5. Cookies / Tracking</h4>
                <p>
                  Diese Website setzt nach aktuellem Stand keine Cookies zu Werbe-/Tracking-Zwecken ein.
                  Technisch notwendige Cookies können je nach eingesetzten Komponenten/Hosting vorkommen.
                </p>
                <p className={styles.note}>
                  Falls du z. B. Google Analytics, Meta Pixel, YouTube, Google Maps, reCAPTCHA oder einen Consent-Banner nutzt:
                  Das muss hier konkret ergänzt werden (Anbieter, Zweck, Rechtsgrundlage, Empfänger, Drittlandtransfer).
                </p>

                <h4>6. Empfänger von Daten</h4>
                <p>
                  Empfänger können technische Dienstleister sein (insb. Hosting), soweit dies zur Bereitstellung
                  und zum Betrieb erforderlich ist.
                </p>

                <h4>7. Drittlandübermittlung</h4>
                <p>
                  Eine Übermittlung in Drittländer (außerhalb EU/EWR) findet nur statt, wenn Dienste eingesetzt werden,
                  deren Anbieter dort verarbeiten oder Unterauftragsverarbeiter dort einsetzen. In dem Fall sind geeignete
                  Garantien erforderlich (z. B. EU-Standardvertragsklauseln).
                </p>

                <h4>8. Deine Rechte</h4>
                <ul>
                  <li>Auskunft (Art. 15 DSGVO)</li>
                  <li>Berichtigung (Art. 16 DSGVO)</li>
                  <li>Löschung (Art. 17 DSGVO)</li>
                  <li>Einschränkung (Art. 18 DSGVO)</li>
                  <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerspruch (Art. 21 DSGVO), soweit Art. 6 Abs. 1 lit. f DSGVO Grundlage ist</li>
                  <li>Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO), falls erteilt</li>
                </ul>

                <h4>9. Beschwerderecht</h4>
                <p>
                  Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren (Art. 77 DSGVO).
                </p>

                <h4>10. Stand und Änderungen</h4>
                <p>
                  Stand: {new Date().toLocaleDateString("de-DE")}. Wir passen diese Datenschutzerklärung an,
                  wenn sich Rechtslage oder Verarbeitung ändert.
                </p>

                <p className={styles.disclaimer}>
                  Diese Vorlage deckt typische Standardfälle ab. Für „echte“ Rechtssicherheit müssen deine
                  tatsächlich verwendeten Dienste (Hosting, Analytics, Fonts, Maps, Videos, Formulare, CDN etc.)
                  exakt benannt werden.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
