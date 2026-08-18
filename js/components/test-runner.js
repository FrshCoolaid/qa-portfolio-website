/* ==========================================================================
   test-runner.js — UI SHELL ONLY. NOT WIRED UP.
   --------------------------------------------------------------------------
   This file contains the *presentation* for the Test Runner: the header
   button, the dropdown panel, open/close behaviour and keyboard handling.

   It deliberately contains NO automation logic. The two functions that would
   talk to GitHub — runTests() and loadLastRun() — are empty stubs. We fill
   them in together during the Playwright / GitHub Actions sessions, so you
   write and understand that code yourself.

   The whole feature is hidden until you set:
       PORTFOLIO_DATA.config.showTestRunner = true
   in js/data/portfolio-data.js. Until then nothing here renders, so there is
   no dead button on your live site.

   --------------------------------------------------------------------------
   ONE THING TO KNOW BEFORE WE BUILD IT
   --------------------------------------------------------------------------
   A static site cannot trigger a GitHub Actions workflow directly, because
   doing so needs a token, and any token shipped in client-side JavaScript is
   readable by every visitor. So "Run Tests" needs one of:

     a) a tiny serverless proxy (Cloudflare Worker / Vercel / Netlify
        function) that holds the token and calls the GitHub API for you; or
     b) no live trigger at all — the workflow runs on push and on a schedule,
        and the button simply opens the latest published report.

   Option (b) is honest, free, has no secrets to leak, and still shows a
   recruiter a real Playwright report. Option (a) is the more impressive
   demo. We will talk through both before writing a line of it.
   ========================================================================== */

const TestRunner = (function () {

  /** Header button markup. Called by navigation.js when the flag is on. */
  function buttonHtml() {
    const t = PORTFOLIO_DATA.testRunner;
    return `
      <div class="runner" data-runner-root>
        <button class="btn btn--runner btn--sm"
                type="button"
                aria-expanded="false"
                aria-controls="runner-panel"
                data-runner-toggle>
          ${ICONS.get("play", { size: 15 })}
          <span>${DOM.esc(t.label)}</span>
        </button>

        <div class="runner__panel chamfer" id="runner-panel" data-runner-panel hidden>
          <div class="runner__head">
            <p class="runner__title">${DOM.esc(t.label)}</p>
            <button class="runner__close" type="button" aria-label="Close" data-runner-close>
              ${ICONS.get("close", { size: 16 })}
            </button>
          </div>

          <p class="runner__blurb">${DOM.esc(t.blurb)}</p>

          <div class="runner__actions">
            <button class="btn btn--primary btn--block btn--sm" type="button" data-runner-run>
              ${ICONS.get("play", { size: 15 })}<span>Run tests</span>
            </button>
            <button class="btn btn--outline btn--block btn--sm" type="button" data-runner-report>
              ${ICONS.get("doc", { size: 15 })}<span>View report</span>
            </button>
          </div>

          <p class="runner__meta mono" data-runner-meta>Not connected yet</p>
        </div>
      </div>`;
  }

  /* ======================================================================
     STUBS — we implement these together. Left intentionally empty.
     ====================================================================== */

  /**
   * TODO (together): trigger the Playwright workflow.
   * Will most likely POST to a serverless proxy which then calls
   * POST /repos/{owner}/{repo}/actions/workflows/{id}/dispatches
   */
  function runTests() {
    console.info("[test-runner] runTests() is not implemented yet — this is the part we build together.");
  }

  /**
   * TODO (together): fetch the most recent workflow run so the panel can
   * show status and a timestamp.
   * Likely GET /repos/{owner}/{repo}/actions/runs?per_page=1
   */
  function loadLastRun() {
    console.info("[test-runner] loadLastRun() is not implemented yet.");
  }

  /* ======================================================================
     Presentation wiring — open/close only. Safe to leave as-is.
     ====================================================================== */

  function init() {
    if (!PORTFOLIO_DATA.config.showTestRunner) return;

    const toggle = DOM.qs("[data-runner-toggle]");
    const panel = DOM.qs("[data-runner-panel]");
    if (!toggle || !panel) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
      toggle.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");

      // The attention pulse has served its purpose once they have opened it.
      const root = DOM.qs("[data-runner-root]");
      if (root) root.classList.add("is-seen");
    });

    const closeBtn = DOM.qs("[data-runner-close]");
    if (closeBtn) closeBtn.addEventListener("click", function () {
      setOpen(false);
      toggle.focus();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (!panel.hidden && !panel.contains(e.target) && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });

    // Buttons are connected to the stubs above — they log and do nothing else.
    const runBtn = DOM.qs("[data-runner-run]");
    if (runBtn) runBtn.addEventListener("click", runTests);

    const reportBtn = DOM.qs("[data-runner-report]");
    if (reportBtn) reportBtn.addEventListener("click", function () {
      const url = PORTFOLIO_DATA.testRunner.reportUrl;
      if (DOM.isPlaceholder(url)) {
        console.info("[test-runner] No report URL configured yet.");
        return;
      }
      window.open(url, "_blank", "noopener");
    });

    loadLastRun();
  }

  return { buttonHtml: buttonHtml, init: init, runTests: runTests, loadLastRun: loadLastRun };
})();
