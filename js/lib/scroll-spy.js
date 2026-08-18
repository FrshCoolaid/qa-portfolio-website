/* ==========================================================================
   scroll-spy.js — Active-section tracking for the navigation.

   Uses IntersectionObserver with a rootMargin that creates a narrow
   "detection band" just below the header. The section occupying that band
   is the active one. This behaves correctly for both tall and short
   sections, and for fast scrolling, which a naive scroll-offset comparison
   does not.
   ========================================================================== */

const ScrollSpy = (function () {

  function init() {
    const links = DOM.qsa("[data-nav-link]");
    const sections = PORTFOLIO_DATA.nav
      .map(function (n) { return document.getElementById(n.id); })
      .filter(Boolean);

    if (!links.length || !sections.length) return;

    const indicator = DOM.qs(".nav-desktop__indicator");
    let activeId = null;

    function setActive(id) {
      if (id === activeId) return;
      activeId = id;

      links.forEach(function (link) {
        const on = link.dataset.navLink === id;
        link.classList.toggle("is-active", on);
        if (on) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      moveIndicator(id);
    }

    /** Slide the underline beneath the active desktop link. */
    function moveIndicator(id) {
      if (!indicator) return;

      const link = DOM.qs('.nav-link--desktop[data-nav-link="' + id + '"]');
      if (!link) return;

      const list = link.closest(".nav-desktop__list");
      if (!list) return;

      const lr = list.getBoundingClientRect();
      const br = link.getBoundingClientRect();

      indicator.style.width = br.width + "px";
      indicator.style.transform = "translateX(" + (br.left - lr.left) + "px)";
      indicator.style.opacity = "1";
    }

    /* --- The observer ------------------------------------------------- */

    const header = document.getElementById("site-header");
    const headerH = (header && header.offsetHeight) || 72;

    // Track how much of each section sits inside the band, and pick the
    // section with the greatest visible share.
    const ratios = new Map();

    const firstId = PORTFOLIO_DATA.nav[0].id;
    const lastId = PORTFOLIO_DATA.nav[PORTFOLIO_DATA.nav.length - 1].id;

    /** Top and bottom of the page are special cases the band cannot resolve. */
    function edgeId() {
      if (window.scrollY < 80) return firstId;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      return atBottom ? lastId : null;
    }

    function resolve() {
      const edge = edgeId();
      if (edge) {
        setActive(edge);
        return;
      }

      let best = null;
      let bestRatio = 0;

      ratios.forEach(function (ratio, id) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });

      if (best) setActive(best);
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        resolve();
      },
      {
        // Band: from just under the header down to 45% of the viewport.
        rootMargin: "-" + (headerH + 4) + "px 0px -45% 0px",
        threshold: [0, 0.02, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach(function (section) { observer.observe(section); });

    /* --- Keep the edges honest while scrolling ------------------------- */

    let edgeTick = false;
    window.addEventListener(
      "scroll",
      function () {
        if (edgeTick) return;
        edgeTick = true;
        window.requestAnimationFrame(function () {
          resolve();
          edgeTick = false;
        });
      },
      { passive: true }
    );

    // Keep the indicator aligned when the layout changes
    window.addEventListener("resize", function () {
      if (activeId) moveIndicator(activeId);
    });

    // Fonts loading late shifts link widths — realign once they are ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        if (activeId) moveIndicator(activeId);
      });
    }

    setActive(firstId);
    resolve();
  }

  return { init: init };
})();
