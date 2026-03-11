/**
 * Global IntersectionObserver for scroll animations.
 * Add the 'data-reveal' attribute to any element you want to animate on scroll.
 * Example: <div data-reveal="up">...</div>
 */
export function initScrollObserver() {
  if (typeof IntersectionObserver === "undefined") return;

  const onIntersect = (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-revealed", entry.isIntersecting);
    });
  };

  const observer = new IntersectionObserver(onIntersect, {
    root: null,
    rootMargin: "0px 0px -10% 0px", // Trigger slightly before the bottom
    threshold: 0.1,
  });

  const earlyObserver = new IntersectionObserver(onIntersect, {
    root: null,
    rootMargin: "0px 0px 8% 0px", // Trigger a bit earlier, but not too early
    threshold: 0.05,
  });

  const elements = document.querySelectorAll("[data-reveal]");
  elements.forEach((el) => {
    const useEarlyObserver = el.getAttribute("data-reveal-early") === "true";
    (useEarlyObserver ? earlyObserver : observer).observe(el);
  });

  // Also setup a mutation observer to catch dynamically added elements (like React rendering in chunks)
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          // Element node
          if (node.hasAttribute("data-reveal")) {
            const useEarlyObserver =
              node.getAttribute("data-reveal-early") === "true";
            (useEarlyObserver ? earlyObserver : observer).observe(node);
          }
          const nested = node.querySelectorAll("[data-reveal]");
          nested.forEach((el) => {
            const useEarlyObserver =
              el.getAttribute("data-reveal-early") === "true";
            (useEarlyObserver ? earlyObserver : observer).observe(el);
          });
        }
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
}
