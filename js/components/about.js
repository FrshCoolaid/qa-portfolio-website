/* ==========================================================================
   about.js — About copy plus an original profile card.
   ========================================================================== */

const About = (function () {

  function render() {
    const a = PORTFOLIO_DATA.about;

    const html = `
      <div class="wrap">
        ${DOM.sectionHead({ id: "about", eyebrow: a.eyebrow, heading: a.heading })}

        <div class="about">
          <div class="about__copy" data-reveal>
            ${a.paragraphs.map(function (p) {
              return `<p class="about__para">${DOM.esc(p)}</p>`;
            }).join("")}
          </div>

          <aside class="about__card" data-reveal aria-label="Profile summary">
            <div class="profile-card chamfer">

              <div class="profile-card__head">
                <span class="profile-card__avatar" aria-hidden="true">
                  ${DOM.esc(PORTFOLIO_DATA.profile.initials)}
                </span>
                <div>
                  <p class="profile-card__name">${DOM.esc(PORTFOLIO_DATA.profile.name)}</p>
                  <p class="profile-card__status">
                    <span class="profile-card__pulse" aria-hidden="true"></span>
                    ${DOM.esc(a.card.status)}
                  </p>
                </div>
              </div>

              <dl class="profile-card__rows">
                ${a.card.rows.map(function (row) {
                  return `
                    <div class="profile-card__row">
                      <dt>${DOM.esc(row.label)}</dt>
                      <dd>${DOM.esc(row.value)}</dd>
                    </div>`;
                }).join("")}
              </dl>

              <ul class="profile-card__traits">
                ${a.card.traits.map(function (t) {
                  return `<li class="tag tag--sm tag--steel">${DOM.esc(t)}</li>`;
                }).join("")}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    `;

    DOM.mount("about", html);
  }

  return { render: render };
})();
