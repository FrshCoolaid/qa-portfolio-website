/* ==========================================================================
   projects.js — AAA project showcase.
   Artwork resolution order:
     1. `image` from portfolio-data.js  (your real asset)
     2. `placeholder` SVG               (abstract fallback, always present)
   If the real image 404s, we swap to the placeholder silently — the card
   never renders broken.
   ========================================================================== */

const Projects = (function () {

  function isUnreplaced(text) {
    return typeof text === "string" && text.trim().startsWith("[");
  }

  function cardHtml(project, index) {
    const hasImage = !DOM.isPlaceholder(project.image);
    const src = hasImage ? project.image : project.placeholder;

    const descIsPlaceholder = isUnreplaced(project.description);

    return `
      <article class="project chamfer${project.redacted ? " project--redacted" : ""}"
               style="--i:${index}"
               data-reveal
               data-testid="project-${DOM.esc(project.id)}">

        <div class="project__media">
          <img class="project__img"
               src="${DOM.esc(src)}"
               data-fallback="${DOM.esc(project.placeholder)}"
               alt="${DOM.esc(project.alt)}"
               loading="${index === 0 ? "eager" : "lazy"}"
               decoding="async"
               width="800" height="500" />

          <span class="project__scrim" aria-hidden="true"></span>

          ${project.redacted
            ? `<span class="project__classified mono" aria-hidden="true">CONFIDENTIAL</span>`
            : ""}

          <span class="project__status mono">${DOM.esc(project.status)}</span>
        </div>

        <div class="project__body">
          <p class="project__studio mono">${DOM.esc(project.studio)}${
            project.year ? ` &middot; ${DOM.esc(project.year)}` : ""
          }</p>

          <h3 class="project__title">${DOM.esc(project.title)}</h3>

          <p class="project__desc${descIsPlaceholder ? " project__desc--placeholder" : ""}">
            ${DOM.esc(project.description)}
          </p>

          <ul class="project__tags" aria-label="QA focus areas">
            ${project.qaTags.map(function (t) {
              return `<li class="tag tag--sm">${DOM.esc(t)}</li>`;
            }).join("")}
          </ul>

          <ul class="project__platforms" aria-label="Platforms">
            ${project.platforms.map(function (p) {
              return `<li class="chip mono">${DOM.esc(p)}</li>`;
            }).join("")}
          </ul>
        </div>
      </article>`;
  }

  function render() {
    const p = PORTFOLIO_DATA.projects;

    const html = `
      <div class="wrap">
        ${DOM.sectionHead({ id: "projects", eyebrow: p.eyebrow, heading: p.heading, intro: p.intro })}
        <div class="projects" data-testid="projects-grid">
          ${p.items.map(cardHtml).join("")}
        </div>
        <p class="projects__note">
          ${ICONS.get("lock", { size: 14 })}
          <span>Details of unannounced work are withheld under NDA.</span>
        </p>
      </div>
    `;

    DOM.mount("projects", html);
    wireUp();
  }

  /* ------------------------------------------------------------------ */

  function wireUp() {
    // Fall back to the abstract SVG if a real image is missing.
    DOM.qsa(".project__img").forEach(function (img) {
      img.addEventListener("error", function handle() {
        img.removeEventListener("error", handle);
        const fb = img.dataset.fallback;
        if (fb && img.getAttribute("src") !== fb) img.src = fb;
      });
    });

    // Subtle pointer-follow depth on the artwork. Desktop + fine pointer only.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    DOM.qsa(".project").forEach(function (card) {
      const media = DOM.qs(".project__media", card);
      if (!media) return;

      card.addEventListener("pointermove", function (e) {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        media.style.setProperty("--px", (x * 10).toFixed(2) + "px");
        media.style.setProperty("--py", (y * 10).toFixed(2) + "px");
      });

      card.addEventListener("pointerleave", function () {
        media.style.setProperty("--px", "0px");
        media.style.setProperty("--py", "0px");
      });
    });
  }

  return { render: render };
})();
