# Dev Agent Prompt 5: R8 Sales Group Rebrand and Five Professional Enhancements

Continue work on the website in:

`/Users/samanthapouls/Desktop/R8Sales`

Current baseline:

- Commit: `e4a5477`
- Branch: `main`
- Remote: `https://github.com/poulsmedtech/R8Sales.git`
- Hosting: DigitalOcean App Platform Static Site with automatic deployment from `main`

Work autonomously through implementation, verification, commit, push, and deployment handoff. The owner is not a coder and must not be asked to run commands or edit files.

## Safety checks

Before editing:

1. Confirm `git rev-parse --show-toplevel` is exactly `/Users/samanthapouls/Desktop/R8Sales`.
2. Confirm `origin` is exactly `https://github.com/poulsmedtech/R8Sales.git`.
3. Confirm local `main` tracks `origin/main`.
4. Do not modify the unrelated parent repository.
5. Preserve `MockUp1.png` and all prompt files.

## Primary requirement: rename the brand to R8 Sales Group

Change every current, public-facing use of **R8 Sales** to **R8 Sales Group**.

This is a complete brand-name update, not a partial copy edit. Update:

- Header logo and accessible label
- Footer logo and copyright
- Hero copy
- Founder-message heading and body
- About Hao copy
- CTA copy
- Contact modal copy
- Error fallback
- Document title
- Meta description
- Open Graph metadata
- Twitter/X metadata
- JSON-LD organization name
- Favicon accessibility labels
- Social-preview image text
- README and current project documentation
- Package name and lockfile package name, changing `r8-sales` to `r8-sales-group`
- Any other user-visible string, accessibility label, metadata value, or current configuration text

Do not rename:

- The repository URL
- The local `/R8Sales` directory
- Existing email addresses
- Existing phone numbers
- Historical Git commits

Historical prompt files 001–004 are records of previous instructions and do not need to be rewritten. Prompt 5 and all current site/runtime documentation must use the new name.

Before finishing, search all runtime source, public metadata, README, package files, and generated production output for standalone `R8 Sales` or `R8 SALES`. No old public-facing brand string may remain. Exclude historical prompts from this final search report.

## Professional brand styling

Update the visual lockup so **R8 Sales Group** looks intentional rather than appending “Group” as an afterthought:

- Keep the large blue `R8` mark.
- Use `SALES GROUP` as the supporting wordmark with balanced letter spacing.
- Preserve “Right Opportunities. Right People.” as the tagline beside the mark where space allows.
- Ensure the header lockup remains compact enough for the centered navigation and Contact Us button.
- Create a compact mobile treatment that still communicates “Sales Group”; do not silently revert to “Sales.”
- Use the same lockup consistently in the header and footer.
- Regenerate or replace the Open Graph/social image so it displays `R8 SALES GROUP`.
- Small favicon marks may use `R8` alone where the full name would be unreadable.

Acceptance criteria:

- The full brand reads clearly at desktop and mobile sizes.
- `SALES GROUP` has professional spacing and alignment.
- Header navigation remains centered and does not overlap the brand.
- No raster asset still visibly displays the old `R8 SALES` wording.

## Improvement 1: Make Contact Us immediately useful

The Contact Us modal currently explains that a form will be added later even though valid phone and email details already exist. Turn it into an actionable contact panel without adding a backend or collecting personal data.

Required behavior:

- Display the phone number as a `tel:` link.
- Display the email address as a `mailto:` link.
- Provide clear “Call” and “Email” action buttons.
- Keep concise professional copy explaining that visitors can contact R8 Sales Group directly.
- On devices without calling support, the phone number must still be selectable/readable.
- Preserve the existing modal focus trap, Escape close, backdrop close, scroll lock, and focus restoration.
- Do not add a form, external CRM, API, tracking, or invented office address.

Acceptance criteria:

- Contact Us works from the header and mobile menu.
- Both contact actions are keyboard accessible.
- The displayed phone/email exactly match the existing verified footer details.

## Improvement 2: Make opportunity cards fully interactive

Improve the eight opportunity cards so visitors do not have to precisely click the small Learn More text.

Required behavior:

- The entire visible card should provide a clear, accessible activation target for its existing detail modal.
- Preserve the visible Learn More label and arrow.
- Avoid invalid nested interactive elements.
- Keyboard users must be able to focus and activate each card with Enter/Space using correct native semantics.
- Add a restrained hover/focus treatment: border, elevation, and/or arrow movement consistent with the corporate design.
- Deep links from the Opportunities navigation must continue to scroll to and emphasize the correct card without automatically opening the modal.
- Preserve equal card heights and mobile layouts.

Acceptance criteria:

- Clicking an open area of any card opens the correct program content.
- The card has one coherent focus stop, not duplicate confusing controls.
- Focus indicators meet contrast requirements.

