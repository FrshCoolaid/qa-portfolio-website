/* ==========================================================================
   credentials.js — ISTQB certification (given the prominence it deserves)
   plus education and languages.
   ========================================================================== */

const Credentials = (function () {

  function render() {
    const c = PORTFOLIO_DATA.credentials;
    const cert = c.certification;

    const showYear = !DOM.isPlaceholder(cert.year);
    const showId = !DOM.isPlaceholder(cert.credentialId);
    const showLink = !DOM.isPlaceholder(cert.credentialUrl);

    const html = `
      <div class="wrap">
        ${DOM.sectionHead({ id: "credentials", eyebrow: c.eyebrow, heading: c.heading })}

        <div class="creds">

          <!-- Certification: the headline credential -->
          <article class="cert chamfer" data-reveal data-testid="cert-istqb">
            <span class="cert__glow" aria-hidden="true"></span>

            <div class="cert__head">
              <span class="cert__seal" aria-hidden="true">
                ${ICONS.get("badge", { size: 30 })}
              </span>
              <div>
                <p class="cert__kicker mono">Certification</p>
                <h3 class="cert__name">${DOM.esc(cert.name)}</h3>
                <p class="cert__issuer">${DOM.esc(cert.issuer)}</p>
              </div>
            </div>

            <p class="cert__blurb">${DOM.esc(cert.blurb)}</p>

            <ul class="cert__highlights">
              ${cert.highlights.map(function (h) {
                return `
                  <li class="cert__highlight">
                    <span aria-hidden="true">${ICONS.get("check", { size: 13, strokeWidth: 2.6 })}</span>
                    <span>${DOM.esc(h)}</span>
                  </li>`;
              }).join("")}
            </ul>

            <div class="cert__foot">
              ${showYear ? `<span class="chip mono">${DOM.esc(cert.year)}</span>` : ""}
              ${showId ? `<span class="chip mono">ID ${DOM.esc(cert.credentialId)}</span>` : ""}
              ${showLink
                ? `<a class="btn btn--quiet btn--sm" href="${DOM.esc(cert.credentialUrl)}"
                      target="_blank" rel="noopener noreferrer">
                     ${ICONS.get("external", { size: 15 })}<span>Verify</span>
                   </a>`
                : ""}
            </div>
          </article>

          <!-- Education + languages -->
          <div class="creds__side">

            <section class="edu chamfer" data-reveal aria-labelledby="edu-heading">
              <h3 class="sub-heading" id="edu-heading">
                ${ICONS.get("book", { size: 18 })}
                <span>Education</span>
              </h3>
              <ul class="edu__list">
                ${c.education.map(function (item) {
                  const period = DOM.isPlaceholder(item.period) ? "" : item.period;
                  const loc = DOM.isPlaceholder(item.location) ? "" : item.location;
                  return `
                    <li class="edu__item">
                      <p class="edu__institution">${DOM.esc(item.institution)}</p>
                      <p class="edu__qualification">${DOM.esc(item.qualification)}</p>
                      ${period || loc
                        ? `<p class="edu__meta mono">${DOM.esc([period, loc].filter(Boolean).join(" · "))}</p>`
                        : `<p class="edu__meta mono edu__meta--todo">${DOM.esc(item.period)}</p>`}
                    </li>`;
                }).join("")}
              </ul>
            </section>

            <section class="langs chamfer" data-reveal aria-labelledby="langs-heading">
              <h3 class="sub-heading" id="langs-heading">
                ${ICONS.get("users", { size: 18 })}
                <span>Languages</span>
              </h3>
              <ul class="langs__list">
                ${c.languages.map(function (l) {
                  return `
                    <li class="lang">
                      <span class="lang__name">${DOM.esc(l.name)}</span>
                      <span class="lang__level mono">${DOM.esc(l.level)}</span>
                    </li>`;
                }).join("")}
              </ul>
            </section>

          </div>
        </div>
      </div>
    `;

    DOM.mount("credentials", html);
  }

  return { render: render };
})();
