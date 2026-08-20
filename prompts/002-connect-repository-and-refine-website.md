# Dev Agent Prompt 2: Connect GitHub, Add Repository Safeguards, and Refine the Website

Continue implementation of the existing R8 Sales Group website in:

`/Users/samanthapouls/Desktop/R8Sales`

Work autonomously through implementation, verification, commit, and push. The project owner is not a coder. Do not ask them to run commands or perform technical steps unless authentication or an external account permission makes that unavoidable.

## Important context

- The previous implementation is committed locally on `main` at commit `2ab7870e03ff7ab224f7469d7c8f609f2a4fecf4`.
- The correct, owner-created GitHub repository is:
  `https://github.com/poulsmedtech/R8Sales.git`
- That GitHub repository is currently empty and is the intended remote for this project.
- The R8Sales folder is deliberately an independent Git repository nested inside a parent folder that belongs to another repository.
- The parent repository is unrelated to this deployment. Never stage, commit, push, reset, or otherwise modify the parent repository.
- Preserve `MockUp1.png` and both prompt files.

## Part 1: Safely connect and push the correct repository

The owner-created R8Sales GitHub repository can and should be used. The prior blocker was only that the local R8Sales repository had no remote configured.

Before changing Git state:

1. Run `git rev-parse --show-toplevel` from the project directory.
2. Confirm the result is exactly `/Users/samanthapouls/Desktop/R8Sales`.
3. Confirm the current branch and working tree state.
4. Inspect existing remotes.
5. If `origin` is absent, add:
   `https://github.com/poulsmedtech/R8Sales.git`
6. If `origin` exists but is not exactly that URL, stop and report the mismatch instead of overwriting it.
7. Do not use or modify the parent PoulsMedTech remote.

After implementing and verifying all work in this prompt:

1. Commit the complete change set, including this prompt and README updates.
2. Push `main` to `origin` and set upstream tracking.
3. Verify that local `main` tracks `origin/main` and is up to date.
4. Do not force-push or rewrite history.

If GitHub authentication blocks the push, report the exact authentication step the owner must approve. Do not claim the site is deployable from GitHub until the push is verified.

## Part 2: Add repository safeguards to README

Add a clearly labeled **Repository Safety** section to `README.md` in plain language. It must explain:

- This project has its own `.git` directory and independent history.
- Its Git root must be `/Users/samanthapouls/Desktop/R8Sales`.
- Its expected remote is `https://github.com/poulsmedtech/R8Sales.git`.
- Contributors and agents must verify `git rev-parse --show-toplevel` and `git remote -v` before committing or pushing.
- Git commands for this project must be run from inside R8Sales.
- The parent repository must not be staged, committed, or pushed while working on R8Sales.
- Force pushes and destructive resets are prohibited unless the owner explicitly authorizes them.
- Secrets, credentials, `.env` files, `node_modules`, and `dist` must not be committed.

Also revise the DigitalOcean section so a nontechnical owner can follow it. State that DigitalOcean should connect to the GitHub repository `poulsmedtech/R8Sales`, branch `main`, as a Static Site with:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 20
- Environment variables: none
- Catch-all/rewrite rules: none
- Automatic deploys from `main`: enabled

Add a short deployment checklist: confirm the latest commit appears on GitHub, create the app, wait for a successful build, and open the DigitalOcean-provided URL.

## Part 3: Website refinements

Use `/Users/samanthapouls/Desktop/R8Sales/MockUp1.png` as the visual source of truth. Retain React/Vite, the single-page structure, local assets, responsive behavior, smooth scrolling, and the accessible reusable placeholder modal.

Implement all of the following improvements:

### 1. Match the white navigation header

The mockup has a compact white header, blue R8 branding, dark navigation text, a blue active Home underline, and a rectangular navy Contact Us button. Change the current dark header accordingly. Keep it sticky, add a subtle shadow only after scrolling, and retain an accessible mobile menu.

