/* ==========================================================================
   contact.js — Contact details and the enquiry form.
   The form's submit behaviour lives entirely in js/lib/contact-form.js so
   that connecting a real backend later touches exactly one file.
   ========================================================================== */

const Contact = (function () {

  function fieldHtml(f) {
    const control =
      f.type === "textarea"
        ? `<textarea class="field__input"
                     id="cf-${f.name}"
                     name="${f.name}"
                     rows="5"
                     ${f.required ? "required" : ""}
                     aria-describedby="cf-${f.name}-error"
                     placeholder="${DOM.esc(f.placeholder)}"></textarea>`
        : `<input class="field__input"
                  id="cf-${f.name}"
                  name="${f.name}"
                  type="${f.type}"
                  ${f.required ? "required" : ""}
                  autocomplete="${f.autocomplete || "off"}"
                  aria-describedby="cf-${f.name}-error"
                  placeholder="${DOM.esc(f.placeholder)}" />`;

    return `
      <div class="field${f.wide ? " field--wide" : ""}">
        <label class="field__label" for="cf-${f.name}">
          ${DOM.esc(f.label)}
          ${f.required
            ? `<span class="field__req" aria-hidden="true">*</span><span class="visually-hidden">(required)</span>`
            : `<span class="field__opt">optional</span>`}
        </label>
        ${control}
        <p class="field__error" id="cf-${f.name}-error" data-field-error></p>
      </div>`;
  }

  const FIELDS = [
    { name: "name",    label: "Name",    type: "text",  required: true,  placeholder: "Your name",              autocomplete: "name" },
    { name: "email",   label: "Email",   type: "email", required: true,  placeholder: "you@company.com",        autocomplete: "email" },
    { name: "company", label: "Company", type: "text",  required: false, placeholder: "Studio or company",      autocomplete: "organization" },
    { name: "subject", label: "Subject", type: "text",  required: true,  placeholder: "Role, project or enquiry" },
    { name: "message", label: "Message", type: "textarea", required: true, placeholder: "A few lines about the role or what you need.", wide: true },
  ];

  function render() {
    const c = PORTFOLIO_DATA.contact;
    const cfg = PORTFOLIO_DATA.config;

    const hasLinkedIn = !DOM.isPlaceholder(c.linkedin);
    const hasGithub = !DOM.isPlaceholder(c.github);
    const hasCv = !DOM.isPlaceholder(c.cvPath);

    const html = `
      <div class="wrap">
        ${DOM.sectionHead({ id: "contact", eyebrow: c.eyebrow, heading: c.heading, intro: c.intro })}

        <div class="contact">

          <!-- Details -->
          <div class="contact__details" data-reveal>
            <ul class="contact__list">
              <li>
                <a class="contact-item chamfer-sm" href="mailto:${DOM.esc(c.email)}" data-testid="contact-email">
                  <span class="contact-item__icon" aria-hidden="true">${ICONS.get("mail", { size: 19 })}</span>
                  <span class="contact-item__body">
                    <span class="contact-item__label">Email</span>
                    <span class="contact-item__value">${DOM.esc(c.email)}</span>
                  </span>
                  <span class="contact-item__arrow" aria-hidden="true">${ICONS.get("arrowRight", { size: 16 })}</span>
                </a>
              </li>

              ${hasLinkedIn ? `
              <li>
                <a class="contact-item chamfer-sm" href="${DOM.esc(c.linkedin)}" target="_blank" rel="noopener noreferrer">
                  <span class="contact-item__icon" aria-hidden="true">${ICONS.get("linkedin", { size: 19 })}</span>
                  <span class="contact-item__body">
                    <span class="contact-item__label">LinkedIn</span>
                    <span class="contact-item__value">View profile</span>
                  </span>
                  <span class="contact-item__arrow" aria-hidden="true">${ICONS.get("external", { size: 16 })}</span>
                </a>
              </li>` : ""}

              ${hasGithub ? `
              <li>
                <a class="contact-item chamfer-sm" href="${DOM.esc(c.github)}" target="_blank" rel="noopener noreferrer">
                  <span class="contact-item__icon" aria-hidden="true">${ICONS.get("github", { size: 19 })}</span>
                  <span class="contact-item__body">
                    <span class="contact-item__label">GitHub</span>
                    <span class="contact-item__value">View profile</span>
                  </span>
                  <span class="contact-item__arrow" aria-hidden="true">${ICONS.get("external", { size: 16 })}</span>
                </a>
              </li>` : ""}

              ${cfg.showPhone ? `
              <li>
                <a class="contact-item chamfer-sm" href="tel:${DOM.esc(c.phone.replace(/\s/g, ""))}">
                  <span class="contact-item__icon" aria-hidden="true">${ICONS.get("phone", { size: 19 })}</span>
                  <span class="contact-item__body">
                    <span class="contact-item__label">Phone</span>
                    <span class="contact-item__value">${DOM.esc(c.phone)}</span>
                  </span>
                  <span class="contact-item__arrow" aria-hidden="true">${ICONS.get("arrowRight", { size: 16 })}</span>
                </a>
              </li>` : ""}

              <li>
                <div class="contact-item contact-item--static chamfer-sm">
                  <span class="contact-item__icon" aria-hidden="true">${ICONS.get("pin", { size: 19 })}</span>
                  <span class="contact-item__body">
                    <span class="contact-item__label">Location</span>
                    <span class="contact-item__value">${DOM.esc(c.location)}</span>
                  </span>
                </div>
              </li>
            </ul>

            ${hasCv ? `
              <a class="btn btn--primary btn--block"
                 href="${DOM.esc(c.cvPath)}"
                 download="${DOM.esc(c.cvFileName)}">
                ${ICONS.get("download", { size: 18 })}<span>Download CV (PDF)</span>
              </a>` : ""}
          </div>

          <!-- Form -->
          ${c.form.enabled ? `
          <div class="contact__form-wrap" data-reveal>
            <form class="contact-form chamfer" novalidate data-contact-form>
              <p class="contact-form__title">Send a message</p>

              <div class="contact-form__grid">
                ${FIELDS.map(fieldHtml).join("")}
              </div>

              <div class="contact-form__foot">
                <button class="btn btn--primary" type="submit" data-form-submit>
                  <span class="btn__spinner" aria-hidden="true"></span>
                  <span class="btn__label">Send message</span>
                </button>
                ${!DOM.isPlaceholder(c.form.note) ? `<p class="contact-form__note">${DOM.esc(c.form.note)}</p>` : ""}
              </div>

              <!-- Announced to screen readers on submit -->
              <p class="contact-form__status" role="status" aria-live="polite" data-form-status></p>
            </form>
          </div>` : ""}

        </div>
      </div>
    `;

    DOM.mount("contact", html);
  }

  return { render: render, FIELDS: FIELDS };
})();
