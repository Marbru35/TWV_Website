/**
 * Global IntersectionObserver for scroll animations.
 * Add the 'data-reveal' attribute to any element you want to animate on scroll.
 * Example: <div data-reveal="up">...</div>
 */
export function initScrollObserver() {
  if (typeof IntersectionObserver === "undefined") return;

  const EXIT_BUFFER_PX = 4;

  const onIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
      } else {
        // Prevent flicker near viewport edges on slight scroll/UI resize changes.
        const vh =
          window.innerHeight || document.documentElement.clientHeight || 0;
        const rect = entry.boundingClientRect;
        const isClearlyOutside =
          rect.bottom <= -EXIT_BUFFER_PX || rect.top >= vh + EXIT_BUFFER_PX;

        if (isClearlyOutside) {
          entry.target.classList.remove("is-revealed");
        }
      }
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
