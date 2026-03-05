/**
 * Global IntersectionObserver for scroll animations.
 * Add the 'data-reveal' attribute to any element you want to animate on scroll.
 * Example: <div data-reveal="up">...</div>
 */
export function initScrollObserver() {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
            } else {
                entry.target.classList.remove('is-revealed');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before the bottom
        threshold: 0.1
    });

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach((el) => observer.observe(el));

    // Also setup a mutation observer to catch dynamically added elements (like React rendering in chunks)
    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    if (node.hasAttribute('data-reveal')) {
                        observer.observe(node);
                    }
                    const nested = node.querySelectorAll('[data-reveal]');
                    nested.forEach((el) => observer.observe(el));
                }
            });
        });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });
}
