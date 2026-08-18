/* ==========================================================================
   reveal.js — Fade/slide elements into view once, as they are scrolled to.
   Any element with data-reveal is picked up automatically.
   ========================================================================== */

const Reveal = (function () {

  function init() {
    const items = DOM.qsa("[data-reveal]");
    if (!items.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No IntersectionObserver, or the visitor prefers reduced motion:
    // show everything immediately. Content is never hidden behind an effect.
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target); // reveal once, then stop watching
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  return { init: init };
})();
