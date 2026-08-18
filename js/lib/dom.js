/* ==========================================================================
   dom.js — Tiny helpers shared by every component.
   No framework, no dependencies. Just the three things we actually reuse.
   ========================================================================== */

const DOM = (function () {

  /**
   * Escape a string before it goes into innerHTML.
   * All portfolio copy passes through here, so an apostrophe or an ampersand
   * in your text can never break the markup.
   */
  function esc(value) {
    if (value === null || value === undefined) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /** Render an HTML string into the element with the given id. */
  function mount(id, html) {
    const el = document.getElementById(id);
    if (!el) {
      console.warn("[portfolio] No mount point found for #" + id);
      return null;
    }
    el.innerHTML = html;
    return el;
  }

  /** querySelector / querySelectorAll shorthands. */
  const qs = (sel, root) => (root || document).querySelector(sel);
  const qsa = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /**
   * True when a value is a leftover placeholder like "[YOUR_LINKEDIN_URL]"
   * or an empty string. Components use this to hide unconfigured links
   * instead of rendering something broken.
   */
  function isPlaceholder(value) {
    if (!value) return true;
    const v = String(value).trim();
    return v === "" || (v.startsWith("[") && v.endsWith("]"));
  }

  /** Build a section heading block (eyebrow + h2 + optional intro). */
  function sectionHead(opts) {
    const alignClass = opts.align === "center" ? " section-head--center" : "";
    return `
      <div class="section-head${alignClass}" data-reveal>
        <p class="eyebrow"><span class="eyebrow__tick" aria-hidden="true"></span>${esc(opts.eyebrow)}</p>
        <h2 id="${esc(opts.id)}-heading" class="section-head__title">${esc(opts.heading)}</h2>
        ${opts.intro ? `<p class="section-head__intro lede">${esc(opts.intro)}</p>` : ""}
      </div>`;
  }

  return { esc, mount, qs, qsa, isPlaceholder, sectionHead };
})();
