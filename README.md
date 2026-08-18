# Aleksandar Djokic — Senior QA Engineer Portfolio

A single-page portfolio site built with plain HTML, CSS and JavaScript.
No build step, no framework, no dependencies.

---

## Quick start

There is nothing to install and nothing to compile.

**Option 1 — just open it.** Double-click `index.html`. It works, because the
site uses classic scripts rather than ES modules.

**Option 2 — run a local server** (recommended; matches how it behaves once
deployed, and is what Playwright will point at later):

```bash
# Python (already on most machines)
python3 -m http.server 8000

# or Node
npx serve .

# or VS Code: install "Live Server", right-click index.html → Open with Live Server
```

Then visit <http://localhost:8000>.

**Production build command: there isn't one.** What is in this folder is what
gets deployed, byte for byte. That is deliberate — it keeps the site editable
by you rather than by a toolchain.

---

## Project structure

```
qa-portfolio/
├── index.html                  Page shell, <head> metadata, script order
│
├── css/
│   ├── tokens.css              ← colours, fonts, spacing. Change the look here.
│   ├── base.css                Reset, typography, page background, a11y helpers
│   ├── components.css          Buttons, tags, header/nav, forms, panels
│   ├── sections.css            Layout for each section of the page
│   └── responsive.css          All breakpoints, largest → smallest, plus print
│
├── js/
│   ├── data/
│   │   └── portfolio-data.js   ← ALL YOUR CONTENT. This is the file you edit.
│   │
│   ├── lib/
│   │   ├── dom.js              Tiny helpers (escaping, mounting, placeholders)
│   │   ├── icons.js            Inline SVG icon set
│   │   ├── scroll-spy.js       Active-nav tracking (IntersectionObserver)
│   │   ├── reveal.js           Scroll-into-view animation
│   │   └── contact-form.js     Validation + the isolated send handler
│   │
│   ├── components/             One file per section, each renders from the data
│   │   ├── navigation.js       Sticky header, mobile drawer
│   │   ├── hero.js             Hero + coverage panel
│   │   ├── about.js            About copy + profile card
│   │   ├── experience.js       Role card + six ownership tabs
│   │   ├── projects.js         Project showcase cards
│   │   ├── skills.js           Skill groups, tools, platforms
│   │   ├── journey.js          Career progression rail
│   │   ├── credentials.js      ISTQB card + education + languages
│   │   ├── contact.js          Contact details + form markup
│   │   ├── footer.js           Footer
│   │   └── test-runner.js      UI shell only — NOT wired up (see below)
│   │
│   └── main.js                 Bootstrap: render everything, then init behaviour
│
├── assets/
│   ├── favicon.svg             Done
│   ├── cv/                     ← put your CV PDF here
│   ├── projects/               Placeholder artwork + where real art goes
│   └── README.md               Full asset checklist
│
├── tests/                      EMPTY — reserved for the Playwright work
├── .github/workflows/          EMPTY — reserved for the GitHub Actions work
├── .gitignore
└── README.md                   This file
```

---

## Where everything lives

Almost every change you will want to make is in **one file**:
`js/data/portfolio-data.js`.

| What you want to change | Where |
| --- | --- |
| **Project descriptions** | `projects.items[].description` in `js/data/portfolio-data.js` |
| **Project images** | `projects.items[].image` → file goes in `assets/projects/` |
| **Contact / social links** | `contact` object in `js/data/portfolio-data.js` |
| **Hero copy, name, title, stats** | `profile` object |
| **About copy** | `about.paragraphs` and `about.card` |
| **Experience bullets** | `experience.areas[].points` |
| **Skills** | `skills.groups`, `skills.tools`, `skills.platforms` |
| **Career milestones** | `journey.milestones` |
| **Certification / education** | `credentials` |
| **Navigation items & order** | `nav` array (drives both the header and the scroll-spy) |
| **Show/hide phone, Test Runner** | `config` object |
| **Page title & meta description** | `meta` object (and `index.html` for the raw tags) |
| **Colours, fonts, spacing** | `css/tokens.css` |

You should not need to touch the component files to change content. If you find
yourself editing JSX-style markup to change a word, something is in the wrong
place — move it into the data file.

---

## Things you still need to provide

| # | Item | Where it goes | Priority |
| --- | --- | --- | --- |
| 1 | **Your CV PDF** | `assets/cv/Aleksandar-Djokic-CV.pdf` | **Required** — the Download CV buttons point here and will 404 until it exists |
| 2 | **LinkedIn URL** | `contact.linkedin` | **Required** — currently `[YOUR_LINKEDIN_URL]`, so the link is hidden rather than broken |
| 3 | **Three project descriptions** | `projects.items[].description` | **Required** — currently marked placeholders, visibly outlined on the page |
| 4 | Live site URL | `meta.siteUrl` + the `<link rel="canonical">` and `og:url` tags in `index.html` | High |
| 5 | Social preview image | `assets/og-image.png` (1200×630) | Recommended |
| 6 | ISTQB year / credential ID | `credentials.certification.year` and `.credentialId` | Optional |
| 7 | Education years & location | `credentials.education[0]` and `journey.milestones` | Optional |
| 8 | Real project artwork | `assets/projects/riders-republic.jpg`, `ac-mirage.jpg` | Optional — placeholders look intentional |
| 9 | Apple touch icon | `assets/apple-touch-icon.png` (180×180) | Optional |

See `assets/README.md` for image sizes and a note on using official game artwork.

---

## Every placeholder, and how to find them

All placeholders follow one convention: **square brackets**. Find them with:

