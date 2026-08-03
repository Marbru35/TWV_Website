export function scrollToId(id, offsetPx) {
  const el = document.getElementById(id);
  if (!el) return;

  // Ohne festen Wert: die Höhe der klebenden Kopfzeile messen, damit das
  // Ziel auf jeder Bildschirmbreite darunter sitzt und nicht verdeckt wird.
  const header = document.querySelector("[data-sticky-header]");
  const offset =
    typeof offsetPx === "number"
      ? offsetPx
      : (header?.offsetHeight || 64) + 12;

  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}
