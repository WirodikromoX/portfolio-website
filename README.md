# Portfolio Site — Xiomara Wirodikromo

Built with plain HTML, CSS, and JavaScript (no frameworks, no build step).

## What's still a placeholder
- Three of the four project cards on `work.html` (`[Project name]`) — the
  Cuddly's Crochet Creations dashboard is real and linked to GitHub; add more
  coursework or personal projects as you build them.
- No LinkedIn or Instagram/Etsy links — Xiomara doesn't have either yet, so
  those were left out entirely rather than pointing nowhere. Add them back
  into the footer `<ul class="footer-links">` on each page, the "Direct
  contact" list in `contact.html`, and the shop-link line in the Cuddly's
  Crochet Creations section of `about.html` if that changes.
- Home address: the CV's exact street address was intentionally left off the
  public contact page — only city-level location is shown.
- **The contact form is now connected to Formspree** — see "Contact form"
  below for how to check it's working.

## Structure
```
index.html          → Home page (intro, roles, current focus, projects, skills)
about.html           → About page (background, hobbies, Cuddly's, education)
work.html            → Work page (project grid)
contact.html         → Contact page (details + contact form)

css/
  main.css           → design tokens + shared components (nav, footer, buttons,
                        branch line) + home-page-specific styles
  about.css           → about.html-only styles
  work.css            → work.html-only styles
  contact.css         → contact.html-only styles

img/
  logo.png            → site mark, used in the nav on every page
  profile.jpg          → About page portrait
  cuddlys-logo.png      → Cuddly's Crochet Creations logo (About page)
  projects/
    project-1.jpg       → real screenshot of the Cuddly's dashboard
    project-2.jpg … project-4.jpg   → placeholder screenshots, swap when ready
    project-5.jpg        → generic "this portfolio" thumbnail

js/
  main.js             → shared behavior on every page: nav toggle, active-link
                         highlighting, scroll reveal, footer year
  about.js            → optional, currently an empty extension point
  contact.js          → form validation + submission for contact.html
  work.js             → optional, click-a-tag-to-filter on work.html
```

All internal links and asset references use relative paths (e.g.
`href="./contact.html"`, `src="./img/logo.png"`), so the whole folder can be
moved, renamed, or dropped into any static host without breaking anything.

## Quick start
Open any `.html` file in a browser to preview — no server, no build step needed.

## The design
The visual theme is "version control": a dotted branch line (`.branch` /
`.branch-node` in `main.css`) threads through each page like a git commit
graph, and the nav/labels use a monospace face while headings use a warm
serif. Colors and fonts are CSS custom properties at the top of `main.css`
under `:root` — change those to restyle the whole site at once.

## Contact form
The form validates client-side (required fields, email format) and submits
via [Formspree](https://formspree.io), endpoint `xqerjnkv` — it's live and
will deliver messages to whichever email created that Formspree form.

**First-time check:** the very first real submission triggers a one-time
confirmation email from Formspree — click the link in it to activate the
form. Until that's confirmed, submissions won't actually arrive even though
the site-side request succeeds.

If you ever need to swap to a different Formspree form (or a different
service entirely), update the endpoint in two places:
- `contact.html` → the `<form action="...">` attribute
- `js/contact.js` → the `FORM_ENDPOINT` constant near the top

## Deploying
This is a static site (no build step), so it deploys as-is to Cloudflare
Pages, Netlify, GitHub Pages, or any static host — just point the host at
this folder. Note that **Cloudflare Pages has no built-in form handling**
(unlike Netlify Forms), which is exactly why the form uses Formspree instead
of relying on the host.

## Responsiveness
Layout breakpoints are at 860px, 720px (nav collapses to a hamburger), and
480px. Test with your browser's device toolbar, or just resize the window.
