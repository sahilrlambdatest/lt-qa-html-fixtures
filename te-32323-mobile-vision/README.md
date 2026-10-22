# TE-32323 — mobile browser vision-click lab

Android mobile-browser vision clicks landed ~one form row below the target (the screenshot included the
status bar + address bar). This lab puts look-alike targets one row apart so an offset hits a *different,
nameable* element, and records every hit:

- `window.__qa.last` — `data-qa` of the last element hit (`NONE` = missed every target)
- `window.__qa.log` — every hit with tap point and target rect (CSS px)
- `window.__qa.values` — values typed / chosen per field
- `document.title` — `LAST=<id>`

Pages: `index.html` (main lab), `details.html` (opened in a new tab), `desktop.html` (no viewport meta).
