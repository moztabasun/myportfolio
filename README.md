<div align="center">

# Md Moztaba Rafid — Portfolio

**Personal portfolio of an Electrical & Electronic Engineering student building embedded systems and small robots.**

[![Live Site](https://img.shields.io/badge/Live_Site-moztabasun.github.io-22d3ee?style=for-the-badge&logo=githubpages&logoColor=white)](https://moztabasun.github.io/myportfolio/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#tech-stack)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#tech-stack)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#tech-stack)

[Live Site](https://moztabasun.github.io/myportfolio/) · [LinkedIn](https://www.linkedin.com/in/moztabarafid) · [GitHub](https://github.com/moztabasun) · [Email](mailto:moztabarafid@gmail.com)

</div>

---

## About

This is the source of my personal portfolio website. I'm a second-year **Electrical and Electronic Engineering** student at the **University of Asia Pacific (UAP)**, Dhaka, focused on embedded systems and robotics.

The site covers my background, experience, projects, skills, certifications and education. It is built with plain HTML, CSS and JavaScript — no framework, no build step — and served statically from GitHub Pages.

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [Customization](#customization)
- [Accessibility](#accessibility)
- [Contact](#contact)

## Features

**Design**

- Dark and light themes with the choice remembered in `localStorage`
- Glassmorphism navbar and card surfaces over a layered gradient background
- Sora and JetBrains Mono typefaces, fluid spacing and a mobile-first layout
- Scroll progress bar and active-section highlighting in the navbar

**Interaction**

- Animated scroll reveals with per-group stagger
- Subtle pointer-driven 3D tilt and glow on project cards
- Accessible mobile menu with Escape-to-close and scroll locking
- Copy-email button with a toast confirmation

**Accessibility & polish**

- Semantic landmarks, skip link and visible focus states
- `prefers-reduced-motion` support across all animations
- Theme applied before first paint to prevent a flash of the wrong theme
- Print stylesheet and responsive layout down to small phones

## Tech stack

| Layer | Technology |
| --- | --- |
| Markup | HTML5, semantic sections, JSON-LD person schema |
| Styling | CSS3, custom properties, Grid and Flexbox, media queries |
| Behavior | Vanilla JavaScript (ES6), IntersectionObserver, Clipboard API |
| Type | Google Fonts — Sora, JetBrains Mono |
| Hosting | GitHub Pages |

No dependencies to install and nothing to compile.

## Project structure

```text
my portfolio/
├── index.html          # Page markup, metadata and content
├── css/
│   └── style.css       # Theme tokens, layout, components, responsive rules
├── js/
│   └── main.js         # Theme toggle, nav, mobile menu, reveals, tilt, copy
├── images/
│   └── sun.jpeg        # Profile photo
└── README.md
```

## Getting started

### Preview locally

Open `index.html` directly in a browser, or serve the folder locally:

```sh
python -m http.server 8000
```

Then visit <http://localhost:8000>.

Any static server works equally well:

```sh
npx serve .
```

## Deployment

1. Push the folder to the `main` branch of the repository.
2. In the repository settings, open **Pages**.
3. Set the source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Save and wait for the build to finish.

The site is served at <https://moztabasun.github.io/myportfolio/>.

## Customization

- **Content** lives in `index.html`. Each section is a plain `<section>` element whose `id` matches its navbar link.
- **Colors and glass values** are CSS custom properties at the top of `css/style.css` — `:root` for the dark theme, `[data-theme="light"]` for the light theme.
- **Theme initialization** happens in the inline script in `index.html`, before first paint, so the correct theme is applied without a flash.
- **Reveal animations** come from the `reveal` class. Elements with it start hidden until they scroll into view, so leave it off anything that must always be visible.
- **Metadata** — title, description, Open Graph tags, canonical URL and JSON-LD — sits in the `<head>` of `index.html` and should be updated if the site moves.

## Accessibility

The site targets WCAG 2.1 AA where practical: contrast-checked text, keyboard-reachable controls, descriptive labels, a skip link, and motion that respects the user's system preference.

## Contact

- Email: [moztabarafid@gmail.com](mailto:moztabarafid@gmail.com)
- LinkedIn: [linkedin.com/in/moztabarafid](https://www.linkedin.com/in/moztabarafid)
- GitHub: [github.com/moztabasun](https://github.com/moztabasun)
- Location: Dhaka, Bangladesh

---

<div align="center">

<sub>Designed and maintained by <a href="https://github.com/moztabasun">Md Moztaba Rafid</a></sub>

</div>
