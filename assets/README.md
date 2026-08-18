# Assets — what to drop here

Everything in this folder is either already done, or waiting on a file from you.
Nothing here is required for the site to work — every slot has a working fallback.

---

## 1. Your CV  →  `assets/cv/Aleksandar-Djokic-CV.pdf`

**Status: MISSING — you need to add this.**

Save your CV PDF at exactly this path and filename:

```
assets/cv/Aleksandar-Djokic-CV.pdf
```

The "Download CV" buttons in the hero and the contact section are already
built and pointing at it. If you want a different filename, change
`contact.cvPath` and `contact.cvFileName` in `js/data/portfolio-data.js`.

---

## 2. Project artwork  →  `assets/projects/`

**Status: abstract placeholders in place, real artwork optional.**

Three original abstract SVGs ship with the site and are used automatically:

| File | Used for |
| --- | --- |
| `placeholder-riders-republic.svg` | Riders Republic |
| `placeholder-ac-mirage.svg` | Assassin's Creed Mirage |
| `placeholder-unannounced.svg` | Unannounced AAA Project |

To use real artwork instead, drop the image in this folder using these names:

```
assets/projects/riders-republic.jpg
assets/projects/ac-mirage.jpg
```

They are already referenced in `js/data/portfolio-data.js`. If the file is
absent the site silently falls back to the placeholder — it never shows a
broken image.

**Recommended:** 1600×1000px, JPG, under 250 KB each.

### Before you use official game artwork

Promotional screenshots and key art are Ubisoft's copyright. Using them on a
personal portfolio is common and usually tolerated, but it is not
automatically yours to publish. Safest options, roughly in order:

1. Check whether Ubisoft has a press kit with terms that permit portfolio use.
2. Use your own captured screenshots from the retail game, credited to Ubisoft.
3. Keep the abstract placeholders — they look deliberate, not unfinished.

**Do not add artwork for the Unannounced AAA Project.** The redacted
placeholder is the correct visual, and it is deliberately the only option.

---

## 3. Social preview image  →  `assets/og-image.png`

**Status: MISSING — optional but worth doing.**

This is the image that appears when someone pastes your site link into
LinkedIn, Slack or a message. Without it, the link preview is plain text.

- Size: **1200 × 630 px**, PNG
- Content: your name, "Senior QA Engineer", and something visual
- Keep text well inside the edges — platforms crop differently

---

## 4. Apple touch icon  →  `assets/apple-touch-icon.png`

**Status: MISSING — low priority.**

180 × 180 px PNG, used when someone saves the site to a phone home screen.
The SVG favicon (`assets/favicon.svg`) is already done and covers browsers.

---

## Summary

| Asset | Path | Needed? |
| --- | --- | --- |
| CV PDF | `assets/cv/Aleksandar-Djokic-CV.pdf` | **Yes** |
| Riders Republic art | `assets/projects/riders-republic.jpg` | Optional |
| AC Mirage art | `assets/projects/ac-mirage.jpg` | Optional |
| Unannounced art | — | **No — leave redacted** |
| OG image | `assets/og-image.png` | Recommended |
| Apple touch icon | `assets/apple-touch-icon.png` | Optional |
| Favicon | `assets/favicon.svg` | Done |
