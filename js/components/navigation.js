/* ==========================================================================
   navigation.js — Sticky header, desktop nav, mobile drawer.
   Active-section highlighting lives in js/lib/scroll-spy.js.
   ========================================================================== */

const Navigation = (function () {

  function linkList(items, variant) {
    return items
      .map(function (item) {
        return `
          <li class="nav-${variant}__item">
            <a class="nav-link nav-link--${variant}"
               href="#${DOM.esc(item.id)}"
               data-nav-link="${DOM.esc(item.id)}"
               data-testid="nav-${DOM.esc(item.id)}">
              <span class="nav-link__label">${DOM.esc(item.label)}</span>
            </a>
          </li>`;
      })
      .join("");
  }

  function render() {
    const d = PORTFOLIO_DATA;
    const showRunner = d.config.showTestRunner;

    const html = `
      <div class="nav-bar">
        <div class="wrap nav-bar__inner">

          <!-- Brand -->
          <a class="brand" href="#home" aria-label="${DOM.esc(d.profile.name)} — back to top">
            <span class="brand__mark" aria-hidden="true">
              <span class="brand__initials">${DOM.esc(d.profile.initials)}</span>
            </span>
            <span class="brand__text">
              <span class="brand__name">${DOM.esc(d.profile.name)}</span>
              <span class="brand__role">${DOM.esc(d.profile.role)}</span>
            </span>
          </a>

          <!-- Desktop navigation -->
          <nav class="nav-desktop" aria-label="Primary">
            <ul class="nav-desktop__list">
              ${linkList(d.nav, "desktop")}
              <li class="nav-desktop__indicator" aria-hidden="true"></li>
            </ul>
          </nav>

          <!-- Right-hand actions -->
          <div class="nav-actions">
            ${showRunner ? TestRunner.buttonHtml() : ""}
            <button class="nav-toggle"
                    type="button"
                    aria-expanded="false"
                    aria-controls="mobile-menu"
                    aria-label="Open menu"
                    data-nav-toggle>
              <span class="nav-toggle__icon" aria-hidden="true">
                <span></span><span></span><span></span>
              </span>
            </button>
          </div>

        </div>
        <!-- Progress bar showing how far down the page the visitor is -->
        <div class="nav-progress" aria-hidden="true"><span data-nav-progress></span></div>
      </div>

      <!-- Mobile drawer -->
      <div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
        <nav class="mobile-menu__nav" aria-label="Mobile">
          <ul class="nav-mobile__list">
            ${linkList(d.nav, "mobile")}
          </ul>
        </nav>
        <div class="mobile-menu__foot">
          <a class="btn btn--primary btn--block" href="#contact" data-mobile-close>
            ${ICONS.get("mail", { size: 17 })}<span>Get in touch</span>
          </a>
          <p class="mobile-menu__meta">
            ${ICONS.get("pin", { size: 14 })}
            <span>${DOM.esc(d.profile.location)}</span>
          </p>
        </div>
      </div>
      <div class="mobile-menu__scrim" data-mobile-scrim hidden></div>
    `;

    DOM.mount("site-header", html);
    wireUp();
  }

  /* ------------------------------------------------------------------ */

  function wireUp() {
    const header = document.getElementById("site-header");
    const toggle = DOM.qs("[data-nav-toggle]");
    const menu = DOM.qs("[data-mobile-menu]");
    const scrim = DOM.qs("[data-mobile-scrim]");
    const progress = DOM.qs("[data-nav-progress]");

    /* --- Condensed header + progress bar on scroll -------------------- */
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(function () {
        const y = window.scrollY;
        header.classList.toggle("is-scrolled", y > 24);

        if (progress) {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const pct = max > 0 ? Math.min(100, (y / max) * 100) : 0;
          progress.style.transform = "scaleX(" + pct / 100 + ")";
        }

        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* --- Mobile drawer ------------------------------------------------ */
    function setMenu(open) {
      if (!menu || !toggle) return;

      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      toggle.classList.toggle("is-open", open);
      menu.hidden = !open;
      if (scrim) scrim.hidden = !open;
      document.body.classList.toggle("has-menu-open", open);

      // Move focus into the drawer when it opens so keyboard users land there
      if (open) {
        const first = DOM.qs(".nav-link--mobile", menu);
        if (first) first.focus();
      }
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        setMenu(toggle.getAttribute("aria-expanded") !== "true");
      });
    }

    if (scrim) scrim.addEventListener("click", function () { setMenu(false); });

    DOM.qsa(".nav-link--mobile, [data-mobile-close]").forEach(function (el) {
      el.addEventListener("click", function () { setMenu(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    // Close the drawer if the viewport grows past the mobile breakpoint
    window.addEventListener("resize", function () {
      if (window.innerWidth > 960) setMenu(false);
    });

    /* --- Smooth scrolling with a correct offset ------------------------
       We do this manually rather than relying on CSS alone, because the
       header height changes once it condenses.                          */
    DOM.qsa('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        const id = link.getAttribute("href").slice(1);
        if (!id) return;

        const target = document.getElementById(id);
        if (!target) return;

        e.preventDefault();

        const headerH = header.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH + 1;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });

        // Keep the URL shareable without the browser's own jump
        history.replaceState(null, "", "#" + id);

        // Move keyboard focus to the section for screen-reader users
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  return { render: render };
})();
