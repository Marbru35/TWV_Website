/**
 * Scroll-reveal observer.
 * – One-shot per element (no re-hide on scroll-up).
 * – Uses a MutationObserver to catch React-rendered elements (React renders
 *   asynchronously AFTER initScrollObserver() is called in main.jsx).
 * – Respects prefers-reduced-motion.
 */
export function initScrollObserver() {
  if (typeof IntersectionObserver === "undefined") return;

  // Honour reduced-motion: reveal everything immediately, skip all observers.
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    // We still need the MutationObserver so future elements are also revealed.
    const mo = new MutationObserver(() => {
      document.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => {
        el.classList.add("is-revealed");
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return;
  }

  // ── Single IntersectionObserver (one-shot) ──────────────────────────────
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target); // never re-hide
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -6% 0px",
      threshold: 0,
    }
  );

  function observe(el) {
    io.observe(el);
  }

  // Observe any elements already in the DOM (for SSR or rare cases).
  document.querySelectorAll("[data-reveal]").forEach(observe);

  // ── MutationObserver — required because React renders after this call ───
  // Kept lean: only watches added nodes, does NOT re-trigger on class changes.
  const mo = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1) continue; // skip text nodes
        if (node.hasAttribute("data-reveal")) observe(node);
        node.querySelectorAll("[data-reveal]").forEach(observe);
      }
    }
  });

  mo.observe(document.body, { childList: true, subtree: true });
}
