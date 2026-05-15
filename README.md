# hellog2n.github.io

Yoojin Jang's academic personal homepage.

Built with [Astro 4](https://astro.build/) + TypeScript + Tailwind CSS + Content
Collections. Static output, deployed to GitHub Pages.

Originally inspired by [Jon Barron's academic website](https://jonbarron.info/);
this iteration is a full rebuild around a content-driven, dark-mode-first
design system.

---

## Local development

Requires Node.js 18.17.1 or later (Node 20 LTS recommended).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to ./dist
npm run preview  # serve ./dist for local check
```

## Project layout

```
hellog2n.github.io/
├── _legacy/                  Original static site (index.html + stylesheet.css), preserved as-is.
├── public/                   Files copied verbatim to the build output.
│   ├── images/               Portraits, paper thumbnails, videos.
│   ├── favicon/              Existing PNG/ICO favicons.
│   ├── favicon.svg           New themed SVG favicon.
│   └── robots.txt
├── src/
│   ├── content/
│   │   ├── config.ts         Zod schemas for `papers` and `profile`.
│   │   ├── papers/           One JSON file per publication (the SSOT).
│   │   ├── profile/          Single `profile.json` (data collection).
│   │   └── microcopy.json    Section headers / CTAs / footer strings.
│   ├── components/           Astro components — Hero, PublicationCard, etc.
│   ├── layouts/              Layout.astro (HTML shell + theme boot script).
│   ├── pages/
│   │   └── index.astro       Home page.
│   └── styles/
│       ├── tokens.css        CSS variables (light + .dark overrides).
│       └── global.css        Tailwind layers + global rules.
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Editing content

### Adding a paper

Create a new JSON file under `src/content/papers/` named `{kebab-case-id}.json`.
The schema is enforced at build time by `src/content/config.ts` — required
fields include `id`, `title`, `authors`, `venue`, `year`. Asset paths begin
with `/images/...` (resolved from `public/`).

The home page sorts papers by `year` descending; within a year, `featured: true`
items come first, and ties break alphabetically by venue.

### Editing the bio / contact / education

All profile content lives in a single file: `src/content/profile/profile.json`.
Adjust `bio_short`, `bio_long`, `research_vision`, `contact.*`, or the
`education` array — the home page re-renders automatically.

### Editing copy strings

Section headers and footer tagline live in `src/content/microcopy.json`.

## Design tokens

CSS variables in `src/styles/tokens.css` are the runtime source of truth for
all colors and shadows. Tailwind class names like `bg-bg-elevated` and
`text-secondary` resolve to these variables, so the same class works in dark
and light mode.

The blue gradient (Hero name, section bars, self-author underline) is defined
once as `--accent-gradient` and exposed as the Tailwind utility
`bg-accent-gradient` plus the `.gradient-text` component class.

## Theme toggle

The theme is stored in `localStorage.theme` (`'dark'` | `'light'`). On every
page load, the inline boot script in `Layout.astro` applies the `.dark` class
to `<html>` *before* the body paints to prevent FOUC. The visible
`ThemeToggle` component toggles the class, persists the choice, and wraps the
transition in a one-shot `.theme-transition` class for a smooth color flip.

System preference (`prefers-color-scheme: dark`) is honored when no explicit
choice has been stored. The brief is dark-first, so dark is also the fallback
default when no preference is available.

## Accessibility & motion

- All interactive elements have visible `:focus-visible` rings.
- The page respects `prefers-reduced-motion: reduce` (motion durations
  collapse to ~0ms; hover lifts and the hover-video reveal are disabled).
- The hover-video reveal on publication cards is also disabled on touch
  devices via `@media (hover: hover)`.

## Deployment (GitHub Pages)

Since this repo is the user/organization site `hellog2n.github.io`, the
`base` is `/` and the build output in `dist/` can be published directly to
the `main` (or `gh-pages`) branch. See Astro's
[GitHub Pages deploy guide](https://docs.astro.build/en/guides/deploy/github/)
for the recommended Actions workflow.

## Credits

- Original inspiration: [Jon Barron](https://jonbarron.info/) — the homepage
  template that started it all.
- Author: Yoojin Jang ([@hellog2n](https://github.com/hellog2n)).
