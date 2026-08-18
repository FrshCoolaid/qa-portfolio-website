/* ==========================================================================
   icons.js — Inline SVG icon set.
   Hand-picked, single-stroke, 24x24. Inline so there are zero icon-font or
   icon-library dependencies and no extra network requests.
   Usage:  ICONS.get("bug")  ->  "<svg ...>...</svg>"
   ========================================================================== */

const ICONS = (function () {

  const paths = {
    /* --- QA / testing --------------------------------------------------- */
    bug: '<path d="M8 6a4 4 0 0 1 8 0"/><path d="M6.5 9h11v5a5.5 5.5 0 0 1-11 0V9Z"/><path d="M3 12h3.5M17.5 12H21M4.5 7l2 1.5M19.5 7l-2 1.5M4.5 17.5l2-1.5M19.5 17.5l-2-1.5M12 14.5v4"/>',
    checklist: '<path d="M4 6.5 5.6 8 8.5 5"/><path d="M4 13.5 5.6 15l2.9-3"/><path d="M4 20.5 5.6 22l2.9-3"/><path d="M11.5 6.5H21M11.5 13.5H21M11.5 20.5H19"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    shield: '<path d="M12 3 4.5 6v6c0 4.2 3.1 7.9 7.5 9 4.4-1.1 7.5-4.8 7.5-9V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
    badge: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1 7 4.5-2.4 4.5 2.4-1-7"/>',

    /* --- systems -------------------------------------------------------- */
    layers: '<path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z"/><path d="m3.5 12 8.5 4.5L20.5 12"/><path d="m3.5 16.5 8.5 4.5 8.5-4.5"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7.5 9.5 3 2.5-3 2.5M13 15h4"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M9 20h6M12 16v4"/>',
    cloud: '<path d="M7 18a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17.3 9.7 3.65 3.65 0 0 1 17 18H7Z"/>',
    gamepad: '<path d="M7.5 8h9a5 5 0 0 1 4.9 4.1l.5 3A3.2 3.2 0 0 1 18.8 19c-1 0-1.9-.5-2.5-1.3L15 16H9l-1.3 1.7A3.1 3.1 0 0 1 5.2 19 3.2 3.2 0 0 1 2.1 15.1l.5-3A5 5 0 0 1 7.5 8Z"/><path d="M7 12v2.5M5.75 13.25h2.5M16 12.5h.01M18 14.5h.01"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.3a3.2 3.2 0 0 1 0 5.4M17.5 14.2A5.5 5.5 0 0 1 20.5 19"/>',

    /* --- journey -------------------------------------------------------- */
    book: '<path d="M4 5.5A2 2 0 0 1 6 3.5h13V18H6a2 2 0 0 0-2 2V5.5Z"/><path d="M4 20a2 2 0 0 0 2 2h13v-4"/>',
    flag: '<path d="M5 21V4"/><path d="M5 5h10.5l-1.5 3 1.5 3H5"/>',
    package: '<path d="m12 3 8 4v10l-8 4-8-4V7l8-4Z"/><path d="m4 7 8 4 8-4M12 11v10"/>',
    lock: '<rect x="4.5" y="10" width="15" height="10.5" rx="2"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>',
    star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.5 9.7l5.9-.8L12 3.5Z"/>',

    /* --- ui ------------------------------------------------------------- */
    arrowDown: '<path d="M12 4.5v15M6.5 14l5.5 5.5L17.5 14"/>',
    arrowRight: '<path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
    phone: '<path d="M7 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5.5 5.7 2 2 0 0 1 7 3.5Z"/>',
    pin: '<path d="M12 21s6.5-5.6 6.5-10a6.5 6.5 0 0 0-13 0C5.5 15.4 12 21 12 21Z"/><circle cx="12" cy="11" r="2.4"/>',
    download: '<path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4.5 17.5v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-1"/>',
    linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 10.5v6M8 7.6v.01M12 16.5v-6M12 13a2.5 2.5 0 0 1 5 0v3.5"/>',
    github: '<path d="M15.5 21v-3.1c0-1-.3-1.7-.8-2.1 2.6-.3 5.3-1.3 5.3-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C7.5 3.5 6.5 3.8 6.5 3.8a4.2 4.2 0 0 0-.1 3.1A4.5 4.5 0 0 0 5.2 10c0 4.5 2.7 5.5 5.3 5.8-.4.3-.6.8-.7 1.4-1.6.7-2.9-.4-3.6-1.4"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    play: '<path d="M8 5.5v13l10-6.5-10-6.5Z"/>',
    doc: '<path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L14 3.5Z"/><path d="M14 3.5v5h5"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    external: '<path d="M14 4.5h5.5V10"/><path d="M19 5 11 13"/><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',

    /* --- platform marks (simplified, generic — not official logos) -------- */
    playstation: '<path d="M12 1.9 15.1 7H8.9z"/><circle cx="19.4" cy="12" r="2.7"/><path d="m9.2 16.4 5.6 5.6M14.8 16.4l-5.6 5.6"/><rect x="1.9" y="9.3" width="5.4" height="5.4" rx=".8"/>',
    xbox: '<circle cx="12" cy="12" r="8.5"/><path d="M6.5 6.8C9 9 10.8 11 12 12.6c1.2-1.6 3-3.6 5.5-5.8M7 18.4c1.2-2.2 2.9-4.3 5-6.1 2.1 1.8 3.8 3.9 5 6.1"/>',
  };

  /**
   * @param {string} name   key from `paths` above
   * @param {object} [opts] { size, className, strokeWidth }
   */
  function get(name, opts) {
    const o = opts || {};
    const size = o.size || 24;
    const sw = o.strokeWidth || 1.6;
    const cls = o.className ? ` class="${o.className}"` : "";
    const d = paths[name];

    if (!d) {
      console.warn("[portfolio] Unknown icon: " + name);
      return "";
    }

    return (
      `<svg${cls} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" ` +
      `stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" ` +
      `stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`
    );
  }

  return { get, paths };
})();
