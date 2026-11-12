# Moztaba Rafid — Portfolio

Personal portfolio of Md Moztaba Rafid, an Electrical & Electronic Engineering
student at the University of Asia Pacific (UAP), Dhaka.

Live site: <https://moztabasun.github.io/myportfolio/>

## What's here

- `index.html` — page markup and content
- `css/style.css` — layout, theme tokens, glass surfaces, responsive rules
- `js/main.js` — theme toggle, nav state, mobile menu, reveals, project tilt
- `images/sun.jpeg` — profile photo

No framework, no build step. Plain HTML, CSS and JavaScript, served statically.

## Features

- Dark and light themes, remembered in `localStorage`
- Glass navbar and card surfaces
- Scroll progress bar and active-section highlighting
- Responsive layout down to small phones
- Reduced-motion and print styles
- Copy-email button with a toast confirmation

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```sh
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Deploying to GitHub Pages

1. Push the folder to the `main` branch of the repository.
2. In the repository settings, open **Pages**.
3. Set the source to **Deploy from a branch**, branch `main`, folder `/ (root)`.

The site is served at `https://moztabasun.github.io/myportfolio/`.

## Editing notes

- Content lives in `index.html`; sections are plain `<section>` blocks with IDs
  that match the navbar links.
- Colors and glass values are CSS custom properties at the top of
  `css/style.css` (`:root` for dark, `[data-theme="light"]` for light).
- The theme is set before first paint by the inline script in `index.html` to
  avoid a flash of the wrong theme.
- Keep the `reveal` class off elements you always want visible; elements with
  it start hidden until they scroll into view.