## Improvement 3: Add an accessible Back to Top control

Add a discreet Back to Top button for this long single-page website.

Required behavior:

- Keep it hidden near the top of the page.
- Reveal it after the visitor has scrolled beyond the hero/founder area.
- Position it unobtrusively near the lower-right edge without covering footer links, CTA buttons, modals, or the mobile menu.
- Activate smooth scrolling unless `prefers-reduced-motion` requests instant movement.
- Return focus meaningfully to the top/home heading or main landmark after activation.
- Include a visible icon plus an accessible label.
- Hide it while a modal or mobile menu is open if overlap would occur.

Acceptance criteria:

- It works with mouse, touch, and keyboard.
- It does not cover content at 320px width.
- It respects reduced-motion preferences.

## Improvement 4: Add restrained professional motion and interaction polish

Introduce subtle visual feedback without turning the corporate site into an animated landing page.

Apply consistent polish to:

- Header dropdown chevron rotation
- Buttons and text-link arrows
- Opportunity cards
- Benefit icons
- CTA controls
- Major section entry as the visitor scrolls

Requirements:

- Use small movement, opacity, or shadow changes only.
- Avoid bouncing, parallax, continuous animation, large scaling, or distracting effects.
- Content must remain visible and usable if JavaScript is delayed or disabled.
- Do not animate layout dimensions that cause content shift.
- Disable nonessential animation under `prefers-reduced-motion: reduce`.
- Maintain accessible focus styles independently of hover.

Acceptance criteria:

- Interactions feel consistent and professional.
- No animation delays navigation or modal operation.
- Reduced-motion mode produces an effectively static experience.

## Improvement 5: Add automated interaction and brand regression checks

Add a lightweight automated test setup appropriate for this React/Vite project. Keep dependencies minimal and use current supported versions through the package manager.

At minimum, add tests that verify:

- The homepage renders the `R8 Sales Group` brand.
- The old standalone public-facing `R8 Sales` name is absent from rendered UI.
- Agent Login remains absent.
- Contact Us opens actionable Call and Email links.
- An opportunity card opens the correct contextual modal.
- The modal closes with Escape and restores focus.
- Explore Our Opportunities performs in-page navigation rather than opening a modal.
- The main navigation and media placeholders render.

Add a standard `npm test` script that runs once and exits successfully in CI. Do not add brittle pixel-snapshot tests. Prefer behavior and accessibility-oriented queries.

Acceptance criteria:

- `npm test` passes locally.
- Tests do not require network access or a live DigitalOcean deployment.
- Lint and production build continue to pass.

## Additional consistency requirements

- Use **R8 Sales Group** naturally in prose; avoid repeating the full name in every sentence when “R8” is grammatically clearer.
- Do not change established business claims, opportunity descriptions, contact information, or Hao Zhang’s biography beyond the brand-name replacement.
- Do not restore Agent Login.
- Keep founder video and portrait as image-free placeholders.
- Preserve current accessibility, SEO, performance, responsive layout, error boundary, and DigitalOcean Static Site behavior.
- Do not add analytics, cookies, a backend, authentication, a database, or environment variables.

## Verification

Before committing:

1. Run `npm test`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Preview the production build.
5. Inspect at:
   - 320×568
   - 375×812
   - 768×1024
   - 1024×768
   - 1280×800
   - 1440×900
6. Verify:
   - Header and footer display `R8 Sales Group` professionally.
   - No public-facing old brand remains.
   - Contact actions work.
   - All eight cards open the correct modal with mouse and keyboard.
   - Back to Top works and does not overlap content.
   - Reduced-motion mode disables nonessential movement.
   - Agent Login remains absent.
   - Founder media remains image-free.
   - No console errors, broken assets, or horizontal overflow exist.
7. Inspect the generated `dist/index.html` and built assets for the updated title and metadata.
8. Confirm DigitalOcean remains:
   - Static Site
   - Build command: `npm run build`
   - Output directory: `dist`
   - No run command
   - No environment variables

## Commit, push, and deploy

1. Commit all changes, including this prompt, tests, documentation, and brand assets.
2. Push `main` to `origin` without force.
3. Verify local `main` is synchronized with `origin/main`.
4. The push must trigger the existing DigitalOcean automatic deployment.
5. If the live URL is available, verify the deployed title, header, footer, contact modal, and one opportunity card.
6. If the live URL is unavailable, report that the verified push triggered deployment and identify the one deployment-status check remaining for the owner.

## Final report

Provide a concise, nontechnical handoff containing:

- Confirmation of the complete R8 Sales Group brand update
- The five improvements completed
- Test, lint, and production-build results
- Responsive/accessibility review results
- Commit hash and push confirmation
- DigitalOcean deployment status
- Any genuine blocker requiring owner action

Do not stop after planning, local edits, or a local commit. Implement, verify, push, and complete the deployment handoff.
