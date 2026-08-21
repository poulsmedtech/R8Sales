# R8 Sales Group Website

A public marketing website for R8 Sales Group. It is a single-page site meant to be connected to DigitalOcean App Platform from GitHub.

## Local preview

This project uses Node.js 20.

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal, usually `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

The finished files are written to the `dist` folder.

## Project structure

- `src/` — page layout, sections, and styles
- `public/images/` — local photos used on the site
- `public/fonts/` — font licenses for the self-hosted typefaces
- `prompts/` — original build instructions
- `MockUp1.png` — visual reference for the design

“Explore Our Opportunities” and “View All Opportunities” scroll to the programs section. Other buttons such as Learn More, Contact Us, and the founder video open a placeholder message with the matching title. They are ready to be connected later.

The founder video and portrait areas are image-free placeholders until approved assets are ready. Recommended replacement sizes:

- Founder video still or frame: **1600×900** (16:9)
- Founder portrait: about **1200×1600** (3:4)

## Credits and local assets

- Night skyline photograph: [Toronto Skyline at night](https://commons.wikimedia.org/wiki/File:Toronto_Skyline_at_night_-b.jpg) by veggiefrog, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). Cropped and converted for this site.
- Inter and Plus Jakarta Sans are self-hosted. Licenses are in `public/fonts/`.

A production sitemap and absolute social-preview URLs will be added after the live DigitalOcean or custom domain is known. Do not invent that URL in the meantime.

## Repository Safety

This project is its own Git repository. It has its own `.git` folder and its own commit history. It is not part of any nearby parent project.

- The Git root must be `/Users/samanthapouls/Desktop/R8Sales`.
- The expected remote is `https://github.com/poulsmedtech/R8Sales.git`.
- Before committing or pushing, confirm both of these:
  - `git rev-parse --show-toplevel` returns `/Users/samanthapouls/Desktop/R8Sales`
  - `git remote -v` shows the R8Sales GitHub URL above
- Run Git commands for this website from inside the R8Sales folder only.
- Do not stage, commit, or push the parent repository while working on R8Sales.
- Do not force-push or use destructive resets unless the owner explicitly authorizes that.
- Do not commit secrets, credentials, `.env` files, `node_modules`, or the `dist` build folder.

## DigitalOcean App Platform settings

DigitalOcean should connect to the GitHub repository **poulsmedtech/R8Sales**, branch **main**, as a **Static Site**.

Use these values:

- **Resource type:** Static Site
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Run command:** none
- **Node.js:** `20`
- **Environment variables:** none
- **Catch-all / rewrite rules:** none
- **Automatic deploys from `main`:** enabled

### Deployment checklist

1. Confirm the latest commit is visible on GitHub at [poulsmedtech/R8Sales](https://github.com/poulsmedtech/R8Sales).
2. In DigitalOcean, confirm the app is connected to that repository and branch `main`.
3. Wait for a successful build after each push to `main`.
4. Open the URL DigitalOcean provides and review the live site.
