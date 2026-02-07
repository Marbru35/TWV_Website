import autarkImg from "../../assets/autark_interior.jpeg";
import nonAutarkImg from "../../assets/non_autark_interior.jpeg";
import nonAutarkImg111 from "../../assets/non_autark_1_1_1.jpeg";
import nonAutarkImg313 from "../../assets/non_autark_3_1_3.jpeg";

export default function Categories() {
  return (
    <section className="toiletIntro--flat">
      <div className="container">
        {/* Was suchen Sie */}
        <div className="searchBlock--left">
          <h2 className="searchTitle">Was suchen Sie?</h2>
          <p className="searchText">
            Ob autarker Toilettenwagen mit Frisch- und Abwassertank oder ein Modell
            mit Frisch- und Abwasseranschluss – bei uns finden Sie die passende
            Lösung für Ihren Einsatzort.
          </p>
        </div>

        {/* Unsere Toilettenwägen */}
        <h2 className="toiletIntroTitle">Unsere Toilettenwagen</h2>

        <div className="toiletCategories--flat">
          {/* 1️⃣ Anschluss – Modell 3-1-3 */}
          <article className="toiletCard--flat">
            <div className="toiletCardLayout">
              <div className="toiletCardContent">
                <h3>Toilettenwagen mit Anschluss - Modell 3-1-3</h3>
                <p>Mit direktem Frisch- und Abwasseranschluss.</p>

                <div className="toiletCardActions">
                  <a
                    className="toiletBtn toiletBtn--primary"
                    href="/toilettenwagen/anschluss-3-1-3"
                  >
                    Details ansehen
                  </a>
                </div>
              </div>

              <div className="toiletCardImage">
                <img
                  src={nonAutarkImg313}
                  alt="Toilettenwagen mit Anschluss Innenraum"
                />
              </div>
            </div>
          </article>

          {/* 2️⃣ Anschluss – Modell 1-1-1 */}
          <article className="toiletCard--flat">
            <div className="toiletCardLayout">
              <div className="toiletCardContent">
                <h3>Toilettenwagen mit Anschluss - Modell 1-1-1</h3>
                <p>Mit direktem Frisch- und Abwasseranschluss.</p>

                <div className="toiletCardActions">
                  <a
                    className="toiletBtn toiletBtn--primary"
                    href="/toilettenwagen/anschluss-1-1-1"
                  >
                    Details ansehen
                  </a>
                </div>
              </div>

              <div className="toiletCardImage">
                <img
                  src={nonAutarkImg111}
                  alt="Toilettenwagen mit Anschluss Innenraum"
                />
              </div>
            </div>
          </article>

          {/* 3️⃣ Autark – Modell 1-1-1 */}
          <article className="toiletCard--flat">
            <div className="toiletCardLayout">
              <div className="toiletCardContent">
                <h3>Autarker Toilettenwagen - Modell 1-1-1</h3>
                <p>Mit integriertem Frisch- und Abwassertank.</p>

                <div className="toiletCardActions">
                  <a
                    className="toiletBtn toiletBtn--primary"
                    href="/toilettenwagen/autark-1-1-1"
                  >
                    Details ansehen
                  </a>
                </div>
              </div>

              <div className="toiletCardImage">
                <img
                  src={autarkImg}
                  alt="Autarker Toilettenwagen Innenraum"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
