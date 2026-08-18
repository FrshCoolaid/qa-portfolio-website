/* ==========================================================================
   footer.js
   ========================================================================== */

const Footer = (function () {

  function render() {
    const d = PORTFOLIO_DATA;
    const year = new Date().getFullYear();
    const hasLinkedIn = !DOM.isPlaceholder(d.contact.linkedin);
    const hasGithub = !DOM.isPlaceholder(d.contact.github);

    const html = `
      <div class="wrap footer">
        <div class="footer__brand">
          <span class="brand__mark brand__mark--sm" aria-hidden="true">
            <span class="brand__initials">${DOM.esc(d.profile.initials)}</span>
          </span>
          <div>
            <p class="footer__name">${DOM.esc(d.profile.name)}</p>
            <p class="footer__role">${DOM.esc(d.profile.role)} &middot; ${DOM.esc(d.profile.location)}</p>
          </div>
        </div>

        <nav class="footer__nav" aria-label="Footer">
          <ul>
            ${d.nav.map(function (n) {
              return `<li><a href="#${DOM.esc(n.id)}">${DOM.esc(n.label)}</a></li>`;
            }).join("")}
          </ul>
        </nav>

        <div class="footer__side">
          <ul class="footer__social">
            <li>
              <a href="mailto:${DOM.esc(d.contact.email)}" aria-label="Email">
                ${ICONS.get("mail", { size: 18 })}
              </a>
            </li>
            ${hasLinkedIn ? `
            <li>
              <a href="${DOM.esc(d.contact.linkedin)}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                ${ICONS.get("linkedin", { size: 18 })}
              </a>
            </li>` : ""}
            ${hasGithub ? `
            <li>
              <a href="${DOM.esc(d.contact.github)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                ${ICONS.get("github", { size: 18 })}
              </a>
            </li>` : ""}
          </ul>
          <p class="footer__copy mono">&copy; ${year} ${DOM.esc(d.profile.name)}</p>
        </div>
      </div>
    `;

    DOM.mount("site-footer", html);
  }

  return { render: render };
})();
