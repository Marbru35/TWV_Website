import autarkImg from "../../assets/autark_interior.jpeg";
import nonAutarkImg from "../../assets/non_autark_interior.jpeg";

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
        <h2 className="toiletIntroTitle">Unsere Toilettenwägen</h2>

        <div className="toiletCategories--flat">

          <div className="toiletCard--flat">
            <h3>Autarker Toilettenwagen</h3>
            <p>
              Mit integriertem Frisch- und Abwassertank.
            </p>

            <div className="toiletCardImage--bottom autarkImage">
              <img
                src={autarkImg}
                alt="Autarker Toilettenwagen Innenraum"
              />
            </div>
          </div>

          <div className="toiletCard--flat">
            <h3>Toilettenwagen mit Anschluss</h3>
            <p>
              Mit direktem Frisch- und Abwasseranschluss.
            </p>

            <div className="toiletCardImage--bottom nonAutarkImage">
              <img
                src={nonAutarkImg}
                alt="Toilettenwagen mit Anschluss Innenraum"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
