/* ==========================================================================
   skills.js — Grouped capabilities, tools and platforms.
   Deliberately no percentage bars: they imply a precision nobody can defend
   in an interview.
   ========================================================================== */

const Skills = (function () {

  function groupHtml(group, i) {
    return `
      <article class="skill-group chamfer" style="--i:${i}" data-reveal>
        <div class="skill-group__head">
          <span class="skill-group__icon" aria-hidden="true">${ICONS.get(group.icon, { size: 20 })}</span>
          <div>
            <h3 class="skill-group__title">${DOM.esc(group.title)}</h3>
            <p class="skill-group__blurb">${DOM.esc(group.blurb)}</p>
          </div>
        </div>
        <ul class="skill-group__list">
          ${group.items.map(function (item) {
            return `
              <li class="skill-item">
                <span class="skill-item__tick" aria-hidden="true">${ICONS.get("check", { size: 12, strokeWidth: 2.6 })}</span>
                <span>${DOM.esc(item)}</span>
              </li>`;
          }).join("")}
        </ul>
      </article>`;
  }

  function render() {
    const s = PORTFOLIO_DATA.skills;

    const html = `
      <div class="wrap">
        ${DOM.sectionHead({ id: "skills", eyebrow: s.eyebrow, heading: s.heading, intro: s.intro })}

        <div class="skills-grid">
          ${s.groups.map(groupHtml).join("")}
        </div>

        <div class="skills-split">

          <!-- Tools -->
          <section class="tools chamfer" data-reveal aria-labelledby="tools-heading">
            <h3 class="sub-heading" id="tools-heading">
              ${ICONS.get("terminal", { size: 18 })}
              <span>${DOM.esc(s.tools.title)}</span>
            </h3>
            <ul class="tools__list">
              ${s.tools.items.map(function (tool, i) {
                return `
                  <li class="tool" style="--i:${i}">
                    <span class="tool__name">${DOM.esc(tool.name)}</span>
                    <span class="tool__note">${DOM.esc(tool.note)}</span>
                  </li>`;
              }).join("")}
            </ul>
          </section>

          <!-- Platforms -->
          <section class="platforms chamfer" data-reveal aria-labelledby="platforms-heading">
            <h3 class="sub-heading" id="platforms-heading">
              ${ICONS.get("layers", { size: 18 })}
              <span>${DOM.esc(s.platforms.title)}</span>
            </h3>
            <ul class="platforms__list">
              ${s.platforms.items.map(function (p, i) {
                return `
                  <li class="platform" style="--i:${i}">
                    <span class="platform__icon" aria-hidden="true">${ICONS.get(p.icon, { size: 22 })}</span>
                    <span class="platform__name">${DOM.esc(p.name)}</span>
                  </li>`;
              }).join("")}
            </ul>
            <p class="platforms__note">Client-side game testing across all four targets.</p>
          </section>

        </div>
      </div>
    `;

    DOM.mount("skills", html);
  }

  return { render: render };
})();
