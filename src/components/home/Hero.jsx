import { useEffect, useRef } from "react";
import { scrollToId } from "../../utils/scrollToId";
import heroBg from "../../assets/hero-bg2.png";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    const finePointer = window.matchMedia?.(
      "(hover: hover) and (pointer: fine)"
    )?.matches;

    if (reduce || !finePointer) {
      el.style.setProperty("--heroParallax", "0px");
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || 1;

      const center = rect.top + rect.height / 2;
      const t = (center - viewH / 2) / (viewH / 2);

      const strength = 20;
      const y = Math.max(-strength, Math.min(strength, -t * strength));
      el.style.setProperty("--heroParallax", `${y}px`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero hero--image"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero__overlay" />

      <div className="heroCenter">
        <div className="heroPanel heroPanel--white" data-reveal="fade">
          <div className="heroKicker" data-reveal="up" data-delay="100">Toilettenwagenvermietung</div>

          <h1 className="heroTitle" data-reveal="up" data-delay="200">
            <span className="heroTitleWord">TWV</span>{" "}
            <span className="heroTitleWord">Viola</span>
          </h1>

          <p className="heroLead" data-reveal="up" data-delay="300">
            Sauber, zuverlässig und unkompliziert: Anlieferung, Abholung,
            Erstausstattung und Endreinigung – alles aus einer Hand.
          </p>

          <div className="heroActions" data-reveal="up" data-delay="400">
            <button
              className="btn btn--primary"
              onClick={() => scrollToId("kontakt", 92)}
            >
              Anfrage senden
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}