/* ==========================================================================
   contact-form.js — Client-side validation and submission handling.
   --------------------------------------------------------------------------
   IMPORTANT, AND DELIBERATE:
   The form does NOT send anything anywhere. There is no backend, and the UI
   never claims a message was delivered. Validation, loading and error states
   are all real; the send step is a single isolated function you replace.

   >>> TO CONNECT A REAL BACKEND, EDIT ONLY `sendMessage()` BELOW. <<<
   Everything above and below it can stay exactly as it is.
   ========================================================================== */

const ContactForm = (function () {

  /* ======================================================================
     THE ONE FUNCTION YOU REPLACE
     ======================================================================
     It receives a plain object: { name, email, company, subject, message }
     It must return a Promise. Resolve on success, reject with an Error on
     failure — the UI handles both states for you.

     ---------------------------------------------------------------------
     OPTION A — Formspree (easiest; no code to host)
     ---------------------------------------------------------------------
       1. Create a free form at https://formspree.io and copy its endpoint.
       2. Replace the body of this function with:

          return fetch("https://formspree.io/f/YOUR_FORM_ID", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload)
          }).then(function (res) {
            if (!res.ok) throw new Error("Send failed");
          });

     ---------------------------------------------------------------------
     OPTION B — EmailJS (sends from the browser via your email account)
     ---------------------------------------------------------------------
       Add the EmailJS SDK in index.html, then call emailjs.send(...) here.

     ---------------------------------------------------------------------
     OPTION C — Your own serverless function (Vercel / Netlify / Worker)
     ---------------------------------------------------------------------
       POST the payload to your endpoint. This is the option that pairs
       naturally with the Test Runner proxy, if you build one.

     ---------------------------------------------------------------------
     OPTION D — Remove the form entirely
     ---------------------------------------------------------------------
       Set contact.form.enabled = false in js/data/portfolio-data.js.
       Email alone is a perfectly good contact route for a portfolio.
     ====================================================================== */
     
  function sendMessage(payload) {
    return fetch("https://formspree.io/f/mwlealbb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error("Send failed");
    });
  }

  /* ====================================================================== */

  const RULES = {
    name: function (v) {
      if (!v.trim()) return "Please enter your name.";
      if (v.trim().length < 2) return "That name looks too short.";
      return "";
    },
    email: function (v) {
      if (!v.trim()) return "Please enter your email address.";
      // Deliberately permissive — strict email regexes reject valid addresses.
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) {
        return "That doesn't look like a valid email address.";
      }
      return "";
    },
    company: function () { return ""; },
    subject: function (v) {
      if (!v.trim()) return "Please add a subject.";
      if (v.trim().length < 3) return "Please add a little more detail.";
      return "";
    },
    message: function (v) {
      if (!v.trim()) return "Please write a message.";
      if (v.trim().length < 12) return "Please write at least a sentence or two.";
      return "";
    },
  };

  function init() {
    const form = DOM.qs("[data-contact-form]");
    if (!form) return;

    const statusEl = DOM.qs("[data-form-status]", form);
    const submitBtn = DOM.qs("[data-form-submit]", form);

    /* --- Per-field validation ---------------------------------------- */

    function validateField(input) {
      const rule = RULES[input.name];
      if (!rule) return true;

      const error = rule(input.value);
      const wrap = input.closest(".field");
      const errorEl = DOM.qs("[data-field-error]", wrap);

      if (error) {
        wrap.classList.add("has-error");
        input.setAttribute("aria-invalid", "true");
        errorEl.textContent = error;
        return false;
      }

      wrap.classList.remove("has-error");
      input.removeAttribute("aria-invalid");
      errorEl.textContent = "";
      return true;
    }

    const inputs = DOM.qsa(".field__input", form);

    inputs.forEach(function (input) {
      // Validate on blur, then live-correct once the field has been touched
      input.addEventListener("blur", function () { validateField(input); });
      input.addEventListener("input", function () {
        if (input.closest(".field").classList.contains("has-error")) {
          validateField(input);
        }
      });
    });

    /* --- Submit ------------------------------------------------------- */

    function setStatus(message, kind) {
      statusEl.textContent = message;
      statusEl.className = "contact-form__status" + (kind ? " is-" + kind : "");
    }

    function setLoading(on) {
      submitBtn.disabled = on;
      submitBtn.classList.toggle("is-loading", on);
      DOM.qs(".btn__label", submitBtn).textContent = on ? "Sending…" : "Send message";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setStatus("", null);

      // Validate everything; focus the first problem for keyboard users
      let firstBad = null;
      inputs.forEach(function (input) {
        const ok = validateField(input);
        if (!ok && !firstBad) firstBad = input;
      });

      if (firstBad) {
        setStatus("Please fix the highlighted fields.", "error");
        firstBad.focus();
        return;
      }

      const payload = {};
      inputs.forEach(function (input) { payload[input.name] = input.value.trim(); });

      setLoading(true);

      sendMessage(payload)
        .then(function () {
          setLoading(false);
          form.reset();
          setStatus("Thanks — your message has been sent. I'll get back to you soon.", "success");
        })
        .catch(function (err) {
          setLoading(false);

          if (err && err.message === "NOT_CONFIGURED") {
            // Honest failure. We do not pretend a message was delivered.
            const email = PORTFOLIO_DATA.contact.email;
            setStatus(
              "This form isn't connected to a mail service yet, so nothing was sent. " +
                "Please email me directly at " + email + ".",
              "warn"
            );
            return;
          }

          setStatus(
            "Something went wrong sending that. Please email me directly at " +
              PORTFOLIO_DATA.contact.email + ".",
            "error"
          );
        });
    });
  }

  return { init: init, sendMessage: sendMessage };
})();
