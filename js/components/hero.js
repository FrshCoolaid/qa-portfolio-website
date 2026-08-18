/* ==========================================================================
   hero.js — Asymmetric hero.
   Left column carries the message; right column carries a "coverage panel"
   that shows the platform + discipline spread at a glance.
   ========================================================================== */

const Hero = (function () {

  function statHtml(stat, index) {
    return `
      <li class="stat" style="--i:${index}">
        <span class="stat__value">${DOM.esc(stat.value)}${
          stat.unit ? `<span class="stat__unit">${DOM.esc(stat.unit)}</span>` : ""
        }</span>
        <span class="stat__label">${DOM.esc(stat.label)}</span>
      </li>`;
  }

  function platformRow(p, index) {
    return `
      <li class="coverage__row" style="--i:${index}">
        <span class="coverage__icon" aria-hidden="true">${ICONS.get(p.icon, { size: 17 })}</span>
        <span class="coverage__name">${DOM.esc(p.name)}</span>
        <span class="coverage__state">
          <span class="coverage__dot" aria-hidden="true"></span>
          <span class="coverage__state-text">Tested</span>
        </span>
      </li>`;
  }

  function render() {
    const d = PORTFOLIO_DATA;
    const p = d.profile;
    const cvReady = !DOM.isPlaceholder(d.contact.cvPath);

    const html = `
      <div class="wrap hero">

        <!-- ---------- Left: the message ---------- -->
        <div class="hero__main">

          ${
            d.config.availability
              ? `<p class="hero__status" data-hero-anim="1">
                   <span class="hero__status-pulse" aria-hidden="true"></span>
                   ${DOM.esc(d.config.availability)}
                 </p>`
              : ""
          }

          <p class="hero__pre mono" data-hero-anim="2">
            ${ICONS.get("pin", { size: 13 })}
            <span>${DOM.esc(p.location)}</span>
            <span class="hero__pre-sep" aria-hidden="true">/</span>
            <span>${DOM.esc(p.company)}</span>
          </p>

          <h1 id="home-heading" class="hero__name" data-hero-anim="3" data-testid="hero-name">
            ${DOM.esc(p.name)}
          </h1>

          <p class="hero__role" data-hero-anim="4" data-testid="hero-role">
            <span class="hero__role-text">${DOM.esc(p.role)}</span>
          </p>

          <p class="hero__tagline" data-hero-anim="5">${DOM.esc(p.tagline)}</p>

          <p class="hero__intro lede" data-hero-anim="6" data-testid="hero-intro">
            ${DOM.esc(p.intro)}
          </p>

          <div class="hero__actions" data-hero-anim="7">
            <a class="btn btn--primary" href="#experience" data-testid="cta-experience">
              ${ICONS.get("layers", { size: 18 })}
              <span>View experience</span>
            </a>
            <a class="btn btn--outline" href="#projects" data-testid="cta-projects">
              ${ICONS.get("package", { size: 18 })}
              <span>See the projects</span>
            </a>
            ${
              cvReady
                ? `<a class="btn btn--quiet"
                      href="${DOM.esc(d.contact.cvPath)}"
                      download="${DOM.esc(d.contact.cvFileName)}"
                      data-testid="cta-cv">
                     ${ICONS.get("download", { size: 18 })}
                     <span>Download CV</span>
                   </a>`
                : ""
            }
          </div>

          <ul class="hero__stats" data-hero-anim="8" data-testid="hero-stats">
            ${p.stats.map(statHtml).join("")}
          </ul>
        </div>

        <!-- ---------- Right: coverage panel ---------- -->
        <aside class="hero__panel" data-hero-anim="9" aria-label="Platform coverage summary">
          <div class="panel chamfer">
            <div class="panel__bar">
              <span class="panel__bar-dots" aria-hidden="true">
                <i></i><i></i><i></i>
              </span>
              <span class="panel__bar-title mono">platform-coverage</span>
            </div>

            <div class="panel__body">
              <p class="panel__label">Shipped &amp; tested on</p>
              <ul class="coverage">
                ${d.skills.platforms.items.map(platformRow).join("")}
              </ul>

              <div class="panel__divider" aria-hidden="true"></div>

              <p class="panel__label">Core disciplines</p>
              <ul class="panel__tags">
                ${["Feature ownership", "Functional", "Regression", "Exploratory", "Smoke", "UAT"]
                  .map(function (t) {
                    return `<li class="tag tag--sm">${DOM.esc(t)}</li>`;
                  })
                  .join("")}
              </ul>

              <div class="panel__divider" aria-hidden="true"></div>

              <p class="panel__foot mono">
                ${ICONS.get("badge", { size: 15 })}
                <span>ISTQB Foundation Level &middot; SEETB</span>
              </p>
            </div>
          </div>

          <!-- decorative corner ticks -->
          <span class="panel__tick panel__tick--tr" aria-hidden="true"></span>
          <span class="panel__tick panel__tick--bl" aria-hidden="true"></span>
        </aside>

      </div>
    `;

    DOM.mount("home", html);
    animateIn();
  }

  /** Staggered entrance. Skipped entirely under prefers-reduced-motion. */
  function animateIn() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = DOM.qsa("[data-hero-anim]");

    if (reduce) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    items
      .sort(function (a, b) {
        return Number(a.dataset.heroAnim) - Number(b.dataset.heroAnim);
      })
      .forEach(function (el, i) {
        window.setTimeout(function () { el.classList.add("is-in"); }, 90 + i * 78);
      });
  }

  return { render: render };
})();
