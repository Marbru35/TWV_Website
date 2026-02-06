export function scrollToId(id, offsetPx = 92) {
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - offsetPx;
  window.scrollTo({ top: y, behavior: "smooth" });
}
