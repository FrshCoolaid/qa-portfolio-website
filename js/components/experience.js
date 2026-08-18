/* ==========================================================================
   experience.js — The role, plus six ownership areas as an accessible
   tablist. Vertical rail on desktop, horizontal scrolling chips on mobile.
   ========================================================================== */

const Experience = (function () {

  function tabHtml(area, i) {
    const selected = i === 0;
    return `
      <button class="exp-tab${selected ? " is-active" : ""}"
              role="tab"
              type="button"
              id="exp-tab-${DOM.esc(area.id)}"
              aria-selected="${selected}"
              aria-controls="exp-panel-${DOM.esc(area.id)}"
              tabindex="${selected ? "0" : "-1"}"
              data-exp-tab="${DOM.esc(area.id)}">
        <span class="exp-tab__code mono">${DOM.esc(area.code)}</span>
        <span class="exp-tab__body">
          <span class="exp-tab__title">${DOM.esc(area.title)}</span>
          <span class="exp-tab__summary">${DOM.esc(area.summary)}</span>
        </span>
        <span class="exp-tab__icon" aria-hidden="true">${ICONS.get(area.icon, { size: 18 })}</span>
      </button>`;
  }

  function panelHtml(area, i) {
    return `
      <div class="exp-panel${i === 0 ? " is-active" : ""}"
           role="tabpanel"
           id="exp-panel-${DOM.esc(area.id)}"
           aria-labelledby="exp-tab-${DOM.esc(area.id)}"
           data-exp-panel="${DOM.esc(area.id)}"
           ${i === 0 ? "" : "hidden"}>
        <div class="exp-panel__head">
          <span class="exp-panel__icon" aria-hidden="true">${ICONS.get(area.icon, { size: 22 })}</span>
          <div>
            <p class="exp-panel__code mono">AREA ${DOM.esc(area.code)}</p>
            <h3 class="exp-panel__title">${DOM.esc(area.title)}</h3>
          </div>
        </div>
        <ul class="exp-panel__list">
          ${area.points.map(function (point) {
            return `
              <li class="exp-point">
                <span class="exp-point__marker" aria-hidden="true"></span>
                <span>${DOM.esc(point)}</span>
              </li>`;
          }).join("")}
        </ul>
      </div>`;
  }

  function render() {
    const e = PORTFOLIO_DATA.experience;

    const html = `
      <div class="wrap">
        ${DOM.sectionHead({ id: "experience", eyebrow: e.eyebrow, heading: e.heading, intro: e.intro })}

        <!-- The role itself -->
        <article class="role-card chamfer" data-reveal>
          <div class="role-card__left">
            <span class="role-card__logo" aria-hidden="true">${ICONS.get("gamepad", { size: 26 })}</span>
            <div>
              <h3 class="role-card__title">${DOM.esc(e.role.title)}</h3>
              <p class="role-card__company">${DOM.esc(e.role.company)}</p>
            </div>
          </div>
          <div class="role-card__right">
            <p class="role-card__period mono">${DOM.esc(e.role.period)}</p>
            <p class="role-card__location">${ICONS.get("pin", { size: 14 })}<span>${DOM.esc(e.role.location)}</span></p>
          </div>
          <p class="role-card__summary">${DOM.esc(e.role.summary)}</p>
        </article>

        <!-- Six ownership areas -->
        <div class="exp" data-reveal>
          <div class="exp__rail"
               role="tablist"
               aria-label="Areas of responsibility"
               data-exp-rail>
            ${e.areas.map(tabHtml).join("")}
          </div>
          <div class="exp__panels">
            ${e.areas.map(panelHtml).join("")}
          </div>
        </div>
      </div>
    `;

    DOM.mount("experience", html);
    wireUp();
  }

  /* ------------------------------------------------------------------ */

  function wireUp() {
    const tabs = DOM.qsa("[data-exp-tab]");
    const panels = DOM.qsa("[data-exp-panel]");
    if (!tabs.length) return;

    function activate(id, setFocus) {
      tabs.forEach(function (tab) {
        const on = tab.dataset.expTab === id;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        if (on && setFocus) tab.focus();
      });

      panels.forEach(function (panel) {
        const on = panel.dataset.expPanel === id;
        panel.hidden = !on;
        panel.classList.toggle("is-active", on);
      });
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activate(tab.dataset.expTab, false);
      });
    });

    // Arrow-key navigation, as expected of a real tablist
    const rail = DOM.qs("[data-exp-rail]");
    rail.addEventListener("keydown", function (e) {
      const keys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"];
      if (keys.indexOf(e.key) === -1) return;

      e.preventDefault();
      const current = tabs.findIndex(function (t) { return t.getAttribute("aria-selected") === "true"; });
      let next = current;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (current + 1) % tabs.length;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = tabs.length - 1;

      activate(tabs[next].dataset.expTab, true);
    });
  }

  return { render: render };
})();
