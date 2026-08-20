# R8 Sales Group Website

A public marketing website for R8 Sales Group. It is a single-page site that visitors can review in a browser after it is connected to DigitalOcean App Platform.

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


## DigitalOcean App Platform settings

Create a **Static Site** app pointed at this repository, then use these values:

- **Resource type:** Static Site
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **HTTP port:** leave the default
- **Node version:** `20`
- **Environment variables:** none required
- **Catch-all / rewrite rules:** not required

The site is fully client-side. After the first deploy, DigitalOcean will provide a live URL you can open in a browser.
