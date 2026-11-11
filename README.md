# ferminmoli.github.io

Personal portfolio of Fermín Ariel Molinuevo, published with GitHub Pages at
<https://ferminmoli.github.io/>.

Plain static files: no framework, no package manager, no build step.

```
index.html          English page (main)
es/index.html       Spanish page
styles.css          All styles (light and dark themes)
404.html            Not-found page
assets/             Favicon, social images, MOZIC screenshots
sitemap.xml         Both language URLs with hreflang
robots.txt
.nojekyll           Serve files as-is (skip Jekyll)
```

## Editing content

- Text lives directly in `index.html` (English) and `es/index.html` (Spanish).
  Keep both pages in sync when you change content.
- Page titles, descriptions and social metadata are in each page's `<head>`.
- Colours, fonts and spacing are CSS variables at the top of `styles.css`.
- If you change the social cards, replace `assets/og.png` and `assets/og-es.png`
  (1200×630).
- When content changes meaningfully, update `<lastmod>` in `sitemap.xml`.

## Preview locally

Pages use root-relative paths (`/styles.css`), so serve the folder instead of
opening the file directly:

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
