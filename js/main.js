/* ==========================================================================
   main.js — Bootstrap.
   Renders every section from PORTFOLIO_DATA, then initialises behaviour.
   ========================================================================== */

(function () {

  function boot() {
    // --- Apply metadata from the data file -----------------------------
    const meta = PORTFOLIO_DATA.meta;
    if (meta.title) document.title = meta.title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag && meta.description) descTag.setAttribute("content", meta.description);

    if (!DOM.isPlaceholder(meta.siteUrl)) {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", meta.siteUrl);

      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", meta.siteUrl);
    }

    // --- Render, in document order -------------------------------------
    Navigation.render();
    Hero.render();
    About.render();
    Experience.render();
    Projects.render();
    Skills.render();
    Journey.render();
    Credentials.render();
    Contact.render();
    Footer.render();

    // --- Behaviour ------------------------------------------------------
    ScrollSpy.init();
    Reveal.init();
    ContactForm.init();
    TestRunner.init();

    document.body.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
