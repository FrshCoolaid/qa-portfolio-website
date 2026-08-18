/* ==========================================================================
   journey.js — Career progression rail.
   A single continuous track with milestone nodes. The track fills as the
   visitor scrolls past it (pure CSS transform driven by one observer).
   ========================================================================== */

const Journey = (function () {

  function milestoneHtml(m, i) {
    return `
      <li class="milestone${m.current ? " milestone--current" : ""}" style="--i:${i}" data-reveal>
        <span class="milestone__node" aria-hidden="true">
          ${ICONS.get(m.icon, { size: 15 })}
        </span>

        <div class="milestone__card chamfer-sm">
          <p class="milestone__tag mono">${DOM.esc(m.tag)}</p>
          <h3 class="milestone__title">${DOM.esc(m.title)}</h3>
          <p class="milestone__detail">${DOM.esc(m.detail)}</p>
          <p class="milestone__meta mono${
            m.confirm ? " milestone__meta--todo" : ""
          }">${DOM.esc(m.meta)}</p>
        </div>
      </li>`;
  }

  function render() {
    const j = PORTFOLIO_DATA.journey;

    const html = `
      <div class="wrap">
        ${DOM.sectionHead({ id: "journey", eyebrow: j.eyebrow, heading: j.heading, intro: j.intro })}

        <div class="journey">
          <div class="journey__track" aria-hidden="true">
            <span class="journey__fill" data-journey-fill></span>
          </div>
          <ol class="journey__list">
            ${j.milestones.map(milestoneHtml).join("")}
          </ol>
        </div>
      </div>
    `;

    DOM.mount("journey", html);
    wireUp();
  }

  /* ------------------------------------------------------------------ */

  function wireUp() {
    const fill = DOM.qs("[data-journey-fill]");
    const journey = DOM.qs(".journey");
    if (!fill || !journey) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      fill.style.transform = "scaleY(1)";
      return;
    }

    let ticking = false;

    function update() {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(function () {
        const r = journey.getBoundingClientRect();
        const vh = window.innerHeight;

        // 0 when the section's top reaches 75% of the viewport,
        // 1 once its bottom passes 40%.
        const start = vh * 0.75;
        const end = vh * 0.4;
        const total = r.height + (start - end);
        const travelled = start - r.top;
        const pct = Math.max(0, Math.min(1, travelled / total));

        fill.style.transform = "scaleY(" + pct.toFixed(3) + ")";
        ticking = false;
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  return { render: render };
})();
