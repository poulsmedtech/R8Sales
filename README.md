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
- `prompts/` — original build instructions
- `MockUp1.png` — visual reference for the design

Buttons such as Learn More, Agent Login, Contact Us, and the founder video currently open a placeholder message. They are ready to be connected later.

Hero skyline photograph by [Andre Benz](https://unsplash.com/photos/city-skyline-during-night-time-cXU6tNxhub0) / Unsplash. Founder portrait is a local project asset.

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

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node.js:** `20`
- **Environment variables:** none
- **Catch-all / rewrite rules:** none
- **Automatic deploys from `main`:** enabled

### Deployment checklist

1. Confirm the latest commit is visible on GitHub at [poulsmedtech/R8Sales](https://github.com/poulsmedtech/R8Sales).
2. Create a new DigitalOcean App Platform app and connect that GitHub repository.
3. Enter the settings above, then wait for a successful build.
4. Open the URL DigitalOcean provides and review the live site.
