import { useEffect, useState } from "react";
import { scrollToId } from "../../utils/scrollToId";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goKontakt = () => {
    scrollToId("kontakt", 92);
  };

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner">

        {/* LOGO / NAME LINKS */}
        <button
          className="header__logo"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Zur Startseite"
        >
          TWV Viola
        </button>

        {/* CTA RECHTS */}
        <div className="header__cta">
          <button
            className="btn btn--primary"
            onClick={goKontakt}
          >
            Anfrage
          </button>
        </div>

      </div>
    </header>
  );
}