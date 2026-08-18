# tests/

**Intentionally empty.**

This folder is reserved for the Playwright test suite that you and Claude are
going to write together — from a blank file, line by line. Nothing has been
generated here on your behalf.

When we start, this is roughly where things will end up:

```
tests/
├── pages/          Page Object Models (one per section of the site)
├── fixtures/       Custom Playwright fixtures
└── *.spec.ts       The actual tests
```

## Useful to know before we begin

The site markup already includes `data-testid` attributes on the elements a
test suite would most naturally target — the header, hero name and role, the
CTA buttons, the hero stats, each project card, the ISTQB card, the email
link and each nav item. They are there so your first selectors are stable
ones rather than brittle CSS paths, but you are free to ignore them and
select however you prefer.

You can find them all with:

```bash
grep -rn "data-testid" js/ index.html
```
