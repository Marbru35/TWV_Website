import { useEffect, useMemo, useState } from "react";
import { models } from "../../data/models";

export default function Categories() {
  const [activeSlug, setActiveSlug] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeModel = useMemo(
    () => models.find((m) => m.slug === activeSlug) || null,
    [activeSlug]
  );

  const isOpen = !!activeModel;

  function openModel(slug) {
    setActiveSlug(slug);
    setActiveIndex(0);
  }

  function close() {
    setActiveSlug(null);
    setActiveIndex(0);
  }

  function next() {
    if (!activeModel) return;
    setActiveIndex((i) => (i + 1) % activeModel.gallery.length);
  }

  function prev() {
    if (!activeModel) return;
    setActiveIndex((i) => (i - 1 + activeModel.gallery.length) % activeModel.gallery.length);
  }

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeSlug]);

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

        <h2 className="toiletIntroTitle">Unsere Toilettenwagen</h2>

        <div className="toiletCategories--flat">
          {models.map((m) => (
            <article className="toiletCard--flat" key={m.slug}>
              <div className="toiletCardLayout">
                <div className="toiletCardContent">
                  <h3>{m.title}</h3>


                  {/* ✅ Benötigt */}
                  {Array.isArray(m.requires) && m.requires.length > 0 && (
                    <div className="twInfoBlock">
                      <div className="twInfoLabel">Benötigt</div>
                      <div className="twPills">
                        {m.requires.map((r) => (
                          <span className="twPill" key={r}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ✅ Hinweis */}
                  {Array.isArray(m.notes) && m.notes.length > 0 && (
                    <div className="twNote">
                      {m.notes.map((n, idx) => (
                        <div key={idx}>{n}</div>
                      ))}
                    </div>
                  )}

                  {/* ✅ Inklusive */}
                  {Array.isArray(m.includes) && m.includes.length > 0 && (
                    <div className="twInfoBlock">
                      <div className="twInfoLabel">Inklusive</div>
                      <ul className="twCheckList">
                        {m.includes.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="toiletCardActions">
                    <button className="toiletBtn" type="button" onClick={() => openModel(m.slug)}>
                      Details ansehen
                    </button>
                  </div>
                </div>

                <div className="toiletCardImage" aria-hidden="true">
                  <img src={m.gallery[0].src} alt={m.gallery[0].alt} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* MODAL / SLIDER */}
      {isOpen && activeModel && (
        <div className="twModal" onClick={close} role="dialog" aria-modal="true">
          <div className="twModalInner" onClick={(e) => e.stopPropagation()}>
            <button className="twModalClose" type="button" onClick={close} aria-label="Schließen">
              ✕
            </button>

            <div className="twModalHeader">
              <div className="twModalTitle">{activeModel.title}</div>
              <div className="twModalLead">{activeModel.lead}</div>
            </div>

            <div className="twModalStage">
              {activeModel.gallery.length > 1 && (
                <button className="twNav twPrev" type="button" onClick={prev} aria-label="Vorheriges Bild">
                  ‹
                </button>
              )}

              <img
                className="twModalImg"
                src={activeModel.gallery[activeIndex].src}
                alt={activeModel.gallery[activeIndex].alt}
              />

              {activeModel.gallery.length > 1 && (
                <button className="twNav twNext" type="button" onClick={next} aria-label="Nächstes Bild">
                  ›
                </button>
              )}
            </div>

            {activeModel.gallery.length > 1 && (
              <div className="twThumbRow">
                {activeModel.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`twThumb ${i === activeIndex ? "isActive" : ""}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Bild ${i + 1} anzeigen`}
                  >
                    <img src={img.src} alt={img.alt} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