```bash
grep -rn "\[" js/data/portfolio-data.js | grep -v "^\s*//"
```

| Placeholder | File | Effect if left as-is |
| --- | --- | --- |
| `[YOUR_LINKEDIN_URL]` | `contact.linkedin` | LinkedIn link is **hidden** from the site |
| `[YOUR_SITE_URL]` | `meta.siteUrl` | Canonical/OG URL not updated |
| `[Add a short description…]` ×3 | `projects.items[].description` | Shown in a **dashed amber box** so you cannot miss it |
| `[ADD YEAR]` / `[ADD YEARS]` | `journey.milestones`, `credentials` | Shown as a **dashed amber chip** |
| `[ADD CREDENTIAL ID …]` | `credentials.certification.credentialId` | Field is **hidden** |
| `[ADD LOCATION]` | `credentials.education[0].location` | Field is **hidden** |

The site is built so that an unreplaced placeholder either hides the element
entirely or is loudly, deliberately visible. Nothing silently ships wrong.

### Also worth verifying before you publish

- **Per-project platforms.** Your CV lists the four platforms you have worked
  on, but not which ones you covered on which title. I set each project's
  platform list from that game's public release platforms — check they match
  what you personally tested.
- **Per-project QA tags.** Same reasoning. Adjust to what you actually did.
- **`config.availability`** currently reads "Open to Senior QA opportunities".
  Set it to `null` to hide the chip if you would rather not signal that.
- **`config.showPhone`** is `false`. Your number is in the data file but is not
  rendered. Publishing a mobile number attracts scrapers; email is safer.

---

## Deployment

The site is static, so every host works. No build command, no output
directory — publish the repository root.

### GitHub Pages (recommended, and where the Actions work will live)

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Then: **repo → Settings → Pages → Source: "Deploy from a branch" → `main` / `/ (root)` → Save.**

Live in a minute or two at `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

Two notes:

- All paths in this project are **relative** (`css/…`, `js/…`, `assets/…`), so
  the site works from a subdirectory. No `basePath` configuration needed.
- If you use a repo named `YOUR_USERNAME.github.io`, it serves from the root
  domain instead. Either works.

### Netlify

Drag the folder onto <https://app.netlify.com/drop>, or connect the repo with:

- Build command: *(leave empty)*
- Publish directory: `.`

### Vercel

Import the repo. Framework preset: **Other**. Build command: *(empty)*.
Output directory: `.`

---

## The Test Runner

`js/components/test-runner.js` contains the **UI only** — the header button,
the dropdown panel, open/close and keyboard handling. The two functions that
would talk to GitHub, `runTests()` and `loadLastRun()`, are **empty stubs with
comments**. No automation code has been written for you.

The feature is **switched off**:

```js
// js/data/portfolio-data.js
config: {
  showTestRunner: false,   // flip to true once we have built it
}
```

With it off, the button does not render at all — so you can publish the site
today without a dead control on it.

### One thing to think about before we start

A static site **cannot** trigger a GitHub Actions workflow on its own, because
that needs a token, and any token in client-side JavaScript is readable by
every visitor. So "Run Tests" needs one of:

- **A small serverless proxy** (Cloudflare Worker, Vercel or Netlify function)
  that holds the token and calls the GitHub API on the site's behalf. This is
  the impressive version — a visitor really does kick off a run.
- **No live trigger.** The workflow runs on push and on a schedule, and the
  button opens the latest published Playwright HTML report. Free, no secrets,
  nothing to leak, and a recruiter still sees a genuine report.

Both are defensible. We will talk through the trade-off before writing code.

### What is already in place to help

The markup carries `data-testid` attributes on the elements a suite would
naturally target — header, hero name and role, hero stats, the CTA buttons,
each nav link, each project card, the ISTQB card, the email link, the projects
grid. Your first selectors can be stable ones:

```bash
grep -rn "data-testid" js/ index.html
```

Use them or ignore them — your call.

---

## Accessibility

Built to WCAG AA where practical:

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a
  single `h1` with a correct heading order beneath it
- Skip link to main content
- Full keyboard operation, including arrow-key navigation on the experience
  tabs (a real ARIA `tablist`, not styled divs)
- Visible focus ring on every interactive element
- `aria-current` on the active nav item; `aria-live` status on the form
- Form labels tied to inputs, errors announced and linked via
  `aria-describedby`, `aria-invalid` on failing fields
- `prefers-reduced-motion` honoured — all animation is disabled, and the
  scroll-reveal shows content immediately rather than hiding it
- Alt text on all artwork; decorative SVGs marked `aria-hidden`
- Body text meets AA contrast against the dark surfaces

## Performance

- **Zero JavaScript dependencies.** No framework, no icon library, no
  animation library. Total JS is a few tens of KB, unminified and readable.
- Artwork is SVG (a few KB each) rather than bitmap
- Below-the-fold images use `loading="lazy"`; the first is eager
- Animation is limited to `transform` and `opacity`, so it stays on the
  compositor
- Scroll handlers are throttled with `requestAnimationFrame` and registered
  `{ passive: true }`
- No autoplay video, no background media
- Only external request is Google Fonts (three families). To remove it
  entirely, delete the `<link>` tags in `index.html` — `css/tokens.css`
  already declares system-font fallbacks, and the site degrades cleanly.

## Browser support

Chrome, Edge, Firefox and Safari, current versions. Uses
`IntersectionObserver`, CSS custom properties, `clip-path` and `backdrop-filter`
— all broadly supported. There is a `<noscript>` block so a visitor without
JavaScript still gets your name, role and email rather than a blank page.