### 2. Correct the global shape language and page density

The mockup is compact and corporate rather than oversized and pill-shaped. Reduce excessive vertical padding, oversized type, large shadows, and large corner radii. Use mostly 4–8px radii, compact rectangular buttons, tighter card spacing, and section proportions that more closely match the reference. Preserve comfortable mobile spacing.

### 3. Refine the hero composition

Match the reference’s shorter hero, darker left-to-right city overlay, left-aligned copy, and right-side “Why R8?” panel. Tighten heading/body sizing and panel spacing so both columns fit in a compact desktop band. Keep the three-line headline treatment and ensure the skyline and business silhouettes remain visible without reducing text contrast.

### 4. Match the founder-message band

Rework “Why I Created R8 Sales” to match the mockup’s compact two-column proportions: text on the left and a wide video thumbnail on the right. Reduce excessive white space and corner radius. Keep the video action connected to the shared placeholder modal.

### 5. Refine the opportunity cards

Match the pale blue section background and compact 4-by-2 desktop grid. Center the circular icons, headings, descriptions, and Learn More links as shown in the mockup. Use subtler borders/shadows and tighter cards. Preserve readable two-column/tablet and one-column/mobile layouts.

### 6. Rebuild the “Why R8?” benefits layout

On wide screens, match the reference with a left introductory block followed by eight compact numbered benefit columns in one horizontal band, including fine vertical separators. Do not place the heading centered above all cards. At smaller widths, wrap cleanly without tiny text or horizontal overflow.

### 7. Correct the Hao credibility section

On desktop, create the same three-part composition shown in the mockup: Hao’s portrait on the left, biography/partner history in the center, and the navy audience panel on the right. Keep the partner name treatments visually distinct. Stack these areas logically on mobile.

### 8. Match the final CTA and footer

Turn the final CTA into a full-width dark navy band with white copy and two compact stacked action buttons on the right, matching the reference. Make the footer below it compact and white with the R8 branding, grouped links, contact details, social controls, and legal links aligned similarly to the mockup.

### 9. Improve navigation feedback and opportunity linking

Add lightweight active-section feedback to the desktop navigation as the user scrolls, while respecting reduced-motion preferences. Give each opportunity card a stable section target. Dropdown items should scroll to the specific card, not merely the top of the opportunities section, and the destination should receive a brief accessible visual emphasis without opening a new page.

## Quality requirements

- Do not replace real content with lorem ipsum.
- Do not add a backend, authentication, forms, analytics, or new business claims.
- Keep all current placeholder actions opening the shared modal.
- Preserve modal focus trapping, Escape close, backdrop close, focus restoration, and keyboard accessibility.
- Do not hotlink third-party assets.
- Avoid horizontal overflow at mobile, tablet, laptop, and large desktop widths.
- Ensure the white sticky header does not cover scrolled-to content.
- Ensure all controls have hover and keyboard-focus states with adequate contrast.
- Keep dependencies minimal.

## Verification

Before committing:

1. Install dependencies if needed.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Run the production preview and inspect the page at representative desktop, tablet, and mobile widths.
5. Confirm all images load, navigation targets work, the mobile menu works, every placeholder action opens the modal, and there are no console errors.
6. Compare the desktop page directly with `MockUp1.png` and correct obvious differences covered by this prompt.
7. Confirm the Git root and remote again before committing and pushing.

## Final report

Provide a concise, nontechnical handoff that includes:

- The nine refinements completed
- Lint and production-build results
- The new commit hash
- Confirmation that `main` was pushed to `https://github.com/poulsmedtech/R8Sales.git`
- Confirmation that local `main` tracks `origin/main`
- Whether the owner can now create the DigitalOcean app
- The exact DigitalOcean settings from the README
- Any genuine blocker requiring owner action

Do not stop after editing or after creating a local commit. A verified push to the correct R8Sales repository is part of this task unless GitHub authentication explicitly prevents it.
