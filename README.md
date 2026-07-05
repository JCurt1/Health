# The Nutrient Index

A flip-card reference for what nutrients actually do, where to get them, and how much you need a day. Built for GitHub Pages — no build step, no dependencies beyond Google Fonts.

## Files

- `index.html` — page structure and meta tags
- `styles.css` — all styling
- `data.js` — the nutrient data (`CATS` and `NUTRIENTS` arrays) plus the `slugify` helper
- `app.js` — rendering, filtering, search, card-flip, and deep-link logic

## Adding or editing a nutrient

Everything content-related lives in `data.js`. Each entry looks like:

```js
{
  name: 'Nutrient Name', cat: 'macro' | 'fiber' | 'vit' | 'min',
  preview: 'One line shown on the front of the card.',
  func: 'Longer explanation of what it does in the body.',
  sources: 'Comma-separated good food sources.',
  rda: 'General adult daily target.',
  deficiency: 'Short list of signs of low intake.',
  pairs: ['Other Nutrient Name']  // must exactly match another entry's `name`
}
```

Add a new object to the `NUTRIENTS` array and it'll show up automatically — no changes needed elsewhere, including its catalog code (e.g. `V-04`), which is assigned automatically based on order within its category. To add a new category, add a key to `CATS` with a `label`, `color`, `soft` (a translucent version of the color, used as the card-back background), and a one-letter `code`.

`pairs` powers the "Works with" chips on the back of each card — clicking one jumps to that nutrient. Entries must match another nutrient's `name` field exactly (case-sensitive) or the chip will silently fail to navigate.

## Deep links

Every card has a URL slug based on its name, e.g. Vitamin D → `#vitamin-d`. Linking to `index.html#vitamin-d` opens the page with that card already flipped open and scrolled into view.

## Running locally

No build step — just open `index.html` in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000
```

## Deploying

Already set up for GitHub Pages: push these files to a repo (with `index.html` at the root or in `/docs`) and turn on Pages in the repo settings.
