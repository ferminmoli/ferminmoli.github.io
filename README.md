# ferminmoli.github.io

Personal portfolio of Fermín Ariel Molinuevo, published with GitHub Pages at
<https://ferminmoli.github.io/>.

Plain static files: no framework, no package manager, no build step.

```
index.html          English page (main)
es/index.html       Spanish page
styles.css          All styles
script.js           Marks the section being read in the nav (optional; the site works without JS)
404.html            Not-found page
assets/             Favicon, social images, portrait, MOZIC screenshot, music covers
assets/tech.svg     Tech logos for the chips (Simple Icons, CC0)
assets/fonts/       Bricolage Grotesque (variable, self-hosted, SIL OFL; see OFL.txt)
sitemap.xml         Both language URLs with hreflang
robots.txt
.nojekyll           Serve files as-is (skip Jekyll)
```

`PRODUCT.md`, `DESIGN.md` and `.impeccable/` are local design notes for the
Impeccable skill. They are listed in `.gitignore` so GitHub Pages never
publishes them.

## Editing content

- Text lives directly in `index.html` (English) and `es/index.html` (Spanish).
  Keep both pages in sync when you change content.
- Page titles, descriptions and social metadata are in each page's `<head>`.
- Colours, type scale and spacing are CSS variables at the top of `styles.css`.
- Icons are small SVG symbols defined at the top of each page's `<body>`.
- To add music links or covers, put the images in `assets/` and add them to the
  music section in both pages. Use real, official links only.
- If you change the social cards, replace `assets/og.png` and `assets/og-es.png`
  (1200×630).
- When content changes meaningfully, update `<lastmod>` in `sitemap.xml`.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/> and <http://localhost:8000/es/>.

## Publish changes

GitHub Pages deploys the `main` branch from the repository root:

```bash
git add -A
git commit -m "Update portfolio content"
git push origin main
```

The site updates about a minute after the push. Deployment status is visible
under the repository's **Actions** tab.
